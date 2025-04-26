
import { useState, useEffect } from "react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { BabyName } from "@/data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NameGrid from "@/components/NameGrid";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, Vote, List } from "lucide-react";

const Favorites = () => {
  const [favoriteNames, setFavoriteNames] = useState<BabyName[]>([]);
  const [loading, setLoading] = useState(true);
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavoriteNames = async () => {
      if (!favorites.length) {
        setFavoriteNames([]);
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching names for IDs:", favorites);
        const { data: names, error } = await supabase
          .from('baby_names')
          .select(`
            id,
            name,
            gender,
            origin,
            meaning,
            popularity,
            length,
            first_letter,
            name_category_mappings(
              name_categories(name)
            )
          `)
          .in('id', favorites);

        if (error) {
          console.error('Error fetching favorite names:', error);
          return;
        }

        const transformedNames: BabyName[] = names.map(name => ({
          id: name.id,
          name: name.name,
          gender: name.gender as 'boy' | 'girl' | 'unisex',
          origin: name.origin,
          meaning: name.meaning,
          popularity: name.popularity,
          length: name.length as 'short' | 'medium' | 'long',
          firstLetter: name.first_letter,
          categories: name.name_category_mappings.map(
            (mapping: any) => mapping.name_categories.name
          )
        }));

        console.log("Fetched and transformed names:", transformedNames);
        setFavoriteNames(transformedNames);
      } catch (error) {
        console.error('Error in fetchFavoriteNames:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteNames();
  }, [favorites]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h1 className="text-3xl font-bold">Mine favoritter</h1>
            {favoriteNames.length > 0 && (
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => navigate("/poll/create")}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Vote className="h-4 w-4" />
                  Opprett navneavstemning
                </Button>
                <Button
                  onClick={() => navigate("/name-lists")}
                  variant="default"
                  className="flex items-center gap-2"
                >
                  <List className="h-4 w-4" />
                  Mine navnelister
                </Button>
              </div>
            )}
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <p>Laster favoritter...</p>
            </div>
          ) : favoriteNames.length > 0 ? (
            <NameGrid 
              names={favoriteNames} 
              showDetails={true}
              emptyMessage="Du har ingen favoritter ennå. Utforsk navn og legg til noen!"
              linkToDetail={true}
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
