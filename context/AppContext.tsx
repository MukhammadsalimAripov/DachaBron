'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import initialProducts from '@/data/products.json';

export interface Comment {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
}

export interface Dacha {
  id: string;
  name: string;
  category: 'villa' | 'bolshiye' | 'sredniye' | 'malenkiye' | string;
  price: number;
  stars: number;
  description: string;
  location: string;
  images: string[];
  features?: string[];
  maxGuests?: number;
  isBooked: boolean;
  bookedDaysRemaining: number;
  isDeleted: boolean;
  comments: Comment[];
  bookedBy?: { name: string; phone: string };
}

export interface Booking {
  id: string;
  dachaId: string;
  dachaName: string;
  clientName: string;
  clientPhone: string;
  days: number;
  totalPrice: number;
  notes?: string;
  createdAt: string;
  status: 'active' | 'completed';
}

export interface User {
  name: string;
  email: string;
  phone: string;
}

export const ADMIN_PASSWORD = "aripovmuhammadsalim!is11&";

const translations: Record<string, Record<string, string>> = {
  ru: {
    brandName: "Дача Брон",
    brandSubtitle: "Элитный отдых в горах Узбекистана",
    navHome: "Главная",
    navDachas: "Дачи",
    navAbout: "О нас",
    navReviews: "Отзывы",
    navContacts: "Контакты",
    navLogin: "Войти",
    navRegister: "Регистрация",
    navLogout: "Выйти",
    catAll: "Все дачи",
    catVillas: "Виллы",
    catLarge: "Большие дачи",
    catMedium: "Средние дачи",
    catSmall: "Маленькие дачи",
    heroTitle: "Найдите дачу на свой вкус",
    heroSubtitle: "Лучшие горные виллы, коттеджи и дома отдыха в Чарваке, Чимгане и Бричмулле с гарантией комфорта.",
    heroBtn: "Смотреть дачи",
    aiTitle: "AI Помощник: Подбор дачи на ваш вкус",
    aiSubtitle: "Укажите свои пожелания, и искусственный интеллект мгновенно найдет идеальный вариант для вашего отдыха.",
    aiPlaceholder: "Например: найди виллу в Чарваке с теплым бассейном на 10 человек до $600...",
    aiGuestsLabel: "Количество гостей:",
    aiLocationLabel: "Локация:",
    aiBudgetLabel: "Бюджет в сутки:",
    aiFeatureLabel: "Главное удобство:",
    aiAny: "Все локации",
    aiFindBtn: "Подобрать через AI",
    aiResetBtn: "Сбросить",
    perDay: "в сутки",
    guests: "гостей",
    bookBtn: "Забронировать",
    bookedBadge: "Дача забронирована",
    bookedDaysLeft: "Осталось {days} дн. до освобождения",
    detailsBtn: "Подробнее",
    reviewsTitle: "Отзывы клиентов",
    leaveReview: "Оставить отзыв",
    writeReviewPlaceholder: "Поделитесь вашими впечатлениями об отдыхе...",
    yourName: "Ваше имя",
    yourRating: "Оценка:",
    sendReview: "Отправить отзыв",
    footerAbout: "Сервис премиального бронирования загородных домов, дач и вилл в Ташкентской области.",
    footerContacts: "Контакты",
    footerQuickLinks: "Быстрые ссылки",
    footerRights: "Все права защищены.",
    adminLink: "Админка",
    authLoginTitle: "Вход в аккаунт",
    authRegTitle: "Регистрация",
    authEmail: "Email / Номер телефона",
    authPassword: "Пароль",
    authName: "Ваше имя",
    authSubmitLogin: "Войти",
    authSubmitReg: "Зарегистрироваться",
    authNeedAccount: "Нет аккаунта? Зарегистрируйтесь",
    authHaveAccount: "Уже есть аккаунт? Войдите",
    authRequiredForBooking: "Пожалуйста, войдите в аккаунт или зарегистрируйтесь, чтобы забронировать дачу.",
    bookingModalTitle: "Выберите срок бронирования",
    moreDaysBtn: "Больше дней...",
    customDaysLabel: "Введите количество дней:",
    totalPrice: "Итоговая стоимость:",
    proceedToCheckout: "Перейти к бронированию",
    checkoutTitle: "Оформление бронирования",
    checkoutSubtitle: "Заполните данные для подтверждения брони",
    checkoutClientName: "Введите ваше имя",
    checkoutClientPhone: "Введите свой номер телефона",
    checkoutSelectedDacha: "Выбранная дача:",
    checkoutDaysCount: "Количество суток:",
    checkoutTotalToPay: "Сумма к оплате:",
    checkoutConfirmBtn: "Подтвердить бронирование",
    checkoutSuccessTitle: "Заявка успешно отправлена!",
    checkoutSuccessText: "Ваше бронирование зарегистрировано и поступило в админку. Администратор свяжется с вами по указанному телефону.",
    adminModalTitle: "Вход в панель администратора",
    adminPasswordPlaceholder: "Введите пароль администратора",
    adminLoginBtn: "Войти в админку",
    adminWrongPassword: "Неверный пароль администратора!",
    adminDashboardTitle: "Панель управления Dacha Bron",
    adminTabDachas: "Все дачи",
    adminTabAdd: "Добавить дачу",
    adminTabDeleted: "Удаленные дачи",
    adminTabBookings: "Забронированные",
    adminLogout: "Выйти из панели",
    adminEditTitle: "Редактирование дачи",
    adminSaveBtn: "Сохранить изменения",
    adminCancelBtn: "Отмена",
    adminDeleteBtn: "Удалить в корзину",
    adminRestoreBtn: "Вернуть дачу",
    adminReleaseBtn: "Освободить дачу",
    emptyCatalog: "В этой категории пока нет дач.",
    emptyDeleted: "Корзина удаленных дач пуста.",
    emptyBookings: "Забронированных дач пока нет."
  },
  uz: {
    brandName: "Dacha Bron",
    brandSubtitle: "O'zbekiston tog'larida elita dam olish maskanlari",
    navHome: "Bosh sahifa",
    navDachas: "Dachalar",
    navAbout: "Biz haqimizda",
    navReviews: "Sharhlar",
    navContacts: "Aloqa",
    navLogin: "Kirish",
    navRegister: "Ro'yxatdan o'tish",
    navLogout: "Chiqish",
    catAll: "Barcha dachalar",
    catVillas: "Villalar",
    catLarge: "Katta dachalar",
    catMedium: "O'rtacha dachalar",
    catSmall: "Kichik dachalar",
    heroTitle: "O'z didingizga mos dachani toping",
    heroSubtitle: "Chorvoq, Chimyon va Burchmulladagi eng yaxshi tog' villalari va oromgohlari.",
    heroBtn: "Dachalarni ko'rish",
    aiTitle: "AI Yordamchi: Didingizga mos dacha tanlash",
    aiSubtitle: "O'z talablaringizni belgilang, sun'iy intellekt sizga eng maqbul dachani tavsiya etadi.",
    aiPlaceholder: "Masalan: Chorvoqda 10 kishilik, isitiladigan basseynli villa kerak $600 gacha...",
    aiGuestsLabel: "Mehmonlar soni:",
    aiLocationLabel: "Hudud:",
    aiBudgetLabel: "Sutkalik byudjet:",
    aiFeatureLabel: "Asosiy qulaylik:",
    aiAny: "Barcha hududlar",
    aiFindBtn: "AI orqali topish",
    aiResetBtn: "Tozalash",
    perDay: "kuniga",
    guests: "kishi",
    bookBtn: "Band qilish",
    bookedBadge: "Dacha band qilingan",
    bookedDaysLeft: "Bo'shashiga {days} kun qoldi",
    detailsBtn: "Batafsil",
    reviewsTitle: "Mijozlar fikrlari",
    leaveReview: "Sharh qoldirish",
    writeReviewPlaceholder: "Dam olishingiz haqidagi taassurotlarni yozing...",
    yourName: "Ismingiz",
    yourRating: "Baho:",
    sendReview: "Sharhni yuborish",
    footerAbout: "Toshkent viloyatida tog' villalari va xususiy dam olish maskanlarini bron qilish xizmati.",
    footerContacts: "Aloqa",
    footerQuickLinks: "Tezkor havolalar",
    footerRights: "Barcha huquqlar himoyalangan.",
    adminLink: "Adminka",
    authLoginTitle: "Akkauntga kirish",
    authRegTitle: "Ro'yxatdan o'tish",
    authEmail: "Email / Telefon",
    authPassword: "Parol",
    authName: "Ismingiz",
    authSubmitLogin: "Kirish",
    authSubmitReg: "Ro'yxatdan o'tish",
    authNeedAccount: "Akkauntingiz yo'qmi? Ro'yxatdan o'ting",
    authHaveAccount: "Akkaunt bormi? Tizimga kiring",
    authRequiredForBooking: "Dachani band qilish uchun iltimos, avval tizimga kiring yoki ro'yxatdan o'ting.",
    bookingModalTitle: "Band qilish muddatini tanlang",
    moreDaysBtn: "Ko'proq kunlar...",
    customDaysLabel: "Kunlar sonini kiriting:",
    totalPrice: "Umumiy narx:",
    proceedToCheckout: "Band qilish sahifasiga o'tish",
    checkoutTitle: "Band qilishni rasmiylashtirish",
    checkoutSubtitle: "Tasdiqlash uchun ma'lumotlaringizni kiriting",
    checkoutClientName: "Ismingizni kiriting",
    checkoutClientPhone: "Telefon raqamingizni kiriting",
    checkoutSelectedDacha: "Tanlangan dacha:",
    checkoutDaysCount: "Kunlar soni:",
    checkoutTotalToPay: "To'lanadigan summa:",
    checkoutConfirmBtn: "Band qilishni tasdiqlash",
    checkoutSuccessTitle: "Buyurtma qabul qilindi!",
    checkoutSuccessText: "Dacha band qilindi va xabar adminkaga yuborildi. Administrator tez orada siz bilan bog'lanadi.",
    adminModalTitle: "Administrator paneliga kirish",
    adminPasswordPlaceholder: "Admin parolini kiriting",
    adminLoginBtn: "Adminkaga kirish",
    adminWrongPassword: "Admin paroli noto'g'ri!",
    adminDashboardTitle: "Dacha Bron Boshqaruv Paneli",
    adminTabDachas: "Barcha dachalar",
    adminTabAdd: "Dacha qo'shish",
    adminTabDeleted: "O'chirilgan dachalar",
    adminTabBookings: "Band qilinganlar",
    adminLogout: "Paneldan chiqish",
    adminEditTitle: "Dachani tahrirlash",
    adminSaveBtn: "O'zgarishlarni saqlash",
    adminCancelBtn: "Bekor qilish",
    adminDeleteBtn: "Savatga o'chirish",
    adminRestoreBtn: "Dachani qaytarish",
    adminReleaseBtn: "Dachani bo'shatish",
    emptyCatalog: "Ushbu toifada hozircha dachalar yo'q.",
    emptyDeleted: "O'chirilgan dachalar savati bo'sh.",
    emptyBookings: "Hozircha band qilingan dachalar yo'q."
  },
  en: {
    brandName: "Dacha Bron",
    brandSubtitle: "Luxury mountain cottage & villa rentals in Uzbekistan",
    navHome: "Home",
    navDachas: "Dachas",
    navAbout: "About Us",
    navReviews: "Reviews",
    navContacts: "Contacts",
    navLogin: "Login",
    navRegister: "Register",
    navLogout: "Logout",
    catAll: "All Dachas",
    catVillas: "Villas",
    catLarge: "Large Dachas",
    catMedium: "Medium Dachas",
    catSmall: "Small Dachas",
    heroTitle: "Find a Dacha to Your Taste",
    heroSubtitle: "Top mountain villas, cottages, and retreats in Charvak, Chimgan, and Brichmulla with maximum comfort.",
    heroBtn: "Browse Dachas",
    aiTitle: "AI Assistant: Tailored Dacha Finder",
    aiSubtitle: "Set your preferences and our AI will immediately recommend the ideal dacha for your vacation.",
    aiPlaceholder: "Example: find a villa in Charvak with heated pool for 10 guests up to $600...",
    aiGuestsLabel: "Guests count:",
    aiLocationLabel: "Location:",
    aiBudgetLabel: "Budget per day:",
    aiFeatureLabel: "Top amenity:",
    aiAny: "All locations",
    aiFindBtn: "Find with AI",
    aiResetBtn: "Reset",
    perDay: "per day",
    guests: "guests",
    bookBtn: "Book Now",
    bookedBadge: "Dacha Booked",
    bookedDaysLeft: "{days} days left until checkout",
    detailsBtn: "Details",
    reviewsTitle: "Client Reviews",
    leaveReview: "Leave a Review",
    writeReviewPlaceholder: "Share your experience...",
    yourName: "Your name",
    yourRating: "Rating:",
    sendReview: "Submit Review",
    footerAbout: "Premium booking platform for countryside houses, dachas and villas in Tashkent mountain region.",
    footerContacts: "Contacts",
    footerQuickLinks: "Quick Links",
    footerRights: "All rights reserved.",
    adminLink: "Admin Panel",
    authLoginTitle: "Account Login",
    authRegTitle: "Create Account",
    authEmail: "Email / Phone",
    authPassword: "Password",
    authName: "Full Name",
    authSubmitLogin: "Log In",
    authSubmitReg: "Sign Up",
    authNeedAccount: "Don't have an account? Sign up",
    authHaveAccount: "Already have an account? Log in",
    authRequiredForBooking: "Please sign in or register before booking a dacha.",
    bookingModalTitle: "Select Booking Duration",
    moreDaysBtn: "More days...",
    customDaysLabel: "Enter number of days:",
    totalPrice: "Total Price:",
    proceedToCheckout: "Proceed to Booking",
    checkoutTitle: "Complete Your Reservation",
    checkoutSubtitle: "Provide your contact information to confirm reservation",
    checkoutClientName: "Enter your full name",
    checkoutClientPhone: "Enter your phone number",
    checkoutSelectedDacha: "Selected Dacha:",
    checkoutDaysCount: "Duration (days):",
    checkoutTotalToPay: "Total to Pay:",
    checkoutConfirmBtn: "Confirm Booking",
    checkoutSuccessTitle: "Booking Confirmed!",
    checkoutSuccessText: "Your reservation was received and sent to the admin dashboard. Our manager will call you shortly.",
    adminModalTitle: "Admin Panel Login",
    adminPasswordPlaceholder: "Enter admin password",
    adminLoginBtn: "Access Admin",
    adminWrongPassword: "Wrong admin password!",
    adminDashboardTitle: "Dacha Bron Admin Dashboard",
    adminTabDachas: "All Dachas",
    adminTabAdd: "Add Dacha",
    adminTabDeleted: "Trash / Deleted",
    adminTabBookings: "Bookings",
    adminLogout: "Exit Admin",
    adminEditTitle: "Edit Dacha",
    adminSaveBtn: "Save Changes",
    adminCancelBtn: "Cancel",
    adminDeleteBtn: "Move to Trash",
    adminRestoreBtn: "Restore Dacha",
    adminReleaseBtn: "Release Dacha",
    emptyCatalog: "No dachas in this category yet.",
    emptyDeleted: "Trash is currently empty.",
    emptyBookings: "No active bookings at the moment."
  }
};

