import { useState } from 'react';
import './header.css';

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
      <nav>
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
                <input type="text" placeholder="e.g. 1914" value={year} onChange={(e) => setYear(e.target.value)} />
              </div>

              <div className="fieldGroup mobileFieldGroup" id="composition">
                <label htmlFor="">Composition:</label>
                <input type="text" placeholder="e.g. L6" value={composition} onChange={(e) => setComposition(e.target.value)} />
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
        <section className="mainNav">
          <section className="logo">
            <button type="button" className="hamburgerMenu" onClick={handleShowMenu}>
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
