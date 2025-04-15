import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BabyName } from "@/data/types";
import RelatedNames from "@/components/RelatedNames";
import AdSpace from "@/components/AdSpace";
import { Badge } from "@/components/ui/badge";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import FavoriteButton from "@/components/FavoritesButton";
import { trackNameVisit, fetchNameById } from "@/integrations/supabase/client";
import { toast } from "sonner";

const NameDetail = () => {
  const { nameId } = useParams<{ nameId: string }>();
  const [name, setName] = useState<BabyName | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const getNameDetails = async () => {
      setLoading(true);
      setError(null);
      
      try {
        if (!nameId) {
          setError("Navn-ID mangler");
          toast.error("Navn-ID mangler");
          setLoading(false);
          return;
        }
        
        const parsedId = parseInt(nameId, 10);
        if (isNaN(parsedId)) {
          setError(`Ugyldig navn-ID: ${nameId}`);
          toast.error("Ugyldig navn-ID");
          setLoading(false);
          return;
        }
        
        console.log("Fetching name with ID:", parsedId);
        const nameData = await fetchNameById(parsedId);
        
        if (nameData) {
          console.log("Name data retrieved:", nameData);
          setName(nameData);
          
          trackNameVisit(nameData.id);
        } else {
          console.error("No name data returned for ID:", nameId);
          setError(`Kunne ikke finne navnet med ID ${nameId}`);
          toast.error("Kunne ikke finne navnet");
        }
      } catch (err) {
        console.error("Error fetching name details:", err);
        setError("En feil oppstod ved henting av navn");
        toast.error("Feil ved henting av navn");
      } finally {
        setLoading(false);
      }
    };
    
    getNameDetails();
  }, [nameId]);
  
  const getGenderColorClass = () => {
    if (!name) return "bg-gray-100";
    
    switch (name.gender) {
      case "boy":
        return "bg-babyblue";
      case "girl":
        return "bg-babypink";
      case "unisex":
        return "bg-babypurple";
      default:
        return "bg-gray-100";
    }
  };
  
  const getGenderLabel = () => {
    if (!name) return "";
    
    switch (name.gender) {
      case "boy":
        return "Guttenavn";
      case "girl":
        return "Jentenavn";
      case "unisex":
        return "Unisex navn";
      default:
        return "";
    }
  };
  
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!name || error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Navn ikke funnet</h1>
            <p className="mb-6">{error || "Beklager, vi kunne ikke finne navnet du leter etter."}</p>
            <Button asChild>
              <Link to="/populære-navn">Se populære navn</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className={`py-12 ${getGenderColorClass()}`}>
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-between items-start">
                <div>
                  <Badge variant="outline" className="mb-2 bg-white/70 backdrop-blur-sm">
                    {getGenderLabel()}
                  </Badge>
                  <h1 className="text-4xl md:text-5xl font-bold mb-2">{name.name}</h1>
                  <p className="text-xl text-gray-700">{name.meaning}</p>
                </div>
                <div className="flex gap-2">
                  <FavoriteButton nameId={name.id} />
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-white/70 backdrop-blur-sm text-gray-500"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Om navnet</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-700">Opprinnelse</h3>
                      <p>{name.origin}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-700">Betydning</h3>
                      <p>{name.meaning}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-700">Popularitet</h3>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-pink-500 h-2.5 rounded-full"
                          style={{ width: `${name.popularity}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {name.popularity > 80
                          ? "Svært populært"
                          : name.popularity > 60
                          ? "Populært"
                          : name.popularity > 40
                          ? "Moderat populært"
                          : name.popularity > 20
                          ? "Mindre vanlig"
                          : "Sjeldent"}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-4">Kategorier</h2>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {name.categories.map(category => (
                      <Link key={category} to={`/kategori/${category}`}>
                        <Badge className="px-3 py-1.5 text-base bg-gray-100 hover:bg-gray-200 text-gray-800 cursor-pointer">
                          {category}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                  
                  <h2 className="text-xl font-semibold mb-4 mt-8">Detaljer</h2>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Kjønn:</span>
                      <span className="font-medium">{getGenderLabel()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lengde:</span>
                      <span className="font-medium capitalize">{name.length === "short" ? "Kort" : name.length === "medium" ? "Middels" : "Langt"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Forbokstav:</span>
                      <span className="font-medium">{name.firstLetter}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <AdSpace type="horizontal" />
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Navneinspiration</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="mb-4">
                    {name.name} er {name.gender === "boy" ? "et" : name.gender === "girl" ? "et" : "et"} 
                    {" "}{name.gender === "boy" ? "guttenavn" : name.gender === "girl" ? "jentenavn" : "unisex navn"} med 
                    {" "}{name.origin.toLowerCase()} opprinnelse som betyr "{name.meaning}".
                  </p>
                  <p>
                    {name.categories.includes("klassisk") 
                      ? "Dette er et klassisk navn med lang tradisjon." 
                      : name.categories.includes("moderne") 
                      ? "Dette navnet har blitt populært i nyere tid." 
                      : name.categories.includes("unik") 
                      ? "Dette er et unikt navn som vil skille seg ut." 
                      : "Dette navnet har en rik kulturell bakgrunn."}
                    {" "}
                    {name.popularity > 80 
                      ? "Navnet er svært populært i Norge akkurat nå." 
                      : name.popularity > 60 
                      ? "Navnet er ganske populært i Norge." 
                      : name.popularity > 40 
                      ? "Navnet har moderat popularitet i Norge." 
                      : "Navnet er mindre vanlig i Norge, noe som gjør det mer unikt."}
                  </p>
                </div>
              </div>
              
              <RelatedNames currentName={name} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NameDetail;
