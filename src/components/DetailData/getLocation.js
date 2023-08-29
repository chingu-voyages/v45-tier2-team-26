import getLatLon from './getLatLon';

export default async function getLocation(meteorData) {
  const latLongData = getLatLon(meteorData);
  const url = 'https://api.geoapify.com/v1/batch/geocode/reverse?apiKey=143adca609dd41258606ce840f8db559';

  // Remove null entries from latLongData
  const filteredLatLongData = latLongData.filter((entry) => entry !== null);

  if (filteredLatLongData.length === 0) {
    return null;
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filteredLatLongData),
    });

    const result = await getBodyAndStatus(response);

    if (result.status !== 202) {
      throw result;
    }

    console.log(`Job ID: ${result.body.id}`);
    console.log(`Job URL: ${result.body.url}`);

    const queryResult = await getAsyncResult(`${url}&id=${result.body.id}`, 1000, 100);
    console.log(queryResult);
    return queryResult;
  } catch (error) {
    console.error(error);
  }
}

async function getBodyAndStatus(response) {
  const responseBody = await response.json();
  return {
    status: response.status,
    body: responseBody,
  };
}

async function getAsyncResult(url, timeout, maxAttempt) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      repeatUntilSuccess(resolve, reject, 0);
    }, timeout);
  });

  async function repeatUntilSuccess(resolve, reject, attempt) {
    console.log(`Attempt: ${attempt}`);
    try {
      const response = await fetch(url);
      const result = await getBodyAndStatus(response);

      if (result.status === 200) {
        resolve(result.body);
      } else if (attempt >= maxAttempt) {
        reject('Max amount of attempts achieved');
      } else if (result.status === 202) {
        setTimeout(() => {
          repeatUntilSuccess(resolve, reject, attempt + 1);
        }, timeout);
      } else {
        reject(result.body);
      }
    } catch (error) {
      reject(error);
    }
  }
}
