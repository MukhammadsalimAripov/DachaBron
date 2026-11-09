'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Lock, Phone, MapPin, Mail } from 'lucide-react';

export default function Footer() {
  const { t, openAdminPasswordModal } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-300 dark:bg-black dark:text-zinc-400 border-t border-slate-800 dark:border-zinc-900 pt-16 pb-12 mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏠</span>
              <span className="text-xl font-black text-white">DACHA BRON</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              {t('footerAbout')}
            </p>
            <div className="text-xs text-slate-400 space-y-1">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-500" />
                <span>+998 (71) 200-88-99 / +998 (90) 123-45-67 (24/7)</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-500" />
                <span>Ташкент • Чарвакское водохранилище</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t('footerQuickLinks')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/" className="hover:text-white transition">{t('navHome')}</Link></li>
              <li><Link href="/catalog" className="hover:text-white transition">{t('navDachas')}</Link></li>
              <li><Link href="/about" className="hover:text-white transition">{t('navAbout')}</Link></li>
              <li><Link href="/reviews" className="hover:text-white transition">{t('navReviews')}</Link></li>
              <li><Link href="/contacts" className="hover:text-white transition">{t('navContacts')}</Link></li>
            </ul>
          </div>

          {/* Staff Secret Admin Entry Button (ONLY in footer as requested) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Для персонала
            </h4>
            <p className="text-[11px] text-slate-500">
              Вход в защищенную систему управления сайтом доступен только по паролю администратора.
            </p>
            <button
              type="button"
              onClick={openAdminPasswordModal}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition"
            >
              <Lock className="w-3.5 h-3.5 text-blue-400" />
              <span>{t('adminLink')}</span>
            </button>
          </div>

        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 dark:text-zinc-500">
          <div>&copy; 2026 Dacha Bron. {t('footerRights')}</div>
          <div className="mt-2 sm:mt-0 flex gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Политика конфиденциальности</span>
            <span className="hover:text-slate-400 cursor-pointer">Правила бронирования</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
