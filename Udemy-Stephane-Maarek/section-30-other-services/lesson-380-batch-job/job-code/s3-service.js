const {
  S3Client,
  ListBucketsCommand,
  S3ServiceException,
} = require("@aws-sdk/client-s3");

async function listBuckets() {
  try {
    const s3Client = new S3Client({ region: process.env.AWS_REGION });
    const command = new ListBucketsCommand({});
    const response = await s3Client.send(command);

    return {
      success: true,
      data: response.Buckets,
      message: "Buckets retrieved successfully",
    };
  } catch (error) {
    if (error instanceof S3ServiceException) {
      return {
        success: false,
        error: error.name,
        message: error.message,
        code: error.$metadata?.httpStatusCode,
      };
    }

    return {
      success: false,
      error: "UnknownError",
      message: error.message,
    };
  }
}

module.exports = { listBuckets };
