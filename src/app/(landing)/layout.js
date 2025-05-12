

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

