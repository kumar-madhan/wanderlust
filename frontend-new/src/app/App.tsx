import { useLayoutEffect } from 'react';
import AppRoutes from './routes';
import { applyThemeClass } from '@/utils/theme-changer';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function App() {
  useLayoutEffect(() => {
    applyThemeClass();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <AppRoutes />
      <Footer />
    </div>
  );
}
