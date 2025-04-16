
import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useFavorites } from '@/contexts/FavoritesContext';

interface FavoriteButtonProps {
  nameId: number;
  className?: string;
}

const FavoriteButton = ({ nameId, className = '' }: FavoriteButtonProps) => {
  const [loading, setLoading] = useState(false);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { toast } = useToast();

  // Check if this specific nameId is a favorite
  const isFav = isFavorite(nameId);

  const toggleFavorite = async () => {
    // Prevent multiple clicks while processing
    if (loading) return;
    
    setLoading(true);
    
    try {
      // Store the current nameId in a local variable to ensure we use the correct ID
      const currentNameId = nameId;
      
      if (isFavorite(currentNameId)) {
        removeFavorite(currentNameId);
        toast({
          title: 'Fjernet fra favoritter',
          description: 'Navnet er fjernet fra dine favoritter.',
        });
      } else {
        addFavorite(currentNameId);
        toast({
          title: 'Lagt til i favoritter',
          description: 'Navnet er lagt til i dine favoritter.',
        });
      }
    } catch (error: any) {
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
    >
      <Heart className={`h-5 w-5 ${isFav ? 'fill-current' : ''}`} />
    </Button>
  );
};

export default FavoriteButton;
