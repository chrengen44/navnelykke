import { useState } from 'react';
import { Link } from 'react-router-dom';
import MobileMenu from './MobileMenu';
import { Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useFavorites } from '@/contexts/FavoritesContext';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { favoritesCount } = useFavorites();

  return (
    <header className="bg-white shadow-sm">
      <div className="bg-pink-50 py-2 text-center text-pink-700">
        Oppdag de nyeste navnene og trendene!
      </div>

      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-pink-600">Navnelykke</Link>
        
        <div className="hidden md:flex gap-6">
          <Link to="/populære-navn" className="text-gray-600 hover:text-pink-600">Populære navn</Link>
          <Link to="/navnetrender" className="text-gray-600 hover:text-pink-600">Navnetrender</Link>
          <Link to="/kategorier" className="text-gray-600 hover:text-pink-600">Kategorier</Link>
          <Link to="/inspirasjon" className="text-gray-600 hover:text-pink-600">Inspirasjon</Link>
          <Link to="/kontakt-oss" className="text-gray-600 hover:text-pink-600">Foreslå navn</Link>
          <Link to="/social-features" className="text-gray-600 hover:text-pink-600">Navnefellesskapet</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/favoritter" className="flex items-center gap-2 text-gray-600 hover:text-pink-600">
            <Heart className={`h-5 w-5 ${favoritesCount > 0 ? 'text-pink-500 fill-pink-500' : ''}`} />
            <span className="hidden md:inline">Mine favoritter</span>
            {favoritesCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 bg-pink-500 text-white text-xs font-bold rounded-full">
                {favoritesCount}
              </span>
            )}
          </Link>
          
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden text-gray-600 hover:text-pink-600 focus:outline-none"
            aria-label="Åpne mobilmeny"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </nav>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
};

export default Header;
