import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Toaster } from 'react-hot-toast';
import { Provider } from '@/components/Provider';
import { NavbarComponent } from '@/components/Navbar';
import { PrimeReactProvider } from 'primereact/api';

import "primereact/resources/themes/lara-light-cyan/theme.css";

import "./styles.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PrimeReactProvider>
          <Provider>
            <Toaster />
            <NavbarComponent />
            {children}
          </Provider>
        </PrimeReactProvider>
      </body>
    </html>
  )
}
