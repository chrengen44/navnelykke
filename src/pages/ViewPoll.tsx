import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { trackPollAnalytics, getPollAnalytics } from "@/integrations/supabase/poll-analytics";
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface PollItem {
  id: string;
  name_id: number | null;
  custom_name: string | null;
  baby_name?: {
    name: string;
    meaning: string;
  };
  voteCount?: number;
}

const ViewPoll = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [poll, setPoll] = useState<any>(null);
  const [pollItems, setPollItems] = useState<PollItem[]>([]);
  const [voterName, setVoterName] = useState("");
  const [voterEmail, setVoterEmail] = useState("");
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pollAnalytics, setPollAnalytics] = useState<{
    views: number;
    shares: number;
    votes: number;
  } | null>(null);

  useEffect(() => {
    const fetchPollData = async () => {
      try {
        const { data: pollData, error: pollError } = await supabase
          .from("name_polls")
          .select("*")
          .eq("id", id)
          .single();

        if (pollError) throw pollError;
        setPoll(pollData);

        const { data: items, error: itemsError } = await supabase
          .from("poll_items")
          .select(`
            id,
            name_id,
            custom_name,
            baby_names (
              name,
              meaning
            )
          `)
          .eq("poll_id", id);

        if (itemsError) throw itemsError;

        const { data: votes, error: votesError } = await supabase
          .from("poll_votes")
          .select("poll_item_id")
          .eq("poll_id", id);

        if (votesError) throw votesError;

        const voteCounts = votes.reduce((acc: { [key: string]: number }, vote) => {
          acc[vote.poll_item_id] = (acc[vote.poll_item_id] || 0) + 1;
          return acc;
        }, {});

        const itemsWithVotes = items.map((item: PollItem) => ({
          ...item,
          voteCount: voteCounts[item.id] || 0
        }));

        setPollItems(itemsWithVotes);

        // Track poll view
        await trackPollAnalytics(id!, 'view');

        // Fetch poll analytics (only for poll creator)
        if (user) {
          const analytics = await getPollAnalytics(id!);
          setPollAnalytics(analytics);
        }
      } catch (error) {
        console.error("Error fetching poll data:", error);
        toast.error("Kunne ikke hente avstemningsdata");
      }
    };

    fetchPollData();
  }, [id, user]);

  const handleVote = async () => {
    if (!selectedItem) {
      toast.error("Velg et navn å stemme på");
      return;
    }

    if (poll.is_anonymous && !voterName) {
      toast.error("Skriv inn navnet ditt");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("poll_votes")
        .insert({
          poll_id: id,
          poll_item_id: selectedItem,
          voter_id: user?.id || null,
          voter_name: voterName || null,
          voter_email: voterEmail || null
        });

      if (error) throw error;

      setPollItems(pollItems.map(item => {
        if (item.id === selectedItem) {
          return {
            ...item,
            voteCount: (item.voteCount || 0) + 1
          };
        }
        return item;
      }));

      toast.success("Takk for din stemme!");
      setSelectedItem(null);
      setVoterName("");
      setVoterEmail("");
    } catch (error) {
      console.error("Error submitting vote:", error);
      toast.error("Kunne ikke registrere stemmen");
    } finally {
      setIsLoading(false);
    }
  };

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

      await trackPollAnalytics(id!, 'share');
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  if (!poll) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <p>Laster avstemning...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">{poll.title}</h1>
          {poll.description && (
            <p className="text-gray-600 mb-8">{poll.description}</p>
          )}

          <div className="space-y-4 mb-8">
            {pollItems.map((item) => (
              <Card
                key={item.id}
                className={`p-4 cursor-pointer transition-colors ${
                  selectedItem === item.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedItem(item.id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">
                      {item.baby_name?.name || item.custom_name}
                    </p>
                    {item.baby_name && (
                      <p className="text-sm text-gray-500">
                        {item.baby_name.meaning}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{item.voteCount} stemmer</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {poll.is_anonymous && (
            <div className="space-y-4 mb-6">
              <div>
                <Label htmlFor="voterName">Ditt navn</Label>
                <Input
                  id="voterName"
                  value={voterName}
                  onChange={(e) => setVoterName(e.target.value)}
                  placeholder="Skriv inn navnet ditt"
                />
              </div>
              <div>
                <Label htmlFor="voterEmail">Din e-post (valgfritt)</Label>
                <Input
                  id="voterEmail"
                  type="email"
                  value={voterEmail}
                  onChange={(e) => setVoterEmail(e.target.value)}
                  placeholder="Skriv inn e-postadressen din"
                />
              </div>
            </div>
          )}

          <Button
            className="w-full"
            onClick={handleVote}
            disabled={isLoading}
          >
            {isLoading ? "Sender inn stemme..." : "Stem"}
          </Button>

          {pollAnalytics && user && (
            <div className="mt-8 bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Polling Analytics</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[
                  { name: 'Views', count: pollAnalytics.views },
                  { name: 'Shares', count: pollAnalytics.shares },
                  { name: 'Votes', count: pollAnalytics.votes }
                ]}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ViewPoll;
