// 'use client';
// import React from 'react';
// import AuthGuard from '../../../components/AuthGuard';

// export default function ProductDetailsLayout({ children }) {
//   // Wraps all /product/[id] pages in the AuthGuard client component
//   return <AuthGuard>{children}</AuthGuard>;
// }
'use client';
import React from 'react';
import AuthGuard from '../../../components/AuthGuard';
import ProductsTopbar from '@/components/ProductsTopbar';
import CategorySidebar from '@/components/CategorySidebar';

export default function ProductDetailsLayout({ children }) {
  return (
    <AuthGuard>
      <div className="flex flex-col flex-1 bg-[rgba(43, 36, 23, 1)]">
        {/* Topbar goes above the content */}
        <ProductsTopbar />

        {/* Sidebar + Main Content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
      </div>
    </AuthGuard>
  );
}
