'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import AiAssistant from '@/components/AiAssistant';
import DachaCard from '@/components/DachaCard';
import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake, Headset, Star } from 'lucide-react';

export default function HomePage() {
  const { t, dachas } = useApp();

  const featuredDachas = dachas.filter(d => !d.isDeleted).slice(0, 4);

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-white to-white dark:from-zinc-950 dark:via-black dark:to-black py-16 md:py-24 border-b border-slate-100 dark:border-zinc-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-zinc-800 text-blue-700 dark:text-zinc-200 text-xs font-semibold tracking-wide shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-white" />
                <span>Элитный горный отдых в Узбекистане</span>
              </div>

              {/* Main Required Hero Title: "Найдите дачу на свой вкус" */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                {t('heroTitle')}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
                {t('heroSubtitle')}
              </p>

              {/* Main Required Action: "Смотреть дачи" -> goes to catalog */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/catalog"
                  className="w-full sm:w-auto py-3.5 px-8 rounded-2xl font-bold text-sm bg-blue-600 hover:bg-blue-700 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-black shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition"
                >
                  <span>{t('heroBtn')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="#ai-assistant"
                  className="w-full sm:w-auto py-3.5 px-6 rounded-2xl font-bold text-sm border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-zinc-800 flex items-center justify-center gap-2 transition"
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Подобрать через AI</span>
                </a>
              </div>

              {/* Stats badges */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200 dark:border-zinc-800">
                <div>
                  <div className="text-2xl font-black text-blue-600 dark:text-white">120+</div>
                  <div className="text-xs text-slate-500 dark:text-zinc-400">Проверенных дач</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-blue-600 dark:text-white">100%</div>
                  <div className="text-xs text-slate-500 dark:text-zinc-400">Гарантия брони</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-blue-600 dark:text-white">24/7</div>
                  <div className="text-xs text-slate-500 dark:text-zinc-400">Сервис консьержа</div>
                </div>
              </div>
            </div>

            {/* Hero Showcase Photo */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-zinc-800 aspect-[4/3]">
                  <img
                    src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80"
                    alt="Вилла Чарвак Панорама"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-600 px-2 py-0.5 rounded">
                      Хит сезона
                    </span>
                    <h3 className="text-lg font-bold mt-1">Вилла Чарвак Панорама Luxury</h3>
                    <p className="text-xs text-slate-200">Бассейн с подогревом • Сауна • Чарвакское море</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. AI ASSISTANT IN HEADER / TOP SECTION (As explicitly requested) */}
      <AiAssistant />

      {/* 3. FEATURED DACHAS SECTION */}
      <section className="py-16 bg-slate-50/60 dark:bg-black transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                Популярный выбор
              </span>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-1">
                Топ дач этого сезона
              </h2>
            </div>

            <Link
              href="/catalog"
              className="text-sm font-bold text-blue-600 dark:text-white hover:underline flex items-center gap-1 mt-3 sm:mt-0"
            >
              <span>{t('heroBtn')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDachas.map((dacha) => (
              <DachaCard key={dacha.id} dacha={dacha} />
            ))}
          </div>

        </div>
      </section>

      {/* 4. WHY US / BENEFITS */}
      <section className="py-16 bg-white dark:bg-zinc-950 border-t border-slate-100 dark:border-zinc-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-12">
            Почему выбирают Dacha Bron?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-6 rounded-3xl bg-blue-50/50 dark:bg-zinc-900 border border-blue-100 dark:border-zinc-800">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-xl mb-4 shadow">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                100% Реальные фото и проверка
              </h3>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                Каждая дача и вилла лично инспектируется нашими менеджерами перед заселением. Вы получаете именно то, что видите на сайте.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-blue-50/50 dark:bg-zinc-900 border border-blue-100 dark:border-zinc-800">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-xl mb-4 shadow">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Прозрачные условия без переплат
              </h3>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                Прямая фиксация цен от собственников без скрытых комиссий. Бронирование с прозрачным расчетом по дням.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-blue-50/50 dark:bg-zinc-900 border border-blue-100 dark:border-zinc-800">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-xl mb-4 shadow">
                <Headset className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Круглосуточный консьерж 24/7
              </h3>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                Поможем с трансфером из Ташкента, вызовом повара для приготовления плова и шашлыка, и оперативно решим любой вопрос.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
