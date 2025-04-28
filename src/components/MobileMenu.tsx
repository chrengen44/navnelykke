
import React from 'react';
import { Link } from 'react-router-dom';
import { X, User, Heart, Search, Home, TrendingUp, Grid, Lightbulb, MessageSquare } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 md:hidden">
      <div 
        className={`fixed inset-y-0 right-0 w-[80%] max-w-sm bg-white shadow-xl transform transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <Link to="/" className="text-xl font-bold text-pink-600" onClick={onClose}>
            Navnelykke
          </Link>
          <button 
            onClick={onClose} 
            className="text-gray-600 hover:text-pink-600 transition-colors p-2 hover:bg-pink-50 rounded-full"
            aria-label="Lukk mobilmeny"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex flex-col p-4 space-y-2 overflow-y-auto max-h-[calc(100vh-5rem)]">
          {/* Main Navigation */}
          <div className="space-y-1">
            <Link 
              to="/"
              className="flex items-center gap-3 p-3 text-gray-700 hover:bg-pink-50 rounded-lg transition-colors"
              onClick={onClose}
            >
              <Home className="h-5 w-5 text-pink-500" />
              <span>Hjem</span>
            </Link>
            <Link 
              to="/populære-navn"
              className="flex items-center gap-3 p-3 text-gray-700 hover:bg-pink-50 rounded-lg transition-colors"
              onClick={onClose}
            >
              <TrendingUp className="h-5 w-5 text-pink-500" />
              <span>Populære navn</span>
            </Link>
            <Link 
              to="/søk"
              className="flex items-center gap-3 p-3 text-gray-700 hover:bg-pink-50 rounded-lg transition-colors"
              onClick={onClose}
            >
              <Search className="h-5 w-5 text-pink-500" />
              <span>Søk</span>
            </Link>
          </div>

          {/* Categories Section */}
          <div className="pt-4 border-t">
            <div className="px-3 text-sm font-medium text-gray-500 mb-2">Utforsk</div>
            <div className="space-y-1">
              <Link 
                to="/kategorier"
                className="flex items-center gap-3 p-3 text-gray-700 hover:bg-pink-50 rounded-lg transition-colors"
                onClick={onClose}
              >
                <Grid className="h-5 w-5 text-pink-500" />
                <span>Kategorier</span>
              </Link>
              <Link 
                to="/inspirasjon"
                className="flex items-center gap-3 p-3 text-gray-700 hover:bg-pink-50 rounded-lg transition-colors"
                onClick={onClose}
              >
                <Lightbulb className="h-5 w-5 text-pink-500" />
                <span>Inspirasjon</span>
              </Link>
            </div>
          </div>

          {/* User Section */}
          <div className="pt-4 border-t">
            <div className="space-y-1">
              <Link 
                to="/kontakt-oss"
                className="flex items-center gap-3 p-3 text-gray-700 hover:bg-pink-50 rounded-lg transition-colors"
                onClick={onClose}
              >
                <MessageSquare className="h-5 w-5 text-pink-500" />
                <span>Foreslå navn</span>
              </Link>
              {user && (
                <Link 
                  to="/profil"
                  className="flex items-center gap-3 p-3 text-gray-700 hover:bg-pink-50 rounded-lg transition-colors"
                  onClick={onClose}
                >
                  <User className="h-5 w-5 text-pink-500" />
                  <span>Min konto</span>
                </Link>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
