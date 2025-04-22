'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface TCFAPI {
  (...args: unknown[]): void;
  que?: unknown[];
}

declare global {
  interface Window {
    __tcfapi: TCFAPI;
  }
}

const ConsentBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if consent was already given
    const consent = localStorage.getItem('consent');
    if (consent) {
      setIsVisible(false);
    }
  }, []);

  const handleConsent = (consent: boolean) => {
    localStorage.setItem('consent', consent.toString());
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="bg-white p-4 shadow-lg">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Personvern og informasjonskapsler</h3>
            <p className="text-sm text-gray-600">
              Vi bruker informasjonskapsler for å forbedre din opplevelse på nettstedet vårt. 
              Ved å klikke "Godta" samtykker du til bruken av informasjonskapsler i henhold til vår personvernpolicy.
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => handleConsent(false)}
            >
              Ikke godta
            </Button>
            <Button 
              variant="default" 
              onClick={() => handleConsent(true)}
            >
              Godta
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner; 