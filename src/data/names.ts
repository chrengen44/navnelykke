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

// Sample data - expanded with more Norwegian names from SSB
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
  },
  {
    id: 31,
    name: "Sofie",
    gender: "girl",
    origin: "Gresk",
    meaning: "Visdom",
    popularity: 78,
    length: "medium",
    categories: ["klassisk", "populær", "internasjonal"],
    firstLetter: "S"
  },
  {
    id: 32,
    name: "Jakob",
    gender: "boy",
    origin: "Hebraisk",
    meaning: "Han som følger",
    popularity: 76,
    length: "medium",
    categories: ["klassisk", "bibelsk", "internasjonal"],
    firstLetter: "J"
  },
  {
    id: 33,
    name: "Amalie",
    gender: "girl",
    origin: "Germansk",
    meaning: "Arbeid, strev",
    popularity: 72,
    length: "medium",
    categories: ["klassisk", "populær"],
    firstLetter: "A"
  },
  {
    id: 34,
    name: "Filip",
    gender: "boy",
    origin: "Gresk",
    meaning: "Hesteelsker",
    popularity: 70,
    length: "medium",
    categories: ["klassisk", "bibelsk"],
    firstLetter: "F"
  },
  {
    id: 35,
    name: "Linnea",
    gender: "girl",
    origin: "Svensk/Latin",
    meaning: "Linnéblomst",
    popularity: 68,
    length: "medium",
    categories: ["naturnavn", "nordisk"],
    firstLetter: "L"
  },
  {
    id: 36,
    name: "Mathias",
    gender: "boy",
    origin: "Hebraisk",
    meaning: "Guds gave",
    popularity: 75,
    length: "medium",
    categories: ["klassisk", "bibelsk"],
    firstLetter: "M"
  },
  {
    id: 37,
    name: "Leah",
    gender: "girl",
    origin: "Hebraisk",
    meaning: "Den trofaste",
    popularity: 67,
    length: "short",
    categories: ["bibelsk", "internasjonal"],
    firstLetter: "L"
  },
  {
    id: 38,
    name: "Theodor",
    gender: "boy",
    origin: "Gresk",
    meaning: "Guds gave",
    popularity: 74,
    length: "medium",
    categories: ["klassisk", "internasjonal"],
    firstLetter: "T"
  },
  {
    id: 39,
    name: "Sara",
    gender: "girl",
    origin: "Hebraisk",
    meaning: "Prinsesse",
    popularity: 69,
    length: "short",
    categories: ["klassisk", "bibelsk", "internasjonal"],
    firstLetter: "S"
  },
  {
    id: 40,
    name: "Henrik",
    gender: "boy",
    origin: "Germansk",
    meaning: "Hersker over hjemmet",
    popularity: 65,
    length: "medium",
    categories: ["klassisk", "nordisk"],
    firstLetter: "H"
  },
  {
    id: 41,
    name: "Ida",
    gender: "girl",
    origin: "Germansk",
    meaning: "Flittig, arbeidsom",
    popularity: 64,
    length: "short",
    categories: ["klassisk", "nordisk"],
    firstLetter: "I"
  },
  {
    id: 42,
    name: "Johannes",
    gender: "boy",
    origin: "Hebraisk",
    meaning: "Gud er nådig",
    popularity: 63,
    length: "long",
    categories: ["klassisk", "bibelsk"],
    firstLetter: "J"
  },
  {
    id: 43,
    name: "Julie",
    gender: "girl",
    origin: "Latin",
    meaning: "Ungdommelig",
    popularity: 62,
    length: "medium",
    categories: ["klassisk", "internasjonal"],
    firstLetter: "J"
  },
  {
    id: 44,
    name: "Sebastian",
    gender: "boy",
    origin: "Gresk/Latin",
    meaning: "Ærefrykt, respekt",
    popularity: 61,
    length: "long",
    categories: ["klassisk", "internasjonal"],
    firstLetter: "S"
  },
  {
    id: 45,
    name: "Thea",
    gender: "girl",
    origin: "Gresk",
    meaning: "Gudinne",
    popularity: 78,
    length: "short",
    categories: ["klassisk", "populær"],
    firstLetter: "T"
  },
  {
    id: 46,
    name: "Oskar",
    gender: "boy",
    origin: "Norrønt/Germansk",
    meaning: "Guds spyd",
    popularity: 60,
    length: "medium",
    categories: ["klassisk", "nordisk"],
    firstLetter: "O"
  },
  {
    id: 47,
    name: "Emilie",
    gender: "girl",
    origin: "Latin",
    meaning: "Flittig, ivrig",
    popularity: 59,
    length: "medium",
    categories: ["klassisk", "internasjonal"],
    firstLetter: "E"
  },
  {
    id: 48,
    name: "Johan",
    gender: "boy",
    origin: "Hebraisk",
    meaning: "Gud er nådig",
    popularity: 58,
    length: "medium",
    categories: ["klassisk", "nordisk"],
    firstLetter: "J"
  },
  {
    id: 49,
    name: "Vilde",
    gender: "girl",
    origin: "Norrønt",
    meaning: "Den ville, den frie",
    popularity: 57,
    length: "medium",
    categories: ["nordisk", "naturnavn"],
    firstLetter: "V"
  },
  {
    id: 50,
    name: "Markus",
    gender: "boy",
    origin: "Latin",
    meaning: "Viet til krigsguden Mars",
    popularity: 56,
    length: "medium",
    categories: ["klassisk", "bibelsk"],
    firstLetter: "M"
  },
  {
    id: 51,
    name: "Maria",
    gender: "girl",
    origin: "Hebraisk",
    meaning: "Den bitre, havets stjerne",
    popularity: 55,
    length: "medium",
    categories: ["klassisk", "bibelsk", "internasjonal"],
    firstLetter: "M"
  },
  {
    id: 52,
    name: "Matheo",
    gender: "boy",
    origin: "Hebraisk",
    meaning: "Guds gave",
    popularity: 54,
    length: "medium",
    categories: ["moderne", "internasjonal"],
    firstLetter: "M"
  },
  {
    id: 53,
    name: "Tuva",
    gender: "girl",
    origin: "Norrønt",
    meaning: "Gresstue, høyde",
    popularity: 53,
    length: "short",
    categories: ["nordisk", "naturnavn"],
    firstLetter: "T"
  },
  {
    id: 54,
    name: "Tobias",
    gender: "boy",
    origin: "Hebraisk",
    meaning: "Gud er god",
    popularity: 52,
    length: "medium",
    categories: ["klassisk", "bibelsk"],
    firstLetter: "T"
  },
  {
    id: 55,
    name: "Anna",
    gender: "girl",
    origin: "Hebraisk",
    meaning: "Nåde, ynde",
    popularity: 51,
    length: "short",
    categories: ["klassisk", "bibelsk", "internasjonal"],
    firstLetter: "A"
  },
  {
    id: 56,
    name: "Jonas",
    gender: "boy",
    origin: "Hebraisk",
    meaning: "Due",
    popularity: 50,
    length: "medium",
    categories: ["klassisk", "bibelsk"],
    firstLetter: "J"
  },
  {
    id: 57,
    name: "Ada",
    gender: "girl",
    origin: "Germansk",
    meaning: "Adel, edel",
    popularity: 49,
    length: "short",
    categories: ["klassisk", "nordisk"],
    firstLetter: "A"
  },
  {
    id: 58,
    name: "Sander",
    gender: "boy",
    origin: "Gresk",
    meaning: "Menneskeforsvarer",
    popularity: 48,
    length: "medium",
    categories: ["moderne", "internasjonal"],
    firstLetter: "S"
  },
  {
    id: 59,
    name: "Hedda",
    gender: "girl",
    origin: "Norrønt",
    meaning: "Strid, kamp",
    popularity: 47,
    length: "short",
    categories: ["nordisk", "vikingnavn"],
    firstLetter: "H"
  },
  {
    id: 60,
    name: "Andreas",
    gender: "boy",
    origin: "Gresk",
    meaning: "Modig, mannlig",
    popularity: 46,
    length: "medium",
    categories: ["klassisk", "bibelsk"],
    firstLetter: "A"
  },
  {
    id: 61,
    name: "Iben",
    gender: "girl",
    origin: "Hebraisk",
    meaning: "Gud er nådig",
    popularity: 40,
    length: "short",
    categories: ["unik", "nordisk"],
    firstLetter: "I"
  },
  {
    id: 62,
    name: "Even",
    gender: "boy",
    origin: "Norrønt",
    meaning: "Ungdom, ung kriger",
    popularity: 44,
    length: "short",
    categories: ["nordisk", "vikingnavn"],
    firstLetter: "E"
  },
  {
    id: 63,
    name: "Eline",
    gender: "girl",
    origin: "Gresk",
    meaning: "Solstråle, den skinnende",
    popularity: 43,
    length: "medium",
    categories: ["klassisk", "nordisk"],
    firstLetter: "E"
  },
  {
    id: 64,
    name: "Håkon",
    gender: "boy",
    origin: "Norrønt",
    meaning: "Høy sønn",
    popularity: 42,
    length: "medium",
    categories: ["nordisk", "vikingnavn"],
    firstLetter: "H"
  },
  {
    id: 65,
    name: "Astrid",
    gender: "girl",
    origin: "Norrønt",
    meaning: "Gudevakker, gudeelsket",
    popularity: 41,
    length: "medium",
    categories: ["klassisk", "nordisk", "vikingnavn"],
    firstLetter: "A"
  },
  {
    id: 66,
    name: "Kasper",
    gender: "boy",
    origin: "Persisk",
    meaning: "Skattemester",
    popularity: 40,
    length: "medium",
    categories: ["klassisk", "internasjonal"],
    firstLetter: "K"
  },
  {
    id: 67,
    name: "Selma",
    gender: "girl",
    origin: "Keltisk",
    meaning: "Fredfull beskyttelse",
    popularity: 39,
    length: "medium",
    categories: ["klassisk", "internasjonal"],
    firstLetter: "S"
  },
  {
    id: 68,
    name: "Brage",
    gender: "boy",
    origin: "Norrønt",
    meaning: "Poesiens gud, den strålende",
    popularity: 38,
    length: "medium",
    categories: ["nordisk", "vikingnavn"],
    firstLetter: "B"
  },
  {
    id: 69,
    name: "Live",
    gender: "girl",
    origin: "Norrønt",
    meaning: "Liv, beskyttelse",
    popularity: 37,
    length: "short",
    categories: ["nordisk", "naturnavn"],
    firstLetter: "L"
  },
  {
    id: 70,
    name: "Ludvig",
    gender: "boy",
    origin: "Germansk",
    meaning: "Berømt kriger",
    popularity: 36,
    length: "medium",
    categories: ["klassisk", "internasjonal"],
    firstLetter: "L"
  },
  {
    id: 71,
    name: "Alma",
    gender: "girl",
    origin: "Latin",
    meaning: "Næring, sjel",
    popularity: 66,
    length: "short",
    categories: ["klassisk", "internasjonal"],
    firstLetter: "A"
  },
  {
    id: 72,
    name: "Felix",
    gender: "boy",
    origin: "Latin",
    meaning: "Lykkelig, heldig",
    popularity: 65,
    length: "medium",
    categories: ["klassisk", "internasjonal"],
    firstLetter: "F"
  },
  {
    id: 73,
    name: "Hermine",
    gender: "girl",
    origin: "Germansk",
    meaning: "Kriger",
    popularity: 35,
    length: "medium",
    categories: ["unik", "internasjonal"],
    firstLetter: "H"
  },
  {
    id: 74,
    name: "Herman",
    gender: "boy",
    origin: "Germansk",
    meaning: "Kriger, hærmann",
    popularity: 34,
    length: "medium",
    categories: ["klassisk", "nordisk"],
    firstLetter: "H"
  },
  {
    id: 75,
    name: "Jenny",
    gender: "girl",
    origin: "Engelsk",
    meaning: "Den hvite bølge",
    popularity: 33,
    length: "short",
    categories: ["klassisk", "internasjonal"],
    firstLetter: "J"
  },
  {
    id: 76,
    name: "Mats",
    gender: "boy",
    origin: "Hebraisk",
    meaning: "Guds gave",
    popularity: 32,
    length: "short",
    categories: ["nordisk", "moderne"],
    firstLetter: "M"
  },
  {
    id: 77,
    name: "Victoria",
    gender: "girl",
    origin: "Latin",
    meaning: "Seier",
    popularity: 31,
    length: "long",
    categories: ["klassisk", "internasjonal"],
    firstLetter: "V"
  },
  {
    id: 78,
    name: "Olav",
    gender: "boy",
    origin: "Norrønt",
    meaning: "Forfedrenes etterkommer",
    popularity: 30,
    length: "short",
    categories: ["nordisk", "vikingnavn"],
    firstLetter: "O"
  },
  {
    id: 79,
    name: "Lykke",
    gender: "girl",
    origin: "Norrønt",
    meaning: "Lykke, hell",
    popularity: 29,
    length: "short",
    categories: ["nordisk", "unik"],
    firstLetter: "L"
  },
  {
    id: 80,
    name: "Sverre",
    gender: "boy",
    origin: "Norrønt",
    meaning: "Vill, urolig",
    popularity: 28,
    length: "medium",
    categories: ["nordisk", "vikingnavn"],
    firstLetter: "S"
  },
  {
    id: 81,
    name: "Signe",
    gender: "girl",
    origin: "Norrønt",
    meaning: "Den som seirer",
    popularity: 27,
    length: "medium",
    categories: ["nordisk", "vikingnavn"],
    firstLetter: "S"
  },
  {
    id: 82,
    name: "Vetle",
    gender: "boy",
    origin: "Norrønt",
    meaning: "Den lille, vinter",
    popularity: 26,
    length: "medium",
    categories: ["nordisk", "unik"],
    firstLetter: "V"
  },
  {
    id: 83,
    name: "Mina",
    gender: "girl",
    origin: "Tysk/Persisk",
    meaning: "Kjærlig",
    popularity: 25,
    length: "short",
    categories: ["internasjonal", "moderne"],
    firstLetter: "M"
  },
  {
    id: 84,
    name: "Eirik",
    gender: "boy",
    origin: "Norrønt",
    meaning: "Evig hersker",
    popularity: 24,
    length: "medium",
    categories: ["nordisk", "vikingnavn"],
    firstLetter: "E"
  },
  {
    id: 85,
    name: "Ylva",
    gender: "girl",
    origin: "Norrønt",
    meaning: "Hunulv",
    popularity: 39,
    length: "short",
    categories: ["nordisk", "vikingnavn", "unik"],
    firstLetter: "Y"
  },
  {
    id: 86,
    name: "Amund",
    gender: "boy",
    origin: "Germansk",
    meaning: "Guddommelig beskytter",
    popularity: 22,
    length: "medium",
    categories: ["nordisk", "vikingnavn"],
    firstLetter: "A"
  },
  {
    id: 87,
    name: "Pernille",
    gender: "girl",
    origin: "Fransk/Latin",
    meaning: "Klippe",
    popularity: 21,
    length: "medium",
    categories: ["klassisk", "nordisk"],
    firstLetter: "P"
  },
  {
    id: 88,
    name: "Jens",
    gender: "boy",
    origin: "Hebraisk",
    meaning: "Gud er nådig",
    popularity: 20,
    length: "short",
    categories: ["klassisk", "nordisk"],
    firstLetter: "J"
  },
  {
    id: 89,
    name: "Amanda",
    gender: "girl",
    origin: "Latin",
    meaning: "Verdig å elske",
    popularity: 19,
    length: "medium",
    categories: ["klassisk", "internasjonal"],
    firstLetter: "A"
  },
  {
    id: 90,
    name: "Birk",
    gender: "boy",
    origin: "Norrønt",
    meaning: "Bjørketre",
    popularity: 18,
    length: "short",
    categories: ["nordisk", "naturnavn", "unik"],
    firstLetter: "B"
  },
  {
    id: 91,
    name: "Solveig",
    gender: "girl",
    origin: "Norrønt",
    meaning: "Solens vei, solens styrke",
    popularity: 17,
    length: "medium",
    categories: ["nordisk", "vikingnavn"],
    firstLetter: "S"
  },
  {
    id: 92,
    name: "Sondre",
    gender: "boy",
    origin: "Norrønt",
    meaning: "Sønn av sønnen",
    popularity: 16,
    length: "medium",
    categories: ["nordisk", "moderne"],
    firstLetter: "S"
  },
  {
    id: 93,
    name: "Synne",
    gender: "girl",
    origin: "Norrønt",
    meaning: "Gave fra solen",
    popularity: 15,
    length: "medium",
    categories: ["nordisk", "naturnavn"],
    firstLetter: "S"
  },
  {
    id: 94,
    name: "Linus",
    gender: "boy",
    origin: "Gresk",
    meaning: "Lin, flaks",
    popularity: 14,
    length: "medium",
    categories: ["klassisk", "internasjonal"],
    firstLetter: "L"
  },
  {
    id: 95,
    name: "Ellinor",
    gender: "girl",
    origin: "Gresk",
    meaning: "Lys, skinnende",
    popularity: 13,
    length: "medium",
    categories: ["klassisk", "nordisk"],
    firstLetter: "E"
  },
  {
    id: 96,
    name: "Svein",
    gender: "boy",
    origin: "Norrønt",
    meaning: "Ung mann, tjener",
    popularity: 12,
    length: "medium",
    categories: ["nordisk", "vikingnavn"],
    firstLetter: "S"
  },
  {
    id: 97,
    name: "Mari",
    gender: "girl",
    origin: "Hebraisk",
    meaning: "Bitter, elsket",
    popularity: 11,
    length: "short",
    categories: ["nordisk", "bibelsk"],
    firstLetter: "M"
  },
  {
    id: 98,
    name: "Gard",
    gender: "boy",
    origin: "Norrønt",
    meaning: "Gård, beskytter",
    popularity: 10,
    length: "short",
    categories: ["nordisk", "vikingnavn", "unik"],
    firstLetter: "G"
  },
  {
    id: 99,
    name: "Oda",
    gender: "girl",
    origin: "Germansk",
    meaning: "Rikdom, arv",
    popularity: 9,
    length: "short",
    categories: ["nordisk", "klassisk"],
    firstLetter: "O"
  },
  {
    id: 100,
    name: "Vegard",
    gender: "boy",
    origin: "Norrønt",
    meaning: "Beskytter, vokter",
    popularity: 8,
    length: "medium",
    categories: ["nordisk", "vikingnavn"],
    firstLetter: "V"
  },
  {
    id: 101,
    name: "Alma",
    gender: "girl",
    origin: "Latin",
    meaning: "Sjel, næring",
    popularity: 76,
    length: "short",
    categories: ["klassisk", "internasjonal"],
    firstLetter: "A"
  },
  {
    id: 102,
    name: "Leah",
    gender: "girl",
    origin: "Hebraisk",
    meaning: "Trøtt, utmattet",
    popularity: 72,
    length: "short",
    categories: ["bibelsk", "internasjonal", "populær"],
    firstLetter: "L"
  },
  {
    id: 103,
    name: "Ellie",
    gender: "girl",
    origin: "Gresk",
    meaning: "Lysets stråle",
    popularity: 65,
    length: "short",
    categories: ["moderne", "internasjonal"],
    firstLetter: "E"
  },
  {
    id: 104,
    name: "Astrid",
    gender: "girl",
    origin: "Norrønt",
    meaning: "Gudevakker",
    popularity: 62,
    length: "medium",
    categories: ["nordisk", "vikingnavn", "klassisk"],
    firstLetter: "A"
  },
  {
    id: 105,
    name: "Hedda",
    gender: "girl",
    origin: "Norrønt",
    meaning: "Den som hedres",
    popularity: 60,
    length: "short",
    categories: ["nordisk", "moderne"],
    firstLetter: "H"
  },
  {
    id: 106,
    name: "Lilly",
    gender: "girl",
    origin: "Latin/Engelsk",
    meaning: "Lilje, renhet",
    popularity: 58,
    length: "short",
    categories: ["naturnavn", "internasjonal"],
    firstLetter: "L"
  },
  {
    id: 107,
    name: "Sunniva",
    gender: "girl",
    origin: "Norrønt",
    meaning: "Solens gave",
    popularity: 55,
    length: "medium",
    categories: ["nordisk", "klassisk"],
    firstLetter: "S"
  },
  {
    id: 108,
    name: "Iben",
    gender: "girl",
    origin: "Dansk form av Ibban",
    meaning: "Gud er nådig",
    popularity: 52,
    length: "short",
    categories: ["nordisk", "unik"],
    firstLetter: "I"
  },
  {
    id: 109,
    name: "Mathea",
    gender: "girl",
    origin: "Hebraisk",
    meaning: "Guds gave",
    popularity: 50,
    length: "medium",
    categories: ["bibelsk", "internasjonal"],
    firstLetter: "M"
  },
  {
    id: 110,
    name: "Ingeborg",
    gender: "girl",
    origin: "Norrønt",
    meaning: "Ings beskyttelse",
    popularity: 48,
    length: "medium",
    categories: ["nordisk", "vikingnavn", "klassisk"],
    firstLetter: "I"
  },
  {
    id: 111,
    name: "Saga",
    gender: "girl",
    origin: "Norrønt",
    meaning: "Hun som ser",
    popularity: 45,
    length: "short",
    categories: ["nordisk", "vikingnavn", "unik"],
    firstLetter: "S"
  },
  {
    id: 112,
    name: "Luna",
    gender: "girl",
    origin: "Latin",
    meaning: "Måne",
    popularity: 42,
    length: "short",
    categories: ["internasjonal", "naturnavn", "moderne"],
    firstLetter: "L"
  },
  {
    id: 113,
    name: "Cornelia",
    gender: "girl",
    origin: "Latin",
    meaning: "Horn, sterk",
    popularity: 40,
    length: "long",
    categories: ["klassisk", "internasjonal"],
    firstLetter: "C"
  },
  {
    id: 114,
    name: "Othilie",
    gender: "girl",
    origin: "Germansk",
    meaning: "Rikdom, arv",
    popularity: 38,
    length: "medium",
    categories: ["klassisk", "unik"],
    firstLetter: "O"
  },
  {
    id: 115,
    name: "Lydia",
    gender: "girl",
    origin: "Gresk",
    meaning: "Fra Lydia, kvinne fra Lydia",
    popularity: 35,
    length: "medium",
    categories: ["bibelsk", "klassisk"],
    firstLetter: "L"
  },
  {
    id: 116,
    name: "Theodor",
    gender: "boy",
    origin: "Gresk",
    meaning: "Guds gave",
    popularity: 85,
    length: "medium",
    categories: ["klassisk", "internasjonal", "populær"],
    firstLetter: "T"
  },
  {
    id: 117,
    name: "Aksel",
    gender: "boy",
    origin: "Hebraisk",
    meaning: "Far til fred",
    popularity: 80,
    length: "medium",
    categories: ["nordisk", "populær", "moderne"],
    firstLetter: "A"
  },
  {
    id: 118,
    name: "Filip",
    gender: "boy",
    origin: "Gresk",
    meaning: "Hesteelsker",
    popularity: 75,
    length: "medium",
    categories: ["klassisk", "bibelsk", "internasjonal"],
    firstLetter: "F"
  },
  {
    id: 119,
    name: "Henrik",
    gender: "boy",
    origin: "Germansk",
    meaning: "Hersker over hjemmet",
    popularity: 72,
    length: "medium",
    categories: ["klassisk", "nordisk"],
    firstLetter: "H"
  },
  {
    id: 120,
    name: "Oskar",
    gender: "boy",
    origin: "Norrønt/Germansk",
    meaning: "Guds spyd",
    popularity: 70,
    length: "medium",
    categories: ["klassisk", "nordisk", "populær"],
    firstLetter: "O"
  },
  {
    id: 121,
    name: "Sander",
    gender: "boy",
    origin: "Gresk",
    meaning: "Menneskeforsvarer",
    popularity: 68,
    length: "medium",
    categories: ["moderne", "internasjonal"],
    firstLetter: "S"
  },
  {
    id: 122,
    name: "Ludvig",
    gender: "boy",
    origin: "Germansk",
    meaning: "Berømt kriger",
    popularity: 65,
    length: "medium",
    categories: ["klassisk", "internasjonal"],
    firstLetter: "L"
  },
  {
    id: 123,
    name: "Johannes",
    gender: "boy",
    origin: "Hebraisk",
    meaning: "Gud er nådig",
    popularity: 62,
    length: "long",
    categories: ["klassisk", "bibelsk"],
    firstLetter: "J"
  },
  {
    id: 124,
    name: "Theo",
    gender: "boy",
    origin: "Gresk",
    meaning: "Gud, gudegave",
    popularity: 60,
    length: "short",
    categories: ["moderne", "internasjonal"],
    firstLetter: "T"
  },
  {
    id: 125,
    name: "Alfred",
    gender: "boy",
    origin: "Angelsaksisk",
    meaning: "Alvenes råd",
    popularity: 55,
    length: "medium",
    categories: ["klassisk", "vikingnavn"],
    firstLetter: "A"
  },
  {
    id: 126,
    name: "Luca",
    gender: "boy",
    origin: "Latin/Italiensk",
    meaning: "Lys, den lysende",
    popularity: 52,
    length: "short",
    categories: ["internasjonal", "moderne"],
    firstLetter: "L"
  },
  {
    id: 127,
    name: "Sigurd",
    gender: "boy",
    origin: "Norrønt",
    meaning: "Seierens beskytter",
    popularity: 50,
    length: "medium",
    categories: ["nordisk", "vikingnavn", "klassisk"],
    firstLetter: "S"
  },
  {
    id: 128,
    name: "Victor",
    gender: "boy",
    origin: "Latin",
    meaning: "Seierherre",
    popularity: 48,
    length: "medium",
    categories: ["klassisk", "internasjonal"],
    firstLetter: "V"
  },
  {
    id: 129,
    name: "Eskil",
    gender: "boy",
    origin: "Norrønt",
    meaning: "Guds kjele",
    popularity: 45,
    length: "medium",
    categories: ["nordisk", "vikingnavn", "unik"],
    firstLetter: "E"
  },
  {
    id: 130,
    name: "Benjamin",
    gender: "boy",
    origin: "Hebraisk",
    meaning: "Lykkens sønn",
    popularity: 42,
    length: "medium",
    categories: ["bibelsk", "internasjonal", "populær"],
    firstLetter: "B"
  },
  {
    id: 131,
    name: "Haakon",
    gender: "boy",
    origin: "Norrønt",
    meaning: "Høy sønn",
    popularity: 40,
    length: "medium",
    categories: ["nordisk", "vikingnavn", "klassisk"],
    firstLetter: "H"
  },
  {
    id: 132,
    name: "Vilja",
    gender: "girl",
    origin: "Norrønt",
    meaning: "Vilje, besluttsomhet",
    popularity: 38,
    length: "medium",
    categories: ["nordisk", "unik", "moderne"],
    firstLetter: "V"
  },
  {
    id: 133,
    name: "Wilma",
    gender: "girl",
    origin: "Germansk",
    meaning: "Besluttsom beskytter",
    popularity: 36,
    length: "medium",
    categories: ["klassisk", "internasjonal", "moderne"],
    firstLetter: "W"
  },
  {
    id: 134,
    name: "Oline",
    gender: "girl",
    origin: "Norrønt",
    meaning: "Forfedrenes etterkommer",
    popularity: 34,
    length: "medium",
    categories: ["nordisk", "klassisk"],
    firstLetter: "O"
  },
  {
    id: 135,
    name: "Mille",
    gender: "girl",
    origin: "Germansk",
    meaning: "Arbeiderske, flittig",
    popularity: 32,
    length: "short",
    categories: ["nordisk", "moderne"],
    firstLetter: "M"
  },
  {
    id: 136,
    name: "Eleonora",
    gender: "girl",
    origin: "Gresk",
    meaning: "Lys, strålende",
    popularity: 30,
    length: "long",
    categories: ["klassisk", "internasjonal"],
    firstLetter: "E"
  },
  {
    id: 137,
    name: "Pernille",
    gender: "girl",
    origin: "Latin",
    meaning: "Liten stein",
    popularity: 28,
    length: "medium",
    categories: ["klassisk", "nordisk"],
    firstLetter: "P"
  },
  {
    id: 138,
    name: "Angelica",
    gender: "girl",
    origin: "Latin",
    meaning: "Englelig, budbringer",
    popularity: 26,
    length: "medium",
    categories: ["internasjonal", "klassisk"],
    firstLetter: "A"
  },
  {
    id: 139,
    name: "Lilja",
    gender: "girl",
    origin: "Norrønt",
    meaning: "Lilje, blomst",
    popularity: 24,
    length: "medium",
    categories: ["nordisk", "naturnavn", "unik"],
    firstLetter: "L"
  },
  {
    id: 140,
    name: "Elea",
    gender: "girl",
    origin: "Gresk",
    meaning: "Solstråle",
    popularity: 22,
    length: "short",
    categories: ["unik", "moderne", "internasjonal"],
    firstLetter: "E"
  },
  {
    id: 141,
    name: "Anton",
    gender: "boy",
    origin: "Latin",
    meaning: "Uvurderlig",
    popularity: 38,
    length: "medium",
    categories: ["klassisk", "internasjonal"],
    firstLetter: "A"
  },
  {
    id: 142,
    name: "Leon",
    gender: "boy",
    origin: "Gresk",
    meaning: "Løve",
    popularity: 36,
    length: "short",
    categories: ["internasjonal", "moderne"],
    firstLetter: "L"
  },
  {
    id: 143,
    name: "Einar",
    gender: "boy",
    origin: "Norrønt",
    meaning: "En kriger",
    popularity: 34,
    length: "medium",
    categories: ["nordisk", "vikingnavn", "klassisk"],
    firstLetter: "E"
  },
  {
    id: 144,
    name: "Sverre",
    gender: "boy",
    origin: "Norrønt",
    meaning: "Vill, stridbar",
    popularity: 32,
    length: "medium",
    categories: ["nordisk", "vikingnavn", "klassisk"],
    firstLetter: "S"
  },
  {
    id: 145,
    name: "Ulrik",
    gender: "boy",
    origin: "Germansk",
    meaning: "Arverik hersker",
    popularity: 30,
    length: "medium",
    categories: ["klassisk", "nordisk"],
    firstLetter: "U"
  },
  {
    id: 146,
    name: "Albert",
    gender: "boy",
    origin: "Germansk",
    meaning: "Edel og lysende",
    popularity: 28,
    length: "medium",
    categories: ["klassisk", "internasjonal"],
    firstLetter: "A"
  },
  {
    id: 147,
    name: "Viljar",
    gender: "boy",
    origin: "Norrønt",
    meaning: "Viljesterk",
    popularity: 26,
    length: "medium",
    categories: ["nordisk", "vikingnavn", "unik"],
    firstLetter: "V"
  },
  {
    id: 148,
    name: "Edvin",
    gender: "boy",
    origin: "Angelsaksisk",
    meaning: "Rik venn",
    popularity: 24,
    length: "medium",
    categories: ["klassisk", "nordisk"],
    firstLetter: "E"
  },
  {
    id: 149,
    name: "Mio",
    gender: "boy",
    origin: "Italiensk/Japansk",
    meaning: "Min, elsket",
    popularity: 22,
    length: "short",
    categories: ["internasjonal", "moderne", "unik"],
    firstLetter: "M"
  },
  {
    id: 150,
    name: "Samuel",
    gender: "boy",
    origin: "Hebraisk",
    meaning: "Hørt av Gud",
    popularity: 20,
    length: "medium",
    categories: ["bibelsk", "internasjonal", "klassisk"],
    firstLetter: "S"
  },
  {
    id: 151,
    name: "Nova",
    gender: "unisex",
    origin: "Latin",
    meaning: "Ny, ny stjerne",
    popularity: 45,
    length: "short",
    categories: ["moderne", "naturnavn", "internasjonal"],
    firstLetter: "N"
  },
  {
    id: 152,
    name: "Eira",
    gender: "girl",
    origin: "Walisisk/Norrønt",
    meaning: "Snø",
    popularity: 28,
    length: "short",
    categories: ["unik", "naturnavn", "nordisk"],
    firstLetter: "E"
  },
  {
    id: 153,
    name: "Iver",
    gender: "boy",
    origin: "Norrønt",
    meaning: "Bueskytte",
    popularity: 48,
    length: "short",
    categories: ["nordisk", "vikingnavn", "klassisk"],
    firstLetter: "I"
  },
  {
    id: 154,
    name: "Livia",
    gender: "girl",
    origin: "Latin",
    meaning: "Liv, blålig",
    popularity: 32,
    length: "medium",
    categories: ["klassisk", "internasjonal", "moderne"],
    firstLetter: "L"
  },
  {
    id: 155,
    name: "Lo",
    gender: "unisex",
    origin: "Norrønt",
    meaning: "Eng, åpent landskap",
    popularity: 20,
    length: "short",
    categories: ["unik", "naturnavn", "nordisk"],
    firstLetter: "L"
  },
  {
    id: 156,
    name: "Aria",
    gender: "girl",
    origin: "Italiensk/Persisk",
    meaning: "Luft, melodi",
    popularity: 30,
    length: "short",
    categories: ["internasjonal", "moderne", "unik"],
    firstLetter: "A"
  },
  {
    id: 157,
    name: "Lui",
    gender: "boy",
    origin: "Germansk",
    meaning: "Berømt kriger",
    popularity: 26,
    length: "short",
    categories: ["internasjonal", "moderne", "unik"],
    firstLetter: "L"
  },
  {
    id: 158,
    name: "Neo",
    gender: "boy",
    origin: "Gresk",
    meaning: "Ny, ung",
    popularity: 24,
    length: "short",
    categories: ["internasjonal", "moderne", "unik"],
    firstLetter: "N"
  },
  {
    id: 159,
    name: "Juni",
    gender: "girl",
    origin: "Latin",
    meaning: "Ung, måned",
    popularity: 40,
    length: "short",
    categories: ["naturnavn", "moderne", "nordisk"],
    firstLetter: "J"
  },
  {
    id: 160,
    name: "Alva",
    gender: "girl",
    origin: "Norrønt",
    meaning: "Alv, overnaturlig vesen",
    popularity: 45,
    length: "short",
    categories: ["nordisk", "vikingnavn", "populær"],
    firstLetter: "A"
  },
  {
    id: 161,
    name: "Bo",
    gender: "unisex",
    origin: "Norrønt",
    meaning: "Bosetter, en som bor",
    popularity: 22,
    length: "short",
    categories: ["nordisk", "unik"],
    firstLetter: "B"
  },
  {
    id: 162,
    name: "Aron",
    gender: "boy",
    origin: "Hebraisk",
    meaning: "Læreren, fjellbeboer",
    popularity: 42,
    length: "medium",
    categories: ["bibelsk", "internasjonal"],
    firstLetter: "A"
  },
  {
    id: 163,
    name: "Vera",
    gender: "girl",
    origin: "Russisk/Latin",
    meaning: "Tro, sannhet",
    popularity: 36,
    length: "short",
    categories: ["klassisk", "internasjonal"],
    firstLetter: "V"
  },
  {
    id: 164,
    name: "Sigve",
    gender: "boy",
    origin: "Norrønt",
    meaning: "Seierens vei",
    popularity: 30,
    length: "medium",
    categories: ["nordisk", "vikingnavn", "unik"],
    firstLetter: "S"
  },
  {
    id: 165,
    name: "Erle",
    gender: "girl",
    origin: "Norrønt",
    meaning: "Fuglenavnet erle",
    popularity: 34,
    length: "short",
    categories: ["nordisk", "naturnavn", "unik"],
    firstLetter: "E"
  },
  {
    id: 166,
    name: "Selma",
    gender: "girl",
    origin: "Keltisk",
    meaning: "Fredfull beskyttelse",
    popularity: 38,
    length: "medium",
    categories: ["klassisk", "internasjonal"],
    firstLetter: "S"
  },
  {
    id: 167,
    name: "Milian",
    gender: "boy",
    origin: "Latin",
    meaning: "Arbeidsom",
    popularity: 26,
    length: "medium",
    categories: ["moderne", "internasjonal", "unik"],
    firstLetter: "M"
  },
  {
    id: 168,
    name: "Elisa",
    gender: "girl",
    origin: "Hebraisk",
    meaning: "Gud er min ed",
    popularity: 32,
    length: "medium",
    categories: ["bibelsk", "internasjonal"],
    firstLetter: "E"
  },
  {
    id: 169,
    name: "Silas",
    gender: "boy",
    origin: "Latin/Hebraisk",
    meaning: "Skogboer",
    popularity: 30,
    length: "medium",
    categories: ["bibelsk", "internasjonal", "moderne"],
    firstLetter: "S"
  },
  {
    id: 170,
    name: "Vår",
    gender: "girl",
    origin: "Norrønt",
    meaning: "Vår, årstid",
    popularity: 24,
    length: "short",
    categories: ["nordisk", "naturnavn", "unik"],
    firstLetter: "V"
  },
  {
    id: 171,
    name: "Aagot",
    gender: "girl",
    origin: "Norrønt",
    meaning: "Variant av Åsgot, som betyr Guds gave",
    popularity: 5,
    length: "medium",
    categories: ["nordisk", "klassisk", "vikingnavn"],
    firstLetter: "A"
  },
  {
    id: 172,
    name: "Aase",
    gender: "girl",
    origin: "Norrønt",
    meaning: "Gud, åsene",
    popularity: 15,
    length: "short",
    categories: ["nordisk", "klassisk"],
    firstLetter: "A"
  },
  {
    id: 173,
    name: "Aashild",
    gender: "girl",
    origin: "Norrønt",
    meaning: "Gudekrig, kvinnelig kriger",
    popularity: 7,
    length: "medium",
    categories: ["nordisk", "vikingnavn", "unik"],
    firstLetter: "A"
  },
  {
    id: 174,
    name: "Abigail",
    gender: "girl",
    origin: "Hebraisk",
    meaning: "Min far fryder seg",
    popularity: 25,
    length: "medium",
    categories: ["bibelsk", "internasjonal"],
    firstLetter: "A"
  },
  {
    id: 175,
    name: "Adele",
    gender: "girl",
    origin: "Germansk",
    meaning: "Edel, nobel",
    popularity: 35,
    length: "medium",
    categories: ["klassisk", "internasjonal"],
    firstLetter: "A"
  },
  {
    id: 176,
    name: "Adelen",
    gender: "girl",
    origin: "Germansk",
    meaning: "Variasjon av Adele, edel",
    popularity: 18,
    length: "medium",
    categories: ["moderne", "internasjonal"],
    firstLetter: "A"
  },
  {
    id: 177,
    name: "Adelina",
    gender: "girl",
    origin: "Germansk",
    meaning: "Den edle, lille adelige",
    popularity: 22,
    length: "medium",
    categories: ["internasjonal", "klassisk"],
    firstLetter: "A"
  },
  {
    id: 178,
    name: "Adriana",
    gender: "girl",
    origin: "Latin",
    meaning: "Fra Adria",
    popularity: 28,
    length: "medium",
    categories: ["internasjonal", "klassisk"],
    firstLetter: "A"
  },
  {
    id: 179,
    name: "Agata",
    gender: "girl",
    origin: "Gresk",
    meaning: "Den gode",
    popularity: 20,
    length: "medium",
    categories: ["internasjonal", "klassisk"],
    firstLetter: "A"
  },
  {
    id: 180,
    name: "Agathe",
    gender: "girl",
    origin: "Gresk",
    meaning: "Den gode",
    popularity: 34,
    length: "medium",
    categories: ["klassisk", "internasjonal"],
    firstLetter: "A"
  },
  {
    id: 181,
    name: "Agnes",
    gender: "girl",
    origin: "Gresk",
    meaning: "Ren, kysk",
    popularity: 42,
    length: "medium",
    categories: ["klassisk", "internasjonal"],
    firstLetter: "A"
  },
  {
    id: 182,
    name: "Agnete",
    gender: "girl",
    origin: "Gresk",
    meaning: "Den rene, variasjon av Agnes",
    popularity: 30,
    length: "medium",
    categories: ["nordisk", "klassisk"],
    firstLetter: "A"
  },
  {
    id: 183,
    name: "Aileen",
    gender: "girl",
    origin: "Gælisk",
    meaning: "Lys, strålende",
    popularity: 12,
    length: "medium",
    categories: ["internasjonal", "moderne"],
    firstLetter: "A"
  },
  {
    id: 184,
    name: "Aisha",
    gender: "girl",
    origin: "Arabisk",
    meaning: "Levende, i live, velstående",
    popularity: 36,
    length: "medium",
    categories: ["internasjonal", "moderne"],
    firstLetter: "A"
  },
  {
    id: 185,
    name: "Alba",
    gender: "girl",
    origin: "Latin",
    meaning: "Hvit, daggry",
    popularity: 28,
    length: "short",
    categories: ["internasjonal", "moderne", "naturnavn"],
    firstLetter: "A"
  },
  {
    id: 186,
    name: "Aleksandra",
    gender: "girl",
    origin: "Gresk",
    meaning: "Beskytter av mennesker",
    popularity: 32,
    length: "long",
    categories: ["internasjonal", "klassisk"],
    firstLetter: "A"
  },
  {
    id: 187,
    name: "Alexandra",
    gender: "girl",
    origin: "Gresk",
    meaning: "Beskytter av mennesker",
    popularity: 38,
    length: "long",
    categories: ["internasjonal", "klassisk"],
    firstLetter: "A"
  },
  {
    id: 188,
    name: "Alice",
    gender: "girl",
    origin: "Germansk",
    meaning: "Av edel type",
    popularity: 56,
    length: "medium",
    categories: ["internasjonal", "klassisk"],
    firstLetter: "A"
  },
  {
    id: 189,
    name: "Alicia",
    gender: "girl",
    origin: "Germansk",
    meaning: "Av edel type, variant av Alice",
    popularity: 30,
    length: "medium",
    categories: ["internasjonal", "moderne"],
    firstLetter: "A"
  },
  {
    id: 190,
    name: "Alina",
    gender: "girl",
    origin: "Gresk/Slavisk",
    meaning: "Lys, strålende",
    popularity: 40,
    length: "medium",
    categories: ["internasjonal", "moderne"],
    firstLetter: "A"
  },
  {
    id: 191,
    name: "Alise",
    gender: "girl",
    origin: "Germansk",
    meaning: "Av edel type, variant av Alice",
    popularity: 25,
    length: "medium",
    categories: ["internasjonal", "moderne"],
    firstLetter: "A"
  },
  {
    id: 192,
    name: "Amalia",
    gender: "girl",
    origin: "Germansk",
    meaning: "Arbeid, aktivitet",
    popularity: 43,
    length: "medium",
    categories: ["klassisk", "internasjonal"],
    firstLetter: "A"
  },
  {
    id: 193,
    name: "Amelia",
    gender: "girl",
    origin: "Germansk",
    meaning: "Arbeid, strev",
    popularity: 58,
    length: "medium",
    categories: ["internasjonal", "populær"],
    firstLetter: "A"
  },
  {
    id: 194,
    name: "Amelie",
    gender: "girl",
    origin: "Fransk variant av Amelia",
    meaning: "Arbeid, strev",
    popularity: 46,
    length: "medium",
    categories: ["internasjonal", "moderne"],
    firstLetter: "A"
  },
  {
    id: 195,
    name: "Amina",
    gender: "girl",
    origin: "Arabisk",
    meaning: "Pålitelig, trofast",
    popularity: 44,
    length: "medium",
    categories: ["internasjonal", "moderne"],
    firstLetter: "A"
  },
  {
    id: 196,
    name: "Amira",
    gender: "girl",
    origin: "Arabisk",
    meaning: "Prinsesse, leder",
    popularity: 32,
    length: "medium",
    categories: ["internasjonal", "moderne"],
    firstLetter: "A"
  },
  {
    id: 197,
    name: "Anastasia",
    gender: "girl",
    origin: "Gresk",
    meaning: "Oppstandelse",
    popularity: 35,
    length: "medium",
    categories: ["internasjonal", "klassisk"],
    firstLetter: "A"
  },
  {
    id: 198,
    name: "Andrea",
    gender: "girl",
    origin: "Gresk",
    meaning: "Modig, sterk (kvinnelig form av Andreas)",
    popularity: 65,
    length: "medium",
    categories: ["internasjonal", "populær"],
    firstLetter: "A"
  },
  {
    id: 199,
    name: "Andrine",
    gender: "girl",
    origin: "Gresk",
    meaning: "Modig, mannlig (kvinnelig form av Andreas)",
    popularity: 45,
    length: "medium",
    categories: ["nordisk", "moderne"],
    firstLetter: "A"
  },
  {
    id: 200,
    name: "Ane",
    gender: "girl",
    origin: "Hebraisk",
    meaning: "Nåde, ynde",
    popularity: 38,
    length: "short",
    categories: ["nordisk", "klassisk"],
    firstLetter: "A"
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
