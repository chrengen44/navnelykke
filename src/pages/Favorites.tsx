
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { BabyName } from "@/data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NameGrid from "@/components/NameGrid";
import { babyNames } from "@/data";

const Favorites = () => {
  const [favorites, setFavorites] = useState<BabyName[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const fetchFavorites = async () => {
      try {
        const { data, error } = await supabase
          .from("favorites")
          .select("name_id")
          .eq("user_id", user.id);

        if (error) throw error;

        // Map favorite IDs to actual baby name objects
        const nameIds = data.map(item => item.name_id);
        const favoriteNames = babyNames.filter(name => nameIds.includes(name.id));
        
        setFavorites(favoriteNames);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user, navigate]);

  // Set up real-time subscription for favorites
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "favorites",
          filter: `user_id=eq.${user.id}`
        },
        () => {
          // Refetch favorites when there's a change
          const fetchFavorites = async () => {
            try {
              const { data, error } = await supabase
                .from("favorites")
                .select("name_id")
                .eq("user_id", user.id);

              if (error) throw error;

              const nameIds = data.map(item => item.name_id);
              const favoriteNames = babyNames.filter(name => nameIds.includes(name.id));
              
              setFavorites(favoriteNames);
            } catch (error) {
              console.error("Error refetching favorites:", error);
            }
          };

          fetchFavorites();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Mine favoritter</h1>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
            </div>
          ) : favorites.length > 0 ? (
            <NameGrid 
              names={favorites} 
              showDetails={true}
              emptyMessage="Du har ingen favoritter ennå. Utforsk navn og legg til noen!"
            />
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Ingen favoritter ennå</h2>
              <p className="text-gray-600 mb-6">
                Du har ikke lagt til noen favoritter ennå. Utforsk navn og klikk på hjertet for å legge til favoritter.
              </p>
              <button
                onClick={() => navigate("/populaere")}
                className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition"
              >
                Utforsk populære navn
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Favorites;
