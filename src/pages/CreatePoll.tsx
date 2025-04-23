
import { Layout } from "@/components/Layout";
import CreatePollForm from "@/components/polls/CreatePollForm";

const CreatePoll = () => {
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
