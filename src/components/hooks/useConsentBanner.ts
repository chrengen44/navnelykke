
import { useEffect, useState } from "react";

export function useConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const consent = localStorage.getItem("consent");
    setIsVisible(consent !== "true" && consent !== "false");
  }, []);

  const handleConsent = (consent: boolean) => {
    localStorage.setItem("consent", consent.toString());
    setIsVisible(false);
  };

  return { isVisible, isMounted, handleConsent };
}
