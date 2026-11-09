import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import DachaDetailModal from '@/components/DachaDetailModal';
import AuthModal from '@/components/AuthModal';
import AdminPasswordModal from '@/components/AdminPasswordModal';

export const metadata: Metadata = {
  title: 'Дача Брон - Аренда дач и вилл в Узбекистане (Чарвак, Чимган)',
  description: 'Онлайн бронирование горных вилл, коттеджей и домов отдыха на Чарваке, в Чимгане и Бричмулле с AI-подбором.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className="bg-white dark:bg-black text-slate-900 dark:text-white transition-colors duration-200">
        <AppProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />

          {/* Global Modals */}
          <BookingModal />
          <DachaDetailModal />
          <AuthModal />
          <AdminPasswordModal />
        </AppProvider>
      </body>
    </html>
  );
}
