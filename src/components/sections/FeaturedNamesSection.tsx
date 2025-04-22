
import React from "react";
import FeaturedSection from "@/components/FeaturedSection";
import { BabyName } from "@/data/types";

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
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
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
