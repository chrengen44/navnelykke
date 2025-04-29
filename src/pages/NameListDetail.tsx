
import { useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import ListHeader from "@/components/lists/ListHeader";
import NameListContent from "@/components/lists/NameListContent";
import AddNameToListDialog from "@/components/lists/AddNameToListDialog";
import CreatePollFromListDialog from "@/components/lists/CreatePollFromListDialog";
import { toast } from "sonner";
import { useNameListDetail } from "@/hooks/useNameListDetail";

const NameListDetail = () => {
  const { id } = useParams<{ id: string }>();
  const {
    nameList,
    isOwner,
    listNames,
    isLoadingNames,
    refetchNames,
    isAddNameDialogOpen,
    setIsAddNameDialogOpen,
    isCreatePollDialogOpen,
    setIsCreatePollDialogOpen,
    handleAddNames,
    handleCreatePoll
  } = useNameListDetail(id);
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {!nameList ? (
            <div className="space-y-4">
              <div className="h-10 w-1/3 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-6 w-1/2 bg-gray-200 animate-pulse rounded"></div>
              <div className="flex gap-2">
                <div className="h-10 w-24 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-10 w-24 bg-gray-200 animate-pulse rounded"></div>
              </div>
            </div>
          ) : (
            <ListHeader
              nameList={nameList}
              isOwner={isOwner}
              listNames={listNames}
              onAddNames={handleAddNames}
              onCreatePoll={handleCreatePoll}
            />
          )}

          <NameListContent
            isLoading={isLoadingNames}
            names={listNames}
            isOwner={isOwner}
            onAddNames={handleAddNames}
          />
        </div>
        
        {nameList && (
          <>
            <AddNameToListDialog
              open={isAddNameDialogOpen}
              onOpenChange={setIsAddNameDialogOpen}
              listId={nameList.id}
              onNamesAdded={() => {
                refetchNames();
                toast.success("Navn lagt til i listen!");
              }}
            />
            
            {listNames && (
              <CreatePollFromListDialog 
                open={isCreatePollDialogOpen}
                onOpenChange={setIsCreatePollDialogOpen}
                names={listNames}
                listName={nameList.name}
              />
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default NameListDetail;
