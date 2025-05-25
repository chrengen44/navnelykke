
import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useFavorites } from '@/contexts/FavoritesContext';
import { log } from '@/utils/logger';

interface FavoriteButtonProps {
  nameId: number;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

const FavoriteButton = ({ nameId, className = '', onClick }: FavoriteButtonProps) => {
  const [loading, setLoading] = useState(false);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { toast } = useToast();

  // Check if this specific nameId is a favorite
  const isFav = isFavorite(nameId);

  const toggleFavorite = async (e: React.MouseEvent) => {
    // Prevent the event from bubbling up (important for when inside clickable containers)
    e.preventDefault();
    e.stopPropagation();
    
    // Debugging to verify correct ID is being used
    log(`Toggling favorite button clicked for name with ID: ${nameId}`);
    
    // Prevent multiple clicks while processing
    if (loading) return;
    
    setLoading(true);
    
    try {
      if (isFav) {
        removeFavorite(nameId);
        toast({
          title: 'Fjernet fra favoritter',
          description: `Navnet med ID ${nameId} er fjernet fra dine favoritter.`,
        });
      } else {
        addFavorite(nameId);
        toast({
          title: 'Lagt til i favoritter',
          description: `Navnet med ID ${nameId} er lagt til i dine favoritter.`,
        });
      }
      
      // Call any additional onClick handler if provided
      if (onClick) onClick(e);
    } catch (error: any) {
      console.error("Error toggling favorite:", error);
      toast({
        title: 'Feil',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className={`rounded-full bg-white/70 backdrop-blur-sm ${
        isFav ? 'text-pink-500' : 'text-gray-500'
      } ${className}`}
      onClick={toggleFavorite}
      disabled={loading}
      data-nameid={nameId} // Add data attribute for debugging
    >
      <Heart className={`h-5 w-5 ${isFav ? 'fill-current' : ''}`} />
    </Button>
  );
};

export default FavoriteButton;
