
import React from 'react';
import { Layout } from "@/components/Layout";
import { Users } from "lucide-react";

const SiblingNames = () => {
  return (
    <Layout>
      <main className="container mx-auto px-4 py-12">
        <article className="prose prose-lg lg:prose-xl max-w-4xl mx-auto">
          {/* Hero section */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center p-2 bg-babypink rounded-full mb-4">
              <Users className="h-6 w-6 text-pink-700" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
              Hvordan velge søskennavn som passer sammen
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Finn den perfekte kombinasjonen av navn som skaper en vakker helhet for søskenflokken.
            </p>
          </div>

          <section className="bg-gradient-to-br from-babypink/20 to-babyblue/20 p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Hvorfor tenke på navneharmoni mellom søsken?
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="font-semibold mr-2">Estetisk helhet:</span>
                Navn som ligner i stil skaper en vakker balanse.
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">Følelsesmessig sammenheng:</span>
                Det kan styrke søskenfølelsen å ha navn som "hører sammen".
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">Praktisk bruk:</span>
                Lik rytme eller lengde gjør det lettere i daglig tale og samhandling.
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">5 tips for å finne søskennavn som passer sammen</h2>
            
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-3">1. Hold stilen konsistent</h3>
                <p className="text-gray-700 mb-4">
                  Tenk over hvilken stil dere liker: klassisk, moderne, nordisk, internasjonal eller kanskje mytologisk? 
                  Det gir en naturlig sammenheng hvis begge navnene henter inspirasjon fra samme kilde.
                </p>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="font-medium mb-2">Eksempler:</p>
                  <ul className="space-y-1 text-gray-600">
                    <li>Tradisjonelt: Ingrid og Henrik</li>
                    <li>Moderne: Ella og Leo</li>
                    <li>Norrønt: Sigrid og Eirik</li>
                  </ul>
                </div>
              </div>

              {/* Remaining tips sections with similar structure... */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-3">2. Balanser lengden på navnene</h3>
                <p className="text-gray-700 mb-4">
                  Navn med likt antall stavelser eller lignende rytme kan høres naturlige ut sammen.
                </p>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="font-medium mb-2">Eksempler:</p>
                  <ul className="space-y-1 text-gray-600">
                    <li>To korte navn: Mia og Olav</li>
                    <li>To lengre navn: Amalie og Sebastian</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-3">3. Pass på initialene</h3>
                <p className="text-gray-700 mb-4">
                  Det kan være greit å unngå navn som gir identiske initialer, spesielt hvis dere vil skille søsken tydelig.
                </p>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="font-medium mb-2">Eksempler:</p>
                  <ul className="space-y-1 text-gray-600">
                    <li>Matchende: Sofie og Sebastian</li>
                    <li>Varierte: Nora og Lukas</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-3">4. Tenk på betydningene</h3>
                <p className="text-gray-700 mb-4">
                  Noen foreldre velger navn som deler en felles betydning eller tematikk.
                </p>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="font-medium mb-2">Eksempler:</p>
                  <ul className="space-y-1 text-gray-600">
                    <li>Naturtema: Vilja ("vilje") og Storm</li>
                    <li>Kjærlighetstema: Alma ("sjelen") og Levi ("forent")</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-3">5. Husk individuell identitet</h3>
                <p className="text-gray-700 mb-4">
                  Selv om navnene skal harmonere, er det viktig at hvert barn får sitt helt egne navn.
                </p>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="font-medium mb-2">Eksempler:</p>
                  <ul className="space-y-1 text-gray-600">
                    <li>For nært: Mia og Lia (kan skape forvirring)</li>
                    <li>Bedre balanse: Mia og Nora</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-babypink/20 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Tradisjonelle par</h3>
              <ul className="space-y-2 text-gray-700">
                <li>Anna og Johan</li>
                <li>Marie og Andreas</li>
              </ul>
            </div>

            <div className="bg-babyblue/20 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Moderne par</h3>
              <ul className="space-y-2 text-gray-700">
                <li>Luna og Emil</li>
                <li>Alma og Noah</li>
              </ul>
            </div>

            <div className="bg-babypeach/20 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Nordiske par</h3>
              <ul className="space-y-2 text-gray-700">
                <li>Sigrid og Leif</li>
                <li>Ingrid og Bjørn</li>
              </ul>
            </div>

            <div className="bg-babypurple/20 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Internasjonale par</h3>
              <ul className="space-y-2 text-gray-700">
                <li>Olivia og Liam</li>
                <li>Sofia og Lucas</li>
              </ul>
            </div>
          </section>

          <div className="bg-gradient-to-br from-babypink/20 to-babyblue/20 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Skap en navnehelhet med hjertet
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Å finne søskennavn som passer sammen handler til syvende og sist om å skape en liten symfoni av navn – 
              en helhet der hvert barn har sin egen melodi, men hvor tonene harmonerer vakkert sammen.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              La hjertet føre dere i valget, og husk at det viktigste er at navnene dere velger bærer med seg 
              kjærlighet, respekt og håp for fremtiden.
            </p>
          </div>
        </article>
      </main>
    </Layout>
  );
};

export default SiblingNames;
