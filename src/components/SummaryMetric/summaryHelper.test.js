/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable object-property-newline */
import { expect, test, describe } from 'vitest';
import {
  getTotalStrikes,
  getAverageMass,
  getNumberOfStrikesByYear,
  getNumberOfStrikesByComposition,
  getGroupedNumberByComposition,
  getNumberByCompositionChartData,
} from './summaryHelper';

import compositionGroup from './compositionGroup';

describe('getTotalStrikes', () => {
  test('getTotalStrikes for result of length 1', () => {
    const searchResults = [{
      name: 'Aachen',
      id: '1',
      nametype: 'Valid',
      recclass: 'L5',
      'mass (g)': '21',
      fall: 'Fell',
      year: '1880-01-01T00:00:00.000',
      reclat: '50.775000',
      reclong: '6.083330',
      geolocation: { latitude: '50.775', longitude: '6.08333' },
    }];
    const result = getTotalStrikes(searchResults);
    expect(result).toBe(1);
  });

  test('getTotalStrikes for result of null', () => {
    const searchResults = null;
    const result = getTotalStrikes(searchResults);
    expect(result).toBe(null);
  });
});

describe('getAverageMass', () => {
  test('getAverageMass for result of length 1 with valid mass', () => {
    const searchResults = [{
      name: 'Aachen',
      id: '1',
      nametype: 'Valid',
      recclass: 'L5',
      'mass (g)': '21',
      fall: 'Fell',
      year: '1880',
      reclat: '50.775000',
      reclong: '6.083330',
      geolocation: { latitude: '50.775', longitude: '6.08333' },
    }];
    const result = getAverageMass(searchResults);
    expect(result).toBe(21);
  });

  test('getAverageMass for result of length 1 with invalid mass', () => {
    const searchResults = [{
      name: 'Aachen',
      id: '1',
      nametype: 'Valid',
      recclass: 'L5',
      fall: 'Fell',
      year: '1880',
      reclat: '50.775000',
      reclong: '6.083330',
      geolocation: { latitude: '50.775', longitude: '6.08333' },
    }];
    const result = getAverageMass(searchResults);
    expect(result).toBe(null);
  });

  test('getAverage for result of null', () => {
    const searchResults = null;
    const result = getAverageMass(searchResults);
    expect(result).toBe(null);
  });

  test('getAverageMass for result of length 0', () => {
    const searchResults = [];
    const result = getAverageMass(searchResults);
    expect(result).toBe(null);
  });

  test('getAverageMass for result with empty mass', () => {
    const searchResults = [{
      name: 'Aachen',
      id: '1',
      nametype: 'Valid',
      recclass: 'L5',
      'mass (g)': '',
      fall: 'Fell',
      year: '1880',
      reclat: '50.775000',
      reclong: '6.083330',
      geolocation: { latitude: '50.775', longitude: '6.08333' },
    },
    {
      name: 'Abee',
      id: '6',
      nametype: 'Valid',
      recclass: 'EH4',
      'mass (g)': '107000',
      fall: 'Fell',
      year: '1952',
      reclat: '54.216670',
      reclong: '-113.000000',
      geolocation: { latitude: '54.21667', longitude: '-113.0' },
    }];
    const result = getAverageMass(searchResults);
    expect(result).toBe(107000);
  });

  test('getAverageMass for result with undefined mass', () => {
    const searchResult = [{
      name: 'Aachen',
      id: '1',
      nametype: 'Valid',
      recclass: 'L5',
      fall: 'Fell',
      year: '1880',
      reclat: '50.775000',
      reclong: '6.083330',
      geolocation: { latitude: '50.775', longitude: '6.08333' },
    },
    {
      name: 'Abee',
      id: '6',
      nametype: 'Valid',
      recclass: 'EH4',
      'mass (g)': '107000',
      fall: 'Fell',
      year: '1952',
      reclat: '54.216670',
      reclong: '-113.000000',
      geolocation: { latitude: '54.21667', longitude: '-113.0' },
    }];
    const result = getAverageMass(searchResult);
    expect(result).toBe(107000);
  });

  test('getAverageMass for 5 results with 2 invalid mass', () => {
    const searchResults = [{
      name: 'Aachen',
      id: '1',
      nametype: 'Valid',
      recclass: 'L5',
      'mass (g)': '21',
      fall: 'Fell',
      year: '1880',
      reclat: '50.775000',
      reclong: '6.083330',
      geolocation: { latitude: '50.775', longitude: '6.08333' },
    },
    {
      name: 'Abee',
      id: '6',
      nametype: 'Valid',
      recclass: 'EH4',
      'mass (g)': '107000',
      fall: 'Fell',
      year: '1952',
      reclat: '54.216670',
      reclong: '-113.000000',
      geolocation: { latitude: '54.21667', longitude: '-113.0' },
    },
    {
      name: 'Agen',
      id: '10',
      nametype: 'Valid',
      recclass: 'H5',
      fall: 'Fell',
      year: '1814',
      reclat: '44.216670',
      reclong: '0.616670',
      geolocation: { latitude: '44.21667', longitude: '0.61667' },
    },
    {
      name: 'Aguada',
      id: '370',
      nametype: 'Valid',
      recclass: 'L6',
      'mass (g)': '1620',
      fall: 'Fell',
      year: '1930',
      reclat: '-31.600000',
      reclong: '-65.233330',
      geolocation: { latitude: '-31.6', longitude: '-65.23333' },
    },
    {
      name: 'Aguila Blanca',
      id: '379',
      nametype: 'Valid',
      recclass: 'L',
      'mass (g)': '',
      fall: 'Fell',
      year: '1920',
      reclat: '-30.866670',
      reclong: '-64.550000',
      geolocation: { latitude: '-30.86667', longitude: '-64.55' },
    }];
    const result = getAverageMass(searchResults).toFixed(2);
    expect(result).toBe('36213.67');
  });
});

