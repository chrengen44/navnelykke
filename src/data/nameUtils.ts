
import { fetchPopularNames } from "@/integrations/supabase/popular-names";
import { fetchNamesByCategory } from "@/integrations/supabase/category-queries";
import { searchNames } from "@/integrations/supabase/search";
import { fetchAllNames, fetchNameById } from "@/integrations/supabase/name-queries";
import { BabyName } from "./types";

// Export the direct functions for backward compatibility
export const getPopularNames = async (gender?: 'boy' | 'girl' | 'unisex', limit = 10): Promise<BabyName[]> => {
  return fetchPopularNames(gender, limit);
};

export const getNamesByCategory = async (category: string, limit?: number): Promise<BabyName[]> => {
  const names = await fetchNamesByCategory(category);
  return limit ? names.slice(0, limit) : names;
};

export const getNameById = async (id: number): Promise<BabyName | null> => {
  return fetchNameById(id);
};

export const getAllNames = async (): Promise<BabyName[]> => {
  return fetchAllNames();
};

export const getPopularityData = async (gender?: 'boy' | 'girl' | 'unisex') => {
  const popularNames = await fetchPopularNames(gender, 5);

  const labels = popularNames.map((name) => name.name);
  const data = popularNames.map((name) => name.popularity);

  return {
    labels,
    datasets: [
      {
        label: 'Popularity',
        data,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };
};

export const getCategoryData = async (category: string) => {
  const names = await fetchNamesByCategory(category);

  const labels = names.map((name) => name.name);
  const data = names.map((name) => name.popularity);

  return {
    labels,
    datasets: [
      {
        label: 'Popularity',
        data,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };
};

export const getSearchData = async (searchTerm: string) => {
  const names = await searchNames(searchTerm);

  const labels = names.map((name) => name.name);
  const data = names.map((name) => name.popularity);

  return {
    labels,
    datasets: [
      {
        label: 'Popularity',
        data,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };
};

export const getAllNamesData = async () => {
  const allNames = await fetchAllNames();

  const labels = allNames.map((name) => name.name);
  const data = allNames.map((name) => name.popularity);

  return {
    labels,
    datasets: [
      {
        label: 'Popularity',
        data,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };
};
