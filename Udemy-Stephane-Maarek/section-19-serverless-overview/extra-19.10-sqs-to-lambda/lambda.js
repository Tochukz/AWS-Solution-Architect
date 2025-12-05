exports.handler = async (event) => {
  const records = JSON.stringify(event.Records);
  const time = new Date().toTimeString();
  console.log("Received SQS messages:", { records, time });
  return {
    statusCode: 200,
    body: "Processed successfully",
  };
};
