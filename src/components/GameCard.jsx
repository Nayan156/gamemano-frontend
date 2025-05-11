'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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

export default function GameCard({ game }) {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const commonHeader = (
    <div className="absolute top-[14px] left-[12px] flex items-center bg-black/55 min-w-[84px] max-w-[120px] h-[23px] gap-[10px] px-[8px] py-[4px] rounded-[20px] text-xs leading-none text-white">
      <span className="w-2 h-2 bg-green-500 rounded-full" />
      <span>{game.availabilityStatus} ({game.stock})</span>
    </div>
  );

  const handleClick = () => {
    window.location.href = `/product/${game.id}`;
  };

  if (isMobile) {

  return (
      <div
        onClick={handleClick}
        className="relative w-full h-[290px] bg-yellow-100 rounded-[10px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
      >
        {commonHeader}

        <div className="w-full h-[160px]">
          <img
            src={game.images?.[0] ?? '/fallback.jpg'}
            alt={game.title}
            onError={(e) => (e.currentTarget.src = '/fallback.jpg')}
            className="max-w-full h-full object-cover mx-auto rounded-t-[10px]"
          />
        </div>

        <div className="p-3 flex flex-col gap-1 h-[calc(100%-160px)]">
          <h3 className="text-sm font-bold truncate text-black">{game.title}</h3>

          <div className="flex items-center gap-1">
            {renderStars(game.rating)}
            <span className="text-xs text-gray-700">({game.rating.toFixed(1)})</span>
          </div>

          <p className="text-xs text-red-500 truncate">{game.tags.join(' • ')}</p>

          <div className="mt-auto flex items-center justify-between">
            <span className="text-lg font-bold text-gray-800">${game.price.toFixed(2)}</span>
            <button
              className="bg-[rgba(229,143,40,1)] hover:bg-[rgba(66,36,0,1)] hover:shadow-lg text-white rounded-[30px] px-4 py-1 text-xs"
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    );

  }

  // === DESKTOP VIEW ===
  return (
    <div
      onClick={handleClick}
      className="relative min-w-[300px] w-full h-[383px] rounded-[10px] bg-yellow-100 shadow-md transition-all duration-500 ease-out hover:shadow-xl hover:scale-[1.02] overflow-hidden"
    >
      {commonHeader}
      <img
        src={game.images?.[0] ?? '/fallback.jpg'}
        alt={game.title}
        onError={e => (e.currentTarget.src = '/fallback.jpg')}
        className="w-full h-52 object-cover rounded-t-[10px]"
      />
      <div className="p-4 flex flex-col h-[calc(100%-208px)]">
        <h3 className="text-xl text-black font-bold leading-tight mb-1 truncate">{game.title}</h3>
        <div className="flex items-center mb-1">
          {renderStars(game.rating)}
          <span className="ml-2 text-sm text-gray-700">({game.rating.toFixed(1)})</span>
        </div>
        <p className="text-sm text-red-500 mb-1">{game.tags.join(' • ')}</p>
        <div className="mt-auto flex items-center gap-[20px]">
          <span className="text-2xl font-bold text-gray-800">${game.price.toFixed(2)}</span>
          <button
            className="flex-0 flex items-center justify-center text-white font-semibold w-[255px] h-[45px] bg-[rgba(229,143,40,1)] rounded-[30px] px-[22px] transition-all duration-100 ease-out hover:bg-[rgba(66,36,0,1)] hover:shadow-lg"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
