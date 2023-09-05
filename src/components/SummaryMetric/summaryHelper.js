export const getTotalStrikes = (meteoriteData) => {
  if (!meteoriteData) {
    return null;
  }
  return meteoriteData.length;
};

export const getAverageMass = (meteoriteData) => {
  if (!meteoriteData || meteoriteData?.length === 0) {
    return null;
  }

  if (meteoriteData.length === 1) {
    const average = Number(meteoriteData[0]['mass (g)']);
    if (Number.isNaN(average)) {
      return null;
    }
    return average;
  }

  // console.log(
  //   'meteorite data with invalid mass',
  //   meteoriteData.filter(
  //     (data) => !(data['mass (g)']
  //       && !Number.isNaN(Number(data['mass (g)']) && Number(data['mass (g)']) > 0)),
  //   ),
  // );

  const dataWithValidMass = meteoriteData.filter(
    (data) => data['mass (g)'] && !Number.isNaN(Number(data['mass (g)'])) && Number(data['mass (g)']) > 0,
  );
  const totalMass = dataWithValidMass.reduce(
    (acc, curr) => acc + Number(curr['mass (g)']),
    0,
  );
  return totalMass / dataWithValidMass.length;
};

// const parseYear = (year) => {
//   if (!year) {
//     return null;
//   }
//   const parsedYear = Number(year.slice(0, 4));
//   if (Number.isNaN(parsedYear)) {
//     return null;
//   }
//   return parsedYear;
// };

export const getNumberOfStrikesByYear = (meteoriteData, step) => {
  if (!meteoriteData || meteoriteData?.length === 0) {
    return null;
  }
  const dataWithValidYear = meteoriteData.filter(
    (data) => data.year && !Number.isNaN(data.year),
  );
    // console.log('meteorite data with invalid year', meteoriteData.filter(
    //   (data) => !(data.year && !Number.isNaN(data.year)),
    // ));

  dataWithValidYear.sort((a, b) => Number(a.year) - Number(b.year));

  const firstYear = Number(dataWithValidYear[0].year);
  const lastYear = Number(dataWithValidYear[dataWithValidYear.length - 1].year);
  const startingInterval = Math.floor(firstYear / step) * step;
  const endingInterval = Math.floor(lastYear / step) * step;
  const numberOfStrikesByYear = {};
  for (let i = startingInterval; i <= endingInterval; i += step) {
    const yearStart = i;
    const yearEnd = i + step - 1;
    const strikesInInterval = dataWithValidYear.filter((data) => {
      const year = Number(data.year);
      return year >= yearStart && year <= yearEnd;
    }).length;
    numberOfStrikesByYear[`${yearStart}-${yearEnd}`] = strikesInInterval;
  }

  // console.log('number of strikes by year', numberOfStrikesByYear);
  return numberOfStrikesByYear;
};

export const getNumberOfStrikesByComposition = (meteoriteData) => {
  if (!meteoriteData || meteoriteData?.length === 0) {
    return null;
  }

  const dataWithValidComposition = meteoriteData.filter(
    (data) => data.recclass,
  );
  const numberOfStrikesByComposition = {};
  dataWithValidComposition.forEach((data) => {
    if (numberOfStrikesByComposition[data.recclass]) {
      numberOfStrikesByComposition[data.recclass] += 1;
    } else {
      numberOfStrikesByComposition[data.recclass] = 1;
    }
  });

  return numberOfStrikesByComposition;
};

export const getGroupedNumberByComposition = (compositionGroup, numberOfStrikesByComposition) => {
  if (!numberOfStrikesByComposition) {
    return null;
  }

  const groupedComposition = {};
  Object.keys(numberOfStrikesByComposition).forEach((composition) => {
    Object.keys(compositionGroup).forEach((group) => {
      if (compositionGroup[group].includes(composition)) {
        if (groupedComposition[group]) {
          groupedComposition[group][composition] = numberOfStrikesByComposition[composition];
        } else {
          groupedComposition[group] = {};
          groupedComposition[group][composition] = numberOfStrikesByComposition[composition];
        }
      }
    });
  });
  // console.log('number of strikes by composition', numberOfStrikesByComposition);
  // console.log('grouped composition', groupedComposition);
  return groupedComposition;
};

export const getNumberOfStrikesData = (groupedStrikes, numberByCompositionType) => {
  if (!groupedStrikes) {
    return null;
  }

  // console.log('test', numberByCompositionType);

  switch (numberByCompositionType) {
    case 'overall':
      return Object.keys(groupedStrikes).reduce((acc, group) => {
        const subGroup = groupedStrikes[group];
        const subGroupTotal = Object.keys(subGroup).reduce((acc, curr) => {
          const value = subGroup[curr];
          return acc + value;
        }, 0);
        acc[group] = subGroupTotal;
        return acc;
      }, {});
    case 'Carbonaceous chondrites':
      return groupedStrikes['Carbonaceous chondrites'];
    case 'Enstatite chondrites':
      return groupedStrikes['Enstatite chondrites'];
    case 'Ordinary chondrites':
      return groupedStrikes['Ordinary chondrites'];
    case 'Kakangari chondrites':
      return groupedStrikes['Kakangari chondrites'];
    case 'Primitive achondrites':
      return groupedStrikes['Primitive achondrites'];
    case 'Achondrites':
      return groupedStrikes.Achondrites;
    case 'Stony-iron':
      return groupedStrikes['Stony-iron'];
    case 'Iron':
      return groupedStrikes.Iron;
    case 'Unknown':
      return groupedStrikes.Unknown;
    default:
      return null;
  }
};
