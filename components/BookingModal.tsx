'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { X, Calendar, Plus, ArrowRight } from 'lucide-react';

export default function BookingModal() {
  const router = useRouter();
  const { isBookingModalOpen, closeBookingModal, bookingModalDacha, setBookingDraft, t } = useApp();

  const [selectedDays, setSelectedDays] = useState(1);
  const [isCustomDays, setIsCustomDays] = useState(false);
  const [customDaysVal, setCustomDaysVal] = useState('8');

  useEffect(() => {
    if (isBookingModalOpen) {
      setSelectedDays(1);
      setIsCustomDays(false);
      setCustomDaysVal('8');
    }
  }, [isBookingModalOpen]);

  if (!isBookingModalOpen || !bookingModalDacha) return null;

  const basePrice = bookingModalDacha.price;
  const currentDays = isCustomDays ? Math.max(1, parseInt(customDaysVal, 10) || 1) : selectedDays;
  const totalPrice = basePrice * currentDays;

  const handleProceedToCheckout = () => {
    setBookingDraft({
      dachaId: bookingModalDacha.id,
      dachaName: bookingModalDacha.name,
      dachaLocation: bookingModalDacha.location,
      dachaImage: bookingModalDacha.images?.[0] || '',
      pricePerDay: basePrice,
      days: currentDays,
      totalPrice: totalPrice,
    });

    closeBookingModal();
    router.push('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 sm:p-8 shadow-2xl">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={closeBookingModal}
          className="absolute right-5 top-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Калькулятор бронирования
          </span>
          <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
            {bookingModalDacha.name}
          </h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
            Тариф: <strong className="text-slate-900 dark:text-white">${basePrice}</strong> / сутки
          </p>
        </div>

        {/* 1 to 7 Days Grid */}
        <div className="space-y-4 mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400">
            {t('bookingModalTitle')}
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[1, 2, 3, 4, 5, 6, 7].map((days) => {
              const cost = basePrice * days;
              const isSelected = !isCustomDays && selectedDays === days;
              return (
                <button
                  key={days}
                  type="button"
                  onClick={() => {
                    setIsCustomDays(false);
                    setSelectedDays(days);
                  }}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50 dark:bg-zinc-800 dark:border-white text-blue-600 dark:text-white shadow-sm'
                      : 'border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-200'
                  }`}
                >
                  <div className="text-xs font-bold">
                    {days} {days === 1 ? 'день' : days < 5 ? 'дня' : 'дней'}
                  </div>
                  <div className="text-[11px] font-semibold text-blue-600 dark:text-zinc-300 mt-0.5">
                    ${cost}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Button: "Больше дней..." */}
          <button
            type="button"
            onClick={() => setIsCustomDays(!isCustomDays)}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 pt-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t('moreDaysBtn')} (ввести вручную)</span>
          </button>

          {/* Custom Days Input */}
          {isCustomDays && (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700 animate-fade-in">
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                {t('customDaysLabel')}
              </label>
              <input
                type="number"
                min="1"
                max="365"
                value={customDaysVal}
                onChange={(e) => setCustomDaysVal(e.target.value)}
                className="w-full text-base font-bold py-2.5 px-3.5 rounded-xl border border-slate-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          )}
        </div>

        {/* Live Total Calculation Card */}
        <div className="p-4 rounded-2xl bg-blue-50 dark:bg-zinc-800 border border-blue-100 dark:border-zinc-700 flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-bold text-slate-600 dark:text-zinc-400 block">
              {t('totalPrice')}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-zinc-400">
              {currentDays} сут. × ${basePrice}
            </span>
          </div>
          <span className="text-2xl font-black text-blue-600 dark:text-white">
            ${totalPrice}
          </span>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={handleProceedToCheckout}
          className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm bg-blue-600 hover:bg-blue-700 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition"
        >
          <span>{t('proceedToCheckout')}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
}
