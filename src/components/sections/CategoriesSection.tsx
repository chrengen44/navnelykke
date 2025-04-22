
import React from "react";
import CategoryCard from "@/components/CategoryCard";
import { nameCategories } from "@/data";

const CategoriesSection = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Utforsk etter kategorier</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Finn inspirasjon fra ulike typer navn og tradisjoner
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Cultural Names Card */}
          <CategoryCard
            id="kulturelle-navn"
            title="Kulturelle navn"
            description="Utforsk navn fra forskjellige kulturer og religiøse tradisjoner"
            icon="book"
          />
          {nameCategories.map((category) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              title={category.title}
              description={category.description}
              icon={category.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