interface AppContextType {
  lang: string;
  setLang: (lang: string) => void;
  t: (key: string, replacements?: Record<string, string | number>) => string;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  loginUser: (email: string, name?: string) => void;
  logoutUser: () => void;
  dachas: Dacha[];
  bookings: Booking[];
  bookingDraft: any;
  setBookingDraft: (draft: any) => void;
  isAdminAuthenticated: boolean;
  setIsAdminAuthenticated: (val: boolean) => void;
  
  // Modals
  isAuthModalOpen: boolean;
  authMode: 'login' | 'register';
  openAuthModal: (mode?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  
  isBookingModalOpen: boolean;
  bookingModalDacha: Dacha | null;
  openBookingModal: (dacha: Dacha) => void;
  closeBookingModal: () => void;

  isDachaDetailModalOpen: boolean;
  selectedDacha: Dacha | null;
  openDachaDetail: (dacha: Dacha) => void;
  closeDachaDetail: () => void;

  isAdminPasswordModalOpen: boolean;
  openAdminPasswordModal: () => void;
  closeAdminPasswordModal: () => void;
  verifyAdminPassword: (password: string) => boolean;

  // Actions
  addComment: (dachaId: string, author: string, rating: number, text: string) => void;
  createBooking: (clientName: string, clientPhone: string, notes?: string) => string | null;
  releaseDachaBooking: (dachaId: string, bookingId: string) => void;
  adminAddDacha: (newDacha: Partial<Dacha>) => void;
  adminEditDacha: (dachaId: string, updated: Partial<Dacha>) => void;
  adminDeleteDacha: (dachaId: string) => void;
  adminRestoreDacha: (dachaId: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<string>('ru');
  const [theme, setThemeState] = useState<'light' | 'dark'>('light');
  const [currentUser, setCurrentUserState] = useState<User | null>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticatedState] = useState<boolean>(false);
  const [dachas, setDachas] = useState<Dacha[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingDraft, setBookingDraft] = useState<any>(null);

  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingModalDacha, setBookingModalDacha] = useState<Dacha | null>(null);
  const [isDachaDetailModalOpen, setIsDachaDetailModalOpen] = useState(false);
  const [selectedDacha, setSelectedDacha] = useState<Dacha | null>(null);
  const [isAdminPasswordModalOpen, setIsAdminPasswordModalOpen] = useState(false);

