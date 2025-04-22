
import React from "react";

const NameTipsSection = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Tips for å velge det perfekte navnet</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Noen råd til foreldre som leter etter det ideelle navnet til sitt barn
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Tenk på uttale og stavelse</h3>
            <p className="text-gray-600">
              Vurder hvor enkelt navnet er å uttale og stave. Et navn som ofte mistolkes kan bli frustrerende for barnet.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Utforsk betydningen</h3>
            <p className="text-gray-600">
              Mange navn har spesielle betydninger eller historie bak seg. Et navn med en vakker eller meningsfull betydning kan være en fin gave.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Test navnet</h3>
            <p className="text-gray-600">
              Si navnet høyt. Hvordan høres det ut med etternavnet? Kan det forkortes til kallenavn? Tenk på hvordan det vil passe i ulike livsfaser.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NameTipsSection;
