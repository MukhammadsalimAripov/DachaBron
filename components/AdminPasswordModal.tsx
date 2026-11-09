'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { X, Lock, KeyRound } from 'lucide-react';

export default function AdminPasswordModal() {
  const router = useRouter();
  const { isAdminPasswordModalOpen, closeAdminPasswordModal, verifyAdminPassword, t } = useApp();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isAdminPasswordModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = verifyAdminPassword(password);
    if (isValid) {
      setError(false);
      setPassword('');
      closeAdminPasswordModal();
      router.push('/admin');
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-sm rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 sm:p-8 shadow-2xl">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={closeAdminPasswordModal}
          className="absolute right-5 top-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white dark:bg-zinc-800 mx-auto flex items-center justify-center mb-3">
            <Lock className="w-6 h-6 text-blue-500" />
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            {t('adminModalTitle')}
          </h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
            Для доступа введите секретный ключ администратора
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-zinc-400 mb-1">
              Пароль
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              className="w-full text-xs font-mono py-2.5 px-3.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {error && (
              <p className="text-[11px] font-semibold text-red-500 mt-1.5">
                {t('adminWrongPassword')}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 rounded-xl font-bold text-xs bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black shadow-md transition flex items-center justify-center gap-2"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>{t('adminLoginBtn')}</span>
          </button>
        </form>

      </div>
    </div>
  );
}
