
// 'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useConsentBanner } from './hooks/useConsentBanner';

const ConsentBanner = () => {
  const { isVisible, isMounted, handleConsent } = useConsentBanner();

  if (!isMounted || !isVisible) {
    return null;
  }

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
