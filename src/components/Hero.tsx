
import { Button } from "@/components/ui/button";
import { Baby } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { Command, CommandInput } from "@/components/ui/command";
import { toast } from "sonner";

const Hero = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    if (searchQuery?.trim()) {
      try {
        navigate(`/søk?q=${encodeURIComponent(searchQuery)}`);
      } catch (error) {
        console.error("Navigation error:", error);
        toast.error("Kunne ikke navigere til søkeresultater");
      }
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-babypink via-white to-babyblue py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <Baby className="h-16 w-16 text-pink-500 animate-float" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
            Finn det perfekte navnet til ditt barn
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Utforsk tusenvis av vakre babynavn fra klassiske til moderne, nordiske til internasjonale.
          </p>

          <div className="max-w-md mx-auto mb-8">
            <form onSubmit={handleSearch}>
              <Command className="rounded-lg border shadow-md bg-white/95">
                <CommandInput
                  placeholder="Søk etter navn..."
                  ref={searchInputRef}
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                  className="h-12 text-lg"
                />
              </Command>
            </form>
          </div>

          <div className="flex justify-center gap-4 flex-wrap">
            <Button variant="outline" size="lg" asChild>
              <a href="/populære-navn" className="bg-white/80 backdrop-blur-sm">
                Populære navn
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/kategorier" className="bg-white/80 backdrop-blur-sm">
                Utforsk kategorier
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-babyyellow rounded-full opacity-40 transform translate-x-1/4 translate-y-1/2"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-babypeach rounded-full opacity-40 transform translate-x-0 -translate-y-1/2"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-babypurple rounded-full opacity-30 transform -translate-y-1/2"></div>
    </div>
  );
};

export default Hero;
