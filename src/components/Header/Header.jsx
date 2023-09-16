import React, { useState, useEffect } from 'react';
import './header.css';
import Fuse from 'fuse.js';
import DoubleSlider from './DoubleSlider';
import json from '../../../Meteorite_Landings.json';

export default function Header({
  setSearchResults,
  resetPages,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleHideMenu = () => {
    console.log('hide menu');
    setIsMenuOpen(!isMenuOpen);
  };

  const handleShowMenu = () => {
    console.log('show menu');
    setIsMenuOpen(!isMenuOpen);
  };

  // const resetPages = (pageNumber) => {
  //   const newPage = pageNumber;
  //   setCurrentPage(newPage);
  // };

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
  const [resetSlider, setResetSlider] = useState(false);

  // Additional function that uses min and max values
  const handleMinMaxChange = (newMin, newMax) => {
    setMinMass(newMin);
    setMaxMass(newMax);
  };

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

  // Should pass searchResults as props to other components later...
  let filteredResults = data;

  function findIntersectionById(arr1, arr2, arr3, arr4) {
    // Create sets of unique IDs for each array
    const set1 = new Set(arr1.map((obj) => obj.id));
    const set2 = new Set(arr2.map((obj) => obj.id));
    const set3 = new Set(arr3.map((obj) => obj.id));
    const set4 = new Set(arr4.map((obj) => obj.id));

    // Find the intersection of IDs between all sets
    const intersection = Array.from(set1).filter(
      (id) => set2.has(id) && set3.has(id) && set4.has(id),
    );

    // Create an array of objects with matching IDs
    const result = arr1.filter((obj) => intersection.includes(obj.id));

    return result;
  }

  // Possibly add debouncer later to improve performance
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSearch = () => {
    resetPages();
    setName(name);
    setYear(year);
    setComposition(composition);
    setMinMass(minMass);
    setMaxMass(maxMass);
    // resetPages(currentPage);

    let nameSet = data;
    let yearSet = data;
    let compositionSet = data;
    let massRangeSet = data;

    if (
      !(
        name
        || year
        || composition
        || minMass !== minValue
        || maxMass !== maxValue
      )
    ) {
      filteredResults = data;
    } else {
      if (name) {
        const fuse = new Fuse(data, {
          keys: ['name'],
          includeMatches: true,
          threshold: 0.25,
        });
        const fuseResults = fuse.search(name);

        // Not sure why, but this is needed so that Clear button function works properly
        setResults(fuseResults);

        nameSet = fuseResults.map((fuseResult) => fuseResult.item);
      }

      if (year) {
        yearSet = data.filter((obj) => String(obj.year) === year);
      }

      // Composition search can still be improved, maybe make use of compositionGroup.js later?
      if (composition) {
        compositionSet = data.filter((obj) => obj.recclass.toUpperCase().includes(composition.toUpperCase()));
      }

      if (minMass !== minValue || maxMass !== maxValue) {
        massRangeSet = data.filter(
          (obj) => obj['mass (g)'] >= minMass && obj['mass (g)'] <= maxMass,
        );
      }

      filteredResults = findIntersectionById(
        nameSet,
        yearSet,
        compositionSet,
        massRangeSet,
      );
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
    setSearchResults(data);
    setResetSlider(true);
    resetPages();

    // Small delay needed to guarantee DoubleSlider has reset
    setTimeout(() => {
      setResetSlider(false);
    }, 0);

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

                <DoubleSlider
                  min={minValue}
                  max={maxValue}
                  setMin={setMinMass}
                  setMax={setMaxMass}
                  resetSlider={resetSlider}
                  onRangeChange={handleMinMaxChange}
                />
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

                <DoubleSlider
                  min={minValue}
                  max={maxValue}
                  setMin={setMinMass}
                  setMax={setMaxMass}
                  resetSlider={resetSlider}
                  onRangeChange={handleMinMaxChange}
                />
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
