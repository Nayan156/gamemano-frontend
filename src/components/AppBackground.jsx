'use client';

import React from 'react';

export default function AppBackground({ children }) {
  return (
    <div
      className="
        flex flex-col min-h-screen
        bg-[radial-gradient(ellipse_at_center,_rgba(61,53,42,1)_30%,_rgba(0,0,0,1)_100%)]
        transition-all duration-500 ease-in-out
      "
    >
      {children}
    </div>
  );
}
