
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface CreatePollParams {
  title: string;
  description: string;
  isAnonymous: boolean;
  selectedNames: number[];
}

export const useCreatePoll = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const createPoll = async ({ title, description, isAnonymous, selectedNames }: CreatePollParams) => {
    if (!user) {
      toast.error("Du må være logget inn for å opprette en avstemning");
      return false;
    }

    if (!title.trim()) {
      toast.error("Du må gi avstemningen en tittel");
      return false;
    }

    if (selectedNames.length === 0) {
      toast.error("Du må velge minst ett navn for avstemningen");
      return false;
    }

    setIsLoading(true);
    try {
      // Create the poll
      const { data: poll, error: pollError } = await supabase
        .from("name_polls")
        .insert({
          title,
          description: description || null,
          is_anonymous: isAnonymous,
          creator_id: user.id,
        })
        .select()
        .single();

      if (pollError) throw pollError;

      // Add the selected names to the poll
      const pollItems = selectedNames.map(nameId => ({
        poll_id: poll.id,
        name_id: nameId,
      }));

      const { error: itemsError } = await supabase
        .from("poll_items")
        .insert(pollItems);

      if (itemsError) throw itemsError;

      toast.success("Avstemningen ble opprettet!");
      
      // Navigate to the poll edit page
      navigate(`/poll/${poll.id}/edit`);
      return true;
    } catch (error) {
      console.error("Error creating poll:", error);
      toast.error("Kunne ikke opprette avstemningen");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createPoll,
    isLoading
  };
};
