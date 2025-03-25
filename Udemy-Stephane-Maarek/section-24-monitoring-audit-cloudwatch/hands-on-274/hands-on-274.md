# Lesson 274: CloudWatch Logs - Live Tail - Hands On

### Description

You can use _Live Tail_ to view Log events in real time as they are put into a LogStream.   

1. Open the CloudWatch Console.
2. Go to Logs > Live Tail
3. Select the LogGroup you want to tail
4. Select the LogStream of the LogGroup (optional)
5. Add a filter pattern (optional)
6. Click the _Apply filters_ button.
7. Use your AWS CLI to put logs into the LogStream
```bash
$  aws logs put-log-events --log-group-name /aws/custom/SimpleLogs --log-stream-name 2025/04/17/logs --log-events '[{"timestamp": 1742321962238, "message": "db error in table"}]'
```
8. The new log events will appear immediately on the Live Tail window.   
