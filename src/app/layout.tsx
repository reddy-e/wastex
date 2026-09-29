import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppStateProvider } from '@/lib/store';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { RoleSwitcher } from '@/components/role-switcher';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Smart Waste Exchange | Turn Waste Into Value',
  description: 'A smart digital marketplace connecting waste producers with e-waste recyclers, industries, farmers, and communities for productive reuse and responsible recovery.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} flex flex-col min-h-screen bg-slate-50 text-slate-900 antialiased`}>
        <AppStateProvider>
          <RoleSwitcher />
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </AppStateProvider>
      </body>
    </html>
  );
}
