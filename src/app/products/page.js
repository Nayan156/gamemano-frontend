
'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import api from '../../lib/axiosInstance';
import GameCard from '@/components/GameCard';

export default function ProductsPage() {
  const selectedCategories = useSelector((s) => s.categories.selected);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sortBy, setSortBy] = useState(null);
  const [isSortOpen, setSortOpen] = useState(false);
  const sortRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setLoading(true);

    if (selectedCategories.includes('all')) {
      api
        .get('/products')
        .then((res) => setProducts(res.data.products || []))
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      Promise.all(
        selectedCategories.map((slug) =>
          api.get(`/products/category/${encodeURIComponent(slug)}`)
        )
      )
        .then((results) => {
          const merged = results.flatMap((r) => r.data.products || []);
          setProducts(merged);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [selectedCategories]);

  useEffect(() => {
    function handleClick(e) {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setSortOpen(false);
      }
    }
    if (isSortOpen) {
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }
  }, [isSortOpen]);

  const sortedProducts = useMemo(() => {
    if (!sortBy) return products;
    const arr = [...products];
    switch (sortBy) {
      case 'rating-desc':
        return arr.sort((a, b) => b.rating - a.rating);
      case 'rating-asc':
        return arr.sort((a, b) => a.rating - b.rating);
      case 'price-asc':
        return arr.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return arr.sort((a, b) => b.price - a.price);
      default:
        return arr;
    }
  }, [products, sortBy]);

  const headerLabel = selectedCategories.includes('all')
    ? 'All Products'
    : 'Category: ' +
      selectedCategories.map((s) => s.replace(/-/g, ' ')).join(', ');

  const OPTIONS = [
    { label: 'Rating: High → Low', value: 'rating-desc' },
    { label: 'Rating: Low → High', value: 'rating-asc' },
    { label: 'Price: Low → High', value: 'price-asc' },
    { label: 'Price: High → Low', value: 'price-desc' },
  ];

  // === MOBILE VIEW ===
  if (isMobile) {
    return (
      <div className="p-4 min-h-screen">
        <h1 className="text-2xl font-bold text-white mb-4">{headerLabel}</h1>

        <div className="mb-4 relative" ref={sortRef}>
          <button
            onClick={() => setSortOpen((o) => !o)}
            className="w-full px-4 py-2 border border-white/30 rounded-full text-white flex justify-between items-center hover:bg-white/10"
          >
            Sort by <span className="text-sm">▾</span>
          </button>

          {isSortOpen && (
            <div className="absolute w-full mt-2 bg-[rgba(43,36,23,0.9)] backdrop-blur-sm rounded-lg shadow-lg p-2 z-10">
              {OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setSortBy(opt.value);
                    setSortOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded ${
                    sortBy === opt.value
                      ? 'bg-orange-500 text-white'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {loading ? (
          <p className="text-white">Loading...</p>
        ) : (
          <div className="space-y-6">
            {sortedProducts.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </div>
    );
  }

  // === DESKTOP VIEW ===
  return (
    <div className="flex flex-col md:flex-row p-4 md:p-8 lg:p-16 min-h-screen">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-poppins font-bold text-white">
            {headerLabel}
          </h1>

          <div className="relative" ref={sortRef}>
            <button
              onClick={() => setSortOpen((o) => !o)}
              className="flex items-center px-4 py-2 border border-white/30 rounded-full text-white hover:bg-white/10"
            >
              Sort by <span className="ml-2 text-sm">▾</span>
            </button>

            {isSortOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[rgba(43,36,23,0.8)] backdrop-blur-sm rounded-lg shadow-lg p-2 z-10">
                {OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setSortBy(opt.value);
                      setSortOpen(false);
                    }}
                    className={`block w-full text-left px-3 py-2 rounded ${
                      sortBy === opt.value
                        ? 'bg-orange-500 text-white'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <p className="text-white">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 hide-scrollbar">
            {sortedProducts.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}