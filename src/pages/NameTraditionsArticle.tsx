import React from 'react';
import { BookOpen } from "lucide-react";
import BlogPostLayout from '@/components/BlogPostLayout';

const NameTraditionsArticle = () => {
  return (
    <BlogPostLayout title="Navnetradisjoner i Norge gjennom tidene">
      <article className="prose prose-lg lg:prose-xl max-w-4xl mx-auto">
        {/* Hero section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-2 bg-babyblue rounded-full mb-4">
            <BookOpen className="h-6 w-6 text-blue-700" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Navnetradisjoner i Norge gjennom tidene
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Å finne det rette navnet til barnet sitt handler ikke bare om personlig smak – det handler også om en lang tradisjon med sterke røtter.
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-gradient-to-br from-babyblue/20 to-babypurple/20 p-6 rounded-lg mb-12">
          <p className="text-lg leading-relaxed">
            I Norge har navneskikkene utviklet seg gjennom århundrene, fra stolte norrøne tradisjoner til dagens moderne trender. Her tar vi dere med på en reise gjennom historien, slik at dere kan finne inspirasjon og forståelse når dere velger navn til deres lille skatt.
          </p>
        </div>

        {/* Historical Sections */}
        <section className="space-y-12">
          {/* Norrøne navn */}
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Norrøne navn: Arven fra vikingtiden
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                I vikingtiden og den norrøne perioden (ca. år 800-1350) var navnene sterkt knyttet til natur, styrke, guder og egenskaper man ønsket å videreføre. Mange norrøne navn var sammensatte, med betydninger som symboliserte kraft, mot eller visdom.
              </p>
              <div className="bg-babyblue/20 p-4 rounded-md">
                <h3 className="font-semibold mb-2">Eksempler på norrøne navn:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Tora (av "Thor", tordenguden)</li>
                  <li>Sigrid ("seier" + "vakker")</li>
                  <li>Eirik ("en som ærer loven" eller "evig mektig")</li>
                  <li>Leif ("arving, etterkommer")</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Middelalderen */}
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Middelalderen og kristendommens påvirkning
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                Da kristendommen ble innført i Norge på 1000-tallet, begynte mange å velge bibelske navn. Denne trenden varte i flere hundre år og satte dype spor i den norske navnetradisjonen.
              </p>
              <div className="bg-babypink/20 p-4 rounded-md">
                <h3 className="font-semibold mb-2">Eksempler på kristne navn:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Maria</li>
                  <li>Johannes</li>
                  <li>Olav (senere helgenkåret som Olav den hellige)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 1800-tallet */}
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1800-tallet: Nasjonalromantikk og gjenoppdagelse
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                På 1800-tallet, da Norge fikk en sterkere nasjonal identitet, vokste interessen for norrøn kultur og historie igjen. Mange gamle navn fikk sin renessanse. Samtidig ble det viktig å vise tilhørighet til slekt og jord, og dobbeltnavn ble vanligere.
              </p>
              <div className="bg-babypeach/20 p-4 rounded-md">
                <h3 className="font-semibold mb-2">Eksempler på navn i denne perioden:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Ingeborg</li>
                  <li>Sigurd</li>
                  <li>Kari Anne</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 1900-tallet */}
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1900-tallet: Modernisering og internasjonal inspirasjon
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                Etter hvert som samfunnet moderniserte seg, åpnet Norge seg mer mot verden. Amerikanske, engelske og franske navn begynte å dukke opp, inspirert av filmer, bøker og internasjonale kjendiser.
              </p>
              <div className="bg-babyyellow/20 p-4 rounded-md">
                <h3 className="font-semibold mb-2">Eksempler på nye navn:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Linda</li>
                  <li>Ronny</li>
                  <li>Jeanette</li>
                  <li>Kevin</li>
                </ul>
              </div>
            </div>
          </div>

          {/* I dag */}
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              I dag: Frihet, kreativitet og personlig uttrykk
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                Dagens navnetrender i Norge er preget av stor variasjon og personlig frihet. Mange foreldre kombinerer tradisjonelle norske navn med mer unike eller internasjonale valg.
              </p>
              <div className="bg-babypurple/20 p-4 rounded-md">
                <h3 className="font-semibold mb-2">Eksempler på moderne trender:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Korte navn som Noah, Ella, Leo, Maja</li>
                  <li>Gjenbruk av gamle norske navn som Oskar, Alma, Vilja</li>
                  <li>Unike navn med egenkomponerte varianter</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <div className="mt-12 p-8 bg-gradient-to-br from-babyblue/20 to-babypurple/20 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Navn som bindeledd mellom fortid og fremtid
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Navneskikkene i Norge har utviklet seg i takt med samfunnets forandringer. Fra å hedre forfedre og ønske guddommelig beskyttelse, til å uttrykke individuell stil og identitet – navnene bærer historien vår videre. Kanskje vil dere finne et navn som knytter barnet deres til røtter langt tilbake i tid? Eller kanskje vil dere skape en ny tradisjon for fremtiden?
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            Uansett hvilket navn dere velger, er det en gave dere gir barnet – en gave fylt med mening, håp og kjærlighet.
          </p>
        </div>
      </article>
    </BlogPostLayout>
  );
};

export default NameTraditionsArticle;
