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
  const [isMounted, setIsMounted] = useState(false);

  console.log('ConsentBanner component mounted, initial isVisible:', isVisible);

  useEffect(() => {
    console.log('ConsentBanner useEffect running');
    setIsMounted(true);
    
    // Check if consent was already given
    const consent = localStorage.getItem('consent');
    console.log('Consent from localStorage:', consent);
    
    if (consent === 'true') {
      console.log('Consent already given, hiding banner');
      setIsVisible(false);
    } else if (consent === 'false') {
      console.log('Consent explicitly denied, hiding banner');
      setIsVisible(false);
    } else {
      console.log('No consent found, showing banner');
      setIsVisible(true);
    }
  }, []);

  const handleConsent = (consent: boolean) => {
    console.log('Handling consent:', consent);
    localStorage.setItem('consent', consent.toString());
    setIsVisible(false);
  };

  if (!isMounted) {
    console.log('Component not mounted yet, returning null');
    return null;
  }

  if (!isVisible) {
    console.log('Banner not visible, returning null');
    return null;
  }

  console.log('Rendering consent banner content');
  return (
    <div className="bg-white p-4 shadow-lg fixed bottom-0 left-0 right-0 z-50">
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
              id="consent-reject"
              name="consent-reject"
            >
              Ikke godta
            </Button>
            <Button 
              variant="default" 
              onClick={() => handleConsent(true)}
              id="consent-accept"
              name="consent-accept"
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