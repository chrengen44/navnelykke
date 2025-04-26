
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MobileMenu from './MobileMenu';
import { useAuth } from '@/hooks/useAuth';
import UserMenu from '@/components/UserMenu';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header>
      {/* Announcement banner */}
      <div className="bg-pink-50 py-2 text-center text-pink-700">
        Oppdag de nyeste navnene og trendene!
      </div>

      {/* Navigation - fixed to the top */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-pink-600">Navnelykke</Link>
          
          <div className="hidden md:flex gap-6">
            <Link to="/populære-navn" className="text-gray-600 hover:text-pink-600">Populære navn</Link>
            <Link to="/navnetrender" className="text-gray-600 hover:text-pink-600">Navnetrender</Link>
            <Link to="/kategorier" className="text-gray-600 hover:text-pink-600">Kategorier</Link>
            <Link to="/inspirasjon" className="text-gray-600 hover:text-pink-600">Inspirasjon</Link>
            <Link to="/kontakt-oss" className="text-gray-600 hover:text-pink-600">Foreslå navn</Link>
          </div>

          <div className="flex items-center gap-4">
            <UserMenu />
            
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
        </div>
      </nav>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
};

export default Header;
