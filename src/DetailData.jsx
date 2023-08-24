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

      const latLongData = data.map((meteor) => ({
        lon: parseFloat(meteor.reclong),
        lat: parseFloat(meteor.reclat),
      }));
      console.log(data[147]);

      await getLocation(latLongData);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <p>Detail data component</p>
  );
}

export default DetailData;
