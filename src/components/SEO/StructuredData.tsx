
import React from 'react';

interface StructuredDataProps {
  data: object | object[] | null;
}

/**
 * A component that safely injects structured data as JSON-LD script tags
 * Optimized to avoid DOM manipulation issues
 */
const StructuredData: React.FC<StructuredDataProps> = ({ data }) => {
  // If no data is provided, return null early
  if (!data || (Array.isArray(data) && data.length === 0)) {
    return null;
  }

  // Function to safely convert data to JSON string
  const getJsonString = (dataItem: object): string => {
    try {
      return JSON.stringify(dataItem);
    } catch (e) {
      console.error('Error stringifying structured data:', e);
      return '{}';
    }
  };

  React.useEffect(() => {
    // Safety check - need to run only in browser context
    if (typeof document === 'undefined') return;

    try {
      // Function to add a script tag safely
      const addScriptTag = (id: string, jsonData: string) => {
        // Remove existing tag if it exists
        const existingScript = document.getElementById(id);
        if (existingScript && existingScript.parentNode) {
          existingScript.parentNode.removeChild(existingScript);
        }

        try {
          // Create and append new script tag
          const script = document.createElement('script');
          script.id = id;
          script.type = 'application/ld+json';
          script.textContent = jsonData;
          document.head.appendChild(script);
        } catch (err) {
          console.error('Error adding structured data script:', err);
        }
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
        if (typeof document === 'undefined') return;
        
        try {
          // Remove all structured data script tags we created
          if (Array.isArray(data)) {
            data.forEach((_, index) => {
              const id = `structured-data-${index}`;
              const scriptTag = document.getElementById(id);
              if (scriptTag && scriptTag.parentNode) {
                scriptTag.parentNode.removeChild(scriptTag);
              }
            });
          } else {
            const scriptTag = document.getElementById('structured-data-single');
            if (scriptTag && scriptTag.parentNode) {
              scriptTag.parentNode.removeChild(scriptTag);
            }
          }
        } catch (err) {
          console.error('Error cleaning up structured data scripts:', err);
        }
      };
    } catch (err) {
      console.error('Error in StructuredData component:', err);
      return () => {}; // Empty cleanup function in case of error
    }
  }, [data]); // Only re-run when data changes

  // This component doesn't render anything to the DOM directly
  return null;
};

export default React.memo(StructuredData);
