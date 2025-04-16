import { Link } from "react-router-dom";
import { Baby, Heart, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Baby className="h-6 w-6 text-pink-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
                Navnelykke
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Hjelper fremtidige foreldre med å finne det perfekte navnet til sitt barn.
            </p>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-pink-500" />
              <span className="text-gray-600">Lagd med kjærlighet for norske familier</span>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Utforsk</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/kategorier" className="text-gray-600 hover:text-pink-500 transition">
                  Navnekategorier
                </Link>
              </li>
              <li>
                <Link to="/populære-navn" className="text-gray-600 hover:text-pink-500 transition">
                  Populære navn
                </Link>
              </li>
              <li>
                <Link to="/inspirasjon" className="text-gray-600 hover:text-pink-500 transition">
                  Navneinspirasjon
                </Link>
              </li>
              <li>
                <Link to="/søk" className="text-gray-600 hover:text-pink-500 transition">
                  Navnesøk
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Om oss</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-pink-500 transition">
                  Om Navnelykke
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-pink-500 transition">
                  Kontakt oss
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 text-center text-gray-500 text-sm">
          <p>© {currentYear} Navnelykke. Alle rettigheter reservert.</p>
          <p className="mt-2">
            Denne nettsiden er kun for informasjonsformål. 
            Innholdet er ikke ment som profesjonell rådgivning.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
