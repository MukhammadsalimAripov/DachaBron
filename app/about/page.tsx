'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { ShieldCheck, Sparkles, MapPin, Award } from 'lucide-react';

export default function AboutPage() {
  const { t } = useApp();

  return (
    <div className="py-16 bg-white dark:bg-black min-h-screen transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            {t('navAbout')}
          </span>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mt-2">
            Dacha Bron — Премиальный отдых в горах Узбекистана
          </h1>
          <p className="text-base text-slate-600 dark:text-zinc-400 mt-4 leading-relaxed">
            Мы объединяем лучшие загородные резиденции, виллы и уютные коттеджи в Бостанлыкском районе (Чарвак, Чимган, Бричмулла, Хумсан, Юсуфхона). Наша цель — сделать ваш загородный отдых максимально беззаботным и комфортным.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
          <div className="rounded-3xl overflow-hidden shadow-2xl aspect-video bg-black">
            <img
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80"
              alt="О нас - курорт"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              От романтического уикенда до масштабных мероприятий
            </h3>
            <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
              В нашей коллекции собраны дачи на любой вкус: от компактных видовых A-Frame домиков для пары до роскошных 6-спальных вилл с инфинити-бассейнами, саунами, бильярдом и банкетными залами.
            </p>
            <div className="space-y-2 pt-2 text-xs font-semibold text-slate-700 dark:text-zinc-300">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Умный AI-помощник для мгновенного подбора по вашим критериям</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Личная проверка каждого объекта и гарантия чистоты</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Фиксированные прозрачные цены без наценок и переплат</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
