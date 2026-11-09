'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { X, User, Lock, Mail } from 'lucide-react';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, authMode, openAuthModal, loginUser, t } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'register' && !name.trim()) {
      alert('Пожалуйста, введите ваше имя!');
      return;
    }

    loginUser(email, name);
    closeAuthModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 sm:p-8 shadow-2xl">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={closeAuthModal}
          className="absolute right-5 top-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 dark:bg-zinc-800 dark:text-white mx-auto flex items-center justify-center mb-3">
            <User className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            {t(authMode === 'login' ? 'authLoginTitle' : 'authRegTitle')}
          </h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
            Для бронирования дачи необходимо авторизоваться
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {authMode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-zinc-400 mb-1">
                {t('authName')}
              </label>
              <input
                type="text"
                required
                placeholder="Имя Фамилия"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs py-2.5 px-3.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-zinc-400 mb-1">
              {t('authEmail')}
            </label>
            <input
              type="text"
              required
              placeholder="+998 90 123 45 67"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-xs py-2.5 px-3.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-zinc-400 mb-1">
              {t('authPassword')}
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-xs py-2.5 px-3.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-md transition mt-2"
          >
            {t(authMode === 'login' ? 'authSubmitLogin' : 'authSubmitReg')}
          </button>
        </form>

        {/* Switch mode */}
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => openAuthModal(authMode === 'login' ? 'register' : 'login')}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            {t(authMode === 'login' ? 'authNeedAccount' : 'authHaveAccount')}
          </button>
        </div>

      </div>
    </div>
  );
}
