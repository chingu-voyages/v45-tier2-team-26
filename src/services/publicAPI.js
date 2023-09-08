export default async function fetchMeteorData() {
  try {
    const response = await fetch('../../Meteorite_Landings.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to allow the caller to handle it
  }
}
