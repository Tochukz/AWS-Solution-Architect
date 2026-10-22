aws cloudformation delete-stack --stack-name ApiGateway
aws cloudformation wait stack-delete-complete --stack-name ApiGateway
aws cloudformation delete-stack --stack-name EcsService
aws cloudformation wait stack-delete-complete --stack-name EcsService
aws cloudformation delete-stack --stack-name Network