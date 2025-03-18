
export interface BabyName {
  id: number;
  name: string;
  gender: 'boy' | 'girl' | 'unisex';
  origin: string;
  meaning: string;
  popularity: number; // 1-100 scale
  length: 'short' | 'medium' | 'long';
  categories: string[];
  firstLetter: string;
}

// Sample data - would be expanded in a real application
export const babyNames: BabyName[] = [
  {
    id: 1,
    name: "Emma",
    gender: "girl",
    origin: "Germansk",
    meaning: "Hel, universal",
    popularity: 95,
    length: "short",
    categories: ["klassisk", "populær", "internasjonal"],
    firstLetter: "E"
  },
  {
    id: 2,
    name: "Nora",
    gender: "girl",
    origin: "Latinsk",
    meaning: "Lys, ære",
    popularity: 92,
    length: "short",
    categories: ["klassisk", "populær", "nordisk"],
    firstLetter: "N"
  },
  {
    id: 3,
    name: "Ella",
    gender: "girl",
    origin: "Germansk/Hebraisk",
    meaning: "Lys, skinnende",
    popularity: 88,
    length: "short",
    categories: ["klassisk", "populær", "internasjonal"],
    firstLetter: "E"
  },
  {
    id: 4,
    name: "Maja",
    gender: "girl",
    origin: "Nordisk/Romersk",
    meaning: "Den store, mai-måned",
    popularity: 85,
    length: "short",
    categories: ["moderne", "populær", "naturnavn"],
    firstLetter: "M"
  },
  {
    id: 5,
    name: "Sofia",
    gender: "girl",
    origin: "Gresk",
    meaning: "Visdom",
    popularity: 83,
    length: "medium",
    categories: ["klassisk", "populær", "internasjonal"],
    firstLetter: "S"
  },
  {
    id: 6,
    name: "Olivia",
    gender: "girl",
    origin: "Latinsk",
    meaning: "Oliven, fred",
    popularity: 80,
    length: "medium",
    categories: ["moderne", "internasjonal", "naturnavn"],
    firstLetter: "O"
  },
  {
    id: 7,
    name: "Ingrid",
    gender: "girl",
    origin: "Norrønt",
    meaning: "Ing er vakker",
    popularity: 75,
    length: "medium",
    categories: ["klassisk", "nordisk", "vikingnavn"],
    firstLetter: "I"
  },
  {
    id: 8,
    name: "Frida",
    gender: "girl",
    origin: "Germansk",
    meaning: "Fred, beskyttelse",
    popularity: 73,
    length: "short",
    categories: ["klassisk", "nordisk"],
    firstLetter: "F"
  },
  {
    id: 9,
    name: "Sofie",
    gender: "girl",
    origin: "Gresk",
    meaning: "Visdom",
    popularity: 70,
    length: "medium",
    categories: ["klassisk", "internasjonal"],
    firstLetter: "S"
  },
  {
    id: 10,
    name: "Tiril",
    gender: "girl",
    origin: "Norrønt",
    meaning: "Pil, kamp",
    popularity: 68,
    length: "short",
    categories: ["unik", "nordisk", "vikingnavn"],
    firstLetter: "T"
  },
  {
    id: 11,
    name: "William",
    gender: "boy",
    origin: "Germansk",
    meaning: "Besluttsom beskytter",
    popularity: 95,
    length: "medium",
    categories: ["klassisk", "populær", "internasjonal"],
    firstLetter: "W"
  },
  {
    id: 12,
    name: "Oliver",
    gender: "boy",
    origin: "Latinsk",
    meaning: "Oliventre, fred",
    popularity: 93,
    length: "medium",
    categories: ["moderne", "populær", "internasjonal"],
    firstLetter: "O"
  },
  {
    id: 13,
    name: "Noah",
    gender: "boy",
    origin: "Hebraisk",
    meaning: "Hvile, trøst",
    popularity: 90,
    length: "short",
    categories: ["klassisk", "populær", "bibelsk"],
    firstLetter: "N"
  },
  {
    id: 14,
    name: "Emil",
    gender: "boy",
    origin: "Latinsk",
    meaning: "Rivalisere, konkurrere",
    popularity: 87,
    length: "short",
    categories: ["klassisk", "populær", "nordisk"],
    firstLetter: "E"
  },
  {
    id: 15,
    name: "Liam",
    gender: "boy",
    origin: "Irsk",
    meaning: "Sterk beskytter",
    popularity: 85,
    length: "short",
    categories: ["moderne", "populær", "internasjonal"],
    firstLetter: "L"
  },
  {
    id: 16,
    name: "Isak",
    gender: "boy",
    origin: "Hebraisk",
    meaning: "Han vil le",
    popularity: 80,
    length: "short",
    categories: ["klassisk", "bibelsk"],
    firstLetter: "I"
  },
  {
    id: 17,
    name: "Jakob",
    gender: "boy",
    origin: "Hebraisk",
    meaning: "Følger etter, etterfølger",
    popularity: 77,
    length: "medium",
    categories: ["klassisk", "bibelsk"],
    firstLetter: "J"
  },
  {
    id: 18,
    name: "Odin",
    gender: "boy",
    origin: "Norrønt",
    meaning: "Raseri, inspirasjon",
    popularity: 75,
    length: "short",
    categories: ["nordisk", "vikingnavn", "unik"],
    firstLetter: "O"
  },
  {
    id: 19,
    name: "Aksel",
    gender: "boy",
    origin: "Hebraisk/Gresk",
    meaning: "Fredens far",
    popularity: 72,
    length: "medium",
    categories: ["moderne", "nordisk"],
    firstLetter: "A"
  },
  {
    id: 20,
    name: "Magnus",
    gender: "boy",
    origin: "Latinsk",
    meaning: "Stor, mektig",
    popularity: 70,
    length: "medium",
    categories: ["klassisk", "nordisk", "vikingnavn"],
    firstLetter: "M"
  },
  {
    id: 21,
    name: "Ask",
    gender: "boy",
    origin: "Norrønt",
    meaning: "Asketre, den første mannen",
    popularity: 45,
    length: "short",
    categories: ["unik", "nordisk", "vikingnavn", "naturnavn"],
    firstLetter: "A"
  },
  {
    id: 22,
    name: "Embla",
    gender: "girl",
    origin: "Norrønt",
    meaning: "Almetre, den første kvinnen",
    popularity: 38,
    length: "medium",
    categories: ["unik", "nordisk", "vikingnavn", "naturnavn"],
    firstLetter: "E"
  },
  {
    id: 23,
    name: "Aurora",
    gender: "girl",
    origin: "Latinsk",
    meaning: "Daggry, nordlys",
    popularity: 65,
    length: "medium",
    categories: ["moderne", "naturnavn", "internasjonal"],
    firstLetter: "A"
  },
  {
    id: 24,
    name: "Storm",
    gender: "unisex",
    origin: "Nordisk",
    meaning: "Storm, naturkraft",
    popularity: 35,
    length: "short",
    categories: ["unik", "naturnavn", "nordisk"],
    firstLetter: "S"
  },
  {
    id: 25,
    name: "Sol",
    gender: "unisex",
    origin: "Nordisk",
    meaning: "Sol, solstråle",
    popularity: 33,
    length: "short",
    categories: ["unik", "naturnavn", "nordisk"],
    firstLetter: "S"
  },
  {
    id: 26,
    name: "Sigrid",
    gender: "girl",
    origin: "Norrønt",
    meaning: "Seier og skjønnhet",
    popularity: 55,
    length: "medium",
    categories: ["klassisk", "nordisk", "vikingnavn"],
    firstLetter: "S"
  },
  {
    id: 27,
    name: "Ronja",
    gender: "girl",
    origin: "Svensk/Litterær",
    meaning: "Guds gode kraft",
    popularity: 50,
    length: "short",
    categories: ["moderne", "nordisk", "unik"],
    firstLetter: "R"
  },
  {
    id: 28,
    name: "Iver",
    gender: "boy",
    origin: "Norrønt",
    meaning: "Bueskytte",
    popularity: 60,
    length: "short",
    categories: ["klassisk", "nordisk", "vikingnavn"],
    firstLetter: "I"
  },
  {
    id: 29,
    name: "Leah",
    gender: "girl",
    origin: "Hebraisk",
    meaning: "Trøtt, utmattet",
    popularity: 65,
    length: "short",
    categories: ["bibelsk", "internasjonal"],
    firstLetter: "L"
  },
  {
    id: 30,
    name: "Elias",
    gender: "boy",
    origin: "Hebraisk",
    meaning: "Jahve er Gud",
    popularity: 82,
    length: "medium",
    categories: ["bibelsk", "populær", "internasjonal"],
    firstLetter: "E"
  }
];