describe('getNumberOfStrikesByYear', () => {
  const validSearchResults = [{
    name: 'Agen',
    id: '10',
    nametype: 'Valid',
    recclass: 'H5',
    fall: 'Fell',
    year: '1814',
    reclat: '44.216670',
    reclong: '0.616670',
    geolocation: { latitude: '44.21667', longitude: '0.61667' },
  },
  {
    name: 'Aguada',
    id: '370',
    nametype: 'Valid',
    recclass: 'L6',
    'mass (g)': '1620',
    fall: 'Fell',
    year: '1930',
    reclat: '-31.600000',
    reclong: '-65.233330',
    geolocation: { latitude: '-31.6', longitude: '-65.23333' },
  },
  {
    name: 'Aguila Blanca',
    id: '379',
    nametype: 'Valid',
    recclass: 'L',
    'mass (g)': '',
    fall: 'Fell',
    year: '1920',
    reclat: '-30.866670',
    reclong: '-64.550000',
    geolocation: { latitude: '-30.86667', longitude: '-64.55' },
  }];
  test('getNumberOfStrikesByYear for result of length 0', () => {
    const searchResults = [];
    const result = getNumberOfStrikesByYear(searchResults, 50);
    expect(result).toBe(null);
  });

  test('getNumberOfSrikesByYear for result of null', () => {
    const searchResults = null;
    const result = getNumberOfStrikesByYear(searchResults, 50);
    expect(result).toBe(null);
  });

  test('getNumberOfStrikesByYear for result of length 3 with step 50', () => {
    const result = getNumberOfStrikesByYear(validSearchResults, 50);
    expect(result).toEqual({ '1800-1849': 1, '1850-1899': 0, '1900-1949': 2 });
  });

  test('getNumberOfStrikesByYear for result of length 3 with step 100', () => {
    const result = getNumberOfStrikesByYear(validSearchResults, 100);
    expect(result).toEqual({ '1800-1899': 1, '1900-1999': 2 });
  });

  test('getNumberOfStrikesByYear for result of length 3 with step 10', () => {
    const result = getNumberOfStrikesByYear(validSearchResults, 10);
    expect(result).toEqual({
      '1810-1819': 1, '1820-1829': 0, '1830-1839': 0, '1840-1849': 0,
      '1850-1859': 0, '1860-1869': 0, '1870-1879': 0, '1880-1889': 0, '1890-1899': 0,
      '1900-1909': 0, '1910-1919': 0, '1920-1929': 1, '1930-1939': 1,
    });
  });

  test('getNumberOfStrikesByYear for result of length 3 with step 20', () => {
    const result = getNumberOfStrikesByYear(validSearchResults, 20);
    expect(result).toEqual({
      '1800-1819': 1, '1820-1839': 0, '1840-1859': 0, '1860-1879': 0, '1880-1899': 0,
      '1900-1919': 0, '1920-1939': 2,
    });
  });

  test('getNumberOfStrikesByYear for result of length 3 with invalid data and step 50', () => {
    const invalidSearchResults = [{
      name: 'Akaba',
      id: '427',
      nametype: 'Valid',
      recclass: 'L6',
      'mass (g)': '779',
      fall: 'Fell',
      reclat: '29.516670',
      reclong: '35.050000',
      geolocation: { latitude: '29.51667', longitude: '35.05' },
    },
    {
      name: 'Akwanga',
      id: '432',
      nametype: 'Valid',
      recclass: 'H',
      'mass (g)': '3000',
      fall: 'Fell',
      year: '',
      reclat: '8.916670',
      reclong: '8.433330',
      geolocation: { latitude: '8.91667', longitude: '8.43333' },
    }];

    const result = getNumberOfStrikesByYear([...invalidSearchResults, ...validSearchResults], 50);
    expect(result).toEqual({ '1800-1849': 1, '1850-1899': 0, '1900-1949': 2 });
  });
});

