// // components/NavSidebar.jsx
'use client';

import { useEffect, useRef } from 'react';

export default function NavSidebar({ open, onClose, children }) {
  const ref = useRef(null);

  // Lock background scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close when clicking outside
  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open, onClose]);

  return (
    // Wrapper catches clicks outside
    <div className={`fixed inset-0 z-50 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-transparent`}
        onClick={onClose}
      />

      {/* Sliding panel */}
      <div
        ref={ref}
        onMouseLeave={onClose}
        className={`
          absolute top-0 left-0
          w-[258px] h-[818px]
          bg-[rgba(61,53,42)/50]
          backdrop-blur-[40px]
          shadow-[0px_4px_24px_-1px_rgba(0,0,0,0.2)]
          transform
          ${open ? 'translate-x-0' : '-translate-x-full'}
          transition-transform ease-in-out duration-700
        `}
      >
        {children}
      </div>
    </div>
  );
}
