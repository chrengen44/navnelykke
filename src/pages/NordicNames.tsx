
import React from 'react';
import { BookOpen } from "lucide-react";
import BlogPostLayout from '@/components/BlogPostLayout';

const NordicNames = () => {
  return (
    <BlogPostLayout title="Nordiske navn og deres betydning">
      <article className="prose prose-lg lg:prose-xl max-w-4xl mx-auto">
        {/* Hero section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-2 bg-babyblue rounded-full mb-4">
            <BookOpen className="h-6 w-6 text-blue-700" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Nordiske navn og deres betydning
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Å velge et nordisk navn til barnet deres er som å gi en gave som bærer på historie, kultur og vakre betydninger.
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-gradient-to-br from-babyblue/20 to-babypurple/20 p-6 rounded-lg mb-12">
          <p className="text-lg leading-relaxed">
            Nordiske navn er tette vevd sammen med naturen, styrke, visdom og tradisjon. I denne artikkelen utforsker vi noen av de mest tidløse nordiske navnene – og betydningen som kan gi ekstra dybde til navnevalget deres.
          </p>
        </div>

        {/* Main content sections */}
        <section className="space-y-12">
          {/* Characteristics section */}
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Hva kjennetegner nordiske navn?
            </h2>
            <p className="text-gray-700 mb-4">
              Nordiske navn har ofte røtter i vår felles kulturhistorie fra Norge, Sverige, Danmark, Island og Finland. De eldste navnene stammer gjerne fra norrøn tid og har betydninger som speiler verdier som mot, skjønnhet, naturkreftene og familiens betydning.
            </p>
            <div className="bg-babyblue/20 p-4 rounded-md">
              <h3 className="font-semibold mb-2">Typiske trekk ved nordiske navn:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Sammensatte av to ord (for eksempel "fred" + "rik")</li>
                <li>Inspirert av naturfenomener, guder, styrke og kjærlighet</li>
                <li>Ofte korte, kraftfulle lyder</li>
              </ul>
            </div>
          </div>

          {/* Girls names section */}
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Vakre nordiske jentenavn og deres betydninger
            </h2>
            <div className="space-y-4">
              {[
                {
                  name: "Sigrid",
                  meaning: "En kombinasjon av 'seier' (sigr) og 'vakker' (fridr). Et navn som symboliserer en vakker seier."
                },
                {
                  name: "Astrid",
                  meaning: "Betyr 'vakker, elsket av gudene'. Et av de mest klassiske nordiske navnene."
                },
                {
                  name: "Ingrid",
                  meaning: "Sammensatt av 'Ing' (en gammel fruktbarhetsgud) og 'skjønnhet'. Betyr 'den vakre som tilhører Ing'."
                },
                {
                  name: "Liv",
                  meaning: "Betyder direkte 'liv' på norsk. Et sterkt, kort navn som representerer vitalitet og glede."
                },
                {
                  name: "Freja",
                  meaning: "Navnet på kjærlighets- og fruktbarhetsgudinnen i norrøn mytologi. Symboliserer kjærlighet, styrke og skjønnhet."
                }
              ].map((item, index) => (
                <div key={index} className="bg-babypink/20 p-4 rounded-md">
                  <h3 className="font-bold text-xl mb-2">{item.name}</h3>
                  <p className="text-gray-700">{item.meaning}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Boys names section */}
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Vakre nordiske guttenavn og deres betydninger
            </h2>
            <div className="space-y-4">
              {[
                {
                  name: "Eirik",
                  meaning: "Betyr 'en som ærer loven' eller 'evig mektig'. En kongeverdig betydning."
                },
                {
                  name: "Leif",
                  meaning: "Betyr 'arving' eller 'etterkommer'. Et navn med historisk styrke, kjent fra Leiv Eiriksson."
                },
                {
                  name: "Torstein",
                  meaning: "Sammensatt av 'Tor' (tordenguden) og 'stein'. Symboliserer styrke og varighet."
                },
                {
                  name: "Sverre",
                  meaning: "Betyr 'vill, utemmet'. Et navn for et barn med frihetstrang og eventyrlyst."
                },
                {
                  name: "Olav",
                  meaning: "Betyr 'forfedrenes etterkommer'. Et av Norges mest ikoniske navn, båret av helgener og konger."
                }
              ].map((item, index) => (
                <div key={index} className="bg-babyblue/20 p-4 rounded-md">
                  <h3 className="font-bold text-xl mb-2">{item.name}</h3>
                  <p className="text-gray-700">{item.meaning}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Nature-inspired names section */}
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Naturinspirerte nordiske navn
            </h2>
            <p className="text-gray-700 mb-4">
              Mange nordiske navn har direkte forbindelser til naturen – noe som gjenspeiler vår sterke tilknytning til landskapet.
            </p>
            <div className="bg-babygreen/20 p-4 rounded-md">
              <h3 className="font-semibold mb-2">Eksempler:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Solveig – "hus av solen" eller "styrke av solen"</li>
                <li>Bjørn – "bjørn", et symbol på styrke og mot</li>
                <li>Alv – "alv", et magisk vesen fra naturen</li>
                <li>Runa – "hemmelighet" eller "mystikk", ofte knyttet til runer og visdom</li>
              </ul>
            </div>
          </div>

          {/* Why choose Nordic names section */}
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Derfor velger mange foreldre nordiske navn i dag
            </h2>
            <p className="text-gray-700 mb-4">
              Nordiske navn gir en sterk følelse av identitet og kulturarv. Mange foreldre opplever at disse navnene både er tidløse og fulle av karakter. Samtidig er de ofte korte, tydelige og enkle å uttale, noe som gjør dem praktiske i en moderne verden.
            </p>
            <p className="text-gray-700">
              I en tid hvor navnevalget kan være grenseløst, er det mange som finner ro i å vende tilbake til noe ekte – noe som knytter barnet til en større historie og til røttene sine.
            </p>
          </div>
        </section>

        {/* Conclusion */}
        <div className="mt-12 p-8 bg-gradient-to-br from-babyblue/20 to-babypurple/20 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Et navn med mening
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Når dere velger et nordisk navn, velger dere ikke bare en vakker lyd – dere velger en betydning som vil være en del av barnets livshistorie. Kanskje velger dere et navn som symboliserer styrke, som minner om naturens kraft, eller som bærer en eldgammel visdom videre?
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            Uansett hvilket navn dere lander på, vil det være en hyllest til deres barn, deres historie og deres håp for fremtiden.
          </p>
        </div>
      </article>
    </BlogPostLayout>
  );
};

export default NordicNames;
