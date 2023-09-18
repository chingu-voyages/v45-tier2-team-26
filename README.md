# FireBall

## Overview

[NASA's Open Data Portal](https://data.nasa.gov/Space-Science/Meteorite-Landings/gh4g-9sfh) hosts a comprehensive data set from The Meteoritical Society, containing information on all known meteorite landings. The FireBall app allows the user to search and visualize these data.

LIVE LINK: https://meteorstrikes.surge.sh/

This app was created as part of [Chingu Voyage 45, Tier 2](https://github.com/chingu-voyages/voyage-project-tier2-fireball).

## Features

- The search bar is built with fuse.js. The user can search the data by any of the following:
    - Name
    - Year of strike
    - Meteorite composition
    - Mass range (low to high, inclusive)

- The search results are shown in two formats:
    1. A detailed data table.
        - The table shows information for 10 meteorites at a time and allows the user to advance back and forth through the data.
        - The detailed data table dynamically converts the logitude and latitude of the meteorite landing into a location name using the Radar API's reverse geocoding functionality.
    1. Summary metrics.
        - Includes the total number of strikes and the average mass of the strikes.
        - Shows a graphical display for the number of strikes by year and the number of strikes by meteorite composition. The graphs are built using the Chart.js library.

- The app is responsive. At smaller screen sizes:
    - The search bar is placed inside a drawer that can be accessed via a hamburger menu.
    - The detailed data table shifts to a vertical format.

## Setting up a local version

Clone the project

```bash
  git clone https://github.com/chingu-voyages/v45-tier2-team-26.git
```

Go to the project directory

```bash
  cd v45-tier2-team-26
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Dependencies

- [chart.js](https://www.npmjs.com/package/chart.js) v3.7.0
- [chartjs-plugin-datalabels](https://www.npmjs.com/package/chartjs-plugin-datalabels) v2.2.0
- [fuse.js](https://www.npmjs.com/package/fuse.js) v6.6.2
- [react](https://www.npmjs.com/package/react) v18.2.0
- [react-chartjs-2](https://www.npmjs.com/package/react-chartjs-2) v5.2.0
- [react-dom](https://www.npmjs.com/package/react-dom) v18.2.0
- [spinners-react](https://www.npmjs.com/package/spinners-react) v1.0.7

## Dev Dependencies

- [@types/react](https://www.npmjs.com/package/@types/react) v18.2.20
- [@types/react-dom](https://www.npmjs.com/package/@types/react-dom) v18.2.7
- [@vitejs/plugin-react](https://www.npmjs.com/package/@vitejs/plugin-react) v4.0.4
- [eslint](https://www.npmjs.com/package/eslint) v8.47.0
- [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb) v19.0.4
- [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import) v2.28.0
- [eslint-plugin-jsx-a11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y) v6.7.1
- [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react) v7.33.1
- [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) v4.6.0
- [vite](https://www.npmjs.com/package/vite) v4.4.9
- [vite-plugin-eslint2](https://www.npmjs.com/package/vite-plugin-eslint2) v4.0.0
- [vitest](https://www.npmjs.com/package/vitest) v0.34.4
- [@divriots/jampack](https://www.npmjs.com/package/@divriots/jampack) v0.20.2

## Acknowledgements
- The meteorite landings dataset we used is provided by [NASA's Open Data Portal](https://data.nasa.gov/Space-Science/Meteorite-Landings/gh4g-9sfh).
- Special thanks to [Chingu](https://www.chingu.io/) for their support and resources throughout the development of this project.

## Licence
[MIT](https://choosealicense.com/licenses/mit/)
