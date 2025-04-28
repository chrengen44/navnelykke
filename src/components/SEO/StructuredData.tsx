
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  data: object;
}

const StructuredData: React.FC<StructuredDataProps> = ({ data }) => {
  // Create the JSON string outside the JSX for better reliability
  const jsonString = JSON.stringify(data);
  
  return (
    <Helmet>
      <script type="application/ld+json">{`${jsonString}`}</script>
    </Helmet>
  );
};

export default StructuredData;
