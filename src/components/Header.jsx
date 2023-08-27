import { useState } from 'react';
import './header.css';

export default function Header() {
  const [sliderValue, setSliderValue] = useState(50);
  const handleSliderChange = (e) => {
    setSliderValue(e.target.value);
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
            <input type="text" placeholder="e.g. Acapulco" />
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
        <button type="button" className="searchBtn">
          Search
        </button>
        <button type="button" className="clearBtn">
          Clear
        </button>
      </section>
    </header>
  );
}
