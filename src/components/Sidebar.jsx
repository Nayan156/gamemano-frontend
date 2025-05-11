// components/Sidebar.jsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import NavSidebar from './NavSidebar';
import NavSidebarContent from './NavSidebarContent';
import { logout } from '@/lib/auth';

const ICONS = [
  { src: '/icons/home.png',       alt: 'Home',       width: 24, height: 24 },
  { src: '/icons/vector.png',   alt: 'Messages',   width: 18.78, height: 15.79 },
  { src: '/icons/store.png',      alt: 'Store',      width: 22, height: 20 },
  { src: '/icons/payments.png',   alt: 'Payments',   width: 21, height: 16.5 },
  { src: '/icons/appstore.png',   alt: 'App Store',   width: 20, height: 20 },
  { src: '/icons/leaderboard.png',alt: 'Leaderboard',width: 24, height: 24 },
];

const ICONS2 = [
  { src: '/icons/settings.png',   alt: 'Settings',   width: 25, height: 25 },
  { src: '/icons/logout.png',     alt: 'Logout',     width: 24, height: 24 },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const openPanel  = () => setOpen(true);


  const handleIconClick = (alt) => {
    if (alt === 'Logout') {
      logout();
      router.replace('/login');
    }
    // else: handle other bottom‐icons if needed
  };
  return (
    <nav className="hidden md:flex flex-col w-[117px] border-r border-white/30">
      <div className="pt-[44px] pl-[23px] bg-black/55">
        <Image
          src="/GQ.png"     // replace with your actual logo path
          alt="GameQuest Logo"
          width={76}
          height={38}
        />
      </div>

      <div className='h-[498px] border-b-2 border-white/30 bg-black/55'>
      <div className="absolute top-[126px] left-[48px] flex flex-col gap-[50px]" onMouseEnter={openPanel}>
        {ICONS.map(icon => (
          <Image
            key={icon.src}
            src={icon.src}
            alt={icon.alt}
            width={icon.width}
            height={icon.height}
          />
        ))}
      </div>
      </div>

      <div className='h-[227px]  bg-black/55 flex flex-col justify-center'>
      <div className="absolute left-[48px] flex flex-col gap-[50px]">
        {ICONS2.map(icon => (
          <div
          key={icon.src}
          className="cursor-pointer"
          onClick={() => handleIconClick(icon.alt)}
        >
          <Image
            key={icon.src}
            src={icon.src}
            alt={icon.alt}
            width={icon.width}
            height={icon.height}
          />
        </div>
        ))}
      </div>
      </div>

            {/* Our floating nav‐sidebar panel */}
      <NavSidebar open={open} onClose={() => setOpen(false)}>
        {/* Here you can render your expanded menu items */}
        <NavSidebarContent />
      </NavSidebar>

    </nav>
  );
}
