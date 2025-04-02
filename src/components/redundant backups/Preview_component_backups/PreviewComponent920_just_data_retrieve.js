import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation to access the state

const PreviewComponent920 = () => {
  const location = useLocation(); // Hook to access the current location/state
  const modalName = location.state?.modalName; // Retrieve modalName from state

  return (
    <div>
      <h3>Preview of {modalName}</h3>
      {/* Use modalName in the component */}
    </div>
  );
};

export default PreviewComponent920;
