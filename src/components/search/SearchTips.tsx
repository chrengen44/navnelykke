
const SearchTips = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Tips for navnesøk</h2>
          <p className="text-gray-600 mb-6">
            Hvis du ikke finner akkurat det du leter etter, prøv disse tipsene:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Søk etter betydning</h3>
              <p className="text-gray-600">
                Prøv å søke etter egenskaper eller betydninger du ønsker i et navn, som "sterk", "vakker" eller "lys".
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Utforsk kategorier</h3>
              <p className="text-gray-600">
                Hvis du vet hvilken type navn du er ute etter, kan det være nyttig å utforske navnekategorier i stedet for å søke.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchTips;
