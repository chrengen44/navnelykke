
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { BabyName } from "@/data/types";

interface AddNameToPollProps {
  pollId: string;
  onNameAdded: (newItem: any) => void;
}

const AddNameToPoll = ({ pollId, onNameAdded }: AddNameToPollProps) => {
  const [customName, setCustomName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddCustomName = async () => {
    if (!customName.trim()) {
      toast.error("Skriv inn et navn");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("poll_items")
        .insert({
          poll_id: pollId,
          custom_name: customName.trim()
        })
        .select()
        .single();

      if (error) throw error;

      onNameAdded(data);
      setCustomName("");
      toast.success("Navnet ble lagt til i avstemningen");
    } catch (error) {
      console.error("Error adding custom name:", error);
      toast.error("Kunne ikke legge til navnet");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="customName">Legg til navn</Label>
        <div className="flex space-x-2">
          <Input
            id="customName"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            placeholder="Skriv inn navn"
          />
          <Button
            onClick={handleAddCustomName}
            disabled={isLoading}
          >
            Legg til
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddNameToPoll;
