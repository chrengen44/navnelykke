
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SuggestName = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    origin: "",
    meaning: "",
    additionalInfo: "",
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect to login if not authenticated
  if (!user) {
    navigate("/auth");
    return null;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("suggested_names").insert({
        user_id: user.id,
        name: formData.name,
        gender: formData.gender,
        origin: formData.origin,
        meaning: formData.meaning,
        additional_info: formData.additionalInfo,
      });

      if (error) throw error;

      toast({
        title: "Takk for ditt forslag!",
        description:
          "Vi vil vurdere ditt navneforslag og legge det til i databasen hvis det blir godkjent.",
      });

      // Clear form
      setFormData({
        name: "",
        gender: "",
        origin: "",
        meaning: "",
        additionalInfo: "",
      });
    } catch (error: any) {
      toast({
        title: "Feil ved innsending",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Foreslå et navn</h1>
          <p className="text-gray-600 mb-8">
            Kjenner du til et flott navn som ikke er i vår database? Del det med
            andre foreldre ved å fylle ut skjemaet nedenfor.
          </p>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Navn *
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="Skriv inn navnet"
                />
              </div>

              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Kjønn *
                </label>
                <Select
                  required
                  value={formData.gender}
                  onValueChange={(value) => handleSelectChange("gender", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Velg kjønn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="boy">Guttenavn</SelectItem>
                    <SelectItem value="girl">Jentenavn</SelectItem>
                    <SelectItem value="unisex">Unisex</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label
                  htmlFor="origin"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Opprinnelse *
                </label>
                <Input
                  id="origin"
                  name="origin"
                  value={formData.origin}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="f.eks. Norsk, Gresk, Hebraisk"
                />
              </div>

              <div>
                <label
                  htmlFor="meaning"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Betydning *
                </label>
                <Input
                  id="meaning"
                  name="meaning"
                  value={formData.meaning}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="Hva betyr navnet?"
                />
              </div>

              <div>
                <label
                  htmlFor="additionalInfo"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Tilleggsinformasjon
                </label>
                <Textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  className="w-full min-h-[100px]"
                  placeholder="Legg til annen relevant informasjon om navnet (valgfritt)"
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Sender..." : "Send inn navneforslag"}
              </Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SuggestName;
