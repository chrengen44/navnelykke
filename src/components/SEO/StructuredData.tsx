
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
  try {
    if (Array.isArray(data)) {
      // Filter out any null/undefined items before rendering
      const validData = data.filter(Boolean);
      
      if (validData.length === 0) return null;
      
      return (
        <Helmet>
          {validData.map((item, index) => (
            <script key={index} type="application/ld+json">
              {JSON.stringify(item)}
            </script>
          ))}
        </Helmet>
      );
    } else {
      return (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(data)}
          </script>
        </Helmet>
      );
    }
  } catch (error) {
    console.error('Error rendering structured data:', error);
    return null;
  }
};

export default StructuredData;
