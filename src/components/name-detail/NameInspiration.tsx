
import { BabyName } from "@/data/types";

interface NameInspirationProps {
  name: BabyName;
}

const NameInspiration = ({ name }: NameInspirationProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Navneinspiration</h2>
      <div className="bg-gray-50 p-6 rounded-lg">
        <p className="mb-4">
          {name.name} er {name.gender === "boy" ? "et" : name.gender === "girl" ? "et" : "et"} 
          {" "}{name.gender === "boy" ? "guttenavn" : name.gender === "girl" ? "jentenavn" : "unisex navn"} med 
          {" "}{name.origin.toLowerCase()} opprinnelse som betyr "{name.meaning}".
        </p>
        <p>
          {name.categories.includes("klassisk") 
            ? "Dette er et klassisk navn med lang tradisjon." 
            : name.categories.includes("moderne") 
            ? "Dette navnet har blitt populært i nyere tid." 
            : name.categories.includes("unik") 
            ? "Dette er et unikt navn som vil skille seg ut." 
            : "Dette navnet har en rik kulturell bakgrunn."}
          {" "}
          {name.popularity > 80 
            ? "Navnet er svært populært i Norge akkurat nå." 
            : name.popularity > 60 
            ? "Navnet er ganske populært i Norge." 
            : name.popularity > 40 
            ? "Navnet har moderat popularitet i Norge." 
            : "Navnet er mindre vanlig i Norge, noe som gjør det mer unikt."}
        </p>
      </div>
    </div>
  );
};

export default NameInspiration;
