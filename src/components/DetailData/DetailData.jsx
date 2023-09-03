import './DetailData.css';
import React, { useState, useEffect } from 'react';
import getMeteorData from '../../services/publicAPI';
import getLocation from './getLocation';

function DetailData() {
  const itemsPerPage = 10;
  const [meteorProps, setMeteorProps] = useState(null); // this will be removed when we have props
  const [currentPage, setCurrentPage] = useState(1);
  const [endIndex, setEndIndex] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [locationMemo, setLocationMemo] = useState({});

  // Note - planning for meteor data to be brought in via props.
  useEffect(() => {
    // this will be removed when we have props
    async function fetchData() {
      const data = await getMeteorData();
      setMeteorProps(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (meteorProps) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const newEndIndex = startIndex + itemsPerPage > meteorProps.length - 1
        ? meteorProps.length - 1
        : startIndex + itemsPerPage;
      setEndIndex(newEndIndex);

      const meteorSubset = meteorProps.slice(startIndex, newEndIndex + 1);

      const updatedMeteors = meteorSubset.map(async (meteor) => {
        const { id, GeoLocation } = meteor;

        // If GeoLocation doesn't exist or is an empty string,
        // return data unavailable
        if (!GeoLocation || GeoLocation === '') {
          return {
            ...meteor,
            location: 'Data unavailable',
          };
        }
        // If location data is memoized, use it
        if (locationMemo[id]) {
          return {
            ...meteor,
            location: locationMemo[id],
          };
        }

        // Fetch the location data

        const formattedGeoLocation = GeoLocation.replace(/[()]/g, '');

        try {
          const locationData = await getLocation(formattedGeoLocation);
          let state = 'State unknown';
          if (locationData.addresses[0].state) {
            state = locationData.addresses[0].state;
          }
          setLocationMemo((prevLocationMemo) => ({
            ...prevLocationMemo,
            [id]: `${state}, ${locationData.addresses[0].country}`,
          }));

          return {
            ...meteor,
            location: `${locationData.addresses.state}, ${locationData.addresses.country}`,
          };
        } catch (error) {
          // console.error('Error fetching location data:', error);
          return {
            ...meteor,
            location: 'Error fetching location',
          };
        }
      });

      // Wait for all promises to resolve and then set table data
      Promise.all(updatedMeteors).then((result) => {
        setTableData(result);
      });
    }
  }, [meteorProps, currentPage, locationMemo]);

  const handlePageChange = (pageNumber) => {
    const newPage = pageNumber;
    setCurrentPage(newPage);
  };

  return (
    <div className="detailContainer">
      {tableData ? (
        <div>
          <h1>Detail Data</h1>
          <div className="tableContainer">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>ID</th>
                  <th>Composition</th>
                  <th>Mass (grams)</th>
                  <th>Year</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                  <th>State, Country</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.id}</td>
                    <td>{item.recclass}</td>
                    <td>{item['mass (g)']}</td>
                    <td>{item.year}</td>
                    <td>{parseFloat(item.reclat).toFixed(3)}</td>
                    <td>{parseFloat(item.reclong).toFixed(3)}</td>
                    <td>{item.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
            <span>
              Page
              {' '}
              {currentPage}
            </span>
            <button disabled={endIndex >= meteorProps.length - 1} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
          </div>
        </div>
      ) : (<p>Content loading...</p>)}
    </div>
  );
}

export default DetailData;
