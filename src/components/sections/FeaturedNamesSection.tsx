import React from "react";
import FeaturedSection from "@/components/FeaturedSection";
import { BabyName } from "@/data/types";
import { NameGridSkeleton } from "@/components/skeletons";

interface FeaturedNamesSectionProps {
  popularBoyNames: BabyName[];
  popularGirlNames: BabyName[];
  vikingNames: BabyName[];
  loading: boolean;
}

const FeaturedNamesSection = ({
  popularBoyNames,
  popularGirlNames,
  vikingNames,
  loading
}: FeaturedNamesSectionProps) => {
  if (loading) {
    return (
      <div className="space-y-12">
        {/* Popular boy names skeleton */}
        <section className="py-12 bg-babyblue/30">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <div className="h-8 w-48 bg-muted rounded animate-pulse mb-2" />
              <div className="h-4 w-72 bg-muted rounded animate-pulse" />
            </div>
            <NameGridSkeleton count={4} />
          </div>
        </section>
        
        {/* Popular girl names skeleton */}
        <section className="py-12 bg-babypink/30">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <div className="h-8 w-48 bg-muted rounded animate-pulse mb-2" />
              <div className="h-4 w-72 bg-muted rounded animate-pulse" />
            </div>
            <NameGridSkeleton count={4} />
          </div>
        </section>
        
        {/* Viking names skeleton */}
        <section className="py-12 bg-babypeach/30">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <div className="h-8 w-48 bg-muted rounded animate-pulse mb-2" />
              <div className="h-4 w-72 bg-muted rounded animate-pulse" />
            </div>
            <NameGridSkeleton count={4} />
          </div>
        </section>
      </div>
    );
  }

  return (
    <>
      <FeaturedSection
        title="Populære guttenavn"
        description="Utforsk de mest populære guttenavnene i Norge akkurat nå"
        names={popularBoyNames}
        linkTo="/populære-navn?gender=boy"
        backgroundClass="bg-babyblue/30"
      />
      
      <FeaturedSection
        title="Populære jentenavn"
        description="Utforsk de mest populære jentenavnene i Norge akkurat nå"
        names={popularGirlNames}
        linkTo="/populære-navn?gender=girl"
        backgroundClass="bg-babypink/30"
      />
      
      <FeaturedSection
        title="Vikingnavn med historie"
        description="Sterke og tradisjonelle nordiske navn fra vikingtiden"
        names={vikingNames}
        linkTo="/kategori/vikingnavn"
        backgroundClass="bg-babypeach/30"
      />
    </>
  );
};

export default FeaturedNamesSection;
