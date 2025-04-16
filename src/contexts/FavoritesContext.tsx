
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the context type
interface FavoritesContextType {
  favorites: number[];
  addFavorite: (nameId: number) => void;
  removeFavorite: (nameId: number) => void;
  isFavorite: (nameId: number) => boolean;
  favoritesCount: number;
}

// Create context with default values
const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
  favoritesCount: 0
});

// Custom hook to use the favorites context
export const useFavorites = () => useContext(FavoritesContext);

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<number[]>([]);

  // Load favorites from localStorage on initial render
  useEffect(() => {
    const storedFavorites = localStorage.getItem('babyNameFavorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('babyNameFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (nameId: number) => {
    setFavorites(prev => {
      if (!prev.includes(nameId)) {
        return [...prev, nameId];
      }
      return prev;
    });
  };

  const removeFavorite = (nameId: number) => {
    setFavorites(prev => prev.filter(id => id !== nameId));
  };

  const isFavorite = (nameId: number) => {
    return favorites.includes(nameId);
  };

  return (
    <FavoritesContext.Provider 
      value={{ 
        favorites, 
        addFavorite, 
        removeFavorite, 
        isFavorite,
        favoritesCount: favorites.length
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
