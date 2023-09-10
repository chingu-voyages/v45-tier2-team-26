import React, { useState, useEffect } from 'react';
import './header.css';
import Fuse from 'fuse.js';
import DoubleSlider from './DoubleSlider';
import json from '../../../Meteorite_Landings.json';

export default function Header({ searchResults, setSearchResults }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleHideMenu = () => {
    console.log('hide menu');
    setIsMenuOpen(!isMenuOpen);
  };

  const handleShowMenu = () => {
    console.log('show menu');
    setIsMenuOpen(!isMenuOpen);
  };

  let minValue = 1;
  let maxValue = 0;
  for (let i = 0; i < json.length; i++) {
    if (json[i]['mass (g)'] != null) {
      if (json[i]['mass (g)'] < minValue) {
        minValue = json[i]['mass (g)'];
      } else if (json[i]['mass (g)'] > maxValue) {
        maxValue = json[i]['mass (g)'];
      }
    }
  }
  // minValue=0;
  // maxValue=60000000;

  const [data, setData] = useState(json);
  const [results, setResults] = useState(json);
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [composition, setComposition] = useState('');
  const [minMass, setMinMass] = useState(minValue);
  const [maxMass, setMaxMass] = useState(maxValue);

  // Additional function that uses min and max values
  const handleMinMaxChange = (newMin, newMax) => {
    setMinMass(newMin);
    setMaxMass(newMax);
  };

  // Should pass searchResults as props to other components later...
  let filteredResults = json;

  /* IF USING PUBLIC API, USE THIS */
  // useEffect(() => {
  //   fetch('https://data.nasa.gov/resource/gh4g-9sfh.json')
  //     .then((response) => response.json())
  //     .then((jsonData) => setData(jsonData))
  //     .catch((error) => console.error('Error loading data:', error));
  // }, []);

  /* IF USING Meteorite_Landings.json, USE THIS */
  useEffect(() => {
    setData(json);
  }, []);

  // Possibly add debouncer later to improve performance
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSearch = () => {
    setName(name);
    setYear(year);
    setComposition(composition);
    setMinMass(minMass);
    setMaxMass(maxMass);

    /* Ideally: perform search for each category, and then return intersection of all 4 results */
    if (!(name || year || composition || minMass !== minValue || maxMass !== maxValue)) {
      filteredResults = json;
    } else {
      const fuse = new Fuse(data, {
        keys: ['name', 'year', 'composition'],
        includeMatches: true,
        threshold: 0.3,
      });
      const fuseResults = fuse.search(name + year + composition); // Lazy search method, will improve later

      // Not sure why, but this is needed so that Clear button function works properly
      setResults(fuseResults);

      filteredResults = fuseResults.map((fuseResult) => fuseResult.item);
    }

    setSearchResults(filteredResults);

    console.log(
      `Query entered: name = ${name}, year = ${year}, composition = ${composition}, min=${minMass}, max=${maxMass}\nData found:\n ${JSON.stringify(
        filteredResults,
      )}\nDone!`,
    );
  };

  const handleClear = () => {
    // Clears all search fields
    // Current small bug: need to click Clear twice to have variables == ''
    setName('');
    setYear('');
    setComposition('');
    setMinMass(minValue);
    setMaxMass(maxValue);
    setSearchResults(json);

    // Testing...
    console.log(
      `Clear clicked! name = ${name}, year = ${year}, composition = ${composition}, min=${minMass}, max=${maxMass}\nData found:\n ${JSON.stringify(
        filteredResults,
      )}\nDone!`,
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

                <DoubleSlider min={minMass} max={maxMass} setMin={setMinMass} setMax={setMaxMass} />
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

                <DoubleSlider min={minMass} max={maxMass} setMin={setMinMass} setMax={setMaxMass} />
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
