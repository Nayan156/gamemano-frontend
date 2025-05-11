// app/layout.js

import '../../styles/globals.css'
import Layout from '../../components/Layout'

export const metadata = {
  title: 'Gamemano E-commerce',
  description: 'A responsive Next.js + Tailwind e-commerce frontend',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  )
}

// app/(landing)/layout.jsx
// import LandingSidebar from '@/components/Sidebar';
// import LandingTopbar  from '@/components/Topbar';

// export default function LandingLayout({ children }) {
//   return (
//     <div className="flex flex-col md:flex-row flex-1">
//       {/* your custom landing sidebar */}
//       <div className="hidden md:block">
//         <LandingSidebar />
//       </div>
//       <div className="flex-1 flex flex-col">
//         <LandingTopbar />
//         <main className="flex-1 overflow-auto">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }

