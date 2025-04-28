
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

  try {
    // Check if data is an array and handle accordingly
    if (Array.isArray(data)) {
      return (
        <Helmet>
          {data.filter(Boolean).map((item, index) => (
            <script key={index} type="application/ld+json">
              {JSON.stringify(item)}
            </script>
          ))}
        </Helmet>
      );
    }
    
    // Handle single object case
    return (
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(data)}</script>
      </Helmet>
    );
  } catch (error) {
    console.error('Error rendering structured data:', error);
    return null;
  }
};

export default StructuredData;
