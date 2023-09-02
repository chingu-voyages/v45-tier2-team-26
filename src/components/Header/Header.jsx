import { useState } from 'react';
import './header.css';

export default function Header() {
  const [sliderValue, setSliderValue] = useState(50);
  const handleSliderChange = (e) => {
    setSliderValue(e.target.value);
  };

  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [composition, setComposition] = useState('');
  // Possibly add debouncer later to improve performance
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSearch = () => {
    // Takes query at Name box and searches through JSON file for matches
    setName(name);
    console.log(`Query entered: ${name}`);
  };

  const handleClear = () => {
    // Clears all search fields
    // Current small bug: need to click Clear twice to have variable name=''
    setName('');
    setYear('');
    setComposition('');
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
            <input type="text" placeholder="e.g. 1914" value={year} onChange={(e) => setYear(e.target.value)} />
          </div>
        </section>

        <section className="columnGroup">
          <div className="fieldGroup" id="composition">
            <label htmlFor="">Composition:</label>
            <input type="text" placeholder="e.g. L6" value={composition} onChange={(e) => setComposition(e.target.value)} />
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
