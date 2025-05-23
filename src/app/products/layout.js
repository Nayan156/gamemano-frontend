
import ProductsTopbar  from '@/components/ProductsTopbar'
import CategorySidebar from '@/components/CategorySidebar'  

export default function ProductsLayout({ children }) {
  return (
    <div className="flex flex-col flex-1">
      
      <ProductsTopbar />

      
      <div className="flex flex-col md:flex-row flex-1">
        <aside className="hidden md:block md:w-64 md:mr-8">
          <CategorySidebar />
        </aside>

        <main className="flex-1 overflow-auto px-4 md:px-8 lg:px-16">
          {children}
        </main>
      </div>
    </div>
  )
}
