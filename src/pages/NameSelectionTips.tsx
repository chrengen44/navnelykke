
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BookOpen } from "lucide-react";

const NameSelectionTips = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <article className="prose prose-lg lg:prose-xl max-w-4xl mx-auto">
          {/* Hero section */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center p-2 bg-babypink rounded-full mb-4">
              <BookOpen className="h-6 w-6 text-pink-700" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              5 tips for å velge det perfekte navnet
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Å finne det perfekte navnet til barnet deres kan føles som en av de viktigste beslutningene dere tar som foreldre. Et navn bærer identitet, personlighet og minner, og vil følge barnet deres hele livet. 
            </p>
          </div>

          {/* Introduction */}
          <div className="bg-gradient-to-br from-babypink/20 to-babyblue/20 p-6 rounded-lg mb-12">
            <p className="text-lg leading-relaxed">
              Derfor kan prosessen oppleves som overveldende. Her får dere fem konkrete og innsiktsfulle tips for å finne et navn dere både elsker – og som barnet deres vil være stolt av.
            </p>
          </div>

          {/* Tips Sections */}
          <section className="space-y-12">
            {/* Tip 1 */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-babypink text-pink-700 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">1</span>
                Tenk på navnets betydning og historie
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Et navn er mer enn bare vakre lyder. Mange navn har dype historiske eller kulturelle betydninger som kan gi en ekstra dimensjon til valget. Kanskje finnes det navn i familietreet deres som bærer minner om kjære forfedre, eller kanskje finnes det navn med betydninger som symboliserer styrke, lykke eller kjærlighet?
                </p>
                <div className="bg-babyblue/20 p-4 rounded-md">
                  <p className="text-gray-700 font-medium">
                    Tips: Undersøk hva navnet betyr, hvor det kommer fra, og hvordan det har blitt brukt gjennom tidene. På den måten kan navnet føles enda mer personlig og meningsfullt.
                  </p>
                </div>
              </div>
            </div>

            {/* Tip 2 */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-babyblue text-blue-700 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">2</span>
                Si navnet høyt – ofte!
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Navnet dere velger må flyte godt både alene og sammen med etternavnet. Noen ganger kan navn som ser flotte ut på papiret, oppleves upraktiske i hverdagen. Si navnet høyt flere ganger, som om dere roper det i en park, trøster barnet, eller introduserer det for nye mennesker.
                </p>
                <div className="bg-babyblue/20 p-4 rounded-md">
                  <p className="text-gray-700 font-medium">
                    Tips: Kombiner fornavn og etternavn i setninger og sjekk rytmen. Passer lydene sammen? Er det lett å uttale for både barn og voksne?
                  </p>
                </div>
              </div>
            </div>

            {/* Tip 3 */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-babypeach text-orange-700 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">3</span>
                Tenk på fremtiden
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Navnet skal være med barnet i alle livets faser – fra de første skritt til voksenlivet. Et navn som er søtt på en baby, bør også kunne passe en voksen i en profesjonell setting.
                </p>
                <div className="bg-babypeach/20 p-4 rounded-md">
                  <p className="text-gray-700 font-medium">
                    Tips: Spør dere selv: Hvordan vil dette navnet oppfattes når barnet vårt er en tenåring? En voksen? En besteforelder? Velg et navn som vokser med barnet.
                  </p>
                </div>
              </div>
            </div>

            {/* Tip 4 */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-babyyellow text-yellow-700 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">4</span>
                Ta hensyn til popularitet – men ikke la det styre
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Noen foreldre drømmer om et unikt navn, mens andre foretrekker et tidløst og populært valg. Det viktigste er at navnet kjennes riktig for dere. Et veldig populært navn kan bety at barnet får flere navnesøsken i barnehagen, men det betyr også at navnet er lett gjenkjennelig og trygt.
                </p>
                <div className="bg-babyyellow/20 p-4 rounded-md">
                  <p className="text-gray-700 font-medium">
                    Tips: Sjekk oppdaterte navnestatistikker, men bruk dem som en inspirasjon – ikke en fasit. Det viktigste er at navnet føles riktig for akkurat deres barn.
                  </p>
                </div>
              </div>
            </div>

            {/* Tip 5 */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-babypurple text-purple-700 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">5</span>
                Involver hverandre – og gi prosessen tid
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Å finne navnet sammen kan være en fantastisk reise, men det krever tålmodighet og åpenhet. Kanskje har dere ulike assosiasjoner eller preferanser? Lag hver deres liste med favoritter og sammenlign. Vær åpen for kompromisser, og ikke stress.
                </p>
                <div className="bg-babypurple/20 p-4 rounded-md">
                  <p className="text-gray-700 font-medium">
                    Tips: Husk at det ikke finnes ett perfekt navn – det finnes mange gode alternativer. Og noen ganger kan det perfekte navnet plutselig "føles rett" etter noen dager eller uker.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <div className="mt-12 p-8 bg-gradient-to-br from-babypink/20 to-babyblue/20 rounded-lg">
            <p className="text-lg text-gray-700 leading-relaxed">
              Å velge et navn er en reise i forventninger, drømmer og identitet. La prosessen være en del av gleden ved å forberede dere på å møte det lille mennesket som skal bære navnet. Stol på magefølelsen deres, og vit at uansett hvilket navn dere velger, blir det spesielt fordi det blir deres valg – for deres barn.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default NameSelectionTips;
