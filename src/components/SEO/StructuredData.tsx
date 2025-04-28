
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

  // Convert data to string outside of render for better error handling
  let jsonString: string | string[];
  
  try {
    if (Array.isArray(data)) {
      jsonString = data.map(item => JSON.stringify(item));
    } else {
      jsonString = JSON.stringify(data);
    }
  } catch (error) {
    console.error('Error stringifying structured data:', error);
    return null;
  }

  // Render scripts with pre-stringified data
  if (Array.isArray(jsonString)) {
    return (
      <Helmet>
        {jsonString.map((item, index) => (
          <script key={index} type="application/ld+json">
            {item}
          </script>
        ))}
      </Helmet>
    );
  }
  
  return (
    <Helmet>
      <script type="application/ld+json">{jsonString}</script>
    </Helmet>
  );
};

export default StructuredData;
