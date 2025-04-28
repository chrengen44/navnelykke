
import React from 'react';
import { BookOpen } from "lucide-react";
import BlogPostLayout from '@/components/BlogPostLayout';
import StructuredData from '@/components/SEO/StructuredData';
import { useStructuredData } from '@/hooks/useStructuredData';

const DigitalNamingArticle = () => {
  const { getArticleData, getBreadcrumbData } = useStructuredData();

  const title = "Navngiving i den digitale tidsalderen";
  const description = "En utforskning av moderne navngiving og hvordan teknologi påvirker våre valg";
  const path = "/artikkel/navngiving-digital";

  // Create individual data objects
  const articleData = getArticleData(title, description, path);
  const breadcrumbData = getBreadcrumbData([
    { name: "Hjem", url: "/" },
    { name: "Inspirasjon", url: "/inspirasjon" },
    { name: title, url: path }
  ]);

  // Combine structured data safely and filter out any nullish values
  const structuredData = [articleData, breadcrumbData].filter(Boolean);

  return (
    <BlogPostLayout title={title}>
      {/* Only render StructuredData if we have valid data */}
      {structuredData.length > 0 && <StructuredData data={structuredData} />}
      
      <article className="prose prose-lg lg:prose-xl max-w-4xl mx-auto">
        {/* Hero section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-2 bg-babyblue rounded-full mb-4">
            <BookOpen className="h-6 w-6 text-blue-700" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Navngiving i den digitale tidsalderen
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            En utforskning av moderne navngiving og hvordan teknologi påvirker våre valg
          </p>
        </div>

        {/* Embedded presentation */}
        <div className="mb-12">
          <div className="aspect-video w-full">
            <iframe 
              src="https://gamma.app/embed/jh4zszoozgg9lsq" 
              className="w-full h-[600px] rounded-lg shadow-lg"
              allow="fullscreen" 
              title="The Art of Baby Naming in the Digital Age">
            </iframe>
          </div>
        </div>
      </article>
    </BlogPostLayout>
  );
};

export default DigitalNamingArticle;
