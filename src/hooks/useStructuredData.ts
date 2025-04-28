
import { BabyName } from "@/data/types";

export const useStructuredData = () => {
  const getWebsiteData = () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Navnelykke",
    "url": window.location.origin,
    "description": "Finn det perfekte navnet til din baby",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${window.location.origin}/søk?q={search_term_string}`
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
      "@id": `${window.location.origin}/navn/${name.id}`
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
      "item": `${window.location.origin}${item.url}`
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
        "url": `${window.location.origin}/og-image.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${window.location.origin}${path}`
    },
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString()
  });

  return {
    getWebsiteData,
    getNameData,
    getBreadcrumbData,
    getArticleData
  };
};
