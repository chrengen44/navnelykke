
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  data: object | object[] | null;
}

const StructuredData: React.FC<StructuredDataProps> = ({ data }) => {
  // If no data or empty array is provided, return null
  if (!data || (Array.isArray(data) && data.length === 0)) {
    return null;
  }

  // More robust implementation that safely handles errors
  const renderScripts = () => {
    try {
      if (Array.isArray(data)) {
        // Filter out any null/undefined items before mapping
        return data.filter(Boolean).map((item, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(item)}
          </script>
        ));
      } else {
        return (
          <script type="application/ld+json">
            {JSON.stringify(data)}
          </script>
        );
      }
    } catch (error) {
      console.error('Error rendering structured data:', error);
      return null;
    }
  };
  
  // Return null if renderScripts returns null
  const scripts = renderScripts();
  if (!scripts) return null;
  
  return <Helmet>{scripts}</Helmet>;
};

export default StructuredData;
