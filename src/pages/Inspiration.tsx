import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdSpace from "@/components/AdSpace";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Inspiration = () => {
  const articles = [
    {
      id: 1,
      title: "5 tips for å velge det perfekte navnet",
      excerpt: "Hvordan finne et navn som både du og barnet ditt vil elske gjennom livet.",
      category: "Navnetips",
      background: "bg-babypink",
      link: "/artikkel/5-tips-for-navnevalg"
    },
    {
      id: 2,
      title: "Navnetradisjoner i Norge gjennom tidene",
      excerpt: "Fra norrøne navn til moderne trender - hvordan navneskikker har endret seg i Norge.",
      category: "Historie",
      background: "bg-babyblue",
      link: "/artikkel/navnetradisjoner-i-norge"
    },
    {
      id: 3,
      title: "Nordiske navn og deres betydning",
      excerpt: "Utforsk de vakre betydningene bak tradisjonelle nordiske navn.",
      category: "Betydninger",
      background: "bg-babypeach"
    },
    {
      id: 4,
      title: "Kombinere to navn: Moderne navnekombinasjoner",
      excerpt: "Hvordan skape unike navn ved å kombinere to navn du elsker.",
      category: "Trend",
      background: "bg-babyyellow"
    },
    {
      id: 5,
      title: "Internasjonale navn som fungerer godt på norsk",
      excerpt: "Internasjonale navn som er enkle å uttale og skrive på norsk.",
      category: "Internasjonalt",
      background: "bg-babypurple"
    },
    {
      id: 6,
      title: "Hvordan velge søskennavn som passer sammen",
      excerpt: "Tips for å finne navn som harmonerer for søsken.",
      category: "Familie",
      background: "bg-babygreen"
    }
  ];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-gradient-to-br from-babyblue via-white to-babypink py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Navneinspirasjon</h1>
              <p className="text-lg text-gray-700">
                Artikler, tips og inspirasjon for å finne det perfekte navnet
              </p>
            </div>
          </div>
        </div>
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Card key={article.id} className={`overflow-hidden ${article.background}`}>
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="mb-4">
                        <span className="text-xs font-medium py-1 px-2 bg-white/70 backdrop-blur-sm rounded-full">
                          {article.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                      <p className="text-gray-700 mb-4">{article.excerpt}</p>
                      <Button asChild variant="outline" className="bg-white/80 backdrop-blur-sm">
                        <Link to={article.link}>Les mer</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <div className="container mx-auto px-4 py-4">
          <AdSpace type="horizontal" />
        </div>
        
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="mb-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Utforsk navnekategorier</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Finn inspirasjon ved å utforske ulike typer navn basert på opprinnelse, stil eller betydning
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <Card className="bg-babypink shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Nordiske navn</h3>
                  <p className="text-gray-600 mb-4">
                    Utforsk navn med røtter i nordisk kultur og tradisjon
                  </p>
                  <Button asChild variant="outline" className="group">
                    <Link to="/kategori/nordisk" className="flex items-center">
                      Utforsk
                      <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-babyblue shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Klassiske navn</h3>
                  <p className="text-gray-600 mb-4">
                    Tidløse navn som har vært populære gjennom generasjoner
                  </p>
                  <Button asChild variant="outline" className="group">
                    <Link to="/kategori/klassisk" className="flex items-center">
                      Utforsk
                      <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-babypeach shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Unike navn</h3>
                  <p className="text-gray-600 mb-4">
                    Spesielle navn som skiller seg ut
                  </p>
                  <Button asChild variant="outline" className="group">
                    <Link to="/kategori/unik" className="flex items-center">
                      Utforsk
                      <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Inspiration;
