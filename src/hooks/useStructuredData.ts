
import { BabyName } from "@/data/types";
import { useMemo } from "react";

export const useStructuredData = () => {
  // Helper function to safely get the site URL (including base path for GitHub Pages project sites)
  const getSiteUrl = () => {
    if (typeof window === "undefined") {
      return "https://navnelykke.no"; // Fallback or your default domain
    }

    const knownRouteRoots = new Set([
      "navn",
      "populære-navn",
      "navnetrender",
      "kategorier",
      "kategori",
      "favoritter",
      "inspirasjon",
      "søk",
      "foresla-navn",
      "profil",
      "admin",
      "opprinnelse",
      "om-navnelykke",
      "kontakt-oss",
      "personvern",
      "test",
      "verktoy",
      "kulturelle-navn",
      "poll",
      "auth",
      "sikkerhet",
      "name-lists",
      "name-list",
      "artikkel",
    ]);

    const first = window.location.pathname.split("/").filter(Boolean)[0] ?? "";
    const basePath = first && !knownRouteRoots.has(first) ? `/${first}` : "";

    return `${window.location.origin}${basePath}`;
  };

  // Memoize the site URL to avoid recalculation
  const origin = useMemo(() => getSiteUrl(), []);

  const getWebsiteData = () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Navnelykke",
    "url": origin,
    "description": "Finn det perfekte navnet til din baby",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${origin}/søk?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  });

  const getNameData = (name: BabyName) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${name.name} - Betydning og opprinnelse`,
    "description": `Les mer om navnet ${name.name}, dets betydning (${name.meaning}) og ${name.origin} opprinnelse.`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${origin}/navn/${name.id}`
    },
    "about": {
      "@type": "Thing",
      "name": name.name,
      "description": name.meaning
    }
  });

  const getBreadcrumbData = (items: Array<{ name: string; url: string }>) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${origin}${item.url}`
    }))
  });

  const getArticleData = (title: string, description: string, path: string) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Organization",
      "name": "Navnelykke"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Navnelykke",
      "logo": {
        "@type": "ImageObject",
        "url": `${origin}/og-image.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${origin}${path}`
    },
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString()
  });

  const getCollectionPageData = (title: string, description: string, path: string) => ({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": title,
    "description": description,
    "url": `${origin}${path}`,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": []
    }
  });

  // Updated to correctly use 'item' instead of 'url' for compatibility
  const getListData = (items: Array<{ name: string; item: string; position: number }>) => ({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": items.map(item => ({
      "@type": "ListItem",
      "position": item.position,
      "name": item.name,
      "item": `${origin}${item.item}`
    }))
  });

  const getNameDetailData = (name: BabyName) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name.name,
    "description": `${name.name} er et ${name.gender === 'boy' ? 'guttenavn' : name.gender === 'girl' ? 'jentenavn' : 'unisex navn'} med ${name.origin} opprinnelse. Betydning: ${name.meaning}`,
    "category": name.categories?.join(", ") || "",
    "url": `${origin}/navn/${name.id}`,
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "gender",
        "value": name.gender
      },
      {
        "@type": "PropertyValue",
        "name": "origin",
        "value": name.origin
      },
      {
        "@type": "PropertyValue",
        "name": "meaning",
        "value": name.meaning
      }
    ]
  });

  return {
    getWebsiteData,
    getNameData,
    getBreadcrumbData,
    getArticleData,
    getCollectionPageData,
    getListData,
    getNameDetailData
  };
};
