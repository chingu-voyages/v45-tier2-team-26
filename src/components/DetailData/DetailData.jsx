import './DetailData.css';
import React, { useState, useEffect } from 'react';
import { ColorRing } from 'react-loader-spinner';
import getLocation from './getLocation';
import getMeteorData from '../../services/publicAPI';
import getDetailData from './getDetailData';

function DetailData() {
  // This state is for testing purposes only. It will be replaced by props later.
  const itemsPerPage = 10; // You can adjust this as needed
  const [meteorData, setMeteorData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [endIndex, setEndIndex] = useState(null);
  const [detailData, setDetailData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState('#ffffff');

  // Note - this might change - meteorData might be brought in via props
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await getMeteorData();
      setMeteorData(data.slice(140, 155));
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (meteorData) {
      const [startIndex, currentEndIndex] = getIndices(currentPage);

      const meteorDataSubset = meteorData.slice(startIndex, currentEndIndex);

      async function fetchDisplayData() {
        const locations = await getLocation(meteorDataSubset);
        setDetailData(getDetailData(meteorDataSubset, locations));
      }
      fetchDisplayData();
    }
  }, [meteorData, currentPage]);

  // useEffect(() => {
  //   if (locationsData) {
  //     console.log('location data updated');
  //     setDetailData(getDetailData(meteorData, locationsData));
  //   }
  // }, [locationsData]);

  const handlePageChange = (pageNumber) => {
    const newPage = pageNumber;
    setCurrentPage(newPage);
    const [startIndex, newEndIndex] = getIndices(newPage);
    setEndIndex(newEndIndex);
  };

  function getIndices(page) {
    const startIndex = (page - 1) * itemsPerPage;

    const newEndIndex = startIndex + itemsPerPage > meteorData.length - 1
      ? meteorData.length - 1
      : startIndex + itemsPerPage;

    return [startIndex, newEndIndex];
  }

  return (
    <div className="sweet">
      -loading
      {' '}
      <ColorRing
        visible
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />

      <div className="detailContainer">
        {detailData ? (
          <div>
            <h1>Detail Data</h1>
            <div className="tableContainer">
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
                    <th>City, State, Country</th>
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
                      <td>{parseFloat(item.reclat).toFixed(3)}</td>
                      <td>{parseFloat(item.reclong).toFixed(3)}</td>
                      <td>{item.geolocation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>
              <span>
                Page
                {currentPage}
              </span>
              <button
                disabled={endIndex >= meteorData.length - 1}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <p>Content loading...</p>
        )}
      </div>
    </div>
  );
}

export default DetailData;
