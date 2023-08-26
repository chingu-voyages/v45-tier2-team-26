export default async () =>
  fetch('https://data.nasa.gov/resource/gh4g-9sfh.json')
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error(error))