  // Load state from localStorage on client mount
  useEffect(() => {
    const savedLang = localStorage.getItem('dacha_lang') || 'ru';
    setLangState(savedLang);

    const savedTheme = (localStorage.getItem('dacha_theme') as 'light' | 'dark') || 'light';
    setThemeState(savedTheme);
    applyThemeClass(savedTheme);

    const savedUser = localStorage.getItem('dacha_user');
    if (savedUser) {
      try {
        setCurrentUserState(JSON.parse(savedUser));
      } catch (e) {}
    }

    const savedAdmin = sessionStorage.getItem('dacha_admin_auth');
    if (savedAdmin === 'true') {
      setIsAdminAuthenticatedState(true);
    }

    const savedDachas = localStorage.getItem('dacha_products');
    if (savedDachas) {
      try {
        setDachas(JSON.parse(savedDachas));
      } catch (e) {
        setDachas(initialProducts as Dacha[]);
      }
    } else {
      setDachas(initialProducts as Dacha[]);
      localStorage.setItem('dacha_products', JSON.stringify(initialProducts));
    }

    const savedBookings = localStorage.getItem('dacha_bookings');
    if (savedBookings) {
      try {
        setBookings(JSON.parse(savedBookings));
      } catch (e) {}
    }
  }, []);

  const setLang = (newLang: string) => {
    setLangState(newLang);
    localStorage.setItem('dacha_lang', newLang);
  };

