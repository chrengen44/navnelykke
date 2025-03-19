
import { BabyName, getPopularNames } from "@/data";
import NameCard from "./NameCard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface FeaturedSectionProps {
  title: string;
  description?: string;
  names: BabyName[];
  linkText?: string;
  linkTo: string;
  backgroundClass?: string;
}

const FeaturedSection = ({
  title,
  description,
  names,
  linkText = "Se alle",
  linkTo,
  backgroundClass = "bg-gray-50",
}: FeaturedSectionProps) => {
  return (
    <section className={`py-12 ${backgroundClass}`}>
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">{title}</h2>
          {description && <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {names.slice(0, 4).map((name) => (
            <Link key={name.id} to={`/navn/${name.id}`} className="block h-full">
              <NameCard name={name} />
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" className="group">
            <Link to={linkTo} className="flex items-center">
              {linkText}
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
