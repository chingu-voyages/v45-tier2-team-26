import React, { useState, useEffect } from 'react';

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
    const latLongData = data.map((meteor) => ({ lon: meteor.reclong, lat: meteor.reclat }));
    console.log(data[0], latLongData[0]);
  }

  // fetch("https://api.geoapify.com/v1/geocode/reverse?lat=51.21709661403662&lon=6.7782883744862374&apiKey=143adca609dd41258606ce840f8db559", requestOptions)
  //   .then(response => response.json())
  //   .then(result => console.log(result))
  //   .catch(error => console.log('error', error));

  return (
    <p>Detail data component</p>
  );
}

export default DetailData;
