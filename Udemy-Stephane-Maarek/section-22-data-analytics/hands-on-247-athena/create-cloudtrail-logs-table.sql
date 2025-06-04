/* 
 * The query creates a Table in Athena for CloudTrail Log 
 * It was generated from the CloudTrail Console 
 * To generate, go to CloudTrail Console > Event history > Create Athena table
 * To run, copy it over to the Athena editor and clikc the Run button
 */

CREATE EXTERNAL TABLE cloudtrail_logs_dev_cloudtrail_storage (
    eventVersion STRING,
    userIdentity STRUCT<
        type: STRING,
        principalId: STRING,
        arn: STRING,
        accountId: STRING,
        invokedBy: STRING,
        accessKeyId: STRING,
        userName: STRING,
        sessionContext: STRUCT<
            attributes: STRUCT<
                mfaAuthenticated: STRING,
                creationDate: STRING>,
            sessionIssuer: STRUCT<
                type: STRING,
                principalId: STRING,
                arn: STRING,
                accountId: STRING,
                username: STRING>,
            ec2RoleDelivery: STRING,
            webIdFederationData: STRUCT<
               federatedProvider: STRING,
               attributes: MAP<STRING,STRING>>>>,
    eventTime STRING,
    eventSource STRING,
    eventName STRING,
    awsRegion STRING,
    sourceIpAddress STRING,
    userAgent STRING,
    errorCode STRING,
    errorMessage STRING,
    requestParameters STRING,
    responseElements STRING,
    additionalEventData STRING,
    requestId STRING,
    eventId STRING,
    resources ARRAY<STRUCT<
        arn: STRING,
        accountId: STRING,
        type: STRING>>,
    eventType STRING,
    apiVersion STRING,
    readOnly STRING,
    recipientAccountId STRING,
    serviceEventDetails STRING,
    sharedEventID STRING,
    vpcEndpointId STRING,
    tlsDetails STRUCT<
        tlsVersion: STRING,
        cipherSuite: STRING,
        clientProvidedHostHeader: STRING>
)
COMMENT 'CloudTrail table for dev-cloudtrail-storage bucket'
ROW FORMAT SERDE 'org.apache.hive.hcatalog.data.JsonSerDe'
STORED AS INPUTFORMAT 'com.amazon.emr.cloudtrail.CloudTrailInputFormat'
OUTPUTFORMAT 'org.apache.hadoop.hive.ql.io.HiveIgnoreKeyTextOutputFormat'
LOCATION 's3://dev-cloudtrail-storage/AWSLogs/314146339647/CloudTrail/'
TBLPROPERTIES ('classification'='cloudtrail');