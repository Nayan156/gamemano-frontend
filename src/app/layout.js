
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