  const applyThemeClass = (t: 'light' | 'dark') => {
    if (typeof document !== 'undefined') {
      if (t === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setThemeState(next);
    localStorage.setItem('dacha_theme', next);
    applyThemeClass(next);
  };

  const t = (key: string, replacements: Record<string, string | number> = {}) => {
    const dict = translations[lang] || translations.ru;
    let text = dict[key] || translations.ru[key] || key;
    for (const [rKey, rVal] of Object.entries(replacements)) {
      text = text.replace(new RegExp(`\\{${rKey}\\}`, 'g'), String(rVal));
    }
    return text;
  };

  const loginUser = (email: string, name?: string) => {
    const user: User = {
      name: name || email.split('@')[0] || 'Пользователь',
      email: email,
      phone: email.includes('@') ? '+998 90 123 45 67' : email
    };
    setCurrentUserState(user);
    localStorage.setItem('dacha_user', JSON.stringify(user));
  };

  const logoutUser = () => {
    setCurrentUserState(null);
    localStorage.removeItem('dacha_user');
  };

  const setIsAdminAuthenticated = (val: boolean) => {
    setIsAdminAuthenticatedState(val);
    if (val) {
      sessionStorage.setItem('dacha_admin_auth', 'true');
    } else {
      sessionStorage.removeItem('dacha_admin_auth');
    }
  };

  const verifyAdminPassword = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdminAuthenticated(true);
      return true;
    }
    return false;
  };

  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const openBookingModal = (dacha: Dacha) => {
    if (!currentUser) {
      openAuthModal('login');
      return;
    }
    setBookingModalDacha(dacha);
    setIsBookingModalOpen(true);
  };
  const closeBookingModal = () => setIsBookingModalOpen(false);

