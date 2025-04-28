
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BabyName } from "@/data/types";
import { Layout } from "@/components/Layout";
import { trackNameVisit, fetchNameById } from "@/integrations/supabase/name-queries";
import { toast } from "sonner";
import NameHeader from "@/components/name-detail/NameHeader";
import { LoadingState } from "@/components/name-detail/LoadingState";
import { ErrorState } from "@/components/name-detail/ErrorState";
import { NameContent } from "@/components/name-detail/NameContent";
import { useStructuredData } from "@/hooks/useStructuredData";
import StructuredData from "@/components/SEO/StructuredData";

const NameDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState<BabyName | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getNameDetailData, getBreadcrumbData } = useStructuredData();
  
  useEffect(() => {
    const getNameDetails = async () => {
      setLoading(true);
      setError(null);
      
      try {
        if (!id) {
          setError("Navn-ID mangler");
          toast.error("Navn-ID mangler");
          setLoading(false);
          return;
        }
        
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId)) {
          setError(`Ugyldig navn-ID: ${id}`);
          toast.error("Ugyldig navn-ID");
          setLoading(false);
          return;
        }
        
        const nameData = await fetchNameById(parsedId);
        
        if (nameData) {
          setName(nameData);
          trackNameVisit(nameData.id);
        } else {
          setError(`Kunne ikke finne navnet med ID ${id}`);
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
  }, [id]);
  
  // Set page metadata
  useEffect(() => {
    if (name) {
      document.title = `${name.name} - Betydning og opprinnelse | Navnelykke`;
      
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', `Les mer om navnet ${name.name}, dets betydning (${name.meaning}) og ${name.origin} opprinnelse.`);
    }
    
    return () => {
      document.title = "Navnelykke"; // Reset to default
    };
  }, [name]);
  
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
    return <LoadingState />;
  }
  
  if (!name || error) {
    return <ErrorState error={error} />;
  }

  // Create structured data
  const nameDetailData = getNameDetailData(name);
  const breadcrumbData = getBreadcrumbData([
    { name: "Hjem", url: "/" },
    { name: "Navn", url: "/populære-navn" },
    { name: name.name, url: `/navn/${name.id}` }
  ]);
  
  // Combine structured data in an array and filter out any nullish values
  const structuredDataArray = [nameDetailData, breadcrumbData].filter(Boolean);
  
  return (
    <Layout>
      {structuredDataArray.length > 0 && <StructuredData data={structuredDataArray} />}
      
      <main className="flex-grow">
        <NameHeader 
          name={name} 
          getGenderLabel={getGenderLabel} 
          getGenderColorClass={getGenderColorClass} 
        />
        <NameContent 
          name={name}
          getGenderLabel={getGenderLabel}
        />
      </main>
    </Layout>
  );
};

export default NameDetail;
