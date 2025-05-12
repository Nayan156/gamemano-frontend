

import Image from 'next/image';

export default function Footer() {
    return (
      <footer className="w-full">
        <Image
          src="/Footer.png"     
          alt="Footer"
          width={1440}
          height={223}
          className="w-full h-auto"
        />
      </footer>
    );
  }
  