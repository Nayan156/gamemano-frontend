// // app/page.js
// 'use client';

// import React, { useEffect, useState } from 'react';
// import axiosInstance from '../../lib/axiosInstance';
// import HeroCarousel from '../../components/Carousel';
// import TrendingSection from '../../components/TrendingSection';

// export default function HomePage() {
//   const [slides, setSlides] = useState([]);
//   const [trending, setTrending] = useState([]);

//   useEffect(() => {
//     // Fetch first 6 products: use 3 for hero, next 4 for trending
//     axiosInstance
//       .get('/products')
//       .then(res => {
//         const products = res.data.products || res.data;
//         setSlides(products.slice(0, 3));
//         // setTrending(products.slice(3, products.length-1));
//         setTrending(products);
//       })
//       .catch(console.error);
//   }, []);

//   return (
//     <div className="">
//       {/* Hero Carousel */}
//       <section className="">
//         <HeroCarousel slides={slides} />
//       </section>

//       {/* Trending Section */}
//       <section>
//         <TrendingSection games={trending} />
//       </section>
//     </div>
//   );
// }
// app/(landing)/page.jsx
'use client';

import { useEffect, useState } from 'react';
import axiosInstance   from '@/lib/axiosInstance';
import HeroCarousel    from '@/components/Carousel';
import TrendingSection from '@/components/TrendingSection';

export default function LandingPage() {
  const [slides, setSlides]       = useState([]);
  const [trending, setTrending]   = useState([]);

  useEffect(() => {
    axiosInstance.get('/products')
      .then(res => {
        const products = res.data.products || res.data;
        setSlides(products.slice(0, 3));
        setTrending(products.slice(3, products.length - 1));
      })
      .catch(console.error);
  }, []);

  return (
    <div className="flex-1">
      <section className="mb-12">
        <HeroCarousel slides={slides} />
      </section>
      <section>
        <TrendingSection games={trending} />
      </section>
    </div>
  );
}
