
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const CreatePollForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Du må være logget inn for å opprette en avstemning");
      return;
    }

    setIsLoading(true);
    try {
      const { data: poll, error } = await supabase
        .from("name_polls")
        .insert({
          title,
          description,
          is_anonymous: isAnonymous,
          creator_id: user.id
        })
        .select()
        .single();

      if (error) throw error;

      toast.success("Avstemningen ble opprettet!");
      navigate(`/poll/${poll.id}/edit`);
    } catch (error) {
      console.error("Error creating poll:", error);
      toast.error("Kunne ikke opprette avstemningen");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Tittel</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="F.eks. 'Hjelp oss å velge navn til babyen!'"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Beskrivelse (valgfritt)</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Fortell litt mer om avstemningen..."
          rows={3}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="anonymous"
          checked={isAnonymous}
          onCheckedChange={setIsAnonymous}
        />
        <Label htmlFor="anonymous">Anonym avstemning</Label>
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Oppretter..." : "Opprett avstemning"}
      </Button>
    </form>
  );
};

export default CreatePollForm;
