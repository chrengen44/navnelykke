
import { useState } from "react";
import { BabyName } from "@/data/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import PollForm from "@/components/polls/PollForm";
import PollNameSelector from "@/components/polls/PollNameSelector";
import { useCreatePoll } from "@/hooks/useCreatePoll";

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
  const [selectedNames, setSelectedNames] = useState<number[]>(names.map(name => name.id));
  const { createPoll, isLoading } = useCreatePoll();

  const handleSubmit = async ({ title, description, isAnonymous }) => {
    const success = await createPoll({
      title,
      description,
      isAnonymous,
      selectedNames
    });
    
    if (success) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Opprett navneavstemning</DialogTitle>
          <DialogDescription>
            Lag en avstemning basert på navnene i listen
          </DialogDescription>
        </DialogHeader>

        <PollNameSelector
          names={names}
          selectedIds={selectedNames}
          onSelectionChange={setSelectedNames}
        />

        <PollForm
          defaultTitle={`Avstemning: ${listName}`}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreatePollFromListDialog;
