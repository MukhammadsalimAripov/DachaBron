'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp, Dacha } from '@/context/AppContext';
import { 
  Building2, 
  PlusCircle, 
  Trash2, 
  RotateCcw, 
  Unlock, 
  LogOut, 
  Edit3, 
  Check, 
  X,
  Phone,
  User,
  Calendar,
  Lock
} from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const { 
    isAdminAuthenticated, 
    setIsAdminAuthenticated, 
    dachas, 
    bookings, 
    adminAddDacha, 
    adminEditDacha, 
    adminDeleteDacha, 
    adminRestoreDacha, 
    releaseDachaBooking,
    t 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'dachas' | 'add' | 'deleted' | 'bookings'>('dachas');
  
  // Add Dacha Form State
  const [addName, setAddName] = useState('');
  const [addCategory, setAddCategory] = useState('villa');
  const [addPrice, setAddPrice] = useState('500');
  const [addStars, setAddStars] = useState('5');
  const [addLocation, setAddLocation] = useState('Чарвак, ул. Сайхон, дом 14');
  const [addImages, setAddImages] = useState('');
  const [addDesc, setAddDesc] = useState('');

  // Edit Dacha Modal State
  const [editingDacha, setEditingDacha] = useState<Dacha | null>(null);

  // Direct URL Security Gate: Redirect to home if not authenticated!
  useEffect(() => {
    if (!isAdminAuthenticated) {
      router.replace('/');
    }
  }, [isAdminAuthenticated, router]);

  if (!isAdminAuthenticated) {
    return (
      <div className="py-24 text-center">
        <p className="text-xs text-slate-500">Проверка доступа администратора...</p>
      </div>
    );
  }

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    router.push('/');
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const imgs = addImages.split(/[\n,]+/).map(s => s.trim()).filter(Boolean);
    
    adminAddDacha({
      name: addName,
      category: addCategory,
      price: Number(addPrice) || 200,
      stars: Number(addStars) || 5,
      location: addLocation,
      images: imgs.length > 0 ? imgs : ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80'],
      description: addDesc,
    });

    setAddName('');
    setAddImages('');
    setAddDesc('');
    setActiveTab('dachas');
    alert('Дача успешно добавлена в каталог!');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDacha) return;

    adminEditDacha(editingDacha.id, {
      name: editingDacha.name,
      price: editingDacha.price,
      category: editingDacha.category,
      stars: editingDacha.stars,
      location: editingDacha.location,
      description: editingDacha.description,
      images: editingDacha.images,
    });

    setEditingDacha(null);
    alert('Изменения сохранены!');
  };

  const activeDachas = dachas.filter(d => !d.isDeleted);
  const deletedDachas = dachas.filter(d => d.isDeleted);

  return (
    <div className="py-10 bg-slate-50 dark:bg-black min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white dark:bg-zinc-900 border border-slate-800 dark:border-zinc-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center font-bold text-lg">
                ⚙️
              </div>
              <div>
                <h1 className="text-2xl font-black">{t('adminDashboardTitle')}</h1>
                <p className="text-xs text-slate-400">Управление дачами, ценами, бронями и корзиной</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="self-start md:self-auto py-2.5 px-4 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white flex items-center gap-1.5 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t('adminLogout')}</span>
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-zinc-800 pb-4 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab('dachas')}
            className={`py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'dachas'
                ? 'bg-blue-600 text-white dark:bg-white dark:text-black shadow-sm'
                : 'bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>{t('adminTabDachas')} ({activeDachas.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('add')}
            className={`py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'add'
                ? 'bg-blue-600 text-white dark:bg-white dark:text-black shadow-sm'
                : 'bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t('adminTabAdd')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('deleted')}
            className={`py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'deleted'
                ? 'bg-blue-600 text-white dark:bg-white dark:text-black shadow-sm'
                : 'bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800'
            }`}
          >
            <Trash2 className="w-4 h-4" />
            <span>{t('adminTabDeleted')} ({deletedDachas.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('bookings')}
            className={`py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'bookings'
                ? 'bg-blue-600 text-white dark:bg-white dark:text-black shadow-sm'
                : 'bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>{t('adminTabBookings')} ({bookings.length})</span>
          </button>
        </div>

        {/* TAB 1: ALL ACTIVE DACHAS */}
        {activeTab === 'dachas' && (
          <div>
            {activeDachas.length === 0 ? (
              <p className="p-12 text-center text-xs text-slate-400">Нет активных дач</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeDachas.map((dacha) => (
                  <div
                    key={dacha.id}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
                        <img
                          src={dacha.images?.[0]}
                          alt={dacha.name}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-600 text-white">
                          {dacha.category}
                        </span>
                        {dacha.isBooked && (
                          <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold bg-red-600 text-white">
                            Забронирована ({dacha.bookedDaysRemaining} дн.)
                          </span>
                        )}
                      </div>

                      <h4 className="font-bold text-slate-900 dark:text-white text-base">
                        {dacha.name}
                      </h4>
                      <div className="text-xs font-extrabold text-blue-600 dark:text-blue-400 mt-0.5">
                        ${dacha.price} / сутки
                      </div>
                      <div className="text-xs text-slate-500 mt-1">{dacha.location}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">⭐ {dacha.stars} звезд</div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-zinc-800 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingDacha(dacha)}
                        className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-zinc-800 dark:text-zinc-200 flex items-center justify-center gap-1.5 transition"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Изменить</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => adminDeleteDacha(dacha.id)}
                        className="py-2 px-3 rounded-xl text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-400 flex items-center gap-1 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{t('adminDeleteBtn')}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ADD NEW DACHA */}
        {activeTab === 'add' && (
          <div className="max-w-2xl bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6">
              Добавить новую дачу
            </h3>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-zinc-400 mb-1">
                    Название дачи
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Например: Вилла Бричмулла"
                    value={addName}
                    onChange={(e) => setAddName(e.target.value)}
                    className="w-full text-xs py-2.5 px-3.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-zinc-400 mb-1">
                    Категория
                  </label>
                  <select
                    value={addCategory}
                    onChange={(e) => setAddCategory(e.target.value)}
                    className="w-full text-xs py-2.5 px-3.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white"
                  >
                    <option value="villa">Вилла (villa)</option>
                    <option value="bolshiye">Большая дача (bolshiye)</option>
                    <option value="sredniye">Средняя дача (sredniye)</option>
                    <option value="malenkiye">Маленькая дача (malenkiye)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-zinc-400 mb-1">
                    Цена за сутки ($)
                  </label>
                  <input
                    type="number"
                    required
                    value={addPrice}
                    onChange={(e) => setAddPrice(e.target.value)}
                    className="w-full text-xs py-2.5 px-3.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-zinc-400 mb-1">
                    Звезды (1-5)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={addStars}
                    onChange={(e) => setAddStars(e.target.value)}
                    className="w-full text-xs py-2.5 px-3.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-zinc-400 mb-1">
                  Локация (Адрес)
                </label>
                <input
                  type="text"
                  required
                  placeholder="Чарвак, ул. Сайхон, дом 14"
                  value={addLocation}
                  onChange={(e) => setAddLocation(e.target.value)}
                  className="w-full text-xs py-2.5 px-3.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-zinc-400 mb-1">
                  Ссылки на картинки (через запятую или с новой строки)
                </label>
                <textarea
                  rows={3}
                  placeholder="https://images.unsplash.com/photo-1...&#10;https://images.unsplash.com/photo-2..."
                  value={addImages}
                  onChange={(e) => setAddImages(e.target.value)}
                  className="w-full text-xs font-mono py-2.5 px-3.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-zinc-400 mb-1">
                  Описание дачи
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Опишите бассейн, комнаты, камин, караоке..."
                  value={addDesc}
                  onChange={(e) => setAddDesc(e.target.value)}
                  className="w-full text-xs py-2.5 px-3.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="py-3 px-8 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-md transition"
              >
                ➕ Добавить дачу
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: DELETED DACHAS (TRASH & RESTORE) */}
        {activeTab === 'deleted' && (
          <div className="space-y-4">
            {deletedDachas.length === 0 ? (
              <p className="p-12 text-center text-xs text-slate-400">{t('emptyDeleted')}</p>
            ) : (
              deletedDachas.map((dacha) => (
                <div
                  key={dacha.id}
                  className="p-4 rounded-2xl border border-dashed border-red-200 dark:border-red-950 bg-red-50/20 dark:bg-zinc-900/40 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={dacha.images?.[0]}
                      alt={dacha.name}
                      className="w-16 h-12 object-cover rounded-xl"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">{dacha.name}</h4>
                      <p className="text-xs text-slate-400">${dacha.price} / день • {dacha.category}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => adminRestoreDacha(dacha.id)}
                    className="py-2 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 transition shadow"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{t('adminRestoreBtn')}</span>
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 4: BOOKINGS / MESSAGES */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            {bookings.length === 0 ? (
              <p className="p-12 text-center text-xs text-slate-400">{t('emptyBookings')}</p>
            ) : (
              bookings.map((b) => (
                <div
                  key={b.id}
                  className="p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                        {b.id}
                      </span>
                      <span className="text-[11px] text-slate-400">{b.createdAt}</span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {b.dachaName}
                    </h4>

                    <div className="text-xs text-slate-600 dark:text-zinc-300 mt-1">
                      Клиент: <strong className="text-slate-900 dark:text-white">{b.clientName}</strong> ({b.clientPhone})
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Срок: <strong>{b.days} суток</strong> • Сумма к оплате: <strong className="text-blue-600 dark:text-blue-400 font-extrabold">${b.totalPrice}</strong>
                    </div>
                    {b.notes && (
                      <div className="text-xs text-slate-400 mt-1 italic">
                        Пожелания: "{b.notes}"
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => releaseDachaBooking(b.dachaId, b.id)}
                    className="py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black flex items-center gap-1.5 transition shadow"
                  >
                    <Unlock className="w-3.5 h-3.5" />
                    <span>{t('adminReleaseBtn')}</span>
                  </button>
                </div>
              ))
            )}
          </div>
        )}

      </div>

      {/* EDIT DACHA MODAL */}
      {editingDacha && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 sm:p-8 shadow-2xl">
            <button
              type="button"
              onClick={() => setEditingDacha(null)}
              className="absolute right-5 top-5 p-2 rounded-xl text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Редактирование дачи
            </h3>

            <form onSubmit={handleSaveEdit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">Имя</label>
                  <input
                    type="text"
                    required
                    value={editingDacha.name}
                    onChange={(e) => setEditingDacha({ ...editingDacha, name: e.target.value })}
                    className="w-full text-xs py-2 px-3 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">Категория</label>
                  <select
                    value={editingDacha.category}
                    onChange={(e) => setEditingDacha({ ...editingDacha, category: e.target.value })}
                    className="w-full text-xs py-2 px-3 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  >
                    <option value="villa">Вилла</option>
                    <option value="bolshiye">Большая</option>
                    <option value="sredniye">Средняя</option>
                    <option value="malenkiye">Маленькая</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">Цена ($)</label>
                  <input
                    type="number"
                    required
                    value={editingDacha.price}
                    onChange={(e) => setEditingDacha({ ...editingDacha, price: Number(e.target.value) })}
                    className="w-full text-xs py-2 px-3 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">Звезды (1-5)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={editingDacha.stars}
                    onChange={(e) => setEditingDacha({ ...editingDacha, stars: Number(e.target.value) })}
                    className="w-full text-xs py-2 px-3 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">Локация</label>
                <input
                  type="text"
                  required
                  value={editingDacha.location}
                  onChange={(e) => setEditingDacha({ ...editingDacha, location: e.target.value })}
                  className="w-full text-xs py-2 px-3 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">Ссылки на картинки</label>
                <textarea
                  rows={2}
                  value={(editingDacha.images || []).join('\n')}
                  onChange={(e) => setEditingDacha({ 
                    ...editingDacha, 
                    images: e.target.value.split(/[\n,]+/).map(s => s.trim()).filter(Boolean) 
                  })}
                  className="w-full text-xs font-mono py-2 px-3 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">Описание</label>
                <textarea
                  rows={3}
                  required
                  value={editingDacha.description}
                  onChange={(e) => setEditingDacha({ ...editingDacha, description: e.target.value })}
                  className="w-full text-xs py-2 px-3 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingDacha(null)}
                  className="py-2 px-4 rounded-xl text-xs font-bold border border-slate-200 dark:border-zinc-700"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="py-2 px-5 rounded-xl text-xs font-bold bg-blue-600 text-white"
                >
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
