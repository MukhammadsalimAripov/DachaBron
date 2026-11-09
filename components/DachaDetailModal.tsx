'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { X, Star, MapPin, Users, Send, Calendar, Check, Lock } from 'lucide-react';

export default function DachaDetailModal() {
  const { isDachaDetailModalOpen, closeDachaDetail, selectedDacha, openBookingModal, addComment, currentUser, t } = useApp();

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentRating, setCommentRating] = useState('5');
  const [commentText, setCommentText] = useState('');

  if (!isDachaDetailModalOpen || !selectedDacha) return null;

  const images = selectedDacha.images || [];

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const author = commentAuthor.trim() || currentUser?.name || 'Гость';
    const text = commentText.trim();
    if (!text) return;

    addComment(selectedDacha.id, author, Number(commentRating), text);
    setCommentText('');
    if (!currentUser) setCommentAuthor('');
  };

  const handleBookNow = () => {
    closeDachaDetail();
    openBookingModal(selectedDacha);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={closeDachaDetail}
          className="absolute right-5 top-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery */}
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-black mb-3">
          <img
            src={images[activeImgIndex] || images[0]}
            alt={selectedDacha.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-3 mb-6">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumb ${idx}`}
                onClick={() => setActiveImgIndex(idx)}
                className={`w-20 h-14 object-cover rounded-xl cursor-pointer border-2 transition ${
                  idx === activeImgIndex ? 'border-blue-600 dark:border-white scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              />
            ))}
          </div>
        )}

        {/* Header info */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase font-extrabold tracking-wider px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-zinc-800 dark:text-zinc-200">
                {selectedDacha.category}
              </span>
              <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-500" />
                <span>{selectedDacha.stars}</span>
              </div>
            </div>

            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              {selectedDacha.name}
            </h2>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-zinc-400 mt-1">
              <MapPin className="w-3.5 h-3.5 text-blue-500" />
              <span>{selectedDacha.location}</span>
            </div>
          </div>

          <div className="text-left sm:text-right shrink-0">
            <div className="text-2xl font-black text-blue-600 dark:text-white">${selectedDacha.price}</div>
            <div className="text-xs text-slate-400">/ {t('perDay')}</div>
          </div>
        </div>

        {/* Description */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800 mb-6">
          <h4 className="text-xs uppercase font-bold text-slate-400 dark:text-zinc-500 mb-1.5">
            Описание
          </h4>
          <p className="text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">
            {selectedDacha.description}
          </p>
        </div>

        {/* Features Chips */}
        {selectedDacha.features && selectedDacha.features.length > 0 && (
          <div className="mb-6">
            <h4 className="text-xs uppercase font-bold text-slate-400 dark:text-zinc-500 mb-2">
              Удобства и инфраструктура
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedDacha.features.map((feat, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-zinc-800 text-blue-700 dark:text-zinc-300 font-medium border border-blue-100 dark:border-zinc-700"
                >
                  <Check className="w-3 h-3 text-blue-600 dark:text-white" />
                  <span>{feat}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Direct Booking Callout */}
        <div className="p-5 rounded-2xl bg-blue-600 dark:bg-zinc-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <div className="font-bold text-base">Готовы забронировать?</div>
            <div className="text-xs text-blue-100 dark:text-zinc-400">
              {selectedDacha.isBooked
                ? t('bookedDaysLeft', { days: selectedDacha.bookedDaysRemaining || 1 })
                : 'Свободна на выбранные вами даты'}
            </div>
          </div>

          <button
            type="button"
            disabled={selectedDacha.isBooked}
            onClick={handleBookNow}
            className={`py-3 px-6 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md transition ${
              selectedDacha.isBooked
                ? 'bg-slate-300 dark:bg-zinc-700 text-slate-500 cursor-not-allowed'
                : 'bg-white text-blue-600 hover:bg-slate-100 dark:bg-white dark:text-black'
            }`}
          >
            {selectedDacha.isBooked ? (
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

        {/* Comments / Reviews Section */}
        <div className="border-t border-slate-200 dark:border-zinc-800 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {t('reviewsTitle')} ({selectedDacha.comments?.length || 0})
            </h3>
          </div>

          {/* Leave a review form */}
          <form onSubmit={handleCommentSubmit} className="mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/40 border border-slate-200 dark:border-zinc-800 space-y-3">
            <h5 className="text-xs font-bold text-slate-800 dark:text-zinc-200">
              {t('leaveReview')}
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder={t('yourName')}
                value={commentAuthor || currentUser?.name || ''}
                onChange={(e) => setCommentAuthor(e.target.value)}
                required
                className="text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white"
              />

              <select
                value={commentRating}
                onChange={(e) => setCommentRating(e.target.value)}
                className="text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white"
              >
                <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                <option value="4">⭐⭐⭐⭐ (4/5)</option>
                <option value="3">⭐⭐⭐ (3/5)</option>
              </select>
            </div>

            <textarea
              rows={3}
              placeholder={t('writeReviewPlaceholder')}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              required
              className="w-full text-xs p-3 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white"
            />

            <button
              type="submit"
              className="py-2.5 px-5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 transition"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{t('sendReview')}</span>
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-3">
            {selectedDacha.comments && selectedDacha.comments.length > 0 ? (
              selectedDacha.comments.map((c) => (
                <div
                  key={c.id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-800/40 border border-slate-100 dark:border-zinc-800"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{c.author}</span>
                    <span className="text-xs text-amber-500 font-bold">★ {c.rating}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">{c.text}</p>
                  <div className="text-[10px] text-slate-400 mt-1.5">{c.date}</div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 italic">Пока никто не оставил отзыв. Будьте первыми!</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
