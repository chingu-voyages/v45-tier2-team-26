import { useEffect } from 'react';
import SummaryMetric from './components/SummaryMetric/SummaryMetric';
import Header from './components/Header/Header';
import json from '../Meteorite_Landings.json';

function App() {
  useEffect(() => {
    console.log('loaded data', JSON.stringify(json));
  });

  return (
    <div className="App">
      <Header />
      <SummaryMetric />
    </div>
  );
}

export default App;
