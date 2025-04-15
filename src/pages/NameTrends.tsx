
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NameTrendsChart from '@/components/NameTrendsChart';
import { importSSBDataToDB } from '@/utils/ssbDataFetcher';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const NameTrends = () => {
  const [isImporting, setIsImporting] = useState(false);

  const handleImportData = async () => {
    try {
      setIsImporting(true);
      toast.info("Starter import av navnedata fra SSB...");
      
      const result = await importSSBDataToDB();
      
      if (result.success) {
        toast.success(`Import fullført! ${result.boysImported} guttenavn og ${result.girlsImported} jentenavn importert.`);
      } else {
        toast.error(`Import feilet: ${result.errors.length} feil oppstod.`);
        console.error('Import errors:', result.errors);
      }
    } catch (error) {
      toast.error("Feil under import av data.");
      console.error('Error importing data:', error);
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Navnetrender i Norge</h1>
            <Button 
              onClick={handleImportData} 
              disabled={isImporting}
              variant="outline"
              className="bg-blue-50 hover:bg-blue-100"
            >
              {isImporting ? 'Importerer...' : 'Importer SSB data'}
            </Button>
          </div>
          
          <p className="text-gray-600 mb-8">
            Utforsk hvordan populære navn har endret seg over tid, basert på data fra Statistisk Sentralbyrå.
            Grafen viser antall barn med hvert navn per år fra 2013 til 2024. Bruk knappen øverst til høyre for å veksle mellom jente- og guttenavn.
          </p>
          
          <div className="grid gap-8">
            <NameTrendsChart />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NameTrends;
