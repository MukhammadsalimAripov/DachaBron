'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useApp, Dacha } from '@/context/AppContext';
import DachaCard from '@/components/DachaCard';
import { Search, SlidersHorizontal } from 'lucide-react';

function CatalogContent() {
  const searchParams = useSearchParams();
  const { t, dachas } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

  // Categories list
  const categories = [
    { id: 'all', label: t('catAll') },
    { id: 'villa', label: t('catVillas') },
    { id: 'bolshiye', label: t('catLarge') },
    { id: 'sredniye', label: t('catMedium') },
    { id: 'malenkiye', label: t('catSmall') },
  ];

  // Filtering
  let filtered = dachas.filter(d => !d.isDeleted);

  if (activeCategory !== 'all') {
    filtered = filtered.filter(d => d.category === activeCategory);
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(d => 
      d.name.toLowerCase().includes(q) ||
      d.location.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q)
    );
  }

  // Sorting
  if (sortBy === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'stars') {
    filtered.sort((a, b) => b.stars - a.stars);
  }

  return (
    <div className="py-12 bg-white dark:bg-black min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Каталог дач и вилл
            </h1>
            <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">
              Выберите категорию или воспользуйтесь поиском по локации
            </p>
          </div>

          {/* Search bar & Sorting */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Поиск по названию или локации..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 text-xs py-2.5 pl-9 pr-3.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs py-2.5 px-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white"
            >
              <option value="default">По умолчанию</option>
              <option value="price-asc">Сначала дешевле</option>
              <option value="price-desc">Сначала дороже</option>
              <option value="stars">По рейтингу</option>
            </select>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex flex-wrap gap-2 pb-6 border-b border-slate-100 dark:border-zinc-800/80 mb-8">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveCategory(c.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm ${
                activeCategory === c.id
                  ? 'bg-blue-600 text-white dark:bg-white dark:text-black'
                  : 'bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-800'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Dachas Grid */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center text-slate-400">
            <p className="text-base font-bold">{t('emptyCatalog')}</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-bold text-blue-600 hover:underline"
            >
              Сбросить фильтры
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((dacha) => (
              <DachaCard key={dacha.id} dacha={dacha} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs">Загрузка каталога...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
