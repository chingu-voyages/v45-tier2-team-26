export default function getDetailData(meteors, locations) {
  // Create a map from locationData using latitude and longitude as the key
  const locationMap = new Map();
  locations.forEach((location) => {
    const key = `${location.query.lon},${location.query.lat}`;
    locationMap.set(key, { city: location.city, state: location.state, country: location.country });
  });

  // Create a new array with updated meteor data
  const updatedMeteors = meteors.map((meteor) => {
    // Update meteor.year to only contain the first four digits
    if (meteor.year) {
      meteor.year = meteor.year.substring(0, 4);
    }

    // Add geolocation, the city and country based on lat and lon
    if (!meteor.reclong || !meteor.reclat) {
      meteor.geolocation = 'Data unavailable';
    } else {
      const key = `${parseFloat(meteor.reclong)},${parseFloat(meteor.reclat)}`;
      const location = locationMap.get(key);
      if (location) {
        if (location.state && location.city) {
          meteor.geolocation = `${location.city}, ${location.state}, ${location.country}`;
        } else if (location.state && !location.city) {
          meteor.geolocation = `City unknown, ${location.state}, ${location.country}`;
        } else if (!location.state) {
          meteor.geolocation = `State unknown, ${location.country}`;
        }
      } else {
        meteor.geolocation = 'Data unavailable';
      }
    }

    return meteor; // Return the updated meteor object
  });

  return updatedMeteors; // Return the updated array
}
