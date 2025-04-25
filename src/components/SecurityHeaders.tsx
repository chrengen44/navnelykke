
import { useEffect } from 'react';

export function SecurityHeaders() {
  useEffect(() => {
    // Apply CSP headers via meta tag since we can't modify HTTP headers directly in a client-side app
    const cspContent = [
      "default-src 'self'",
      "script-src 'self' https://cdn.gpteng.co https://pagead2.googlesyndication.com 'unsafe-inline'", // Allow necessary scripts
      "style-src 'self' https://fonts.googleapis.com 'unsafe-inline'",
      "img-src 'self' data: https: blob:",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://rwxjdyudnkkehdjdcbtc.supabase.co https://googleapis.com",
      "frame-src 'self' https://pagead2.googlesyndication.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      "upgrade-insecure-requests"
    ].join("; ");

    // Create and append CSP meta tag
    let metaElement = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (!metaElement) {
      metaElement = document.createElement('meta');
      metaElement.setAttribute('http-equiv', 'Content-Security-Policy');
      metaElement.setAttribute('content', cspContent);
      document.head.appendChild(metaElement);
    } else {
      metaElement.setAttribute('content', cspContent);
    }

    // Add HSTS header via meta tag
    let hstsElement = document.querySelector('meta[http-equiv="Strict-Transport-Security"]');
    if (!hstsElement) {
      hstsElement = document.createElement('meta');
      hstsElement.setAttribute('http-equiv', 'Strict-Transport-Security');
      hstsElement.setAttribute('content', 'max-age=31536000; includeSubDomains; preload');
      document.head.appendChild(hstsElement);
    }

    // Add X-Content-Type-Options header
    let xctoElement = document.querySelector('meta[http-equiv="X-Content-Type-Options"]');
    if (!xctoElement) {
      xctoElement = document.createElement('meta');
      xctoElement.setAttribute('http-equiv', 'X-Content-Type-Options');
      xctoElement.setAttribute('content', 'nosniff');
      document.head.appendChild(xctoElement);
    }

    // Add X-Frame-Options header
    let xfoElement = document.querySelector('meta[http-equiv="X-Frame-Options"]');
    if (!xfoElement) {
      xfoElement = document.createElement('meta');
      xfoElement.setAttribute('http-equiv', 'X-Frame-Options');
      xfoElement.setAttribute('content', 'DENY');
      document.head.appendChild(xfoElement);
    }

    // Add Referrer-Policy header
    let referrerElement = document.querySelector('meta[name="referrer"]');
    if (!referrerElement) {
      referrerElement = document.createElement('meta');
      referrerElement.setAttribute('name', 'referrer');
      referrerElement.setAttribute('content', 'strict-origin-when-cross-origin');
      document.head.appendChild(referrerElement);
    }
  }, []);

  return null;
}

export default SecurityHeaders;
