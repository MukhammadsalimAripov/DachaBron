'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Phone, MapPin, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactsPage() {
  const { t } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-16 bg-white dark:bg-black min-h-screen transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            {t('navContacts')}
          </span>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mt-2">
            Свяжитесь с нами
          </h1>
          <p className="text-sm text-slate-500 dark:text-zinc-400 mt-2">
            Мы на связи 24/7 и готовы ответить на любые вопросы по аренде и бронированию
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Info cards */}
          <div className="space-y-4">
            
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-600 dark:bg-zinc-800 dark:text-white flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Телефоны</h4>
                  <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">+998 (71) 200-88-99</p>
                  <p className="text-xs text-slate-600 dark:text-zinc-400">+998 (90) 123-45-67 (Telegram / WhatsApp)</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-600 dark:bg-zinc-800 dark:text-white flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Офисы обслуживания</h4>
                  <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">г. Ташкент, ул. Амира Темура, 107Б</p>
                  <p className="text-xs text-slate-600 dark:text-zinc-400 mt-0.5">пос. Чарвак, ул. Сайхон, 14 (Горный ресепшн)</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-600 dark:bg-zinc-800 dark:text-white flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Режим работы</h4>
                  <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">24 часа в сутки / 7 дней в неделю</p>
                  <p className="text-xs text-slate-600 dark:text-zinc-400 mt-0.5">Бронирование и заселение в любое удобное время</p>
                </div>
              </div>
            </div>

          </div>

          {/* Contact form */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm">
            {submitted ? (
              <div className="text-center py-10">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Сообщение отправлено!</h3>
                <p className="text-xs text-slate-500 mt-1">Менеджер свяжется с вами в течение 10 минут.</p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs font-bold text-blue-600 hover:underline"
                >
                  Отправить еще сообщение
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Напишите нам</h3>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-zinc-400 mb-1">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Введите ваше имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs py-2.5 px-3.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-zinc-400 mb-1">
                    Номер телефона
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+998 90 123 45 67"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs py-2.5 px-3.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-zinc-400 mb-1">
                    Сообщение
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Какая дача или даты вас интересуют?"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    className="w-full text-xs py-2.5 px-3.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-md transition flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Отправить обращение</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
