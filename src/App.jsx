import { useState, useEffect } from 'react';
import SummaryMetric from './components/SummaryMetric/SummaryMetric';
import Header from './components/Header/Header';
import json from '../Meteorite_Landings.json';
import DetailData from './components/DetailData/DetailData';

function App() {
  // useEffect(() => {
  //   console.log('loaded data', JSON.stringify(json));
  // });

  const [searchResults, setSearchResults] = useState(json);
  const [currentPage, setCurrentPage] = useState(1);

  const resetPages = () => {
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    const newPage = pageNumber;
    setCurrentPage(newPage);
  };

  return (
    <div className="App">
      <Header
        setSearchResults={setSearchResults}
        resetPages={resetPages}
      />
      <DetailData
        searchResults={searchResults}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
      {/* <SummaryMetric searchResults={searchResults} /> */}
    </div>
  );
}

export default App;
