const handler = async (event) => {
  console.log("Runing at", new Date().toISOString());
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Timeup");
      reject(new Error("Timeup error"));
    }, 100000); //100 seconds
  });
};

handler({});
