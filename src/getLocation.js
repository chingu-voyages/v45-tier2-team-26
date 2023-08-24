export default function getLocation(latLongData) {
  const url = 'https://api.geoapify.com/v1/batch/geocode/search?apiKey=143adca609dd41258606ce840f8db559';
  //   const body = JSON.stringify(latLongData);
  //   console.log(latLongData[0]);
  //   console.log(body[0]);

  // I'm stuck here - following the sample code (pasted below), when I stringify the latLongData,
  // I get the error: body[0] must be a string. And when I don't stringify the data, I get the error
  // "Unexpected token o in JSON at position 1"

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(latLongData),
  })
    .then(getBodyAndStatus)
    .then((result) => {
      if (result.status !== 202) {
        return Promise.reject(result);
      }
      console.log(`Job ID: ${result.body.id}`);
      console.log(`Job URL: ${result.body.url}`);
      return getAsyncResult(`${url}&id=${result.body.id}`, 1000, 100).then((queryResult) => {
        console.log(queryResult);
        return queryResult;
      });
    })
    .catch((err) => console.log(err));

  function getBodyAndStatus(response) {
    return response.json().then((responceBody) => ({
      status: response.status,
      body: responceBody,
    }));
  }

  function getAsyncResult(url, timeout, maxAttempt) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        repeatUntilSuccess(resolve, reject, 0);
      }, timeout);
    });

    function repeatUntilSuccess(resolve, reject, attempt) {
      console.log(`Attempt: ${attempt}`);
      fetch(url)
        .then(getBodyAndStatus)
        .then((result) => {
          if (result.status === 200) {
            resolve(result.body);
          } else if (attempt >= maxAttempt) {
            reject('Max amount of attempts achived');
          } else if (result.status === 202) {
            // Check again after timeout
            setTimeout(() => {
              repeatUntilSuccess(resolve, reject, attempt + 1);
            }, timeout);
          } else {
            // Something went wrong
            reject(result.body);
          }
        })
        .catch((err) => reject(err));
    }
  }
}
