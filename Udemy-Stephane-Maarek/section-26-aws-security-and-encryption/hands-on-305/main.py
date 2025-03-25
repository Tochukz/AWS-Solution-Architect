import os
import boto3

env = os.environ["ENV"]
region = os.environ["REGION"]
ssm_client = boto3.client("ssm", region_name=region)

def handler(events, context): 
  parameter_names = [
    "/my-app/" + env + "/database-name", 
    "/my-app/" + env  +"/database-user"
  ]
  parameters_result = ssm_client.get_parameters(Names=parameter_names)
  db_name = parameters_result["Parameters"][0]["Value"]
  db_user = parameters_result["Parameters"][1]["Value"]

  staging_param_result = ssm_client.get_parameter(Name="/my-app/staging/database-pass", WithDecryption=True)
  # The Prod database-pass was encrypted using a custom KMS key from hands-on-299. Permission to that key is required
  prod_param_result = ssm_client.get_parameter(Name="/my-app/prod/database-pass",  WithDecryption=True)
  staging_db_pass = staging_param_result["Parameter"]["Value"]
  prod_db_pass = prod_param_result["Parameter"]["Value"]
  db_creds = {  "db_name": db_name , "db_user": db_user, "staging_db_pass": staging_db_pass, "prod_db_pass": prod_db_pass}
  print(db_creds)

  return db_creds


handler({}, {})

"""
* To run the code locally:

$ export ENV=dev
$ export REGION=eu-west-2
$ python main.py
"""