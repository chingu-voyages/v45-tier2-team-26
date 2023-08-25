import './header.css';

export default function Header() {
  const placeholder = 25;

  return (
    <header>
      <section className="logo">
        <h1>FireBall</h1>
      </section>

      <section className="inputFields">

        <section className="columnGroup">
          <div className="fieldGroup" id="name">
            <label htmlFor="">Name:</label>
            <input type="text" />
          </div>
          <div className="fieldGroup" id="year">
            <label htmlFor="">Year:</label>
            <input type="text" />
          </div>
        </section>

        <section className="columnGroup">
          <div className="fieldGroup" id="composition">
            <label htmlFor="">Composition:</label>
            <input type="text" />
          </div>
          <div className="fieldGroup" id="range">
            <label htmlFor="">Mass Range:</label>

            <div className="sliderGroup">
              <input type="range" min="0" max="100" className="rangeSlider" />
              <p className="sliderValue">{`${placeholder} Meters`}</p>
            </div>

          </div>

        </section>
      </section>

      <section className="headerBtns">
        <button type="button" className="searchBtn">Search</button>
        <button type="button" className="clearBtn">Clear</button>
      </section>
    </header>
  );
}
