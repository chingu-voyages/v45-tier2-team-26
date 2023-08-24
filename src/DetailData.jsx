import React, { useState, useEffect } from 'react';

function DetailData() {
  const [didRender, setDidRender] = useState(false);
  const [meteorData, setMeteorData] = useState({})

  // useEffect to run once - at first render of DetailData
  useEffect(() => {
    if (didRender === false) {
      getMeteorData();
      return () => {
        setDidRender(true);
      };
    }
  }, []);

  async function getMeteorData() {
    const meteorData = await fetch('https://data.nasa.gov/resource/gh4g-9sfh.json')
      .then((response) => response.json());
    console.log(meteorData);
    setMeteorData(meteorData)
  }

  return (
    <p>Detail data component</p>
  );
}

export default DetailData;
