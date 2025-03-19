
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface FavoriteButtonProps {
  nameId: number;
  className?: string;
}

const FavoriteButton = ({ nameId, className = '' }: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if name is already favorited by user
    const checkFavorite = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('favorites')
          .select('id')
          .eq('user_id', user.id)
          .eq('name_id', nameId)
          .maybeSingle();

        if (error) throw error;
        setIsFavorite(!!data);
      } catch (error) {
        console.error('Error checking favorite status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkFavorite();
  }, [nameId, user]);

  const toggleFavorite = async () => {
    if (!user) {
      toast({
        title: 'Logg inn for å lagre favoritter',
        description: 'Du må være logget inn for å lagre favoritter.',
      });
      navigate('/auth');
      return;
    }

    setLoading(true);

    try {
      if (isFavorite) {
        // Remove from favorites
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('name_id', nameId);

        if (error) throw error;

        toast({
          title: 'Fjernet fra favoritter',
          description: 'Navnet er fjernet fra dine favoritter.',
        });
      } else {
        // Add to favorites
        const { error } = await supabase
          .from('favorites')
          .insert({ user_id: user.id, name_id: nameId });

        if (error) throw error;

        toast({
          title: 'Lagt til i favoritter',
          description: 'Navnet er lagt til i dine favoritter.',
        });
      }

      setIsFavorite(!isFavorite);
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
        isFavorite ? 'text-pink-500' : 'text-gray-500'
      } ${className}`}
      onClick={toggleFavorite}
      disabled={loading}
    >
      <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
    </Button>
  );
};

export default FavoriteButton;
