
export interface NameTrendData {
  year: string;
  [name: string]: string | number;
}

const girlFallbackData: NameTrendData[] = [
  { year: '2013', Emma: 62, Nora: 58, Sofia: 52, Olivia: 49, Ella: 47 },
  { year: '2014', Emma: 60, Nora: 59, Sofia: 51, Olivia: 52, Ella: 46 },
  { year: '2015', Emma: 59, Nora: 63, Sofia: 48, Olivia: 53, Ella: 43 },
  { year: '2016', Emma: 58, Nora: 65, Sofia: 45, Olivia: 54, Ella: 41 },
  { year: '2017', Emma: 56, Nora: 64, Sofia: 42, Olivia: 56, Ella: 40 },
  { year: '2018', Emma: 58, Nora: 62, Sofia: 40, Olivia: 59, Ella: 38 },
  { year: '2019', Emma: 61, Nora: 59, Sofia: 38, Olivia: 61, Ella: 37 },
  { year: '2020', Emma: 63, Nora: 56, Sofia: 37, Olivia: 62, Ella: 36 },
  { year: '2021', Emma: 64, Nora: 54, Sofia: 36, Olivia: 64, Ella: 35 },
  { year: '2022', Emma: 65, Nora: 52, Sofia: 35, Olivia: 63, Ella: 34 },
  { year: '2023', Emma: 64, Nora: 51, Sofia: 33, Olivia: 62, Ella: 33 },
  { year: '2024', Emma: 63, Nora: 50, Sofia: 32, Olivia: 61, Ella: 32 }
];

const boyFallbackData: NameTrendData[] = [
  { year: '2013', William: 58, Noah: 52, Oliver: 49, Elias: 46, Aksel: 45 },
  { year: '2014', William: 60, Noah: 54, Oliver: 51, Elias: 48, Aksel: 46 },
  { year: '2015', William: 59, Noah: 56, Oliver: 53, Elias: 50, Aksel: 44 },
  { year: '2016', William: 56, Noah: 58, Oliver: 55, Elias: 52, Aksel: 43 },
  { year: '2017', William: 54, Noah: 60, Oliver: 57, Elias: 53, Aksel: 42 },
  { year: '2018', William: 52, Noah: 62, Oliver: 59, Elias: 54, Aksel: 41 },
  { year: '2019', William: 50, Noah: 64, Oliver: 61, Elias: 55, Aksel: 40 },
  { year: '2020', William: 48, Noah: 65, Oliver: 63, Elias: 56, Aksel: 39 },
  { year: '2021', William: 46, Noah: 64, Oliver: 65, Elias: 57, Aksel: 38 },
  { year: '2022', William: 45, Noah: 63, Oliver: 66, Elias: 58, Aksel: 37 },
  { year: '2023', William: 44, Noah: 62, Oliver: 67, Elias: 59, Aksel: 36 },
  { year: '2024', William: 43, Noah: 61, Oliver: 68, Elias: 60, Aksel: 35 }
];

export const getFallbackData = (gender: 'girl' | 'boy', names: string[]): NameTrendData[] => {
  const baseData = gender === 'girl' ? girlFallbackData : boyFallbackData;
  
  return baseData.map(yearData => {
    const extendedData = { ...yearData };
    names.forEach(name => {
      if (!(name in extendedData)) {
        extendedData[name] = Math.floor(Math.random() * 30) + 5; // Random value between 5-35
      }
    });
    return extendedData;
  });
};
