import React from 'react';
import { Globe } from "lucide-react";
import BlogPostLayout from '@/components/BlogPostLayout';

const InternationalNames = () => {
  return (
    <BlogPostLayout title="Internasjonale navn som fungerer godt på norsk">
      <article className="prose prose-lg lg:prose-xl max-w-4xl mx-auto">
        {/* Hero section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-2 bg-babypurple rounded-full mb-4">
            <Globe className="h-6 w-6 text-purple-700" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Internasjonale navn som fungerer godt på norsk
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            I en stadig mer internasjonal verden velger mange foreldre navn som fungerer like godt i Norge som i utlandet.
          </p>
        </div>

        {/* Why choose international names */}
        <div className="bg-gradient-to-br from-babypurple/20 to-babyblue/20 p-8 rounded-lg mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Hvorfor velge et internasjonalt navn?
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="font-semibold mr-2">Fleksibilitet:</span>
              Navnet fungerer like godt hjemme som ute i verden.
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">Enkelhet:</span>
              Lettere for barnet å unngå misforståelser i uttale og staving.
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">Moderne uttrykk:</span>
              Mange internasjonale navn har en frisk, tidløs klang.
            </li>
          </ul>
        </div>

        {/* Characteristics section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Kjennetegn ved internasjonale navn som fungerer i Norge
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Enkle vokaler og konsonanter</li>
            <li>Kort lengde (ofte 2-3 stavelser)</li>
            <li>Lik uttale på norsk og andre språk</li>
            <li>Unngår spesialtegn (æ, ø, å)</li>
          </ul>
        </section>

        {/* Name suggestions section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-babypink/20 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Jentenavn</h3>
            <ul className="space-y-2">
              {["Emma", "Sofia", "Leah", "Maya", "Ella"].map((name) => (
                <li key={name} className="text-gray-700">{name}</li>
              ))}
            </ul>
          </div>

          <div className="bg-babyblue/20 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Guttenavn</h3>
            <ul className="space-y-2">
              {["Noah", "Leo", "Liam", "Adrian", "Julian"].map((name) => (
                <li key={name} className="text-gray-700">{name}</li>
              ))}
            </ul>
          </div>

          <div className="bg-babypeach/20 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Kjønnsnøytrale navn</h3>
            <ul className="space-y-2">
              {["Alex", "Robin", "Charlie", "Noa", "Sam"].map((name) => (
                <li key={name} className="text-gray-700">{name}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tips section */}
        <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Tips når dere velger et internasjonalt navn
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="font-semibold mr-2">Test uttalen:</span>
              Si navnet høyt på norsk og engelsk. Føles det naturlig?
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">Sjekk stavemåten:</span>
              Velg navn som ikke skaper forvirring i stavemåte.
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">Tenk på framtiden:</span>
              Navnet skal fungere i mange ulike sammenhenger – skole, jobb, reiser.
            </li>
          </ul>
        </section>

        {/* Conclusion */}
        <div className="bg-gradient-to-br from-babypurple/20 to-babyblue/20 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            En åpen dør til verden
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Å velge et internasjonalt navn som fungerer godt på norsk, er å gi barnet deres en dør åpnet mot verden – samtidig som det føles naturlig og hjemme her. Navnet bærer på muligheter, eventyr og tilhørighet, uansett hvor livet fører hen.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            Det viktigste er at navnet treffer hjertet deres, og at det føles riktig både nå – og for fremtiden.
          </p>
        </div>
      </article>
    </BlogPostLayout>
  );
};

export default InternationalNames;
