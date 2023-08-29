export default function getDetailData(meteorData, locations) {
  // Create a map from locationData using latitude and longitude as the key
  const locationMap = new Map();
  locations.forEach((location) => {
    const key = `${location.query.lon},${location.query.lat}`;
    locationMap.set(key, { city: location.city, country: location.country });
  });

  // Update meteorData with location information. If no lat/lon data, indicate data is unavailable
  meteorData.forEach((meteor) => {
    if (meteor.reclong && meteor.reclat) {
      meteor.gelocation = 'Data unavailable';
    } else {
      const key = `${parseFloat(meteor.reclong)},${parseFloat(meteor.reclat)}`;
      const location = locationMap.get(key);
      if (location) {
        meteor.geolocation = `${location.city}, ${location.country}`;
      }
    }
  });
}
