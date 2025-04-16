import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { LogOut, User, Heart, Settings } from 'lucide-react';
import MobileMenu from './MobileMenu';

const Header = () => {
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logget ut!",
        description: "Du er nå logget ut av kontoen din.",
      });
    } catch (error) {
      console.error("Logout failed:", error);
      toast({
        variant: "destructive",
        title: "Beklager!",
        description: "Det oppstod en feil under utlogging.",
      });
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="bg-pink-50 py-2 text-center text-pink-700">
        Oppdag de nyeste navnene og trendene!
      </div>

      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-pink-600">BabyName</Link>
        
        <div className="hidden md:flex gap-6">
          <Link to="/populære-navn" className="text-gray-600 hover:text-pink-600">Populære navn</Link>
          <Link to="/navnetrender" className="text-gray-600 hover:text-pink-600">Navnetrender</Link>
          <Link to="/kategorier" className="text-gray-600 hover:text-pink-600">Kategorier</Link>
          <Link to="/inspirasjon" className="text-gray-600 hover:text-pink-600">Inspirasjon</Link>
          <Link to="/foresla-navn" className="text-gray-600 hover:text-pink-600">Foreslå navn</Link>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {user.email?.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>Min konto</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link to="/profil">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profil</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/favoritter">
                    <Heart className="mr-2 h-4 w-4" />
                    <span>Favoritter</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/admin">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Admin</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onSelect={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logg ut</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/auth/login" className="text-gray-600 hover:text-pink-600">Logg inn</Link>
              <Link to="/auth/register" className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 transition-colors">Registrer</Link>
            </>
          )}
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
