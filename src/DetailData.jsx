import React, { useState, useEffect } from 'react';
import getLocation from './getLocation';

function DetailData() {
  const [didRender, setDidRender] = useState(false);
  const [meteorData, setMeteorData] = useState({});
  const [latLongData, setLatLongData] = useState({});

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
      const data = await response.json();

      setMeteorData(data);

      const latLongData = data.map((meteor) => (
        {
          lon: parseFloat(meteor.reclong),
          lat: parseFloat(meteor.reclat),
        }
      ));
      console.log(latLongData[47]);

      const locations = await getLocation(latLongData.slice(0, -900));//Currently only reverse geocoding for the first 100 lat/lon pairs
      //There is an error happening because not all meteor strikes have a lat/lon. This exits the whole
      // fetch request in getLocation. So maybe we need to subset latLongData to exclude NaNs? 
      // Then we can use locations.query.lon and locations.query.lat to match back up the locations to 
      // the original meteor data?
      console.log(locations);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <p>Detail data component</p>
  );
}

export default DetailData;
