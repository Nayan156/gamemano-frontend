
'use client';
import React from 'react';
import AuthGuard from '../../../components/AuthGuard';
import ProductsTopbar from '@/components/ProductsTopbar';
import CategorySidebar from '@/components/CategorySidebar';

export default function ProductDetailsLayout({ children }) {
  return (
    <AuthGuard>
      <div className="flex flex-col flex-1 bg-[rgba(43, 36, 23, 1)]">
        
        <ProductsTopbar />

        
          <main className="flex-1 overflow-auto">
            {children}
          </main>
      </div>
    </AuthGuard>
  );
}
