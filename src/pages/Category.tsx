
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { nameCategories } from "@/data";
import CategoryHeader from "@/components/category/CategoryHeader";
import CategoryContent from "@/components/category/CategoryContent";
import { useCategoryNames } from "@/hooks/useCategoryNames";

const Category = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = nameCategories.find(c => c.id === categoryId);
  const { filteredNames, loading, handleFilter } = useCategoryNames(categoryId || "");
  
  if (!category) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
          <h1 className="text-2xl font-bold mb-4">Kategori ikke funnet</h1>
          <p>Beklager, vi kunne ikke finne kategorien du leter etter.</p>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <CategoryHeader category={category} />
        <CategoryContent 
          initialNames={filteredNames} 
          loading={loading} 
          onFilter={handleFilter} 
        />
      </main>
      <Footer />
    </div>
  );
};

export default Category;