  const openDachaDetail = (dacha: Dacha) => {
    setSelectedDacha(dacha);
    setIsDachaDetailModalOpen(true);
  };
  const closeDachaDetail = () => setIsDachaDetailModalOpen(false);

  const openAdminPasswordModal = () => setIsAdminPasswordModalOpen(true);
  const closeAdminPasswordModal = () => setIsAdminPasswordModalOpen(false);

  const addComment = (dachaId: string, author: string, rating: number, text: string) => {
    const newComment: Comment = {
      id: 'c_' + Date.now(),
      author,
      rating,
      date: new Date().toLocaleDateString('ru-RU'),
      text
    };

    const updated = dachas.map(d => {
      if (d.id === dachaId) {
        return {
          ...d,
          comments: [newComment, ...(d.comments || [])]
        };
      }
      return d;
    });

    setDachas(updated);
    localStorage.setItem('dacha_products', JSON.stringify(updated));

    if (selectedDacha && selectedDacha.id === dachaId) {
      setSelectedDacha({
        ...selectedDacha,
        comments: [newComment, ...(selectedDacha.comments || [])]
      });
    }
  };

  const createBooking = (clientName: string, clientPhone: string, notes?: string): string | null => {
    if (!bookingDraft) return null;

    const newBooking: Booking = {
      id: 'b_' + Date.now().toString().slice(-6),
      dachaId: bookingDraft.dachaId,
      dachaName: bookingDraft.dachaName,
      clientName,
      clientPhone,
      days: bookingDraft.days,
      totalPrice: bookingDraft.totalPrice,
      notes: notes || '',
      createdAt: new Date().toLocaleString('ru-RU'),
      status: 'active'
    };

    const updatedBookings = [newBooking, ...bookings];
    setBookings(updatedBookings);
    localStorage.setItem('dacha_bookings', JSON.stringify(updatedBookings));

    // Lock dacha
    const updatedDachas = dachas.map(d => {
      if (d.id === bookingDraft.dachaId) {
        return {
          ...d,
          isBooked: true,
          bookedDaysRemaining: bookingDraft.days,
          bookedBy: { name: clientName, phone: clientPhone }
        };
      }
      return d;
    });

    setDachas(updatedDachas);
    localStorage.setItem('dacha_products', JSON.stringify(updatedDachas));

    setBookingDraft(null);
    return newBooking.id;
  };

