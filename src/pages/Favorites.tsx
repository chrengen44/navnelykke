
import { useState, useEffect } from "react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { BabyName } from "@/data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NameGrid from "@/components/NameGrid";
import { babyNames } from "@/data";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const [favoriteNames, setFavoriteNames] = useState<BabyName[]>([]);
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  useEffect(() => {
    // Map favorite IDs to actual baby name objects
    const names = babyNames.filter(name => favorites.includes(name.id));
    setFavoriteNames(names);
  }, [favorites]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Mine favoritter</h1>
          
          {favoriteNames.length > 0 ? (
            <NameGrid 
              names={favoriteNames} 
              showDetails={true}
              emptyMessage="Du har ingen favoritter ennå. Utforsk navn og legg til noen!"
            />
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Ingen favoritter ennå</h2>
              <p className="text-gray-600 mb-6">
                Du har ikke lagt til noen favoritter ennå. Utforsk navn og klikk på hjertet for å legge til favoritter.
              </p>
              <Button
                onClick={() => navigate("/populære-navn")}
                className="bg-pink-500 hover:bg-pink-600"
              >
                Utforsk populære navn
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Favorites;
