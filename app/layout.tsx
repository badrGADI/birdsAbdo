
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AppProvider } from '@/context/AppContext';

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700", "800"], 
  variable: '--font-jakarta' 
});

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  weight: ["400", "700"], 
  style: ["normal", "italic"], 
  variable: '--font-playfair' 
});

export const metadata: Metadata = {
  title: 'the world of birds | The Red Sanctuary',
  description: 'Redefining our connection with the sky. We provide a red-tinted lens into the world of birds.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${playfair.variable}`}>
        <head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        </head>
      <body className="bg-[#fafafa] text-slate-900 min-h-screen flex flex-col">
          <AppProvider>
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </AppProvider>
      </body>
    </html>
  );
}
