'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, CheckCircle2, ShieldCheck, MapPin, Calendar, Phone, User } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { bookingDraft, createBooking, currentUser, t } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.name) setName(currentUser.name);
      if (currentUser.phone) setPhone(currentUser.phone);
    }
  }, [currentUser]);

  if (!bookingDraft && !confirmedOrderId) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-xl font-bold mb-2">Нет выбранной дачи для бронирования</h2>
        <p className="text-xs text-slate-500 mb-4">Пожалуйста, выберите дачу в каталоге</p>
        <Link href="/catalog" className="btn-primary py-2.5 px-6 text-xs inline-block">
          В каталог дач
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('Пожалуйста, введите ваше имя и номер телефона!');
      return;
    }

    const orderId = createBooking(name, phone, notes);
    if (orderId) {
      setConfirmedOrderId(orderId);
    }
  };

  return (
    <div className="py-12 bg-slate-50/60 dark:bg-black min-h-screen transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link
          href="/catalog"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-zinc-400 hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Вернуться в каталог</span>
        </Link>

        {confirmedOrderId ? (
          /* Success Confirmation Screen */
          <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xl text-center max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
              {t('checkoutSuccessTitle')}
            </h2>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed mb-6">
              {t('checkoutSuccessText')}
            </p>

            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-zinc-800 text-xs font-mono mb-6">
              Номер бронирования: <strong className="text-blue-600 dark:text-white">{confirmedOrderId}</strong>
            </div>

            <Link
              href="/catalog"
              className="w-full block py-3.5 px-6 rounded-2xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-md transition"
            >
              Вернуться в каталог дач
            </Link>
          </div>
        ) : (
          /* Checkout Details Form */
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-black text-slate-900 dark:text-white">
                {t('checkoutTitle')}
              </h1>
              <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">
                {t('checkoutSubtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Form */}
              <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400 mb-1.5">
                      {t('checkoutClientName')} *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="Например: Мухаммад Арипов"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full text-xs font-semibold py-3 pl-10 pr-3.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    </div>
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400 mb-1.5">
                      {t('checkoutClientPhone')} *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        placeholder="+998 90 123 45 67"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full text-xs font-semibold py-3 pl-10 pr-3.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400 mb-1.5">
                      Дополнительные пожелания (время заезда, повар, мангал):
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Укажите любые детали для администратора..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full text-xs py-3 px-3.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 px-6 rounded-2xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-500/25 transition"
                    >
                      {t('checkoutConfirmBtn')}
                    </button>
                    <p className="text-[11px] text-center text-slate-400 mt-2.5">
                      Заявка поступит напрямую в админку, и дача зафиксируется за вами.
                    </p>
                  </div>

                </form>
              </div>

              {/* Right Column: Order Summary Card */}
              <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-4">
                
                {bookingDraft.dachaImage && (
                  <div className="aspect-video rounded-2xl overflow-hidden bg-black">
                    <img
                      src={bookingDraft.dachaImage}
                      alt={bookingDraft.dachaName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    {t('checkoutSelectedDacha')}
                  </span>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                    {bookingDraft.dachaName}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-500" />
                    <span>{bookingDraft.dachaLocation}</span>
                  </div>
                </div>

                <div className="border-t border-slate-100 dark:border-zinc-800 pt-3 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t('checkoutDaysCount')}</span>
                    <strong className="text-slate-900 dark:text-white">{bookingDraft.days} сут.</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Базовый тариф:</span>
                    <strong className="text-slate-900 dark:text-white">${bookingDraft.pricePerDay} / день</strong>
                  </div>
                </div>

                <div className="border-t border-slate-200 dark:border-zinc-700 pt-4 flex items-baseline justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300">
                    {t('checkoutTotalToPay')}
                  </span>
                  <span className="text-2xl font-black text-blue-600 dark:text-white">
                    ${bookingDraft.totalPrice}
                  </span>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
