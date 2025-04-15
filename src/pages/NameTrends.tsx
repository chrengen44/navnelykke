
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NameTrendsChart from '@/components/NameTrendsChart';
import { Button } from '@/components/ui/button';
import { importSSBDataToDB } from '@/utils/ssbDataFetcher';
import { toast } from 'sonner';

const NameTrends = () => {
  const [importing, setImporting] = useState(false);
  
  const handleImport = async () => {
    setImporting(true);
    toast.info('Starter import av navnedata fra SSB. Dette kan ta litt tid...');
    
    try {
      const result = await importSSBDataToDB();
      
      if (result.success) {
        toast.success(`Import fullført! ${result.boysImported} guttenavn og ${result.girlsImported} jentenavn importert.`);
      } else {
        toast.error(`Import fullført med noen feil. ${result.boysImported + result.girlsImported} navn importert.`);
        console.error('Import errors:', result.errors);
      }
    } catch (error) {
      toast.error('Det oppstod en feil under import av data.');
      console.error('Import error:', error);
    } finally {
      setImporting(false);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Navnetrender i Norge</h1>
          <p className="text-gray-600 mb-8">
            Utforsk hvordan populære navn har endret seg over tid, basert på data fra Statistisk Sentralbyrå.
            Grafen viser antall barn med hvert navn per år fra 2013 til 2024.
          </p>
          
          <div className="grid gap-8">
            <NameTrendsChart />
            
            <div className="p-6 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Importer navnedata fra SSB</h2>
              <p className="text-gray-600 mb-4">
                Klikk på knappen nedenfor for å berike databasen med navnedata fra Statistisk Sentralbyrå.
                Dette vil importere navnefrekvenser for perioden 2013-2024 og berike dem med kategorier, opprinnelse og betydning.
              </p>
              <Button 
                onClick={handleImport} 
                disabled={importing}
                className="mt-2"
              >
                {importing ? 'Importerer...' : 'Importer navnedata fra SSB'}
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NameTrends;
