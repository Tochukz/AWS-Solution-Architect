const {
  SQSClient,
  ReceiveMessageCommand,
  DeleteMessageCommand,
  SQSServiceException,
} = require("@aws-sdk/client-sqs");

function getSQSClient() {
  return new SQSClient({});
}

function handleError(error) {
  if (error instanceof SQSServiceException) {
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

async function deleteMessage(QueueUrl, receiptHandle) {
  try {
    const sqsClient = getSQSClient();
    const command = new DeleteMessageCommand({
      QueueUrl,
      ReceiptHandle: receiptHandle,
    });
    console.log("Deleting message with receipt handle:", receiptHandle);
    await sqsClient.send(command);

    return {
      success: true,
    };
  } catch (error) {
    return handleError(error);
  }
}

async function receiveMessage(QueueUrl) {
  try {
    const sqsClient = getSQSClient();
    const command = new ReceiveMessageCommand({
      QueueUrl,
      MaxNumberOfMessages: 10,
    });
    console.log("Receiving messages from SQS queue:", QueueUrl);
    const response = await sqsClient.send(command);

    console.log("Received messages:", response.Messages);

    if (Array.isArray(response.Messages) && response.Messages.length) {
      const message = response.Messages[0];
      if (message.Body?.includes("fail")) {
        const failureMessage =
          "Simulated processing failure for message: " + message.Body;
        throw new Error(failureMessage);
      }
      await deleteMessage(QueueUrl, message.ReceiptHandle);
    }

    return {
      success: true,
      data: response.Messages,
    };
  } catch (error) {
    return handleError(error);
  }
}

module.exports = { receiveMessage };
