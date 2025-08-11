// src/components/Preloader.tsx
import React from 'react';

interface PreloaderProps {
  show?: boolean;
}

const Preloader: React.FC<PreloaderProps> = ({ show = false }) => {
  if (!show) return null;

  return (
    <div id="preloder">
      <div className="loader"></div>
    </div>
  );
};

export default Preloader;
