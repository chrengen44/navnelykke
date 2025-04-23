
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import EditPollForm from "@/components/polls/EditPollForm";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import { toast } from "sonner";

const EditPoll = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleShare = async () => {
    try {
      const shareData = {
        title: 'Stem på navn!',
        text: 'Hjelp oss å velge navn! Stem på dine favoritter.',
        url: `${window.location.origin}/poll/${id}`
      };

      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        toast.success("Lenke kopiert til utklippstavlen");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Rediger avstemning</h1>
            <Button onClick={handleShare}>
              <Share className="mr-2" />
              Del avstemning
            </Button>
          </div>
          <EditPollForm pollId={id!} />
        </div>
      </div>
    </Layout>
  );
};

export default EditPoll;