export const nameCategories = [
  { id: "klassisk", title: "Klassiske navn", description: "Tidløse navn som har vært populære gjennom generasjoner", icon: "crown" },
  { id: "moderne", title: "Moderne og trendy navn", description: "Nye og populære navn fra de siste årene", icon: "trending-up" },
  { id: "unik", title: "Unike og sjeldne navn", description: "Spesielle navn som skiller seg ut", icon: "gem" },
  { id: "nordisk", title: "Nordiske navn", description: "Navn med røtter i nordisk kultur og tradisjon", icon: "mountain-snow" },
  { id: "vikingnavn", title: "Vikingnavn", description: "Navn fra norrøn tid og vikingtiden", icon: "anchor" },
  { id: "bibelsk", title: "Bibelske navn", description: "Navn fra bibelen og religiøse tradisjoner", icon: "book" },
  { id: "internasjonal", title: "Internasjonale navn", description: "Navn som er populære over hele verden", icon: "globe" },
  { id: "naturnavn", title: "Naturnavn", description: "Navn inspirert av naturen", icon: "flower" }
];

export const getPopularNames = (gender?: 'boy' | 'girl' | 'unisex', limit = 10) => {
  let filtered = [...babyNames];
  
  if (gender) {
    filtered = filtered.filter(name => name.gender === gender);
  }
  
  return filtered
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
};

export const getNamesByCategory = (category: string, limit?: number) => {
  const filtered = babyNames.filter(name => 
    name.categories.includes(category)
  );
  
  return limit ? filtered.slice(0, limit) : filtered;
};

export const getNamesByLetter = (letter: string) => {
  return babyNames.filter(name => 
    name.firstLetter.toLowerCase() === letter.toLowerCase()
  );
};

export const getAllLetters = () => {
  const letters = new Set(babyNames.map(name => name.firstLetter));
  return Array.from(letters).sort();
};

export const getNamesByGender = (gender: 'boy' | 'girl' | 'unisex') => {
  return babyNames.filter(name => name.gender === gender);
};

export const getNamesByLength = (length: 'short' | 'medium' | 'long') => {
  return babyNames.filter(name => name.length === length);
};

export const searchNames = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  
  return babyNames.filter(name => 
    name.name.toLowerCase().includes(lowercaseQuery) ||
    name.meaning.toLowerCase().includes(lowercaseQuery) ||
    name.origin.toLowerCase().includes(lowercaseQuery)
  );
};
