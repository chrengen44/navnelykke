import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { BabyName } from "@/data/types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import AddNameToPoll from "./AddNameToPoll";
import { fetchNameById } from "@/integrations/supabase/name-queries";

interface PollItem {
  id: string;
  name_id: number | null;
  custom_name: string | null;
  baby_name?: BabyName;
}

interface EditPollFormProps {
  pollId: string;
}

const EditPollForm = ({ pollId }: EditPollFormProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pollItems, setPollItems] = useState<PollItem[]>([]);

  useEffect(() => {
    const fetchPollData = async () => {
      try {
        const { data: poll, error: pollError } = await supabase
          .from("name_polls")
          .select("*")
          .eq("id", pollId)
          .single();

        if (pollError) throw pollError;

        setTitle(poll.title);
        setDescription(poll.description || "");

        const { data: items, error: itemsError } = await supabase
          .from("poll_items")
          .select("id, name_id, custom_name")
          .eq("poll_id", pollId);

        if (itemsError) throw itemsError;

        const itemsWithNames = await Promise.all(
          items.map(async (item) => {
            if (item.name_id) {
              const babyName = await fetchNameById(item.name_id);
              return {
                ...item,
                baby_name: babyName
              };
            }
            return item;
          })
        );

        setPollItems(itemsWithNames);
      } catch (error) {
        console.error("Error fetching poll data:", error);
        toast.error("Kunne ikke hente avstemningsdata");
      }
    };

    fetchPollData();
  }, [pollId]);

  const handleSave = async () => {
    if (!user) {
      toast.error("Du må være logget inn for å redigere avstemningen");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("name_polls")
        .update({
          title,
          description,
          updated_at: new Date().toISOString()
        })
        .eq("id", pollId);

      if (error) throw error;

      toast.success("Avstemningen ble oppdatert!");
    } catch (error) {
      console.error("Error updating poll:", error);
      toast.error("Kunne ikke oppdatere avstemningen");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from("poll_items")
        .delete()
        .eq("id", itemId);

      if (error) throw error;

      setPollItems(pollItems.filter(item => item.id !== itemId));
      toast.success("Navnet ble fjernet fra avstemningen");
    } catch (error) {
      console.error("Error removing poll item:", error);
      toast.error("Kunne ikke fjerne navnet fra avstemningen");
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Tittel</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Beskrivelse (valgfritt)</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Fortell litt mer om avstemningen..."
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Navn i avstemningen</h3>
        {pollItems.map((item) => (
          <Card key={item.id} className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">
                  {item.baby_name?.name || item.custom_name}
                </p>
                {item.baby_name && (
                  <p className="text-sm text-gray-500">
                    {item.baby_name.meaning}
                  </p>
                )}
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleRemoveItem(item.id)}
              >
                Fjern
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <AddNameToPoll pollId={pollId} onNameAdded={(newItem) => {
        setPollItems([...pollItems, newItem]);
      }} />

      <div className="flex justify-end space-x-4">
        <Button
          variant="outline"
          onClick={() => navigate(`/poll/${pollId}`)}
        >
          Se avstemning
        </Button>
        <Button
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? "Lagrer..." : "Lagre endringer"}
        </Button>
      </div>
    </div>
  );
};

export default EditPollForm;
