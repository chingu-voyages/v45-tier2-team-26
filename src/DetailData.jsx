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
    const data = await fetch('https://data.nasa.gov/resource/gh4g-9sfh.json')
      .then((response) => response.json());
    setMeteorData(data);
    const latLongData = data.map((meteor) => ([parseFloat(meteor.reclong), parseFloat(meteor.reclat)]));
    console.log(latLongData);
    console.log(data[0], latLongData[0]);
    getLocation(latLongData);
  }

  return (
    <p>Detail data component</p>
  );
}

export default DetailData;
