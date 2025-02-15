// LoadingOverlay.jsx
import React from 'react';

const LoadingOverlay = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
  </div>
);

export default LoadingOverlay;