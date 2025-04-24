import { fetchPopularNames } from "@/integrations/supabase/popular-names";
import { fetchNamesByCategory } from "@/integrations/supabase/category-queries";
import { searchNames } from "@/integrations/supabase/search";
import { fetchAllNames } from "@/integrations/supabase/name-queries";

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
