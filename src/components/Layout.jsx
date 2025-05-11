// // components/Layout.jsx
// import Sidebar from './Sidebar'
// import Topbar from './Topbar'
// import Footer from './Footer'

// export default function Layout({ children }) {
//   return (
//     <div className="flex flex-col md:flex-row min-h-screen bg-[rgba(61,53,42,1)]">
//       {/* Sidebar only on md+ */}
  
//       <div className="hidden md:flex">
//         <Sidebar />
//       </div>

//       <div className="flex-1 flex flex-col">
//         <Topbar />

        // <main className="flex-1 overflow-auto">
        //   {/* CONSTRAIN WIDTH */}
        //   {/* <div className="mx-auto max-w-screen-xl"> */}
        //   {/* <div className="max-w-screen-xl">
        //     {children}
        //   </div> */}
        //   <div className="w-full h-ful md:max-w-[calc(100vw-118px)]">
        //    {children}
        //   </div>
        // </main>

//         {/* <Footer /> */}
//       </div>
//       <Footer />

//     </div>
//   )
// }

// components/Layout.jsx
import Sidebar from './Sidebar'
import Topbar   from './Topbar'
import Footer   from './Footer'

export default function Layout({ children }) {
  return (
    // 1. Make the root a column, full height of screen
    <div className="flex flex-col min-h-screen  overflow-x-hidden">

      {/* 2. Main area: sidebar + content row */}
      <div className="flex flex-1">
        {/* Sidebar only on md+ */}
        <div className="hidden md:flex">
          <Sidebar />
        </div>

        {/* Content area */}
        <div className="flex-1 flex flex-col">
          <Topbar />

          <main className="flex-1 overflow-auto">
          {/* CONSTRAIN WIDTH */}
          {/* <div className="mx-auto max-w-screen-xl"> */}
          {/* <div className="max-w-screen-xl">
            {children}
          </div> */}
          <div className="w-full h-ful md:max-w-[calc(100vw-118px)]">
           {children}
          </div>
        </main>
        </div>
      </div>

    </div>
  )
}
