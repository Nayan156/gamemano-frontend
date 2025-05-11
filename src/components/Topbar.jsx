// 'use client';

// import { useState } from 'react';
// import Image      from 'next/image';
// import Link       from 'next/link';


// const NAV_ITEMS = [
//   { href: '/',         label: 'Home'       },
//   { href: '/products', label: 'Game Store' },
//   { href: '/', label: 'Leaderboard' },
// ];

// const ICONS = [
//   {
//     href: '/notifications',
//     src: '/icons/bell.png',
//     hoverSrc: '/icons/bell-hover.png',
//     alt: 'Notifications',
//     width: 42,
//     height: 42
//   },
//   {
//     href: '/',
//     src: '/icons/bag.png',
//     hoverSrc: '/icons/bag-hover.png',
//     alt: 'Cart',
//     width: 42,
//     height: 42
//   },
//   {
//     href: '/',
//     src: '/icons/avatar.png',
//     hoverSrc: '/icons/avatar-hover.png',
//     alt: 'Profile',
//     width: 42,
//     height: 42
//   },
// ];

// function NavIcon({ icon, index }) {
//   const [hovered, setHovered] = useState(false);

//   return (
//     <Link
//       href={icon.href}
//       className={`p-2 rounded-full hover:bg-black/30 ${index > 0 ? 'border-l border-white/30 pl-4' : ''}`}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       <Image
//         src={hovered ? icon.hoverSrc : icon.src}
//         alt={icon.alt}
//         width={icon.width}
//         height={icon.height}
//       />
//     </Link>
//   );
// }

// export default function Topbar() {
//   return (
//     <header className="sticky top-0 z-10 px-16 h-[102px] bg-black/55 backdrop-blur-sm flex items-center justify-between">
//       {/* Left nav */}
//       <nav className="items-center space-x-6 text-white hidden md:flex">
//         {NAV_ITEMS.map((item) => (
//           <a 
//             key={item.label} 
//             href={item.href} 
//             className="
//               font-poppins 
//               font-medium 
//               text-[18px] 
//               leading-[100%] 
//               tracking-[0%] 
//               text-white 
//               text-center 
//               hover:text-orange-200
//             "
//           >
//             {item.label}
//           </a>
//         ))}
//       </nav>


      
//       <div className="flex flex-row px-4">
//         <input
//           type="text"
//           placeholder="What are you looking for?"
//           className="w-[500px] h-10 px-4 rounded-full mr-10 mt-[7px] bg-transparent placeholder:text-white text-white border border-white"
//         />

//       {/* <div className="items-center space-x-4 text-white hidden md:flex">
//         {ICONS.map((icon, i) => (
//           <div
//             key={icon.src}
//             className={`p-2 rounded-full hover:bg-black/30 ${
//               i > 0 ? 'border-l border-white/30 pl-4' : ''
//             }`}
//           >
//             <Image 
//               src={icon.src} 
//               alt={icon.alt} 
//               width={icon.width} 
//               height={icon.height} 
//             />
//           </div>
//         ))}
//       </div> */}
//       <div className="hidden md:flex items-center space-x-4">
//         {ICONS.map((icon, i) => (
//           <NavIcon key={icon.alt} icon={icon} index={i} />
//         ))}
//       </div>
//       </div>
//     </header>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Notification from './Notification';


const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Game Store' },
  { href: '/', label: 'Leaderboard' },
];

const ICONS = [
  {
    href: '/',
    src: '/icons/bag.png',
    hoverSrc: '/icons/bag-hover.png',
    alt: 'Cart',
    width: 42,
    height: 42,
  },
  {
    href: '/',
    src: '/icons/avatar.png',
    hoverSrc: '/icons/avatar-hover.png',
    alt: 'Profile',
    width: 42,
    height: 42,
  },
];

