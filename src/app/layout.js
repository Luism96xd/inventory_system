import '@/styles/globals.css'
import { Poppins } from 'next/font/google';
import Sidebar from '@/components/Sidebar';

const poppins = Poppins({ subsets: ['latin'], weight: ['100', '300','500', '600', '800']})

export const metadata = {
  title: 'ITS INVENTORY',
  description: 'Sistema de Gestión de Inventarios',
  icons: {
    icon: '/android-icon-48x48.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className='flex flex-row h-screen'>
          <Sidebar/>
          {children}
        </div>
        </body>
    </html>
  )
}
