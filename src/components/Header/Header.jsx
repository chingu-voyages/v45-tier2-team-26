import React, { useState, useEffect } from 'react';
import './header.css';
import Fuse from 'fuse.js';
import json from '../../../Meteorite_Landings.json';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleHideMenu = () => {
    console.log('hide menu');
    setIsMenuOpen(!isMenuOpen);
  };

  const handleShowMenu = () => {
    console.log('show menu');
    setIsMenuOpen(!isMenuOpen);
  };

  const [sliderValue, setSliderValue] = useState(50);
  const handleSliderChange = (e) => {
    setSliderValue(e.target.value);
  };

  const [data, setData] = useState();
  const [results, setResults] = useState();
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [composition, setComposition] = useState('');

  useEffect(() => {
    fetch('https://data.nasa.gov/resource/gh4g-9sfh.json')
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error('Error loading data:', error));
  }, []);

  // ***
  // const fuse = new Fuse(data, {
  //   keys: ['name'],
  //   includeMatches: true,
  //   threshold: 0.25,
  // });

  // Possibly add debouncer later to improve performance
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // useEffect(() => {
  //   if (name === '') {
  //     setName([]);
  //   } else {
  //     const results = fuse.search(name);
  //     setResults(results);
  //   }
  // }, [name, data]);

  const handleSearch = () => {
    // Takes query at Name/Year/Composition box and searches through JSON file for matches
    setName(name);
    setYear(year);
    setComposition(composition);

    const fuse = new Fuse(data, {
      keys: ['name'],
      includeMatches: true,
      threshold: 0.25,
    });
    const results = fuse.search(name);
    setResults(results);

    // For testing...
    console.log(
      `Query entered: name = ${name}, year = ${year}, composition = ${composition}\nData found:\n ${JSON.stringify(
        results,
        null,
        2,
      )}\nDone!`,
    );
  };

  const handleClear = () => {
    // Clears all search fields
    // Current small bug: need to click Clear twice to have variables == ''
    setName('');
    setYear('');
    setComposition('');
    setResults([]);
    console.log(
      `Clear clicked! name = ${name}, year = ${year}, composition = ${composition}`,
    );
  };

  return (
    <header>
      <nav>
        {/* mobile/tablet navigtion */}
        <section className={`mobileNav ${isMenuOpen ? 'open' : ''}`}>
          <section className="logo">
            <h1>FireBall</h1>
            <button type="button" id="closeNavBtn" onClick={handleHideMenu}>
              <div className="bar closeBtnBar" id="closeBtnBar1" />
              <div className="bar closeBtnBar" id="closeBtnBar2" />
            </button>
          </section>

          <section className="inputFields" id="mobileInputFields">
            <section className="columnGroup">
              <div className="fieldGroup mobileFieldGroup" id="name">
                <label htmlFor="">Name:</label>
                <input
                  type="text"
                  placeholder="e.g. Acapulco"
                  onChange={handleNameChange}
                  value={name}
                />
              </div>
              <div className="fieldGroup mobileFieldGroup" id="year">
                <label htmlFor="">Year:</label>
                <input
                  type="text"
                  placeholder="e.g. 1914"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>

              <div className="fieldGroup mobileFieldGroup" id="composition">
                <label htmlFor="">Composition:</label>
                <input
                  type="text"
                  placeholder="e.g. L6"
                  value={composition}
                  onChange={(e) => setComposition(e.target.value)}
                />
              </div>
              <div className="fieldGroup mobileFieldGroup" id="range">
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

          <section className="headerBtns" id="mobileHeaderBtns">
            <button type="button" className="searchBtn" onClick={handleSearch}>
              Search
            </button>
            <button type="button" className="clearBtn" onClick={handleClear}>
              Clear
            </button>
          </section>
        </section>
        {/* main site navigation */}
        <section className="mainNav">
          <section className="logo">
            <button
              type="button"
              className="hamburgerMenu"
              onClick={handleShowMenu}
            >
              <div className="bar" />
              <div className="bar" />
              <div className="bar" />
            </button>
            <h1>FireBall</h1>
          </section>

          <section className="inputFields" id="mainInputFields">
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
                <input
                  type="text"
                  placeholder="e.g. 1914"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>
            </section>

            <section className="columnGroup">
              <div className="fieldGroup" id="composition">
                <label htmlFor="">Composition:</label>
                <input
                  type="text"
                  placeholder="e.g. L6"
                  value={composition}
                  onChange={(e) => setComposition(e.target.value)}
                />
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

          <section className="headerBtns" id="mainHeaderBtns">
            <button type="button" className="searchBtn" onClick={handleSearch}>
              Search
            </button>
            <button type="button" className="clearBtn" onClick={handleClear}>
              Clear
            </button>
          </section>
        </section>
      </nav>
    </header>
  );
}
