
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import CreatePollForm from "@/components/polls/CreatePollForm";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

const CreatePoll = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      // Optional: You can automatically redirect to the auth page
      // navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-pink-500" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-6">Logg inn for å opprette avstemning</h1>
            <p className="text-gray-600 mb-8">
              Du må være innlogget for å opprette en navneavstemning.
            </p>
            <Button onClick={() => navigate("/auth")} className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              Logg inn eller registrer deg
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Opprett navneavstemning</h1>
          <p className="text-gray-600 mb-8">
            Del en liste med navn og la familie og venner stemme på deres favoritter.
          </p>
          <CreatePollForm />
        </div>
      </div>
    </Layout>
  );
};

export default CreatePoll;
