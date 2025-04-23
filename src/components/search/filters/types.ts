
export interface AdvancedFilterState {
  gender: "all" | "boy" | "girl" | "unisex";
  length: "all" | "short" | "medium" | "long";
  letter: string;
  search: string;
  meaning: string;
  origin: string;
  popularity: number[];
  excludeLetters: string;
  excludeTopPopular: boolean;
}

export interface FilterChangeHandler {
  onFilterChange: (key: keyof AdvancedFilterState, value: string | number[] | boolean) => void;
}
