import boto3, os, json, base64, gzip, time

TABLE_NAME      = os.environ['TABLE_NAME']
IPV4_SET_ID     = os.environ['IPV4_SET_ID']
IPV4_SET_NAME   = os.environ['IPV4_SET_NAME']
IPV6_SET_ID     = os.environ['IPV6_SET_ID']
IPV6_SET_NAME   = os.environ['IPV6_SET_NAME']
MAX_REQUESTS    = int(os.environ['MAX_REQUESTS'])
WINDOW_SECONDS  = int(os.environ['WINDOW_SECONDS'])
PROTECTED_PATH  = os.environ['PROTECTED_PATH']
REGION          = os.environ['AWS_REGION']

dynamodb = boto3.resource('dynamodb', region_name=REGION)
wafv2    = boto3.client('wafv2', region_name=REGION)
table    = dynamodb.Table(TABLE_NAME)

def lambda_handler(event, context):
    try:
        raw     = base64.b64decode(event['awslogs']['data'])
        records = json.loads(gzip.decompress(raw))
    except Exception as e:
        return {'statusCode': 400, 'body': f'Error decompressing logs: {e}'}

    block_v4, block_v6 = set(), set()
    matched_requests = 0

    for rec in records.get('logEvents', []):
        try:
            msg = json.loads(rec['message'])
        except (KeyError, json.JSONDecodeError):
            continue

        http_req = msg.get('httpRequest', {})
        uri = http_req.get('uri', '')

        if uri != PROTECTED_PATH:
            continue

        matched_requests += 1
        ip = http_req.get('clientIp')
        if not ip:
            continue

        try:
            ttl  = int(time.time()) + WINDOW_SECONDS
            resp = table.update_item(
                Key={'ip': ip},
                UpdateExpression=(
                    'SET #cnt = if_not_exists(#cnt, :zero) + :one, '
                    '#ttl = if_not_exists(#ttl, :ttl)'
                ),
                ExpressionAttributeNames={'#cnt': 'count', '#ttl': 'ttl'},
                ExpressionAttributeValues={':one': 1, ':zero': 0, ':ttl': ttl},
                ReturnValues='UPDATED_NEW'
            )

            count = int(resp['Attributes']['count'])

            if count > MAX_REQUESTS:
                (block_v6 if ':' in ip else block_v4).add(ip)
            except Exception:
            continue

    if block_v4:
        try:
            _add_to_ip_set(IPV4_SET_NAME, IPV4_SET_ID, block_v4, '/32')
            except Exception:
              pass
    
    if block_v6:
        try:
            _add_to_ip_set(IPV6_SET_NAME, IPV6_SET_ID, block_v6, '/128')
            except Exception:
              pass

    return {'statusCode': 200, 'body': f'Matched: {matched_requests}, Blocked IPv4: {len(block_v4)}, IPv6: {len(block_v6)}'}

def _add_to_ip_set(name, set_id, ips, suffix):
    try:
        resp  = wafv2.get_ip_set(Name=name, Scope='REGIONAL', Id=set_id)
        token = resp['LockToken']
        addrs = set(resp['IPSet']['Addresses'])
        new   = addrs | {(ip if '/' in ip else ip + suffix) for ip in ips}

        if new != addrs:
            wafv2.update_ip_set(
                Name=name, Scope='REGIONAL', Id=set_id,
                LockToken=token, Addresses=list(new)
            )
    except Exception:
        raise
