#!/bin/bash
# Description: Create a Log stream and put logs in it 
# Create a log stream
aws logs create-log-stream --log-group-name /aws/custom/SimpleLogs --log-stream-name 2025/04/17/logs --no-cli-pager

# Add 5 log events to the log stream
aws logs put-log-events --log-group-name /aws/custom/SimpleLogs --log-stream-name 2025/04/17/logs --log-events '[{"timestamp": 1742318812495, "message": "error"}]' --no-cli-pager
aws logs put-log-events --log-group-name /aws/custom/SimpleLogs --log-stream-name 2025/04/17/logs --log-events '[{"timestamp": 1742319690395, "message": "error from Axios"}]' --no-cli-pager
aws logs put-log-events --log-group-name /aws/custom/SimpleLogs --log-stream-name 2025/04/17/logs --log-events '[{"timestamp": 1742319773547, "message": "undefined variable error"}]' --no-cli-pager
aws logs put-log-events --log-group-name /aws/custom/SimpleLogs --log-stream-name 2025/04/17/logs --log-events '[{"timestamp": 1742319807440, "message": "null reference error"}]' --no-cli-pager
aws logs put-log-events --log-group-name /aws/custom/SimpleLogs --log-stream-name 2025/04/17/logs --log-events '[{"timestamp": 1742319838079, "message": "db error in table"}]' --no-cli-pager