describe('getNumberOfStrikesByComposition', () => {
  const validSearchResults = [{
    name: 'Agen',
    id: '10',
    nametype: 'Valid',
    recclass: 'H5',
    fall: 'Fell',
    year: '1814',
    reclat: '44.216670',
    reclong: '0.616670',
    geolocation: { latitude: '44.21667', longitude: '0.61667' },
  },
  {
    name: 'Aguada',
    id: '370',
    nametype: 'Valid',
    recclass: 'L6',
    'mass (g)': '1620',
    fall: 'Fell',
    year: '1930',
    reclat: '-31.600000',
    reclong: '-65.233330',
    geolocation: { latitude: '-31.6', longitude: '-65.23333' },
  },
  {
    name: 'Aguila Blanca',
    id: '379',
    nametype: 'Valid',
    recclass: 'L',
    'mass (g)': '',
    fall: 'Fell',
    year: '1920',
    reclat: '-30.866670',
    reclong: '-64.550000',
    geolocation: { latitude: '-30.86667', longitude: '-64.55' },
  }];

  test('getNumberOfStrikesByComposition for result of length 0', () => {
    const searchResults = [];
    const result = getNumberOfStrikesByComposition(searchResults);
    expect(result).toBe(null);
  });

  test('getNumberOfStrikesByComposition for result of null', () => {
    const searchResults = null;
    const result = getNumberOfStrikesByComposition(searchResults);
    expect(result).toBe(null);
  });

  test('getNumberOfStrikesByComposition for result of length 3', () => {
    const result = getNumberOfStrikesByComposition(validSearchResults);
    expect(result).toEqual({ H5: 1, L: 1, L6: 1 });
  });

  test('getNumberOfStrikesByComposition for result of length 4 with invalid data', () => {
    const invalidSearchResults = [{
      name: 'Akaba',
      id: '427',
      nametype: 'Valid',
      'mass (g)': '779',
      fall: 'Fell',
      reclat: '29.516670',
      reclong: '35.050000',
      geolocation: { latitude: '29.51667', longitude: '35.05' },
    },
    {
      name: 'Akwanga',
      id: '432',
      nametype: 'Valid',
      recclass: '',
      'mass (g)': '3000',
      fall: 'Fell',
      year: '1959',
      reclat: '8.916670',
      reclong: '8.433330',
      geolocation: { latitude: '8.91667', longitude: '8.43333' },
    }];

    const result = getNumberOfStrikesByComposition(
      [...invalidSearchResults, ...validSearchResults],
    );
    expect(result).toEqual({ H5: 1, L: 1, L6: 1 });
  });
});

describe('getGroupedNumberByComposition', () => {
  test('getGroupedNumberByComposition for result of null', () => {
    const numberOfStrikesByComposition = null;
    const result = getGroupedNumberByComposition(compositionGroup, numberOfStrikesByComposition);
    expect(result).toBe(null);
  });

  test('getGroupedNumberByComposition for valid result', () => {
    const numberOfStrikesByComposition = {
      H5: 1, L: 1, L6: 1, Angrite: 2,
    };
    const result = getGroupedNumberByComposition(compositionGroup, numberOfStrikesByComposition);
    expect(result).toEqual({
      'Ordinary chondrites OC': { H5: 1, L: 1, L6: 1 },
      'Primitive achondrites PA': { Angrite: 2 },
    });
  });
});

