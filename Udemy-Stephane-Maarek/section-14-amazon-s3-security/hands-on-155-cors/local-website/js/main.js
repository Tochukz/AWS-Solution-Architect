function getElem(id) {
  return document.getElementById(id);
}

function getData(url, resultElemId) {
  fetch(url)
    .then((res) => res.json())
    .then((users) => {
      const usersStr = JSON.stringify(users, null, 2);
      getElem(resultElemId).innerHTML = `<pre>${usersStr}</pre>`;
    })
    .catch((error) => {
      console.error(error);
      getElem(resultElemId).innerHTML = `<pre>${error.toString()}</pre>`;
    });
}

function getUsersFromBucket1() {
  const url =
    "https://cors-disabled-bucket-01-25.s3.eu-west-2.amazonaws.com/data/users.json";
  getData(url, "result1");
}

function getUsersFromBucket2() {
  const url =
    "https://cors-enabled-bucket-01-25.s3.eu-west-2.amazonaws.com/data/users.json";
  getData(url, "result2");
}
