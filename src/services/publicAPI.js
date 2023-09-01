export default async () => fetch('../Meteorite_Landings.json')
  .then((response) => response.json())
  .then((data) => data)
  .catch((error) => console.error(error));
