# FireBall

## Overview

[NASA's Open Data Portal](https://data.nasa.gov/Space-Science/Meteorite-Landings/gh4g-9sfh) hosts a comprehensive data set from The Meteoritical Society, containing information on all known meteorite landings. The FireBall app allows the user to search and visualize these data.

LIVE LINK: 

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

From the repo:
1. Clone the project to your Github repositories and open it in your local development environment.
1. Install required dependencies. `npm install`
1. Run the project locally! `npm run dev`

## Main Dependencies

- [Chart.js](https://github.com/chartjs/Chart.js)
- [Fuse.js](https://github.com/krisk/Fuse)
- [ESLint](https://github.com/eslint/eslint)
- [Vite](https://github.com/vitejs/vite) 

