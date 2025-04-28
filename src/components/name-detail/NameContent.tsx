
import { BabyName } from "@/data/types";
import NameInfo from "./NameInfo";
import NameInspiration from "./NameInspiration";
import RelatedNames from "@/components/RelatedNames";
import AdSpace from "@/components/AdSpace";

interface NameContentProps {
  name: BabyName;
  getGenderLabel: () => string;
}

export const NameContent = ({ name, getGenderLabel }: NameContentProps) => {
  return (
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
  );
};
