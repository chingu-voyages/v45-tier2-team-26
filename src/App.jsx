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

  const handlePageChange = () => {
    setCurrentPage(1);
  };

  return (
    <div className="App">
      <Header
        searchResults={searchResults}
        setSearchResults={setSearchResults}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
      <DetailData searchResults={searchResults} />
      {/* <SummaryMetric searchResults={searchResults} /> */}
    </div>
  );
}

export default App;
