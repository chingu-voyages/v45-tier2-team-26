import './header.css';

export default function Header() {
  return (
    <header>
      <section className="logo">
        <h1>FireBall</h1>
      </section>

      <section className="inputFields">

        <section className="columnGroup">
          <div className="nameGroup">
            <label htmlFor="">Name:</label>
            <input type="text" />
          </div>
          <div className="yearGroup">
            <label htmlFor="">Year:</label>
            <input type="text" />
          </div>
        </section>

        <section className="columnGroup">
          <div className="nameGroup">
            <label htmlFor="">Composition:</label>
            <input type="text" />
          </div>
          <div className="yearGroup">
            <label htmlFor="">Mass Range:</label>
            <input type="range" />
          </div>

        </section>
      </section>

      <section className="searchBarBtns">
        <button type="button" className="searchBtn">Search</button>
        <button type="button" className="clearBtn">Clear</button>
      </section>
    </header>
  );
}
