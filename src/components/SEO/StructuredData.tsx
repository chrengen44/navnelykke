
import React from 'react';

interface StructuredDataProps {
  data: object | object[] | null;
}

/**
 * A component that renders structured data for SEO purposes
 */
const StructuredData: React.FC<StructuredDataProps> = ({ data }) => {
  // If no data or empty array is provided, return null
  if (!data || (Array.isArray(data) && data.length === 0)) {
    return null;
  }

  // Generate a unique ID for each script tag
  const generateId = (index: number) => `structured-data-${index}`;

  // Insert script tags into document head on mount and remove on unmount
  React.useEffect(() => {
    try {
      if (Array.isArray(data)) {
        // Filter out any null/undefined items
        const validData = data.filter(Boolean);
        
        if (validData.length === 0) return;
        
        // Add script tags for each item in the array
        validData.forEach((item, index) => {
          const scriptId = generateId(index);
          const existingScript = document.getElementById(scriptId);
          if (existingScript) {
            document.head.removeChild(existingScript);
          }
          
          const scriptTag = document.createElement('script');
          scriptTag.id = scriptId;
          scriptTag.type = 'application/ld+json';
          scriptTag.textContent = JSON.stringify(item);
          document.head.appendChild(scriptTag);
        });
        
        // Cleanup function to remove scripts when component unmounts
        return () => {
          validData.forEach((_, index) => {
            const scriptId = generateId(index);
            const scriptTag = document.getElementById(scriptId);
            if (scriptTag) {
              document.head.removeChild(scriptTag);
            }
          });
        };
      } else {
        // Handle single object case
        const scriptId = 'structured-data-single';
        const existingScript = document.getElementById(scriptId);
        if (existingScript) {
          document.head.removeChild(existingScript);
        }
        
        const scriptTag = document.createElement('script');
        scriptTag.id = scriptId;
        scriptTag.type = 'application/ld+json';
        scriptTag.textContent = JSON.stringify(data);
        document.head.appendChild(scriptTag);
        
        // Cleanup function
        return () => {
          const scriptTag = document.getElementById(scriptId);
          if (scriptTag) {
            document.head.removeChild(scriptTag);
          }
        };
      }
    } catch (error) {
      console.error('Error rendering structured data:', error);
    }
  }, [data]);

  // This component doesn't render anything to the DOM
  return null;
};

export default StructuredData;
