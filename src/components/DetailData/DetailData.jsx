import React, { useState, useEffect } from 'react';
import getLocation from './getLocation';
import getMeteorData from '../../services/publicAPI';
import getDetailData from './getDetailData';

function DetailData() {
  // This state is for testing purposes only. It will be replaced by props later.
  const [meteorData, setMeteorData] = useState(null);
  const [locationsData, setLocationsData] = useState(null);
  const [detailData, setDetailData] = useState(null);

  useEffect(() => {
    console.log('testing');
    getMeteorData().then((data) => setMeteorData(data.slice(140, 160)));
    console.log('meteor data set');
  }, []);

  useEffect(() => {
    if (meteorData) {
      const queryResponse = getLocation(meteorData);
      setLocationsData(queryResponse.value);
      console.log('location data set');
    }
  }, [meteorData]);

  useEffect(() => {
    if (locationsData) {
      const updatedDetailData = getDetailData(meteorData, locationsData);
      setDetailData(updatedDetailData);
    }
  }, [locationsData]);

  return (
    <div>
      {detailData ? (
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
              {detailData.map((item) => (
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
      ) : (<p>Content loading...</p>)
      }
    </div>
  );
}

export default DetailData;
