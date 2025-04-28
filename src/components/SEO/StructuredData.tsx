
import React from 'react';
import { useEffect } from 'react';

interface StructuredDataProps {
  data: object | object[] | null;
}

/**
 * A component that injects structured data as JSON-LD script tags
 * Completely rewritten to avoid DOM manipulation issues
 */
const StructuredData: React.FC<StructuredDataProps> = ({ data }) => {
  // If no data is provided, return null
  if (!data || (Array.isArray(data) && data.length === 0)) {
    return null;
  }

  useEffect(() => {
    // Function to safely convert data to JSON string
    const getJsonString = (dataItem: object) => {
      try {
        return JSON.stringify(dataItem);
      } catch (e) {
        console.error('Error stringifying structured data:', e);
        return '{}';
      }
    };

    // Function to add a script tag
    const addScriptTag = (id: string, jsonData: string) => {
      // Remove existing tag if it exists
      const existingScript = document.getElementById(id);
      if (existingScript) {
        existingScript.remove();
      }

      // Create and append new script tag
      const script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      script.textContent = jsonData;
      document.head.appendChild(script);
    };

    // Handle array of data
    if (Array.isArray(data)) {
      data.forEach((item, index) => {
        if (item) {
          const id = `structured-data-${index}`;
          const jsonString = getJsonString(item);
          addScriptTag(id, jsonString);
        }
      });
    } 
    // Handle single data object
    else if (data) {
      const id = 'structured-data-single';
      const jsonString = getJsonString(data);
      addScriptTag(id, jsonString);
    }

    // Cleanup function
    return () => {
      // Remove all structured data script tags we created
      if (Array.isArray(data)) {
        data.forEach((_, index) => {
          const scriptTag = document.getElementById(`structured-data-${index}`);
          if (scriptTag) {
            scriptTag.remove();
          }
        });
      } else {
        const scriptTag = document.getElementById('structured-data-single');
        if (scriptTag) {
          scriptTag.remove();
        }
      }
    };
  }, [data]); // Only re-run when data changes

  // This component doesn't render anything to the DOM directly
  return null;
};

export default StructuredData;
