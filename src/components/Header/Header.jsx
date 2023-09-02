import { useState } from 'react';
import './header.css';
import Fuse from 'fuse.js';
import getMeteoriteData from '../../services/publicAPI';

async function loadData() {
  const response = await fetch('https://data.nasa.gov/resource/gh4g-9sfh.json');
  const names = await response.json();

  return names;
  // console.log(names);
  // logs [{ name: 'Joker'}, { name: 'Batman' }]
}

export default function Header() {
  const [sliderValue, setSliderValue] = useState(50);
  const handleSliderChange = (e) => {
    setSliderValue(e.target.value);
  };

  const [name, setName] = useState('');
  // Possibly add debouncer later to improve performance
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSearch = () => {
    // Takes query at Name box and searches through JSON file for matches
    setName(name);

    // const meteoriteData = getMeteoriteData;

    // const fuse = new Fuse(meteoriteData, {
    //   keys: ['name'],
    //   limit: 10,
    // });
    // const filteredData = fuse.search(name);
    const filteredData = loadData().then((data) => { console.log(data); });

    console.log(`Query entered: ${name}\nData found:\n ${filteredData}\nDone!`);
  };

  const handleClear = () => {
    // Clears all search fields
    // Current small bug: need to click Clear twice to have variable name=''
    setName('');
    console.log(`Clear clicked! name = ${name}`);
  };

  return (
    <header>
      <section className="logo">
        <h1>FireBall</h1>
      </section>

      <section className="inputFields">
        <section className="columnGroup">
          <div className="fieldGroup" id="name">
            <label htmlFor="">Name:</label>
            <input
              type="text"
              placeholder="e.g. Acapulco"
              onChange={handleNameChange}
              value={name}
            />
          </div>
          <div className="fieldGroup" id="year">
            <label htmlFor="">Year:</label>
            <input type="text" placeholder="e.g. 1914" />
          </div>
        </section>

        <section className="columnGroup">
          <div className="fieldGroup" id="composition">
            <label htmlFor="">Composition:</label>
            <input type="text" placeholder="e.g. L6" />
          </div>
          <div className="fieldGroup" id="range">
            <label htmlFor="">Mass Range:</label>

            <div className="sliderGroup">
              <input
                type="range"
                min="0"
                max="100"
                onChange={handleSliderChange}
                className="rangeSlider"
              />
              <p className="sliderValue">{`${sliderValue} Meters`}</p>
            </div>
          </div>
        </section>
      </section>

      <section className="headerBtns">
        <button type="button" className="searchBtn" onClick={handleSearch}>
          Search
        </button>
        <button type="button" className="clearBtn" onClick={handleClear}>
          Clear
        </button>
      </section>
    </header>
  );
}
