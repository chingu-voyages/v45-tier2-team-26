const getTotalStrikes = (meteoriteData) => {
  if (!meteoriteData) {
    return null;
  }
  return meteoriteData.length;
};

const getAverageMass = (meteoriteData) => {
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

  const dataWithValidMass = meteoriteData.filter(
    (data) => data['mass (g)'] && !Number.isNaN(Number(data['mass (g)'])) && Number(data['mass (g)']) > 0,
  );
  const totalMass = dataWithValidMass.reduce(
    (acc, curr) => acc + Number(curr['mass (g)']),
    0,
  );
  return totalMass / dataWithValidMass.length;
};

const getNumberOfStrikesByYear = (meteoriteData, step) => {
  if (!meteoriteData || meteoriteData?.length === 0) {
    return null;
  }
  const dataWithValidYear = meteoriteData.filter(
    (data) => data.year && !Number.isNaN(data.year),
  );

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

  return numberOfStrikesByYear;
};

const getNumberOfStrikesByComposition = (meteoriteData) => {
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

const getGroupedNumberByComposition = (compositionGroup, numberOfStrikesByComposition) => {
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
  return groupedComposition;
};

const getNumberByCompositionChartData = (groupedStrikes, numberByCompositionType) => {
  if (!groupedStrikes) {
    return null;
  }

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
    case 'Carbonaceous chondrites CC':
      return groupedStrikes['Carbonaceous chondrites CC'];
    case 'Enstatite chondrites EC':
      return groupedStrikes['Enstatite chondrites EC'];
    case 'Ordinary chondrites OC':
      return groupedStrikes['Ordinary chondrites OC'];
    case 'Kakangari chondrites KC':
      return groupedStrikes['Kakangari chondrites KC'];
    case 'Primitive achondrites PA':
      return groupedStrikes['Primitive achondrites PA'];
    case 'Achondrites AC':
      return groupedStrikes['Achondrites AC'];
    case 'Stony-iron SI':
      return groupedStrikes['Stony-iron SI'];
    case 'Iron IR':
      return groupedStrikes['Iron IR'];
    case 'Unknown UN':
      return groupedStrikes['Unknown UN'];
    default:
      return null;
  }
};

export {
  getAverageMass,
  getTotalStrikes,
  getNumberOfStrikesByYear,
  getNumberOfStrikesByComposition,
  getGroupedNumberByComposition,
  getNumberByCompositionChartData,
};