  const releaseDachaBooking = (dachaId: string, bookingId: string) => {
    const updatedDachas = dachas.map(d => {
      if (d.id === dachaId) {
        return {
          ...d,
          isBooked: false,
          bookedDaysRemaining: 0,
          bookedBy: undefined
        };
      }
      return d;
    });
    setDachas(updatedDachas);
    localStorage.setItem('dacha_products', JSON.stringify(updatedDachas));

    const updatedBookings = bookings.filter(b => b.id !== bookingId);
    setBookings(updatedBookings);
    localStorage.setItem('dacha_bookings', JSON.stringify(updatedBookings));
  };

  const adminAddDacha = (newDachaData: Partial<Dacha>) => {
    const newDacha: Dacha = {
      id: 'dacha-' + Date.now(),
      name: newDachaData.name || 'Новая дача',
      category: newDachaData.category || 'villa',
      price: Number(newDachaData.price) || 200,
      stars: Number(newDachaData.stars) || 5,
      description: newDachaData.description || '',
      location: newDachaData.location || 'Чарвак, ул. Сайхон, дом 14',
      images: newDachaData.images && newDachaData.images.length > 0
        ? newDachaData.images
        : ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80'],
      features: ['Бассейн', 'Мангал', 'Wi-Fi'],
      maxGuests: 12,
      isBooked: false,
      bookedDaysRemaining: 0,
      isDeleted: false,
      comments: []
    };

    const updated = [newDacha, ...dachas];
    setDachas(updated);
    localStorage.setItem('dacha_products', JSON.stringify(updated));
  };

  const adminEditDacha = (dachaId: string, updatedFields: Partial<Dacha>) => {
    const updated = dachas.map(d => {
      if (d.id === dachaId) {
        return { ...d, ...updatedFields };
      }
      return d;
    });
    setDachas(updated);
    localStorage.setItem('dacha_products', JSON.stringify(updated));
  };

  const adminDeleteDacha = (dachaId: string) => {
    const updated = dachas.map(d => {
      if (d.id === dachaId) {
        return { ...d, isDeleted: true };
      }
      return d;
    });
    setDachas(updated);
    localStorage.setItem('dacha_products', JSON.stringify(updated));
  };

  const adminRestoreDacha = (dachaId: string) => {
    const updated = dachas.map(d => {
      if (d.id === dachaId) {
        return { ...d, isDeleted: false };
      }
      return d;
    });
    setDachas(updated);
    localStorage.setItem('dacha_products', JSON.stringify(updated));
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        t,
        theme,
        toggleTheme,
        currentUser,
        setCurrentUser: setCurrentUserState,
        loginUser,
        logoutUser,
        dachas,
        bookings,
        bookingDraft,
        setBookingDraft,
        isAdminAuthenticated,
        setIsAdminAuthenticated,
        isAuthModalOpen,
        authMode,
        openAuthModal,
        closeAuthModal,
        isBookingModalOpen,
        bookingModalDacha,
        openBookingModal,
        closeBookingModal,
        isDachaDetailModalOpen,
        selectedDacha,
        openDachaDetail,
        closeDachaDetail,
        isAdminPasswordModalOpen,
        openAdminPasswordModal,
        closeAdminPasswordModal,
        verifyAdminPassword,
        addComment,
        createBooking,
        releaseDachaBooking,
        adminAddDacha,
        adminEditDacha,
        adminDeleteDacha,
        adminRestoreDacha,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
