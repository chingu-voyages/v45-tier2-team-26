export default async function fetchLocation(location) {
  const apiUrl = `https://api.radar.io/v1/geocode/reverse?coordinates=${location}`;
  const apiKey = '82c169872336bf3c339e356bdee0036a3648ed9f';

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `prj_live_pk_${apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // Handle the response data here
    return data;
  } catch (error) {
    // Handle any errors here
    // console.error('Fetch error:', error);
  }
}
