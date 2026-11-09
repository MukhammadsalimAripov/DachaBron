'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Star, MessageSquare } from 'lucide-react';

export default function ReviewsPage() {
  const { t } = useApp();

  const reviewsList = [
    {
      author: 'Сардор Алимов',
      place: 'Вилла Чарвак Панорама Luxury',
      rating: 5,
      date: '15.10.2026',
      text: 'Потрясающий вид на Чарвак! Бассейн теплый, дом чистый и уютный. Отдохнули с семьей на высшем уровне. Обязательно вернемся снова!',
      initials: 'СА',
      color: 'bg-blue-600'
    },
    {
      author: 'Elena V.',
      place: 'Вилла Бричмулла Резиденс',
      rating: 5,
      date: '10.10.2026',
      text: 'Вилла великолепна! Сауна отличная, бильярд в идеальном состоянии. AI-помощник подобрал нам именно то, что мы искали за считанные секунды.',
      initials: 'EV',
      color: 'bg-emerald-600'
    },
    {
      author: 'Азиз Рахимов',
      place: 'Большая Дача Чимган Ривер',
      rating: 5,
      date: '28.09.2026',
      text: 'Отмечали юбилей большой компанией из 18 человек. Всем хватило спален, зона барбекю у реки просто восторг. Администратор был на связи 24/7.',
      initials: 'АР',
      color: 'bg-indigo-600'
    },
    {
      author: 'Нигина Умарова',
      place: 'Маленькая Дача A-Frame Чимган',
      rating: 5,
      date: '12.10.2026',
      text: 'Очень атмосферное место! Теплая купель фурако под звездами и проектор для кинофильмов сделали наш вечер незабываемым.',
      initials: 'НУ',
      color: 'bg-purple-600'
    },
    {
      author: 'Тимур К.',
      place: 'Средняя Дача Хумсан Вудс',
      rating: 5,
      date: '05.10.2026',
      text: 'Воздух в Хумсане невероятно свежий. Баня на дровах отличная, дом из чистого дерева. Прекрасный детокс от городского шума.',
      initials: 'ТК',
      color: 'bg-teal-600'
    },
    {
      author: 'Малика Каримова',
      place: 'Средняя Дача Юсуфхона Комфорт',
      rating: 5,
      date: '18.09.2026',
      text: 'Очень близко к озеру, красивый чистый бассейн, топчан в тени деревьев. Отличный сервис и удобное бронирование.',
      initials: 'МК',
      color: 'bg-rose-600'
    }
  ];

  return (
    <div className="py-16 bg-white dark:bg-black min-h-screen transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            {t('navReviews')}
          </span>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mt-2">
            Отзывы наших гостей
          </h1>
          <p className="text-sm text-slate-500 dark:text-zinc-400 mt-2">
            Реальные впечатления людей, которые доверили свой загородный отдых сервису Dacha Bron
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewsList.map((r, i) => (
            <div
              key={i}
              className="p-6 rounded-3xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {Array.from({ length: r.rating }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs text-slate-700 dark:text-zinc-300 leading-relaxed italic mb-4">
                  "{r.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-200 dark:border-zinc-800">
                <div className={`w-9 h-9 rounded-xl ${r.color} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                  {r.initials}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">{r.author}</div>
                  <div className="text-[10px] text-slate-400">{r.place} • {r.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
