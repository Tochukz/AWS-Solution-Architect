import boto3, os, json, base64, gzip, time, sys

# Setup logging
import logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

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

logger.info(f"Lambda initialized: PROTECTED_PATH={PROTECTED_PATH}, MAX_REQUESTS={MAX_REQUESTS}, WINDOW_SECONDS={WINDOW_SECONDS}")

def lambda_handler(event, context):
    logger.info(f"Event received: {json.dumps(event)}")
    
    try:
        raw     = base64.b64decode(event['awslogs']['data'])
        records = json.loads(gzip.decompress(raw))
        logger.info(f"Decompressed {len(records.get('logEvents', []))} log events")
    except Exception as e:
        logger.error(f"Error decompressing logs: {e}", exc_info=True)
        return {'statusCode': 400, 'body': f'Error decompressing logs: {e}'}

    block_v4, block_v6 = set(), set()
    matched_requests = 0

    for rec in records.get('logEvents', []):
        try:
            msg = json.loads(rec['message'])
        except (KeyError, json.JSONDecodeError) as e:
            logger.debug(f"Skipping non-JSON log event: {e}")
            continue

        http_req = msg.get('httpRequest', {})
        uri = http_req.get('uri', '')
        logger.debug(f"Checking URI: {uri} against PROTECTED_PATH: {PROTECTED_PATH}")
        
        if uri != PROTECTED_PATH:
            logger.debug(f"URI {uri} does not match {PROTECTED_PATH}, skipping")
            continue

        matched_requests += 1
        ip = http_req.get('clientIp')
        if not ip:
            logger.warning(f"No clientIp found in request")
            continue

        logger.info(f"Processing request from {ip} to {uri}")
        
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
            logger.info(f"IP {ip}: count={count}, threshold={MAX_REQUESTS}")
            
            if count > MAX_REQUESTS:
                logger.warning(f"IP {ip} exceeded threshold! Adding to block list.")
                (block_v6 if ':' in ip else block_v4).add(ip)
        except Exception as e:
            logger.error(f"Error updating DynamoDB for IP {ip}: {e}", exc_info=True)
            continue

    logger.info(f"Total matched requests: {matched_requests}, IPv4 to block: {len(block_v4)}, IPv6 to block: {len(block_v6)}")

    if block_v4:
        try:
            _add_to_ip_set(IPV4_SET_NAME, IPV4_SET_ID, block_v4, '/32')
            logger.info(f"Updated IPv4 set with {len(block_v4)} addresses")
        except Exception as e:
            logger.error(f"Error updating IPv4 set: {e}", exc_info=True)
    
    if block_v6:
        try:
            _add_to_ip_set(IPV6_SET_NAME, IPV6_SET_ID, block_v6, '/128')
            logger.info(f"Updated IPv6 set with {len(block_v6)} addresses")
        except Exception as e:
            logger.error(f"Error updating IPv6 set: {e}", exc_info=True)

    return {'statusCode': 200, 'body': f'Matched: {matched_requests}, Blocked IPv4: {len(block_v4)}, IPv6: {len(block_v6)}'}

def _add_to_ip_set(name, set_id, ips, suffix):
    try:
        resp  = wafv2.get_ip_set(Name=name, Scope='REGIONAL', Id=set_id)
        token = resp['LockToken']
        addrs = set(resp['IPSet']['Addresses'])
        new   = addrs | {(ip if '/' in ip else ip + suffix) for ip in ips}
        logger.info(f"IP set '{name}': current={len(addrs)}, new={len(new)}")
        
        if new != addrs:
            wafv2.update_ip_set(
                Name=name, Scope='REGIONAL', Id=set_id,
                LockToken=token, Addresses=list(new)
            )
            logger.info(f"Successfully updated IP set '{name}'")
        else:
            logger.info(f"No changes needed for IP set '{name}'")
    except Exception as e:
        logger.error(f"Error in _add_to_ip_set for {name}: {e}", exc_info=True)
        raise
