import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BabyName } from "@/data/types";
import RelatedNames from "@/components/RelatedNames";
import AdSpace from "@/components/AdSpace";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { trackNameVisit } from "@/integrations/supabase/client";
import { toast } from "sonner";
import NameHeader from "@/components/name-detail/NameHeader";
import NameInfo from "@/components/name-detail/NameInfo";
import NameInspiration from "@/components/name-detail/NameInspiration";

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
        <NameHeader 
          name={name} 
          getGenderLabel={getGenderLabel} 
          getGenderColorClass={getGenderColorClass} 
        />
        
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <NameInfo name={name} getGenderLabel={getGenderLabel} />
              
              <div className="mb-8">
                <AdSpace type="horizontal" />
              </div>
              
              <NameInspiration name={name} />
              
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