describe('getNumberByCompositionChartData', () => {
  const validStrikes = {
    'Carbonaceous chondrites CC': { C2: 1, C3: 1 },
    'Ordinary chondrites OC': { H5: 1, L: 1, L6: 1 },
    'Enstatite chondrites EC': { E3: 1, E6: 1 },
    'Primitive achondrites PA': { Angrite: 2 },
    'Kakangari chondrites KC': { K3: 1, K6: 1 },
    'Achondrites AC': { A3: 1, A6: 1 },
    'Iron IR': { 'IAB-MG': 1, 'IAB-sLL': 1 },
    'Stony-iron SI': { Pallasite: 3 },
    'Unknown UN': { Unknown: 1 },
  };

  test('getNumberByCompositionChartData for result of null', () => {
    const groupedStrikes = null;
    const numberByCompositionType = 'overall';
    const result = getNumberByCompositionChartData(groupedStrikes, numberByCompositionType);
    expect(result).toBe(null);
  });

  test('getNumberByCompositionChartData for overall type', () => {
    const numberByCompositionType = 'overall';
    const result = getNumberByCompositionChartData(validStrikes, numberByCompositionType);
    expect(result).toEqual({
      'Carbonaceous chondrites CC': 2,
      'Ordinary chondrites OC': 3,
      'Enstatite chondrites EC': 2,
      'Primitive achondrites PA': 2,
      'Kakangari chondrites KC': 2,
      'Achondrites AC': 2,
      'Iron IR': 2,
      'Stony-iron SI': 3,
      'Unknown UN': 1,
    });
  });

  test('getNumberByCompositionChartData for ordinary chondrites type', () => {
    const numberByCompositionType = 'Ordinary chondrites OC';
    const result = getNumberByCompositionChartData(validStrikes, numberByCompositionType);
    expect(result).toEqual({ H5: 1, L: 1, L6: 1 });
  });

  test('getNumberByCompositionChartData for primitive achondrites type', () => {
    const numberByCompositionType = 'Primitive achondrites PA';
    const result = getNumberByCompositionChartData(validStrikes, numberByCompositionType);
    expect(result).toEqual({ Angrite: 2 });
  });

  test('getNumberByCompositionChartData for Enstatite chodrites EC type', () => {
    const numberByCompositionType = 'Enstatite chondrites EC';
    const result = getNumberByCompositionChartData(validStrikes, numberByCompositionType);
    expect(result).toEqual({ E3: 1, E6: 1 });
  });

  test('getNumberByCompositionChartData for Carbonaceous chondrites CC type', () => {
    const numberByCompositionType = 'Carbonaceous chondrites CC';
    const result = getNumberByCompositionChartData(validStrikes, numberByCompositionType);
    expect(result).toEqual({ C2: 1, C3: 1 });
  });

  test('getNumberByCompositionChartData for Iron IR type', () => {
    const numberByCompositionType = 'Iron IR';
    const result = getNumberByCompositionChartData(validStrikes, numberByCompositionType);
    expect(result).toEqual({ 'IAB-MG': 1, 'IAB-sLL': 1 });
  });

  test('getNumberByCompositionChartData for Stony-iron SI type', () => {
    const numberByCompositionType = 'Stony-iron SI';
    const result = getNumberByCompositionChartData(validStrikes, numberByCompositionType);
    expect(result).toEqual({ Pallasite: 3 });
  });

  test('getNumberByCompositionChartData for Kakangari chondrites KC type', () => {
    const numberByCompositionType = 'Kakangari chondrites KC';
    const result = getNumberByCompositionChartData(validStrikes, numberByCompositionType);
    expect(result).toEqual({ K3: 1, K6: 1 });
  });

  test('getNumberByCompositionChartData for Achondrites AC type', () => {
    const numberByCompositionType = 'Achondrites AC';
    const result = getNumberByCompositionChartData(validStrikes, numberByCompositionType);
    expect(result).toEqual({ A3: 1, A6: 1 });
  });

  test('getNumberByCompositionChartData for Unknown UN type', () => {
    const numberByCompositionType = 'Unknown UN';
    const result = getNumberByCompositionChartData(validStrikes, numberByCompositionType);
    expect(result).toEqual({ Unknown: 1 });
  });

  test('getNumberByCompositionChartData for type that is empty', () => {
    const groupedStrikes = {
      'Ordinary chondrites OC': { H5: 1, L: 1, L6: 1 },
    };
    const numberByCompositionType = 'Unknown';
    const result = getNumberByCompositionChartData(groupedStrikes, numberByCompositionType);
    expect(result).toEqual(null);
  });
});
