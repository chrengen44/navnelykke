
import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 md:hidden">
      <div className="flex justify-between items-center p-4 border-b">
        <Link to="/" className="text-xl font-bold text-pink-600">Navnelykke</Link>
        <button 
          onClick={onClose} 
          className="text-gray-600 hover:text-pink-600"
          aria-label="Lukk mobilmeny"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      <nav className="flex flex-col p-4 space-y-4">
        <Link 
          to="/populære-navn" 
          className="text-gray-600 hover:text-pink-600 py-2 border-b"
          onClick={onClose}
        >
          Populære navn
        </Link>
        <Link 
          to="/navnetrender" 
          className="text-gray-600 hover:text-pink-600 py-2 border-b"
          onClick={onClose}
        >
          Navnetrender
        </Link>
        <Link 
          to="/kategorier" 
          className="text-gray-600 hover:text-pink-600 py-2 border-b"
          onClick={onClose}
        >
          Kategorier
        </Link>
        <Link 
          to="/inspirasjon" 
          className="text-gray-600 hover:text-pink-600 py-2 border-b"
          onClick={onClose}
        >
          Inspirasjon
        </Link>
        <Link 
          to="/foreslå-navn" 
          className="text-gray-600 hover:text-pink-600 py-2 border-b"
          onClick={onClose}
        >
          Foreslå navn
        </Link>
      </nav>
    </div>
  );
};

export default MobileMenu;
