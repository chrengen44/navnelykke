
// Sample data for trending names
interface TrendingNameData {
  name: string;
  startValue: number;
  endValue: number;
  changePercent: number;
}

export const risingGirlNames: TrendingNameData[] = [
  { name: 'Olivia', startValue: 23, endValue: 52, changePercent: 126 },
  { name: 'Luna', startValue: 8, endValue: 36, changePercent: 350 },
  { name: 'Frida', startValue: 18, endValue: 41, changePercent: 128 },
  { name: 'Leah', startValue: 12, endValue: 34, changePercent: 183 },
  { name: 'Aurora', startValue: 17, endValue: 38, changePercent: 124 }
];

export const fallingGirlNames: TrendingNameData[] = [
  { name: 'Julie', startValue: 48, endValue: 21, changePercent: -56 },
  { name: 'Ida', startValue: 42, endValue: 19, changePercent: -55 },
  { name: 'Maria', startValue: 39, endValue: 18, changePercent: -54 },
  { name: 'Sara', startValue: 35, endValue: 18, changePercent: -49 },
  { name: 'Eva', startValue: 26, endValue: 14, changePercent: -46 }
];

export const risingBoyNames: TrendingNameData[] = [
  { name: 'Theo', startValue: 19, endValue: 48, changePercent: 153 },
  { name: 'Liam', startValue: 10, endValue: 39, changePercent: 290 },
  { name: 'Filip', startValue: 16, endValue: 37, changePercent: 131 },
  { name: 'Aksel', startValue: 14, endValue: 35, changePercent: 150 },
  { name: 'Lucas', startValue: 15, endValue: 32, changePercent: 113 }
];

export const fallingBoyNames: TrendingNameData[] = [
  { name: 'Jonas', startValue: 45, endValue: 19, changePercent: -58 },
  { name: 'Mathias', startValue: 40, endValue: 18, changePercent: -55 },
  { name: 'Andreas', startValue: 38, endValue: 17, changePercent: -55 },
  { name: 'Tobias', startValue: 32, endValue: 16, changePercent: -50 },
  { name: 'Sebastian', startValue: 28, endValue: 15, changePercent: -46 }
];

export const nameColors = {
  girl: {
    Emma: "#FF6384",
    Nora: "#36A2EB",
    Sophie: "#FFCE56", 
    Ella: "#4BC0C0",
    Maja: "#9966FF"
  },
  boy: {
    William: "#FF6384",
    Noah: "#36A2EB",
    Oliver: "#FFCE56", 
    Elias: "#4BC0C0",
    Aksel: "#9966FF"
  }
};

