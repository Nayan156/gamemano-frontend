// // components/Notification.jsx
// 'use client';

// import React, { useState, useRef, useEffect } from 'react';

// export default function Notification() {
//   const [open, setOpen] = useState(false);
//   const ref = useRef();

//   useEffect(() => {
//     function handleClickOutside(e) {
//       if (ref.current && !ref.current.contains(e.target)) {
//         setOpen(false);
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const notifications = [
//     { id: 1, text: 'New game dropped!' },
//     { id: 2, text: 'Sale: 50% off' },
//     { id: 3, text: 'Your order shipped' },
//   ];

//   return (
//     <div className="relative" ref={ref}>
//       <button
//         onClick={() => setOpen(!open)}
//         className="p-2 rounded-full hover:bg-gray-200"
//       >
//         🔔
//       </button>

//       {open && (
//         <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
//           <ul>
//             {notifications.map((n) => (
//               <li key={n.id} className="px-4 py-2 hover:bg-gray-100">
//                 {n.text}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }
'use client';

import React, { useRef, useEffect } from 'react';

export default function Notification({ onClose }) {
  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose(); // Call parent close
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
