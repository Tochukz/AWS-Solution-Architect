const handler = async (event) => {
  console.log("Runing at", new Date().toISOString());
  const date = new Date().toISOString();
  throw new Error(`Errored at ${date.substring(11, 19)}`);
};

handler({});
