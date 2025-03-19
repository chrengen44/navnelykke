
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Baby, Heart, Menu, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserMenu from "@/components/UserMenu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 bg-white border-b border-gray-100 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Baby className="h-6 w-6 text-pink-500" />
          <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
            Navnelykke
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/kategorier" className="font-medium text-gray-600 hover:text-pink-500 transition">
            Kategorier
          </Link>
          <Link to="/populaere" className="font-medium text-gray-600 hover:text-pink-500 transition">
            Populære Navn
          </Link>
          <Link to="/inspirasjon" className="font-medium text-gray-600 hover:text-pink-500 transition">
            Inspirasjon
          </Link>
        </nav>

        {/* Desktop Search and User Menu */}
        <div className="hidden md:flex items-center gap-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder="Søk etter navn..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48 lg:w-64"
            />
            <Button type="submit" variant="outline" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </form>
          <UserMenu />
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Lukk meny" : "Åpne meny"}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 shadow-md">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                type="text"
                placeholder="Søk etter navn..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </form>

            <nav className="flex flex-col gap-3">
              <Link 
                to="/kategorier" 
                className="font-medium text-gray-600 hover:text-pink-500 transition py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Kategorier
              </Link>
              <Link 
                to="/populaere" 
                className="font-medium text-gray-600 hover:text-pink-500 transition py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Populære Navn
              </Link>
              <Link 
                to="/inspirasjon" 
                className="font-medium text-gray-600 hover:text-pink-500 transition py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Inspirasjon
              </Link>
            </nav>
            
            {/* Add UserMenu to mobile view as well */}
            <div className="py-2">
              <UserMenu />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
