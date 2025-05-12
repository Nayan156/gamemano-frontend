
'use client';

import React, { useRef, useEffect } from 'react';

export default function Notification({ onClose }) {
  const ref = useRef();

  useEffect(() => {
    console.log('Notification component mounted');
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const notifications = [
    { id: 1, text: 'New game dropped!' },
    { id: 2, text: 'Sale: 50% off' },
    { id: 3, text: 'Your order shipped' },
  ];

  return (
    <div ref={ref} className="absolute top-16 right-6 z-50 w-64 bg-white border rounded shadow-lg">
      <ul>
        {notifications.map((n) => (
          <li key={n.id} className="px-4 py-2 hover:bg-gray-100 text-black">
            {n.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
