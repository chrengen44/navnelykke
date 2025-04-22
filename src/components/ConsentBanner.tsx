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
      return;
    }

    // Load Google CMP script
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3372507393637890';
    script.async = true;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);

    // Initialize TCF API
    window.__tcfapi = window.__tcfapi || function(...args: unknown[]) {
      (window.__tcfapi.que = window.__tcfapi.que || []).push(args);
    };

    // Add CMP script
    const cmpScript = document.createElement('script');
    cmpScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
    cmpScript.async = true;
    document.head.appendChild(cmpScript);
  }, []);

  const handleConsent = (consent: boolean) => {
    window.__tcfapi('setConsent', 2, {
      gdprApplies: true,
      cmpStatus: 'loaded',
      consent: consent,
      vendor: {
        consents: {
          '1': consent
        }
      }
    });
    
    // Store consent in localStorage
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
            <Button 
              variant="ghost" 
              onClick={() => {
                // Open manage options modal or page
                window.__tcfapi('showConsentUI', 2, {});
              }}
            >
              Innstillinger
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner; 