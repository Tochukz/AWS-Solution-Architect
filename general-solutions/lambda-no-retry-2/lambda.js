const handler = async (event) => {
  console.log("Runing at", new Date().toISOString());
  const date = new Date().toISOString();
  throw new Error(`Errored at ${date.substring(11, 19)}`);
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     console.log("Timeup");
  //     reject(new Error("Timeup error"));
  //   }, 100000); //100 seconds
  // });
};

handler({});
