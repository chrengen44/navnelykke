
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NameTrendsChart from '@/components/NameTrendsChart';

const NameTrends = () => {
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
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NameTrends;
