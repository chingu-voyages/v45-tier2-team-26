import './DetailData.css';
import { SpinnerDotted } from 'spinners-react';
import React, { useState, useEffect } from 'react';
import getLocation from './getLocation';

function DetailData({ searchResults, currentPage }) {
  const itemsPerPage = 10;
  // const [currentPage, setCurrentPage] = useState(1);
  const [endIndex, setEndIndex] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [locationMemo, setLocationMemo] = useState({});

  const meteorProps = searchResults;

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

        // If Geolocation is okay and there is no locationMemo,
        // fetch the location data!

        // format the lat/long as a string with no quotes
        const formattedGeoLocation = GeoLocation.replace(/[()]/g, '');

        try {
          // call the API, via the getLocation async function
          const locationData = await getLocation(formattedGeoLocation);

          // create a placeholder state in case no state data comes back
          let state = 'State unknown';

          // reset state if state data comes back
          if (locationData.addresses[0].state) {
            state = locationData.addresses[0].state;
          }

          // Update the locationMemo with the fetched data
          setLocationMemo((prevLocationMemo) => ({
            ...prevLocationMemo,
            [id]: `${state}, ${locationData.addresses[0].country}`,
          }));

          // return the fetched data
          return {
            ...meteor,
            location: `${state}, ${locationData.addresses[0].country}`,
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
  }, [meteorProps, currentPage]);

  const handlePageChange = (pageNumber) => {
    const newPage = pageNumber;
    setCurrentPage(newPage);
  };

  return (
    <div className="detailContainer">
      <h2>Detail Data</h2>
      {tableData ? (
        <div>
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
            <button
              className="pgBtn btn-previous"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              type="button"
            >
              Previous
            </button>
            <span>
              Page
              {currentPage}
            </span>
            <button
              className="pgBtn"
              disabled={endIndex >= meteorProps.length - 1}
              onClick={() => handlePageChange(currentPage + 1)}
              type="button"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="sweet">
          <SpinnerDotted
            size={150}
            thickness={100}
            speed={100}
            color="lightblue"
          />
        </div>
      )}
    </div>
  );
}

export default DetailData;
