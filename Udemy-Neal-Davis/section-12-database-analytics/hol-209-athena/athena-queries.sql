-- Create table for query results 
CREATE EXTERNAL TABLE IF NOT EXISTS alb_logs (
            type string,
            time string,
            elb string,
            client_ip string,
            client_port int,
            target_ip string,
            target_port int,
            request_processing_time double,
            target_processing_time double,
            response_processing_time double,
            elb_status_code string,
            target_status_code string,
            received_bytes bigint,
            sent_bytes bigint,
            request_verb string,
            request_url string,
            request_proto string,
            user_agent string,
            ssl_cipher string,
            ssl_protocol string,
            target_group_arn string,
            trace_id string,
            domain_name string,
            chosen_cert_arn string,
            matched_rule_priority string,
            request_creation_time string,
            actions_executed string,
            redirect_url string,
            lambda_error_reason string,
            target_port_list string,
            target_status_code_list string,
            classification string,
            classification_reason string
            )
            ROW FORMAT SERDE 'org.apache.hadoop.hive.serde2.lazy.LazySimpleSerDe'
            WITH SERDEPROPERTIES (
            "column.separator" = "\t",
            "escape" = "\\" )
            'input.regex' = 
            STORED AS INPUTFORMAT 'org.apache.hadoop.mapred.TextInputFormat'
            OUTPUTFORMAT 'org.apache.hadoop.hive.ql.io.HiveIgnoreKeyTextOutputFormat'
            LOCATION 's3://alb-access-logs-14-05/AWSLogs/123456789/elasticloadbalancing/eu-west-2/';
            TBLPROPERTIES (
            "compression" = "gzip" 
            );

-- Example Queries 

-- View the first 100 access log entries in chronological order:
SELECT *
FROM alb_logs
ORDER by time ASC
LIMIT 100;


-- List clients in descending order, by the number of times that each client visited a specified URL:
SELECT client_ip, elb, request_url, count(*) as count from alb_logs
GROUP by client_ip, elb, request_url
ORDER by count DESC;


-- Shows the URLs visited by Chrome browser users:
SELECT request_url
FROM alb_logs
WHERE user_agent LIKE '%Chrome%'
LIMIT 10;


