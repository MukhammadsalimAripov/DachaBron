'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  Home, 
  ChevronDown, 
  Sun, 
  Moon, 
  User as UserIcon, 
  LogOut, 
  Menu, 
  X,
  Sparkles,
  Building2,
  TreePine,
  Compass
} from 'lucide-react';

export default function Navbar() {
  const { lang, setLang, t, theme, toggleTheme, currentUser, openAuthModal, logoutUser } = useApp();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const categories = [
    { label: t('catAll'), href: '/catalog?cat=all',  },
    { label: t('catVillas'), href: '/catalog?cat=villa',  },
    { label: t('catLarge'), href: '/catalog?cat=bolshiye',  },
    { label: t('catMedium'), href: '/catalog?cat=sredniye',  },
    { label: t('catSmall'), href: '/catalog?cat=malenkiye',  },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-slate-200 dark:border-zinc-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            
            <div>
              <span className="text-xl font-extrabold tracking-tight text-blue-600 dark:text-white block leading-none">
                DACHA <span className="text-slate-900 dark:text-zinc-300">BRON</span>
              </span>
              <span className="text-[10px] text-slate-500 dark:text-zinc-400 font-medium tracking-wider uppercase mt-1 block">
                Чарвак • Чимган • Виллы
              </span>
            </div>
          </Link>

          {/* Desktop Navigation (5 Main Items with Hover Dropdown) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            
            {/* 1. Главная */}
            <Link
              href="/"
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition ${
                isActive('/')
                  ? 'text-blue-600 dark:text-white font-bold bg-blue-50/70 dark:bg-zinc-800'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-white'
              }`}
            >
              {t('navHome')}
            </Link>

            {/* 2. Дачи (With Hover Dropdown mini-window) */}
            <div className="relative group py-2">
              <Link
                href="/catalog"
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition ${
                  isActive('/catalog')
                    ? 'text-blue-600 dark:text-white font-bold bg-blue-50/70 dark:bg-zinc-800'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-white'
                }`}
              >
                <span>{t('navDachas')}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform" />
              </Link>

              {/* Hover Dropdown mini-window */}
              <div className="absolute left-0 top-full w-56 rounded-2xl p-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-200 z-50">
                {categories.map((cat, idx) => (
                  <Link
                    key={idx}
                    href={cat.href}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-zinc-200 hover:bg-blue-50 dark:hover:bg-zinc-800 hover:text-blue-600 dark:hover:text-white transition"
                  >
                    
                    <span>{cat.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* 3. О нас */}
            <Link
              href="/about"
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition ${
                isActive('/about')
                  ? 'text-blue-600 dark:text-white font-bold bg-blue-50/70 dark:bg-zinc-800'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-white'
              }`}
            >
              {t('navAbout')}
            </Link>

            {/* 4. Отзывы */}
            <Link
              href="/reviews"
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition ${
                isActive('/reviews')
                  ? 'text-blue-600 dark:text-white font-bold bg-blue-50/70 dark:bg-zinc-800'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-white'
              }`}
            >
              {t('navReviews')}
            </Link>

            {/* 5. Контакты */}
            <Link
              href="/contacts"
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition ${
                isActive('/contacts')
                  ? 'text-blue-600 dark:text-white font-bold bg-blue-50/70 dark:bg-zinc-800'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-white'
              }`}
            >
              {t('navContacts')}
            </Link>

          </nav>

          {/* Right Controls (Languages, Theme, Auth) */}
          <div className="flex items-center gap-3">
            
            {/* Language Switcher (RU / UZ / EN) */}
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-slate-100 dark:bg-zinc-800 text-xs font-bold py-1.5 px-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 text-slate-800 dark:text-zinc-200 focus:outline-none cursor-pointer"
            >
              <option value="ru">🇷🇺 RU</option>
              <option value="uz">🇺🇿 UZ</option>
              <option value="en">🇬🇧 EN</option>
            </select>

            {/* Theme Switcher (Light: Blue & White / Dark: Black & White) */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-zinc-700 transition"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-300" />
              ) : (
                <Moon className="w-5 h-5 text-blue-600" />
              )}
            </button>

            {/* User Auth Profile Area */}
            {currentUser ? (
              <div className="flex items-center gap-2 pl-1">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                  {currentUser.name.charAt(0)}
                </div>
                <span className="text-xs font-bold hidden md:inline text-slate-800 dark:text-zinc-200">
                  {currentUser.name}
                </span>
                <button
                  type="button"
                  onClick={logoutUser}
                  title={t('navLogout')}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => openAuthModal('login')}
                className="py-2 px-4 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black shadow-md flex items-center gap-1.5 transition"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>{t('navLogin')}</span>
              </button>
            )}

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-black px-4 pt-4 pb-6 space-y-2">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-800 dark:text-zinc-200"
          >
            {t('navHome')}
          </Link>
          <Link
            href="/catalog"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-800 dark:text-zinc-200"
          >
            {t('navDachas')}
          </Link>
          <div className="pl-4 space-y-1">
            {categories.map((c, i) => (
              <Link
                key={i}
                href={c.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1 text-xs text-slate-600 dark:text-zinc-400"
              >
                 {c.label}
              </Link>
            ))}
          </div>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-800 dark:text-zinc-200"
          >
            {t('navAbout')}
          </Link>
          <Link
            href="/reviews"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-800 dark:text-zinc-200"
          >
            {t('navReviews')}
          </Link>
          <Link
            href="/contacts"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-800 dark:text-zinc-200"
          >
            {t('navContacts')}
          </Link>
        </div>
      )}
    </header>
  );
}
