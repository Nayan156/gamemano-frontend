
'use client';
import Image from 'next/image';
import Link  from 'next/link';
import { useState } from 'react';
import { logout } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import Notification from './Notification';


const TOP_ITEMS = [
  {
    href: '/',
    icon: '/icons/navHome.png',
    hoverIcon: '/icons/navHomeHover.png',
    label: 'Home',
    width: 100,
    height: 27
  },
  {
    href: '/',
    icon: '/icons/navMessages.png',
    hoverIcon: '/icons/navMessagesHover.png',
    label: 'Messages',
    width: 137,
    height: 27
  },
  {
    href: '/products',
    icon: '/icons/navGamestore.png',
    hoverIcon: '/icons/navGamestoreHover.png',
    label: 'Game Store',
    width: 154,
    height: 27
  },
  {
    href: '/',
    icon: '/icons/navPayment.png',
    hoverIcon: '/icons/navPaymentHover.png',
    label: 'Payment',
    width: 136,
    height: 27
  },
  {
    href: '/',
    icon: '/icons/navLeaderBoard.png',
    hoverIcon: '/icons/navLeaderBoardHover.png',
    label: 'Leaderboard',
    width: 160,
    height: 27
  },
];

const BOTTOM_ITEMS = [
  {
    href: '/',
    icon: '/icons/navSettings.png',
    hoverIcon: '/icons/navSettingsHover.png',
    label: 'Settings',
    width: 119,
    height: 27
  },
  {
    href: '/',
    icon: '/icons/navLogout.png',
    hoverIcon: '/icons/navLogoutHover.png',
    label: 'Logout',
    width: 108,
    height: 27
  },
];

function NavItem({ href, icon, hoverIcon, label, badge, width, height }) {
    const [hovered, setHovered] = useState(false);
  
    return (
      <Link
        href={href}
        className="flex items-center space-x-4"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Image
          src={hovered ? hoverIcon : icon}
          alt={label}
          width={width}
          height={height}
        />
      </Link>
    );
  }

export default function NavSidebarContent() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
    const handleIconClick = (alt) => {
      console.log("Logout called",alt);
      
      if (alt === 'Logout') {
        logout();
        router.replace('/login');
      }
      else if (alt === 'Messages') {
        setOpen((prev)=> !prev);
      }
      
    };
  return (
    <div className="flex flex-col h-full">
      <div className="px-6 pt-8 pb-6 ">
        <Image
          src="/GameQuest.png" 
          alt="GameQuest Logo"
          width={216}
          height={24}
        />
      </div>

      <nav className="flex-1 p-6 space-y-6">
        {TOP_ITEMS.map(item => (
          <NavItem key={item.label} {...item} />
        ))}
      </nav>

      <div className="border-t border-white/30 mx-6" />

      <nav className="flex-1 px-6 mt-6 space-y-6">
        {BOTTOM_ITEMS.map(item => (
          <div
            key={item.label}
            className="cursor-pointer"
            onClick={() => handleIconClick(item.label)}>
            <NavItem key={item.label} {...item} />
          </div>
        ))}
      </nav>
      {open && (
        <Notification onClose={() => setOpen(false)} />
      )}
    </div>
  );
}


