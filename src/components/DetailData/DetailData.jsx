import React, { useState, useEffect } from 'react';
import getLocation from '../../getLocation';

function DetailData() {
  const [didRender, setDidRender] = useState(false);
  const [fullMeteorData, setFullMeteorData] = useState({});

  // useEffect to run once - at first render of DetailData.
  // Calls the async function getMeteorData
  useEffect(() => {
    if (didRender === false) {
      getMeteorData();
      return () => {
        setDidRender(true);
      };
    }
  }, []);

  // fetch the meteor data and set it to meteorData state
  async function getMeteorData() {
    try {
      const response = await fetch('https://data.nasa.gov/resource/gh4g-9sfh.json');
      let data = await response.json();
      data = data.slice(0, -900);// Currently only reverse geocoding for the first 100 lat/lon pairs. There is an error happening because not all meteor strikes have a lat/lon. This exits the whole fetch request in getLocation. So maybe we need to subset latLongData to exclude NaNs? Then we can use locations.query.lon and locations.query.lat to match back up the locations to the original meteor data?

      // Create lon/lat data formatted for batch reverse geocoding with the Geoapify API
      const latLongData = data.map((meteor) => (
        {
          lon: parseFloat(meteor.reclong),
          lat: parseFloat(meteor.reclat),
        }
      ));

      // Fetch locations from the Geoapify API
      const locations = await getLocation(latLongData);
      console.log(locations);

      // Create a map from locationData using latitude and longitude as the key
      const locationMap = new Map();
      locations.forEach((location) => {
        const key = `${location.query.lon},${location.query.lat}`;
        locationMap.set(key, { city: location.city, country: location.country });
      });

      // Update meteorData with location information
      data.forEach((meteor) => {
        const key = `${parseFloat(meteor.reclong)},${parseFloat(meteor.reclat)}`;
        const location = locationMap.get(key);
        if (location) {
          meteor.geolocation = `${location.city}, ${location.country}`;
        }
      });

      setFullMeteorData(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      {fullMeteorData.length
        ? (
          <div>
            <h1>Detail Data</h1>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>ID</th>
                  <th>Composition</th>
                  <th>Mass</th>
                  <th>Year</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                  <th>City, Country</th>
                </tr>
              </thead>
              <tbody>
                {fullMeteorData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.id}</td>
                    <td>{item.recclass}</td>
                    <td>{item.mass}</td>
                    <td>{item.year}</td>
                    <td>{item.reclat}</td>
                    <td>{item.reclong}</td>
                    <td>{item.geolocation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <p>Content loading...</p>}
    </div>
  );
}

export default DetailData;