function NavIcon({ icon, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={icon.href}
      className={`p-2 rounded-full hover:bg-black/30 ${index > 0 ? 'border-l border-white/30 pl-4' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={hovered ? icon.hoverSrc : icon.src}
        alt={icon.alt}
        width={icon.width}
        height={icon.height}
      />
    </Link>
  );
}

function PopIcon({ icon, index, onClick }) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <div
      className={`p-2 rounded-full hover:bg-black/30 ${index > 0 ? 'border-l border-white/30 pl-4' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={()=> onClick()}
    >
      <Image
        src={hovered ? icon.hoverSrc : icon.src}
        alt={icon.alt}
        width={icon.width}
        height={icon.height}
      />
    </div>
  );
}

export default function Topbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);


  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleClick = () => {
    setNotificationOpen((prev) => !prev);
  }

  if (isMobile) {

return (
  <header className="sticky top-0 z-10 px-4 py-3 bg-black/80 backdrop-blur-sm">
    <div className="flex items-center justify-between">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search games..."
        className="flex-1 mr-3 h-9 px-3 rounded-full text-sm bg-transparent placeholder:text-white text-white border border-white"
      />

      {/* Toggle Dropdown Button */}
      <button
        className="text-white border border-white rounded-full px-3 py-1 text-sm"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        Menu
      </button>
    </div>

    {/* Dropdown with Icons */}
    {menuOpen && (
  <div className="mt-3 bg-black/60 py-4 px-4 rounded-lg space-y-4">
    {/* Nav Links */}
    <nav className="flex flex-col items-start space-y-2">
      {NAV_ITEMS.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="text-white text-base font-medium font-poppins hover:text-orange-300"
        >
          {item.label}
        </a>
      ))}
    </nav>

    {/* Icons */}
    <div className="flex justify-around pt-3 border-t border-white/20">
    <PopIcon icon={{href: '/',src: '/icons/bell.png',hoverSrc: '/icons/bell-hover.png',alt: 'Notifications', width: 42, height: 42, }} index={0} onClick={handleClick} />
      {ICONS.map((icon, i) => (
        <NavIcon key={icon.alt} icon={icon} index={i} />
      ))}
    </div>
  </div>
)}

  </header>
);

  }

  // === DESKTOP VIEW ===
  return (
    <header className="sticky top-0 z-10 px-16 h-[102px] bg-black/55 backdrop-blur-sm flex items-center justify-between">
      {/* Left nav */}
      <nav className="items-center space-x-6 text-white hidden md:flex">
        {NAV_ITEMS.map((item) => (
          <a 
            key={item.label} 
            href={item.href} 
            className="
              font-poppins 
              font-medium 
              text-[18px] 
              leading-[100%] 
              tracking-[0%] 
              text-white 
              text-center 
              hover:text-orange-200
            "
          >
            {item.label}
          </a>
        ))}
      </nav>


      
      <div className="flex flex-row px-4">
        <input
          type="text"
          placeholder="What are you looking for?"
          className="w-[500px] h-10 px-4 rounded-full mr-10 mt-[7px] bg-transparent placeholder:text-white text-white border border-white"
        />

      {/* <div className="items-center space-x-4 text-white hidden md:flex">
        {ICONS.map((icon, i) => (
          <div
            key={icon.src}
            className={`p-2 rounded-full hover:bg-black/30 ${
              i > 0 ? 'border-l border-white/30 pl-4' : ''
            }`}
          >
            <Image 
              src={icon.src} 
              alt={icon.alt} 
              width={icon.width} 
              height={icon.height} 
            />
          </div>
        ))}
      </div> */}
      <div className="hidden md:flex items-center space-x-4">
        <PopIcon icon={{href: '/',src: '/icons/bell.png',hoverSrc: '/icons/bell-hover.png',alt: 'Notifications', width: 42, height: 42, }} index={0} onClick={handleClick} />
        {ICONS.map((icon, i) => (
          <NavIcon key={icon.alt} icon={icon} index={i} />
        ))}
      </div>
      </div>
      {notificationOpen && <Notification  onClose={() => setNotificationOpen(false)} />}
    </header>
  );
}

