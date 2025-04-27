import React from 'react';
import { Combine } from "lucide-react";
import BlogPostLayout from '@/components/BlogPostLayout';

const NameCombinationsArticle = () => {
  return (
    <BlogPostLayout title="Kombinere to navn: Moderne navnekombinasjoner">
      <article className="prose prose-lg lg:prose-xl max-w-4xl mx-auto">
        {/* Hero section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-2 bg-babypeach rounded-full mb-4">
            <Combine className="h-6 w-6 text-orange-700" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
            Kombinere to navn: Moderne navnekombinasjoner
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Å velge bare ett navn kan være vanskelig når dere har flere favoritter. Her viser vi hvordan dere kan kombinere navn på en vakker måte.
          </p>
        </div>

        {/* Why combine names section */}
        <div className="bg-gradient-to-br from-babypeach/20 to-babypink/20 p-8 rounded-lg mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Hvorfor kombinere to navn?
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="font-semibold mr-2">Personlig betydning:</span>
              Navnet kan bære på historien til begge foreldrene, besteforeldre eller andre viktige personer.
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">Unikhet:</span>
              Et sammensatt navn skaper en identitet som barnet deres kan eie fullt ut.
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">Kreativ frihet:</span>
              Dere trenger ikke velge én favoritt – dere kan forene flere.
            </li>
          </ul>
        </div>

        {/* How to combine names section */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Hvordan kombinere to navn på en vellykket måte
          </h2>

          {[
            {
              title: "1. Velg navn som harmonerer",
              content: "Start med å finne to navn som har en fin lyd sammen. Navn med like stavelser, vokaler eller klanger kombineres ofte mest naturlig.",
              examples: ["Anna + Sofia = Annasofia", "Leo + Emil = Leomil"],
              tip: "Si navnene høyt sammen flere ganger for å sjekke hvordan de flyter."
            },
            {
              title: "2. Bruk deler av hvert navn",
              content: "Noen ganger kan det være fint å ta en begynnelse og en slutt fra to ulike navn.",
              examples: ["Iselin + Amalie = Isalie", "Sebastian + Henrik = Sebrik"],
              tip: "Prøv å klippe og lime i ulike varianter til dere finner en kombinasjon som kjennes naturlig og vakker."
            },
            {
              title: "3. Bevar tydeligheten",
              content: "Sammensatte navn må være lette å uttale og forstå. Unngå at kombinasjonen blir for tung eller uklar.",
              tip: "Test navnet på familie og venner. Hvordan oppfatter de det? Er det lett å forstå og skrive?"
            },
            {
              title: "4. Velg å skille navnene eller smelte dem sammen",
              content: "Dere kan velge om dere vil lage et sammensatt navn i én blokk eller holde navnene separate.",
              examples: ["Sammensatt navn: Annasofia", "Separate navn: Anna Sofia"]
            },
            {
              title: "5. Tenk på fremtiden",
              content: "Som alltid bør dere tenke på hvordan navnet vil fungere når barnet vokser opp. Navnet skal passe en liten baby, men også en voksen person.",
              tip: "Se for dere barnet i ulike situasjoner – i jobbsammenheng, i sosiale settinger, på reise. Fungerer navnet?"
            }
          ].map((section, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">{section.title}</h3>
              <p className="text-gray-700 mb-4">{section.content}</p>
              {section.examples && (
                <div className="bg-babypeach/20 p-4 rounded-md mb-4">
                  <strong className="block mb-2">Eksempel:</strong>
                  <ul className="list-none space-y-1">
                    {section.examples.map((example, i) => (
                      <li key={i} className="text-gray-700">{example}</li>
                    ))}
                  </ul>
                </div>
              )}
              {section.tip && (
                <div className="bg-babyblue/20 p-4 rounded-md">
                  <strong className="block mb-1">Tips:</strong>
                  <p className="text-gray-700">{section.tip}</p>
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Example combinations section */}
        <section className="mt-12 space-y-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Inspirasjon: Eksempler på vakre navnekombinasjoner
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-babypink/20 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-3">Jentenavn</h3>
              <ul className="space-y-2 text-gray-700">
                <li>Ella + Marie = Ellarie</li>
                <li>Nora + Elise = Norlise</li>
                <li>Ingrid + Amalie = Ingralie</li>
              </ul>
            </div>
            
            <div className="bg-babyblue/20 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-3">Guttenavn</h3>
              <ul className="space-y-2 text-gray-700">
                <li>Adrian + Tobias = Adribias</li>
                <li>Oliver + Sebastian = Olbastian</li>
                <li>Marius + Emil = Maril</li>
              </ul>
            </div>
            
            <div className="bg-babypeach/20 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-3">Kjønnsnøytrale navn</h3>
              <ul className="space-y-2 text-gray-700">
                <li>Alex + Robin = Albin</li>
                <li>Kim + Elias = Kilias</li>
                <li>Julian + Noah = Juliah</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <div className="mt-12 p-8 bg-gradient-to-br from-babypeach/20 to-babypink/20 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Skap et navn som bærer en historie
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Ved å kombinere to navn lager dere ikke bare en unik lyd – dere skaper en historie. Et navn som forteller om de verdiene, menneskene eller drømmene dere ønsker å gi videre til barnet deres.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            Det viktigste er at navnet føles riktig for dere – at det rommer kjærligheten og forventningene som hører med til et nytt liv. Stol på magefølelsen, lek dere frem – og husk at det er nettopp deres personlige preg som vil gjøre navnet helt perfekt.
          </p>
        </div>
      </article>
    </BlogPostLayout>
  );
};

export default NameCombinationsArticle;
