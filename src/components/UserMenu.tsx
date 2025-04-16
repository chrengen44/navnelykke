
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Heart } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";

const UserMenu = () => {
  const { favoritesCount } = useFavorites();

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2 rounded-full">
            <Heart className="h-5 w-5 text-pink-500" />
            <span>Favoritter</span>
            {favoritesCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 bg-pink-500 text-white text-xs font-bold rounded-full">
                {favoritesCount}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuItem asChild>
            <Link to="/favoritter" className="flex items-center">
              <Heart className="mr-2 h-4 w-4" />
              <span>Mine favoritter</span>
              {favoritesCount > 0 && (
                <span className="ml-auto inline-flex items-center justify-center w-5 h-5 bg-pink-500 text-white text-xs font-bold rounded-full">
                  {favoritesCount}
                </span>
              )}
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserMenu;
