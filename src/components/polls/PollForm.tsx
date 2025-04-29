
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PollFormProps {
  defaultTitle: string;
  onSubmit: (data: { title: string; description: string; isAnonymous: boolean }) => void;
  isLoading: boolean;
  onCancel: () => void;
}

const PollForm = ({ defaultTitle, onSubmit, isLoading, onCancel }: PollFormProps) => {
  const [title, setTitle] = useState(defaultTitle);
  const [description, setDescription] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, isAnonymous });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Tittel</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Beskrivelse (valgfritt)</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Fortell litt om avstemningen..."
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
      </div>

      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Avbryt
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Oppretter..." : "Opprett avstemning"}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default PollForm;
