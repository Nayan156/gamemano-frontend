
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
