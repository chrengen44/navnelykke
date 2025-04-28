
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  data: object | object[];
}

const StructuredData: React.FC<StructuredDataProps> = ({ data }) => {
  if (!data) {
    console.warn('No structured data provided to StructuredData component');
    return null;
  }

  // Safer implementation that handles potential errors
  const renderScripts = () => {
    try {
      if (Array.isArray(data)) {
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
  
  return <Helmet>{renderScripts()}</Helmet>;
};

export default StructuredData;
