
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { BabyName } from "@/data/types";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

interface CreatePollFromListDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  names: BabyName[];
  listName: string;
}

const CreatePollFromListDialog = ({
  open,
  onOpenChange,
  names,
  listName,
}: CreatePollFromListDialogProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState(`Avstemning: ${listName}`);
  const [description, setDescription] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [selectedNames, setSelectedNames] = useState<number[]>(names.map(name => name.id));
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Du må være logget inn for å opprette en avstemning");
      return;
    }

    if (!title.trim()) {
      toast.error("Du må gi avstemningen en tittel");
      return;
    }

    if (selectedNames.length === 0) {
      toast.error("Du må velge minst ett navn for avstemningen");
      return;
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
      onOpenChange(false);
      
      // Navigate to the poll edit page
      navigate(`/poll/${poll.id}/edit`);
    } catch (error) {
      console.error("Error creating poll:", error);
      toast.error("Kunne ikke opprette avstemningen");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleName = (nameId: number) => {
    setSelectedNames(prev =>
      prev.includes(nameId)
        ? prev.filter(id => id !== nameId)
        : [...prev, nameId]
    );
  };

  const handleSelectAll = () => {
    setSelectedNames(names.map(name => name.id));
  };

  const handleSelectNone = () => {
    setSelectedNames([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[700px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Opprett navneavstemning</DialogTitle>
            <DialogDescription>
              Lag en avstemning basert på navnene i listen
            </DialogDescription>
          </DialogHeader>

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

            <div className="mt-4">
              <div className="flex justify-between mb-2">
                <Label>Velg navn for avstemningen</Label>
                <div className="flex gap-2 text-sm">
                  <button
                    type="button"
                    className="text-blue-500 hover:underline"
                    onClick={handleSelectAll}
                  >
                    Velg alle
                  </button>
                  <button
                    type="button"
                    className="text-blue-500 hover:underline"
                    onClick={handleSelectNone}
                  >
                    Fjern alle
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[300px] overflow-y-auto">
                {names.map((name) => (
                  <Card
                    key={name.id}
                    className={`cursor-pointer transition-colors ${
                      selectedNames.includes(name.id)
                        ? 'border-pink-500 bg-pink-50'
                        : 'hover:border-gray-300'
                    }`}
                    onClick={() => toggleName(name.id)}
                  >
                    <CardContent className="p-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">{name.name}</p>
                      </div>
                      {selectedNames.includes(name.id) && (
                        <Check className="h-4 w-4 text-pink-500" />
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <p className="text-sm text-gray-500 mt-2">
                Valgt {selectedNames.length} av {names.length} navn
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Avbryt
            </Button>
            <Button type="submit" disabled={isLoading || selectedNames.length === 0}>
              {isLoading ? "Oppretter..." : "Opprett avstemning"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePollFromListDialog;
