// components/Footer.jsx

import Image from 'next/image';

export default function Footer() {
    return (
      <footer className="w-full">
        <Image
          src="/Footer.png"     // replace with your actual logo path
          alt="Footer"
          width={1440}
          height={223}
          className="w-full h-auto"
        />
      </footer>
    );
  }
  