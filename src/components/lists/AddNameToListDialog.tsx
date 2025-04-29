
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAddNamesToList } from "@/hooks/useAddNamesToList";
import FavoritesTabContent from "./FavoritesTabContent";
import SearchTabContent from "./SearchTabContent";

interface AddNameToListDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listId: string;
  onNamesAdded: () => void;
}

const AddNameToListDialog = ({
  open,
  onOpenChange,
  listId,
  onNamesAdded,
}: AddNameToListDialogProps) => {
  const {
    isLoading,
    selectedNames,
    searchQuery,
    setSearchQuery,
    favoriteNames,
    isFavoritesLoading,
    searchResults,
    isSearching,
    handleSubmit,
    toggleName,
    isNameInList
  } = useAddNamesToList(listId, onNamesAdded);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Legg til navn i listen</DialogTitle>
          <DialogDescription>
            Velg navn fra dine favoritter eller søk etter navn
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="favorites">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="favorites">Fra favoritter</TabsTrigger>
            <TabsTrigger value="search">Søk etter navn</TabsTrigger>
          </TabsList>
          
          <TabsContent value="favorites" className="space-y-4 pt-4">
            <FavoritesTabContent
              isLoading={isFavoritesLoading}
              names={favoriteNames}
              selectedNames={selectedNames}
              isNameInList={isNameInList}
              toggleName={toggleName}
            />
          </TabsContent>
          
          <TabsContent value="search" className="space-y-4 pt-4">
            <SearchTabContent
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isSearching={isSearching}
              searchResults={searchResults}
              selectedNames={selectedNames}
              isNameInList={isNameInList}
              toggleName={toggleName}
            />
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 text-sm">
            {selectedNames.length > 0 && (
              <p>{selectedNames.length} navn valgt</p>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Avbryt
            </Button>
            <Button
              onClick={() => handleSubmit(() => onOpenChange(false))}
              disabled={isLoading || selectedNames.length === 0}
            >
              {isLoading ? "Legger til..." : "Legg til"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNameToListDialog;
