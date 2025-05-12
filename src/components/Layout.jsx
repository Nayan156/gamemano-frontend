
import Sidebar from './Sidebar'
import Topbar   from './Topbar'
import Footer   from './Footer'

export default function Layout({ children }) {
  return (
    
    <div className="flex flex-col min-h-screen  overflow-x-hidden">

      
      <div className="flex flex-1">
        
        <div className="hidden md:flex">
          <Sidebar />
        </div>

        
        <div className="flex-1 flex flex-col">
          <Topbar />

          <main className="flex-1 overflow-auto">
          
          <div className="w-full h-ful md:max-w-[calc(100vw-118px)]">
           {children}
          </div>
        </main>
        </div>
      </div>

    </div>
  )
}
