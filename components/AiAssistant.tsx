'use client';

import React, { useState } from 'react';
import { useApp, Dacha } from '@/context/AppContext';
import DachaCard from './DachaCard';
import { Sparkles, Bot, Search, RefreshCw, Send, CheckCircle2 } from 'lucide-react';

export default function AiAssistant() {
  const { t, lang, dachas } = useApp();

  const [promptText, setPromptText] = useState('');
  const [guests, setGuests] = useState('10');
  const [location, setLocation] = useState('');
  const [maxBudget, setMaxBudget] = useState(600);
  const [amenity, setAmenity] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [matchedDachas, setMatchedDachas] = useState<Dacha[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const quickPrompts = [
    { label: '🏰 Роскошная вилла с бассейном', text: 'Хочу снять премиальную виллу в Чарваке с теплым бассейном и сауной' },
    { label: '🏕️ Уютный A-Frame для двоих', text: 'Ищу романтический уютный треугольный домик A-Frame в Чимгане с фурако' },
    { label: '🎉 Большая дача на 20 человек', text: 'Нужна большая просторная дача для дня рождения и большой компании с бильярдом' },
    { label: '🌲 Спокойный отдых в лесу', text: 'Тихая дача среди сосен и горного воздуха в Хумсане с баней' }
  ];

  const handleRunAi = async (customPrompt?: string) => {
    setIsLoading(true);
    setHasSearched(true);
    const query = customPrompt !== undefined ? customPrompt : promptText;

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          location,
          guests,
          maxBudget,
          amenity,
          lang
        })
      });

      const data = await res.json();
      if (data.success && data.matchedDachaIds) {
        setAiResponse(data.message);
        const filtered = dachas.filter(d => data.matchedDachaIds.includes(d.id));
        setMatchedDachas(filtered.length > 0 ? filtered : dachas.slice(0, 3));
      } else {
        // Fallback local matching
        fallbackLocalAi(query);
      }
    } catch (e) {
      fallbackLocalAi(query);
    } finally {
      setIsLoading(false);
    }
  };

  const fallbackLocalAi = (query: string) => {
    let list = dachas.filter(d => !d.isDeleted);
    if (location) list = list.filter(d => d.location.toLowerCase().includes(location.toLowerCase()));
    if (maxBudget) list = list.filter(d => d.price <= maxBudget);
    if (list.length === 0) list = dachas.slice(0, 3);

    setAiResponse(t('aiSubtitle'));
    setMatchedDachas(list.slice(0, 3));
  };

  const handleReset = () => {
    setPromptText('');
    setLocation('');
    setGuests('10');
    setMaxBudget(600);
    setAmenity('');
    setAiResponse(null);
    setMatchedDachas([]);
    setHasSearched(false);
  };

  return (
    <section id="ai-assistant" className="py-12 bg-white dark:bg-black border-b border-slate-100 dark:border-zinc-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main AI Container */}
        <div className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-blue-50/80 via-white to-blue-100/40 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 border border-blue-200 dark:border-zinc-800 shadow-xl overflow-hidden">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600 text-white dark:bg-white dark:text-black text-xs font-bold tracking-wider mb-2 shadow-sm">
                <Bot className="w-4 h-4" />
                <span>AI DACHA ASSISTANT</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {t('aiTitle')}
              </h2>
              <p className="text-sm text-slate-600 dark:text-zinc-400 mt-1">
                {t('aiSubtitle')}
              </p>
            </div>
          </div>

          {/* Quick Prompt Chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setPromptText(qp.text);
                  handleRunAi(qp.text);
                }}
                className="text-xs font-medium px-3.5 py-1.5 rounded-full bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700 hover:border-blue-500 hover:text-blue-600 dark:hover:text-white transition shadow-sm"
              >
                {qp.label}
              </button>
            ))}
          </div>

          {/* Natural Language Prompt Input */}
          <div className="relative mb-6">
            <input
              type="text"
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleRunAi()}
              placeholder={t('aiPlaceholder')}
              className="w-full text-sm font-medium py-3.5 pl-11 pr-28 rounded-2xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
            
            <button
              type="button"
              onClick={() => handleRunAi()}
              disabled={isLoading}
              className="absolute right-2 top-2 bottom-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 transition disabled:opacity-50"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Подобрать</span>
                </>
              )}
            </button>
          </div>

          {/* Structured Controls Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-2xl bg-white/70 dark:bg-zinc-900/70 border border-slate-200/80 dark:border-zinc-800 backdrop-blur-sm">
            
            {/* Guests */}
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                {t('aiGuestsLabel')}
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white"
              >
                <option value="4">До 4 гостей (Маленькая)</option>
                <option value="8">До 8 гостей (Средняя)</option>
                <option value="12">До 12 гостей (Большая)</option>
                <option value="16">15+ гостей (Вилла)</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                {t('aiLocationLabel')}
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white"
              >
                <option value="">{t('aiAny')}</option>
                <option value="Чарвак">Чарвак</option>
                <option value="Чимган">Чимган</option>
                <option value="Бричмулла">Бричмулла</option>
                <option value="Бочка">Бочка</option>
                <option value="Хумсан">Хумсан</option>
                <option value="Юсуфхона">Юсуфхона</option>
              </select>
            </div>

            {/* Budget */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-600 dark:text-zinc-400 uppercase tracking-wider">
                  {t('aiBudgetLabel')}
                </label>
                <span className="text-xs font-extrabold text-blue-600 dark:text-white">${maxBudget}</span>
              </div>
              <input
                type="range"
                min="100"
                max="1000"
                step="50"
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                {t('aiFeatureLabel')}
              </label>
              <select
                value={amenity}
                onChange={(e) => setAmenity(e.target.value)}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white"
              >
                <option value="">Любые удобства</option>
                <option value="Бассейн">Теплый бассейн / Инфинити</option>
                <option value="Сауна">Сауна / Баня</option>
                <option value="Бильярд">Бильярд / Караоке</option>
                <option value="Камин">Камин / Романтика</option>
                <option value="BBQ">Зона барбекю и мангал</option>
              </select>
            </div>

          </div>

          {/* Action buttons */}
          <div className="mt-4 flex items-center justify-end gap-3">
            {hasSearched && (
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-semibold px-4 py-2 rounded-xl text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition"
              >
                {t('aiResetBtn')}
              </button>
            )}

            <button
              type="button"
              onClick={() => handleRunAi()}
              disabled={isLoading}
              className="text-xs font-bold px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md flex items-center gap-1.5 transition"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{t('aiFindBtn')}</span>
            </button>
          </div>

          {/* AI Output Section */}
          {isLoading && (
            <div className="mt-6 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-blue-200 dark:border-zinc-800 text-center">
              <RefreshCw className="w-8 h-8 text-blue-600 dark:text-white animate-spin mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-600 dark:text-zinc-400">
                Искусственный интеллект анализирует свободные дачи и ваши критерии...
              </p>
            </div>
          )}

          {!isLoading && hasSearched && aiResponse && (
            <div className="mt-6 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-blue-200 dark:border-zinc-800 shadow-md">
              <div className="flex items-start gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>Рекомендация AI Dacha Bron</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-zinc-300 mt-1 leading-relaxed">
                    {aiResponse}
                  </p>
                </div>
              </div>

              {/* Matched Dacha Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {matchedDachas.map((dacha) => (
                  <DachaCard key={dacha.id} dacha={dacha} />
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
