
// import ReduxProvider from '@/components/ReduxProvider.client';
// import Footer        from '@/components/Footer';
// import '../styles/globals.css';

// export const metadata = {
//   title: 'GameQuest',
//   description: 'Your one-stop gaming marketplace',
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <head />
//       <body className="flex flex-col min-h-screen bg-[radial-gradient(ellipse_at_center,_rgba(61,53,42,1)_30%,_rgba(0,0,0,1)_100%)]">
//         {/* All your pages now have access to Redux store */}
//         <ReduxProvider>
//           {children}
//         </ReduxProvider>

//         <Footer />
//       </body>
//     </html>
//   );
// }
import ReduxProvider from '@/components/ReduxProvider.client';
import Footer        from '@/components/Footer';
import AppBackground from '@/components/AppBackground';
import '../styles/globals.css';

export const metadata = {
  title: 'GameQuest',
  description: 'Your one-stop gaming marketplace',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <AppBackground>
          <ReduxProvider>
            {children}
          </ReduxProvider>
          <Footer />
        </AppBackground>
      </body>
    </html>
  );
}
