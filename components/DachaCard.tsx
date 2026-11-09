'use client';

import React, { useState } from 'react';
import { useApp, Dacha } from '@/context/AppContext';
import { ChevronLeft, ChevronRight, MapPin, Users, Star, Lock, Calendar } from 'lucide-react';

interface DachaCardProps {
  dacha: Dacha;
}

export default function DachaCard({ dacha }: DachaCardProps) {
  const { t, openBookingModal, openDachaDetail } = useApp();
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const images = (dacha.images && dacha.images.length > 0)
    ? dacha.images
    : ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80'];

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const catMap: Record<string, string> = {
    villa: 'catVillas',
    bolshiye: 'catLarge',
    sredniye: 'catMedium',
    malenkiye: 'catSmall'
  };

  return (
    <div className="group rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-lg hover:border-blue-500 dark:hover:border-zinc-500 transition-all duration-200 flex flex-col justify-between overflow-hidden">
      
      <div>
        {/* Image Carousel Container */}
        <div 
          className="relative aspect-[16/10] overflow-hidden bg-slate-900 cursor-pointer"
          onClick={() => openDachaDetail(dacha)}
        >
          <img
            src={images[currentImgIndex]}
            alt={dacha.name}
            className="w-full h-full object-cover transition-opacity duration-300"
            loading="lazy"
          />

          {/* Category Pill */}
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-600 text-white dark:bg-white dark:text-black shadow-md">
              {t(catMap[dacha.category] || 'catAll')}
            </span>
          </div>

          {/* Booked Lock Status Badge */}
          <div className="absolute top-3 right-3 z-10">
            {dacha.isBooked ? (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-600/90 text-white shadow-md backdrop-blur-sm">
                <Lock className="w-3 h-3" />
                <span>{t('bookedDaysLeft', { days: dacha.bookedDaysRemaining || 1 })}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-600/90 text-white shadow-md backdrop-blur-sm">
                <span>✓ Свободна</span>
              </div>
            )}
          </div>

          {/* Left / Right Slider Controls */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrevImage}
                aria-label="Previous Photo"
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextImage}
                aria-label="Next Photo"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Slider Dots Indicator */}
              <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
                {images.map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === currentImgIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Card Body */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="text-xs font-bold text-slate-800 dark:text-zinc-200">
                {(dacha.stars || 5).toFixed(1)}
              </span>
              <span className="text-[11px] text-slate-400">
                ({dacha.comments?.length || 0} отзывов)
              </span>
            </div>

            <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-zinc-400">
              <Users className="w-3.5 h-3.5" />
              <span>до {dacha.maxGuests || 12} {t('guests')}</span>
            </div>
          </div>

          <h3 
            onClick={() => openDachaDetail(dacha)}
            className="text-base font-extrabold text-slate-900 dark:text-white line-clamp-1 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors"
          >
            {dacha.name}
          </h3>

          {/* Location */}
          <div className="flex items-start gap-1.5 mt-2 text-xs text-slate-600 dark:text-zinc-400 line-clamp-1">
            <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
            <span>{dacha.location}</span>
          </div>

          <p className="mt-2.5 text-xs text-slate-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
            {dacha.description}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-5 pt-0 border-t border-slate-100 dark:border-zinc-800/80 mt-2">
        <div className="flex items-baseline justify-between py-3">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-zinc-500 block">Стоимость</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-blue-600 dark:text-white">${dacha.price}</span>
              <span className="text-xs text-slate-500 dark:text-zinc-400">/ {t('perDay')}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => openDachaDetail(dacha)}
            className="text-xs font-bold text-blue-600 dark:text-zinc-300 hover:underline"
          >
            {t('detailsBtn')} &rarr;
          </button>
        </div>

        {/* Booking Button (Locked if isBooked = true) */}
        <button
          type="button"
          disabled={dacha.isBooked}
          onClick={() => openBookingModal(dacha)}
          className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
            dacha.isBooked
              ? 'bg-slate-200 dark:bg-zinc-800 text-slate-400 dark:text-zinc-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-black shadow-md shadow-blue-500/10'
          }`}
        >
          {dacha.isBooked ? (
            <>
              <Lock className="w-3.5 h-3.5" />
              <span>{t('bookedBadge')}</span>
            </>
          ) : (
            <>
              <Calendar className="w-3.5 h-3.5" />
              <span>{t('bookBtn')}</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
}
