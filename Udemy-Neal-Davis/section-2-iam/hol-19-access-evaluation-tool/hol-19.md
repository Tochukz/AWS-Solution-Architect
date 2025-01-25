# Access Evaluation Tool - HOL-19

### Description

The _Access Analyzer Tool_ can be found in the IAM Console under the _Access Report_ submenu.  
Before the _Access Analyzer Tool_ can be enabled or used, an Analyzer must be created.  
This template creates an Analyzer thus enabling the Access Analyzer Tool.

### Operation

**Deployment**
Lint the template 
```bash
$ cfn-lint AccessAnalyzer.yaml
```

Deploy a stack using the template

```bash
$ aws cloudformation deploy --template-file AccessAnalyzer.yaml --stack-name AccessAnalyzer
```

**Debug Errors**  
In the case of error during deployment

```bash
$ aws cloudformation describe-stack-events --stack-name AccessAnalyzer > events.json
```

**Cleanup**  
To delete the stack
```bash
$ aws cloudformation delete-stack --stack-name AccessAnalyzer
```
