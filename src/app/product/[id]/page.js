// app/product/[id]/page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import axiosInstance from '@/lib/axiosInstance';
import GameCard from '@/components/GameCard';

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span className="flex items-center text-yellow-500">
      {[...Array(full)].map((_, i) => <span key={'f' + i}>★</span>)}
      {half && <span key="h">☆</span>}
      {[...Array(empty)].map((_, i) => <span key={'e' + i}>☆</span>)}
    </span>
  );
}

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [recommended, setRecommended] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axiosInstance
      .get(`/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => setError(err.message || 'Failed to load'))
      .finally(() => setLoading(false));
  }, [id]);

  
  useEffect(() => {
    if (!id || error) {
      
      setTimeout(() => router.replace('/products'), 1500);
    }
  }, [id, error, router]);

    
    useEffect(() => {
      axiosInstance
        .get('/products')
        .then(res => {
          const all = res.data.products || res.data;
          
          const recs = all.filter(p => p.id.toString() !== id)
          
          setRecommended(recs);
        })
        .catch(console.error);
    }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-300">
        Loading…
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-500">
        <p className="mb-4">{error || 'Product not found.'}</p>
        <button
          onClick={() => router.push('/products')}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b  text-gray-100">
      
      {isMobile ? (
  
  <section className="relative h-[450px] w-full overflow-hidden flex items-center justify-center px-4">
  
  <Image
    src={product.images[0] || '/fallback.jpg'}
    alt={product.title}
    fill
    className="object-cover opacity-30"
  />

  
  <div className="relative z-10 text-center p-4 w-full max-w-[360px] border border-white/30 rounded-lg bg-black/40 backdrop-blur-sm">
    <h1 className="text-2xl font-bold text-white mb-3">{product.title}</h1>

    <div className="flex justify-center items-center gap-2 mb-3 text-xs">
      <span className="bg-green-600 px-3 py-1 rounded-full text-white">
        {product.availabilityStatus} ({product.stock})
      </span>
      <div className="flex items-center">{renderStars(product.rating)}</div>
    </div>

    <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-5 rounded-full">
      Buy Now
    </button>
  </div>
</section>

) : (
  
  <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
    <Image
      src={product.images[0] || '/fallback.jpg'}
      alt={product.title}
      fill
      className="object-cover opacity-30"
    />
    <div className="relative flex flex-col justify-center items-center min-w-[1000px] min-h-[500px] z-10 text-center p-4 border border-gray-50">
      <h1 className="text-7xl font-['Algerian',serif] text-[#ffe3c1] mb-4">{product.title}</h1>
      <div className="flex items-center bg-black/55 min-w-[84px] max-w-[120px] h-[23px] gap-[10px] px-[8px] py-[4px]  rounded-[20px] text-xs leading-none text-white mb-3">
        <span className="w-2 h-2 bg-green-500 rounded-full" />
        <span>{product.availabilityStatus} ({product.stock})</span>
      </div>
      <div className="absolute top-[20px] left-[8px] w-[98px] h-[18px] flex items-center gap-[2px] text-yellow-400">
        {renderStars(product.rating)}
      </div>
      <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-full transition">
        Buy Now
      </button>
    </div>
  </section>
)}


      {/* Details */}
      <section className="px-6 py-10 space-y-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-2">{product.description}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            
          </div>
          <div>
            
          </div>
        </div>
      </section>

      

<section className="px-6 py-10">
  <h2 className="text-3xl font-semibold text-center mb-8 text-white">
    Reviews from other buyers
  </h2>

  <div className="flex flex-wrap justify-center gap-6">
    {product.reviews.map((r, idx) => (
      <div
        key={idx}
        className="
          bg-[#d1b280]
          w-[341px] h-[209px]
          p-4
          rounded-[10px]
          flex flex-col
        "
      >
        
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-gray-700" />
            <span className="text-base font-medium text-gray-800">
              {r.reviewerName}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={
                  i < Math.round(r.rating)
                    ? 'text-yellow-500'
                    : 'text-yellow-200'
                }
              >
                ★
              </span>
            ))}
          </div>
        </div>

        
        <hr className="border-gray-700 mb-2" />

        
        <p className="text-sm text-gray-800 flex-1 overflow-hidden">
          {r.comment}
        </p>
      </div>
    ))}
  </div>
</section>

<section className="px-6 py-10">
        <h2 className="text-3xl font-semibold text-center mb-8 text-white">
          Recommended Products
        </h2>
        <div className="flex gap-5 overflow-x-auto pb-4 px-2 sm:px-4 md:px-0">
          {recommended.map(game => (
            <div
              key={game.id}
              className="flex-shrink-0 w-64 sm:w-72 md:w-80 lg:w-[341px]"
            >
              <GameCard game={game} />
            </div>
          ))}
        </div>
      </section>


      
      <section className="px-6 py-12 text-center">
        <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-full transition">
          Buy for ${product.price.toFixed(2)}
        </button>
      </section>
    </div>
  );
}
