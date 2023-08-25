import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import DetailData from './DetailData';

function App() {
  const [count, setCount] = useState(0);

  return (
    <DetailData />
  );
}

export default App;
