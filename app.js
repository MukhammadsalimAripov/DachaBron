/**
 * Dacha Bron - Main Application Script
 * Features:
 * - 3 Languages (RU, UZ, EN)
 * - Light Mode (Blue & White) / Dark Mode (Black & White)
 * - AI Assistant Dacha Picker
 * - Products Catalog with Category Filtering & Hover Dropdown
 * - Multiple Images Carousel Slider
 * - Comments & Reviews
 * - Booking Modal (1-7 days + custom days input multiplier)
 * - Dedicated Booking Checkout Page (Hidden from Navbar)
 * - User Authentication (Login/Register check before booking)
 * - Secret Admin Panel via Footer with Password Protection: aripovmuhammadsalim!is11&
 * - Admin CRUD: Add, Edit, Soft-delete, Restore, Booking management
 * - LocalStorage Persistence with products.json fallback
 */

// --- TRANSLATIONS (i18n) ---
const translations = {
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
    aiGuestsLabel: "Количество гостей:",
    aiLocationLabel: "Желаемая локация:",
    aiBudgetLabel: "Максимальный бюджет ($ в сутки):",
    aiFeatureLabel: "Главное удобство:",
    aiAny: "Любая локация",
    aiFindBtn: "Подобрать идеальную дачу",
    aiResetBtn: "Сбросить подбор",
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
    authEmail: "Электронная почта / Телефон",
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
    aiGuestsLabel: "Mehmonlar soni:",
    aiLocationLabel: "Qulay hudud:",
    aiBudgetLabel: "Maksimal byudjet ($ sutkasiga):",
    aiFeatureLabel: "Asosiy qulaylik:",
    aiAny: "Ixtiyoriy hudud",
    aiFindBtn: "Eng yaxshi dachani topish",
    aiResetBtn: "Filtrni tozalash",
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
    aiGuestsLabel: "Guests count:",
    aiLocationLabel: "Preferred location:",
    aiBudgetLabel: "Max budget ($ per day):",
    aiFeatureLabel: "Top amenity:",
    aiAny: "Any location",
    aiFindBtn: "Find Perfect Dacha",
    aiResetBtn: "Reset Filter",
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

// --- INITIAL APP STATE & STORAGE ---
const ADMIN_PASSWORD_HASH = "aripovmuhammadsalim!is11&";

const AppState = {
  lang: localStorage.getItem("dacha_lang") || "ru",
  theme: localStorage.getItem("dacha_theme") || "light",
  currentUser: JSON.parse(localStorage.getItem("dacha_user")) || null,
  isAdminAuthenticated: sessionStorage.getItem("dacha_admin_auth") === "true",
  dachas: [],
  bookings: JSON.parse(localStorage.getItem("dacha_bookings")) || [],
  activeCategory: "all",
  activePage: "home", // home, catalog, about, reviews, contacts, checkout, admin
  bookingDraft: null, // { dachaId, dachaName, pricePerDay, days, totalPrice }
  editingDachaId: null,
  sliderIndexes: {} // { dachaId: index }
};

// --- DOM ELEMENTS ---
const elements = {
  html: document.documentElement,
  themeToggleBtn: document.getElementById("themeToggleBtn"),
  langSelect: document.getElementById("langSelect"),
  navUserArea: document.getElementById("navUserArea"),
  mainContent: document.getElementById("mainContent"),
  footerAdminBtn: document.getElementById("footerAdminBtn"),
  
  // Modals
  authModal: document.getElementById("authModal"),
  bookingModal: document.getElementById("bookingModal"),
  adminAuthModal: document.getElementById("adminAuthModal"),
  dachaDetailModal: document.getElementById("dachaDetailModal"),
  adminEditModal: document.getElementById("adminEditModal"),
  
  // Containers
  catalogGrid: document.getElementById("catalogGrid"),
  featuredGrid: document.getElementById("featuredGrid"),
  adminDachasList: document.getElementById("adminDachasList"),
  adminDeletedList: document.getElementById("adminDeletedList"),
  adminBookingsList: document.getElementById("adminBookingsList")
};

// --- INITIALIZATION ---
async function initApp() {
  applyTheme(AppState.theme);
  applyTranslations();
  setupEventListeners();
  await loadDachasData();
  renderNavigationUser();
  handleRoute();
}

// --- DATA PERSISTENCE ---
async function loadDachasData() {
  const localDachas = localStorage.getItem("dacha_products");
  if (localDachas) {
    try {
      AppState.dachas = JSON.parse(localDachas);
    } catch (e) {
      console.error("Failed to parse local dachas:", e);
      AppState.dachas = [];
    }
  }

  // If empty, fetch from products.json
  if (!AppState.dachas || AppState.dachas.length === 0) {
    try {
      const response = await fetch("products.json");
      if (response.ok) {
        AppState.dachas = await response.json();
        saveDachas();
      }
    } catch (e) {
      console.warn("Could not load products.json directly, fallback to empty array:", e);
    }
  }

  renderAllViews();
}

function saveDachas() {
  localStorage.setItem("dacha_products", JSON.stringify(AppState.dachas));
}

function saveBookings() {
  localStorage.setItem("dacha_bookings", JSON.stringify(AppState.bookings));
}

// --- THEME SWITCHER ---
function applyTheme(theme) {
  AppState.theme = theme;
  localStorage.setItem("dacha_theme", theme);
  if (theme === "dark") {
    elements.html.classList.add("dark");
    if (elements.themeToggleBtn) {
      elements.themeToggleBtn.innerHTML = `
        <svg class="w-5 h-5 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      `;
    }
  } else {
    elements.html.classList.remove("dark");
    if (elements.themeToggleBtn) {
      elements.themeToggleBtn.innerHTML = `
        <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      `;
    }
  }
}

function toggleTheme() {
  const nextTheme = AppState.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
}

// --- TRANSLATION HELPER ---
function t(key, replacements = {}) {
  const dict = translations[AppState.lang] || translations.ru;
  let text = dict[key] || translations.ru[key] || key;
  for (const [rKey, rVal] of Object.entries(replacements)) {
    text = text.replace(new RegExp(`\\{${rKey}\\}`, 'g'), rVal);
  }
  return text;
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (key) {
      el.textContent = t(key);
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (key) {
      el.setAttribute("placeholder", t(key));
    }
  });

  if (elements.langSelect) {
    elements.langSelect.value = AppState.lang;
  }
}

function setLanguage(lang) {
  if (translations[lang]) {
    AppState.lang = lang;
    localStorage.setItem("dacha_lang", lang);
    applyTranslations();
    renderAllViews();
  }
}

// --- ROUTING SYSTEM ---
function navigateTo(page, params = {}) {
  // If attempting to go to admin without auth, redirect home
  if (page === "admin" && !AppState.isAdminAuthenticated) {
    page = "home";
    openAdminAuthModal();
    return;
  }

  // Admin and checkout are hidden from navbar
  AppState.activePage = page;
  window.location.hash = page;

  // Hide all view pages
  document.querySelectorAll(".page-view").forEach(el => el.classList.add("hidden"));

  // Show selected page
  const targetPage = document.getElementById(`page-${page}`);
  if (targetPage) {
    targetPage.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Update Nav Active State
  document.querySelectorAll(".nav-link").forEach(link => {
    const target = link.getAttribute("data-target");
    if (target === page) {
      link.classList.add("text-blue-600", "dark:text-white", "font-bold");
      link.classList.remove("text-slate-600", "dark:text-zinc-400");
    } else {
      link.classList.remove("text-blue-600", "dark:text-white", "font-bold");
      link.classList.add("text-slate-600", "dark:text-zinc-400");
    }
  });

  // Specific triggers per page
  if (page === "catalog") {
    if (params.category) {
      filterCatalogByCategory(params.category);
    } else {
      renderCatalogGrid();
    }
  } else if (page === "home") {
    renderFeaturedGrid();
  } else if (page === "admin") {
    renderAdminPanel();
  } else if (page === "checkout") {
    renderCheckoutPage();
  }
}

function handleRoute() {
  const hash = window.location.hash.replace("#", "") || "home";
  
  if (hash === "admin") {
    if (!AppState.isAdminAuthenticated) {
      window.location.hash = "home";
      navigateTo("home");
      return;
    }
    navigateTo("admin");
  } else if (hash.startsWith("catalog")) {
    const params = new URLSearchParams(hash.split("?")[1]);
    const cat = params.get("cat") || "all";
    navigateTo("catalog", { category: cat });
  } else if (hash === "checkout") {
    if (!AppState.bookingDraft) {
      navigateTo("catalog");
    } else {
      navigateTo("checkout");
    }
  } else {
    navigateTo(hash);
  }
}

// --- RENDER ALL VIEWS ---
function renderAllViews() {
  renderFeaturedGrid();
  renderCatalogGrid();
  if (AppState.activePage === "admin" && AppState.isAdminAuthenticated) {
    renderAdminPanel();
  }
}

// --- DACHA CARD GENERATOR WITH SLIDER ---
function createDachaCardHTML(dacha, isFeatured = false) {
  const images = (dacha.images && dacha.images.length > 0) 
    ? dacha.images 
    : ["https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80"];

  const currentImgIndex = AppState.sliderIndexes[dacha.id] || 0;
  const activeImage = images[currentImgIndex] || images[0];
  const isBooked = dacha.isBooked === true;
  const daysLeft = dacha.bookedDaysRemaining || 1;

  // Star rating icons
  const starIcons = Array.from({ length: 5 }, (_, i) => {
    const filled = i < Math.floor(dacha.stars || 5);
    return `<svg class="w-4 h-4 ${filled ? 'text-amber-400' : 'text-slate-300 dark:text-zinc-600'} fill-current" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
    </svg>`;
  }).join("");

  // Category label localized
  const catKey = {
    villa: "catVillas",
    bolshiye: "catLarge",
    sredniye: "catMedium",
    malenkiye: "catSmall"
  }[dacha.category] || "catAll";

  // Dot indicators
  const dotsHTML = images.length > 1 ? `
    <div class="slider-dots">
      ${images.map((_, idx) => `
        <span class="slider-dot ${idx === currentImgIndex ? 'active' : ''}"></span>
      `).join("")}
    </div>
  ` : "";

  // Navigation buttons for slider
  const sliderBtnsHTML = images.length > 1 ? `
    <button class="slider-btn prev" onclick="event.stopPropagation(); changeCardImage('${dacha.id}', -1)" aria-label="Previous Image">
      &#10094;
    </button>
    <button class="slider-btn next" onclick="event.stopPropagation(); changeCardImage('${dacha.id}', 1)" aria-label="Next Image">
      &#10095;
    </button>
  ` : "";

  // Booking status badge
  let statusBadgeHTML = "";
  if (isBooked) {
    statusBadgeHTML = `
      <div class="badge-booked shadow-md">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
        </svg>
        <span>${t("bookedDaysLeft", { days: daysLeft })}</span>
      </div>
    `;
  } else {
    statusBadgeHTML = `
      <div class="badge-available shadow-md">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        <span>Свободна</span>
      </div>
    `;
  }

  return `
    <div class="dacha-card flex flex-col justify-between group">
      <div>
        <!-- Image Slider Box -->
        <div class="slider-container relative cursor-pointer" onclick="openDachaDetail('${dacha.id}')">
          <img src="${activeImage}" alt="${dacha.name}" class="slider-img" loading="lazy" />
          
          <div class="absolute top-3 left-3 z-10">
            <span class="bg-blue-600/90 dark:bg-white dark:text-black text-white text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
              ${t(catKey)}
            </span>
          </div>

          <div class="absolute top-3 right-3 z-10">
            ${statusBadgeHTML}
          </div>

          ${sliderBtnsHTML}
          ${dotsHTML}
        </div>

        <!-- Body Info -->
        <div class="p-5">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-1">
              ${starIcons}
              <span class="text-xs font-bold ml-1 text-slate-700 dark:text-zinc-300">
                ${(dacha.stars || 5).toFixed(1)}
              </span>
            </div>
            <div class="text-xs text-slate-500 dark:text-zinc-400 flex items-center gap-1">
              <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              <span>до ${dacha.maxGuests || 12} ${t("guests")}</span>
            </div>
          </div>

          <h3 class="text-lg font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            ${dacha.name}
          </h3>

          <!-- Location -->
          <div class="flex items-start gap-1.5 mt-2 text-xs text-slate-600 dark:text-zinc-400 line-clamp-1">
            <svg class="w-4 h-4 text-blue-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <span>${dacha.location || "Чарвак, Бостанлыкский район"}</span>
          </div>

          <p class="mt-3 text-xs text-slate-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
            ${dacha.description}
          </p>
        </div>
      </div>

      <!-- Footer & Action -->
      <div class="p-5 pt-0 border-t border-slate-100 dark:border-zinc-800/80 mt-2">
        <div class="flex items-center justify-between py-3">
          <div>
            <span class="text-xs text-slate-400 dark:text-zinc-500 block">${t("totalPrice")}</span>
            <div class="flex items-baseline gap-1">
              <span class="text-xl font-extrabold text-blue-600 dark:text-white">$${dacha.price}</span>
              <span class="text-xs text-slate-500 dark:text-zinc-400">/ ${t("perDay")}</span>
            </div>
          </div>

          <button 
            type="button"
            class="text-xs font-semibold text-blue-600 dark:text-zinc-300 hover:underline flex items-center gap-1"
            onclick="openDachaDetail('${dacha.id}')">
            <span>${t("detailsBtn")}</span>
            <span>&rarr;</span>
          </button>
        </div>

        <button 
          type="button"
          class="w-full btn-primary ${isBooked ? 'opacity-50 cursor-not-allowed bg-slate-300 dark:bg-zinc-700 text-slate-500' : ''}"
          ${isBooked ? 'disabled title="' + t("bookedBadge") + '"' : `onclick="initiateBooking('${dacha.id}')"`}>
          ${isBooked ? `
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
            <span>${t("bookedBadge")}</span>
          ` : `
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <span>${t("bookBtn")}</span>
          `}
        </button>
      </div>
    </div>
  `;
}

// Slider image index switcher
window.changeCardImage = function(dachaId, delta) {
  const dacha = AppState.dachas.find(d => d.id === dachaId);
  if (!dacha || !dacha.images || dacha.images.length <= 1) return;

  const current = AppState.sliderIndexes[dachaId] || 0;
  const len = dacha.images.length;
  AppState.sliderIndexes[dachaId] = (current + delta + len) % len;

  renderCatalogGrid();
  renderFeaturedGrid();
};

// --- RENDER CATALOG & FEATURED ---
function renderFeaturedGrid() {
  if (!elements.featuredGrid) return;
  const activeDachas = AppState.dachas.filter(d => !d.isDeleted).slice(0, 4);
  elements.featuredGrid.innerHTML = activeDachas.map(d => createDachaCardHTML(d, true)).join("");
}

function renderCatalogGrid() {
  if (!elements.catalogGrid) return;

  let filtered = AppState.dachas.filter(d => !d.isDeleted);
  if (AppState.activeCategory && AppState.activeCategory !== "all") {
    filtered = filtered.filter(d => d.category === AppState.activeCategory);
  }

  if (filtered.length === 0) {
    elements.catalogGrid.innerHTML = `
      <div class="col-span-full py-16 text-center text-slate-500 dark:text-zinc-400">
        <svg class="w-16 h-16 mx-auto mb-4 text-slate-400 dark:text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
        </svg>
        <p class="text-lg font-semibold">${t("emptyCatalog")}</p>
      </div>
    `;
    return;
  }

  elements.catalogGrid.innerHTML = filtered.map(d => createDachaCardHTML(d)).join("");
}

function filterCatalogByCategory(category) {
  AppState.activeCategory = category;
  
  // Update button active states in catalog header
  document.querySelectorAll(".cat-filter-btn").forEach(btn => {
    const cat = btn.getAttribute("data-category");
    if (cat === category) {
      btn.className = "cat-filter-btn px-4 py-2 rounded-xl text-sm font-semibold transition bg-blue-600 text-white dark:bg-white dark:text-black shadow-sm";
    } else {
      btn.className = "cat-filter-btn px-4 py-2 rounded-xl text-sm font-medium transition bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-300";
    }
  });

  renderCatalogGrid();
}

// --- AI ASSISTANT DACHA PICKER ---
window.runAIPicker = function() {
  const guests = parseInt(document.getElementById("aiGuestsInput")?.value || 10, 10);
  const location = document.getElementById("aiLocationInput")?.value || "";
  const maxBudget = parseInt(document.getElementById("aiBudgetInput")?.value || 1000, 10);
  const feature = document.getElementById("aiFeatureInput")?.value || "";

  const container = document.getElementById("aiResultsContainer");
  if (!container) return;

  container.innerHTML = `
    <div class="p-6 text-center">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent dark:border-white dark:border-t-transparent mb-2"></div>
      <p class="text-sm text-slate-600 dark:text-zinc-400">AI анализирует ваши предпочтения и подбирает идеальные варианты...</p>
    </div>
  `;
  container.classList.remove("hidden");

  setTimeout(() => {
    let matches = AppState.dachas.filter(d => !d.isDeleted);

    if (maxBudget) {
      matches = matches.filter(d => d.price <= maxBudget);
    }
    if (location) {
      matches = matches.filter(d => d.location.toLowerCase().includes(location.toLowerCase()));
    }
    if (guests) {
      matches = matches.filter(d => (d.maxGuests || 12) >= guests);
    }
    if (feature) {
      matches = matches.filter(d => 
        (d.features && d.features.some(f => f.toLowerCase().includes(feature.toLowerCase()))) ||
        d.description.toLowerCase().includes(feature.toLowerCase())
      );
    }

    if (matches.length === 0) {
      // Fallback to top available dachas if strict criteria yields none
      matches = AppState.dachas.filter(d => !d.isDeleted).slice(0, 2);
    }

    container.innerHTML = `
      <div class="mt-4 p-5 rounded-2xl border border-blue-200 dark:border-zinc-700 bg-blue-50/70 dark:bg-zinc-800/60">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <span class="p-2 rounded-xl bg-blue-600 text-white dark:bg-white dark:text-black">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </span>
            <h4 class="font-bold text-slate-900 dark:text-white">
              AI подобрал для вас лучшие варианты (${matches.length})
            </h4>
          </div>
          <button onclick="document.getElementById('aiResultsContainer').classList.add('hidden')" class="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-zinc-200">
            Закрыть ✕
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          ${matches.slice(0, 3).map(d => createDachaCardHTML(d)).join("")}
        </div>
      </div>
    `;
  }, 400);
};

window.resetAIPicker = function() {
  const container = document.getElementById("aiResultsContainer");
  if (container) container.classList.add("hidden");
  const budgetInput = document.getElementById("aiBudgetInput");
  if (budgetInput) budgetInput.value = "600";
  const budgetVal = document.getElementById("aiBudgetValue");
  if (budgetVal) budgetVal.textContent = "$600";
};

// --- DACHA DETAIL & REVIEWS MODAL ---
window.openDachaDetail = function(dachaId) {
  const dacha = AppState.dachas.find(d => d.id === dachaId);
  if (!dacha) return;

  const content = document.getElementById("dachaDetailContent");
  if (!content) return;

  const images = dacha.images || [];
  const comments = dacha.comments || [];

  content.innerHTML = `
    <div>
      <!-- Gallery -->
      <div class="relative rounded-xl overflow-hidden aspect-video bg-black mb-4">
        <img id="detailMainImg" src="${images[0]}" alt="${dacha.name}" class="w-full h-full object-cover"/>
      </div>
      
      <!-- Thumbnails -->
      ${images.length > 1 ? `
        <div class="flex gap-2 overflow-x-auto pb-2 mb-4">
          ${images.map((img, idx) => `
            <img 
              src="${img}" 
              onclick="document.getElementById('detailMainImg').src='${img}'"
              class="w-20 h-14 object-cover rounded-lg cursor-pointer border-2 hover:border-blue-500 transition border-transparent"
            />
          `).join("")}
        </div>
      ` : ""}

      <div class="flex items-start justify-between gap-4 mb-3">
        <div>
          <span class="text-xs uppercase tracking-wider font-semibold text-blue-600 dark:text-blue-400">
            ${t({ villa: "catVillas", bolshiye: "catLarge", sredniye: "catMedium", malenkiye: "catSmall" }[dacha.category] || "catAll")}
          </span>
          <h2 class="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">${dacha.name}</h2>
          <p class="text-sm text-slate-500 dark:text-zinc-400 flex items-center gap-1 mt-1">
            <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            </svg>
            ${dacha.location}
          </p>
        </div>
        <div class="text-right shrink-0">
          <div class="text-2xl font-extrabold text-blue-600 dark:text-white">$${dacha.price}</div>
          <div class="text-xs text-slate-400">${t("perDay")}</div>
        </div>
      </div>

      <div class="bg-slate-50 dark:bg-zinc-800/50 p-4 rounded-xl border border-slate-100 dark:border-zinc-800 mb-6">
        <h4 class="text-xs uppercase font-bold text-slate-400 dark:text-zinc-500 mb-2">Описание</h4>
        <p class="text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">${dacha.description}</p>
      </div>

      <!-- Features Chips -->
      ${dacha.features && dacha.features.length > 0 ? `
        <div class="mb-6">
          <h4 class="text-xs uppercase font-bold text-slate-400 dark:text-zinc-500 mb-2">Удобства и особенности</h4>
          <div class="flex flex-wrap gap-2">
            ${dacha.features.map(f => `
              <span class="text-xs px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-zinc-800 text-blue-700 dark:text-zinc-200 border border-blue-100 dark:border-zinc-700 font-medium">
                ✓ ${f}
              </span>
            `).join("")}
          </div>
        </div>
      ` : ""}

      <!-- Booking Action Box -->
      <div class="p-4 rounded-xl bg-blue-600 text-white dark:bg-zinc-800 mb-8 flex items-center justify-between">
        <div>
          <div class="font-bold text-base">Хотите забронировать этот дом?</div>
          <div class="text-xs text-blue-100 dark:text-zinc-400">
            ${dacha.isBooked ? t("bookedDaysLeft", { days: dacha.bookedDaysRemaining }) : "Доступен для бронирования прямо сейчас"}
          </div>
        </div>
        <button 
          class="btn-primary bg-white text-blue-600 hover:bg-slate-100 dark:bg-white dark:text-black ${dacha.isBooked ? 'opacity-50 cursor-not-allowed' : ''}"
          ${dacha.isBooked ? 'disabled' : `onclick="closeModal('dachaDetailModal'); initiateBooking('${dacha.id}')"`}>
          ${dacha.isBooked ? t("bookedBadge") : t("bookBtn")}
        </button>
      </div>

      <!-- Comments & Reviews Section -->
      <div class="border-t border-slate-200 dark:border-zinc-800 pt-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>${t("reviewsTitle")}</span>
            <span class="text-xs bg-slate-200 dark:bg-zinc-700 text-slate-700 dark:text-zinc-300 px-2 py-0.5 rounded-full">
              ${comments.length}
            </span>
          </h3>
        </div>

        <!-- Add Comment Form -->
        <form onsubmit="event.preventDefault(); submitComment('${dacha.id}');" class="mb-6 p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/40 border border-slate-200 dark:border-zinc-800">
          <h5 class="text-sm font-semibold text-slate-800 dark:text-zinc-200 mb-3">${t("leaveReview")}</h5>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <input 
              type="text" 
              id="commentAuthor" 
              placeholder="${t("yourName")}" 
              required
              value="${AppState.currentUser ? AppState.currentUser.name : ''}"
              class="w-full text-sm px-3 py-2 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div class="flex items-center gap-2">
              <span class="text-xs text-slate-500">${t("yourRating")}</span>
              <select id="commentRating" class="text-sm px-3 py-2 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white">
                <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                <option value="4">⭐⭐⭐⭐ (4/5)</option>
                <option value="3">⭐⭐⭐ (3/5)</option>
              </select>
            </div>
          </div>
          <textarea 
            id="commentText" 
            rows="3" 
            placeholder="${t("writeReviewPlaceholder")}" 
            required
            class="w-full text-sm p-3 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
          ></textarea>
          <button type="submit" class="btn-primary text-xs py-2 px-4">
            ${t("sendReview")}
          </button>
        </form>

        <!-- Existing Reviews List -->
        <div class="space-y-3">
          ${comments.length === 0 ? `
            <p class="text-xs text-slate-400 italic">Пока никто не оставил отзыв. Будьте первым!</p>
          ` : comments.map(c => `
            <div class="p-3 rounded-xl bg-slate-50 dark:bg-zinc-800/40 border border-slate-100 dark:border-zinc-800 text-sm">
              <div class="flex items-center justify-between mb-1">
                <div class="font-bold text-slate-900 dark:text-white">${c.author}</div>
                <div class="text-xs text-amber-500">★ ${c.rating || 5}</div>
              </div>
              <p class="text-xs text-slate-600 dark:text-zinc-300">${c.text}</p>
              <div class="text-[10px] text-slate-400 mt-2">${c.date || "Недавно"}</div>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `;

  openModal("dachaDetailModal");
};

window.submitComment = function(dachaId) {
  const dacha = AppState.dachas.find(d => d.id === dachaId);
  if (!dacha) return;

  const author = document.getElementById("commentAuthor")?.value.trim();
  const rating = parseInt(document.getElementById("commentRating")?.value || 5, 10);
  const text = document.getElementById("commentText")?.value.trim();

  if (!author || !text) return;

  if (!dacha.comments) dacha.comments = [];
  dacha.comments.unshift({
    id: "c_" + Date.now(),
    author,
    rating,
    text,
    date: new Date().toLocaleDateString("ru-RU")
  });

  saveDachas();
  openDachaDetail(dachaId);
};

// --- BOOKING PROCESS & DAY MULTIPLIER ---
window.initiateBooking = function(dachaId) {
  const dacha = AppState.dachas.find(d => d.id === dachaId);
  if (!dacha) return;

  // 1. Auth check: user MUST be logged in
  if (!AppState.currentUser) {
    alert(t("authRequiredForBooking"));
    openModal("authModal");
    return;
  }

  // 2. Already booked check
  if (dacha.isBooked) {
    alert(t("bookedDaysLeft", { days: dacha.bookedDaysRemaining || 1 }));
    return;
  }

  // 3. Prepare Booking Duration Modal
  setupBookingDaysModal(dacha);
  openModal("bookingModal");
};

let currentModalDacha = null;
let selectedDurationDays = 1;

function setupBookingDaysModal(dacha) {
  currentModalDacha = dacha;
  selectedDurationDays = 1;

  document.getElementById("bookingModalDachaName").textContent = dacha.name;
  document.getElementById("bookingModalBasePrice").textContent = `$${dacha.price}`;

  const pillsContainer = document.getElementById("bookingDaysPills");
  pillsContainer.innerHTML = "";

  // Render 1 to 7 days
  for (let d = 1; d <= 7; d++) {
    const cost = dacha.price * d;
    const pill = document.createElement("div");
    pill.className = `day-pill ${d === 1 ? 'selected' : ''}`;
    pill.dataset.days = d;
    pill.innerHTML = `
      <div class="text-sm font-bold">${d} ${d === 1 ? 'день' : d < 5 ? 'дня' : 'дней'}</div>
      <div class="text-xs text-blue-600 dark:text-zinc-300 font-semibold mt-0.5">$${cost}</div>
    `;
    pill.onclick = () => selectDayDuration(d, dacha.price);
    pillsContainer.appendChild(pill);
  }

  // Hide custom input initially
  const customWrapper = document.getElementById("customDaysInputWrapper");
  if (customWrapper) customWrapper.classList.add("hidden");

  updateModalTotal(1, dacha.price);
}

function selectDayDuration(days, pricePerDay) {
  selectedDurationDays = days;
  
  // Highlight pill
  document.querySelectorAll(".day-pill").forEach(p => {
    if (parseInt(p.dataset.days, 10) === days) {
      p.classList.add("selected");
    } else {
      p.classList.remove("selected");
    }
  });

  updateModalTotal(days, pricePerDay);
}

function updateModalTotal(days, pricePerDay) {
  const total = days * pricePerDay;
  const totalEl = document.getElementById("bookingModalTotalCalc");
  if (totalEl) {
    totalEl.innerHTML = `
      <span class="text-slate-500 dark:text-zinc-400 text-xs">${days} сут. × $${pricePerDay} = </span>
      <span class="text-2xl font-black text-blue-600 dark:text-white ml-2">$${total}</span>
    `;
  }
}

window.toggleCustomDaysInput = function() {
  const wrapper = document.getElementById("customDaysInputWrapper");
  if (!wrapper || !currentModalDacha) return;

  const isHidden = wrapper.classList.contains("hidden");
  if (isHidden) {
    wrapper.classList.remove("hidden");
    const input = document.getElementById("customDaysNumber");
    input.value = 8;
    input.focus();
    selectDayDuration(8, currentModalDacha.price);
  } else {
    wrapper.classList.add("hidden");
    selectDayDuration(1, currentModalDacha.price);
  }
};

window.handleCustomDaysChange = function(val) {
  let days = parseInt(val, 10);
  if (isNaN(days) || days < 1) days = 1;
  if (!currentModalDacha) return;

  // Deselect predefined 1-7 pills if days > 7
  document.querySelectorAll(".day-pill").forEach(p => p.classList.remove("selected"));

  selectedDurationDays = days;
  updateModalTotal(days, currentModalDacha.price);
};

window.proceedToCheckoutFromModal = function() {
  if (!currentModalDacha) return;

  AppState.bookingDraft = {
    dachaId: currentModalDacha.id,
    dachaName: currentModalDacha.name,
    dachaLocation: currentModalDacha.location,
    dachaImage: currentModalDacha.images && currentModalDacha.images[0],
    pricePerDay: currentModalDacha.price,
    days: selectedDurationDays,
    totalPrice: currentModalDacha.price * selectedDurationDays
  };

  closeModal("bookingModal");
  navigateTo("checkout");
};

// --- DEDICATED CHECKOUT PAGE (NOT IN NAVBAR) ---
function renderCheckoutPage() {
  const draft = AppState.bookingDraft;
  if (!draft) {
    navigateTo("catalog");
    return;
  }

  // Pre-fill user inputs if available
  const nameInput = document.getElementById("checkoutNameInput");
  const phoneInput = document.getElementById("checkoutPhoneInput");
  if (nameInput && AppState.currentUser) nameInput.value = AppState.currentUser.name || "";
  if (phoneInput && AppState.currentUser) phoneInput.value = AppState.currentUser.phone || "";

  // Populate preview
  document.getElementById("checkoutDachaName").textContent = draft.dachaName;
  document.getElementById("checkoutDachaLocation").textContent = draft.dachaLocation;
  document.getElementById("checkoutDachaDays").textContent = `${draft.days} сут.`;
  document.getElementById("checkoutDachaRate").textContent = `$${draft.pricePerDay} / день`;
  document.getElementById("checkoutTotalPrice").textContent = `$${draft.totalPrice}`;
  
  const imgEl = document.getElementById("checkoutDachaImg");
  if (imgEl && draft.dachaImage) imgEl.src = draft.dachaImage;
}

window.submitBookingOrder = function(event) {
  event.preventDefault();
  const draft = AppState.bookingDraft;
  if (!draft) return;

  const name = document.getElementById("checkoutNameInput")?.value.trim();
  const phone = document.getElementById("checkoutPhoneInput")?.value.trim();
  const notes = document.getElementById("checkoutNotesInput")?.value.trim() || "";

  if (!name || !phone) {
    alert("Пожалуйста, введите ваше имя и номер телефона!");
    return;
  }

  // 1. Create booking record for Admin Panel
  const newBooking = {
    id: "b_" + Date.now(),
    dachaId: draft.dachaId,
    dachaName: draft.dachaName,
    clientName: name,
    clientPhone: phone,
    days: draft.days,
    totalPrice: draft.totalPrice,
    notes: notes,
    createdAt: new Date().toLocaleString("ru-RU"),
    status: "active"
  };

  AppState.bookings.unshift(newBooking);
  saveBookings();

  // 2. Lock the dacha as booked & set remaining days
  const targetDacha = AppState.dachas.find(d => d.id === draft.dachaId);
  if (targetDacha) {
    targetDacha.isBooked = true;
    targetDacha.bookedDaysRemaining = draft.days;
    targetDacha.bookedBy = { name, phone };
    saveDachas();
  }

  // 3. Clear draft and show confirmation
  AppState.bookingDraft = null;
  renderCatalogGrid();
  renderFeaturedGrid();

  // Show Success Message Modal
  const successModal = document.getElementById("checkoutSuccessModal");
  if (successModal) {
    document.getElementById("successOrderId").textContent = newBooking.id;
    openModal("checkoutSuccessModal");
  } else {
    alert(t("checkoutSuccessTitle") + "\n" + t("checkoutSuccessText"));
    navigateTo("home");
  }
};

// --- AUTH SYSTEM (LOGIN / SIGNUP) ---
window.toggleAuthMode = function(mode) {
  const isLogin = mode === 'login';
  document.getElementById("authTitle").textContent = t(isLogin ? "authLoginTitle" : "authRegTitle");
  document.getElementById("authNameField").classList.toggle("hidden", isLogin);
  document.getElementById("authToggleText").innerHTML = isLogin 
    ? `<a href="javascript:void(0)" onclick="toggleAuthMode('register')" class="text-blue-600 dark:text-blue-400 hover:underline">${t("authNeedAccount")}</a>`
    : `<a href="javascript:void(0)" onclick="toggleAuthMode('login')" class="text-blue-600 dark:text-blue-400 hover:underline">${t("authHaveAccount")}</a>`;
  document.getElementById("authSubmitBtn").textContent = t(isLogin ? "authSubmitLogin" : "authSubmitReg");
  document.getElementById("authForm").dataset.mode = mode;
};

window.handleAuthSubmit = function(event) {
  event.preventDefault();
  const form = document.getElementById("authForm");
  const mode = form.dataset.mode || "login";
  const email = document.getElementById("authEmailInput").value.trim();
  const password = document.getElementById("authPasswordInput").value.trim();
  const name = document.getElementById("authNameInput").value.trim();

  if (mode === "register" && !name) {
    alert("Пожалуйста, введите ваше имя!");
    return;
  }

  const user = {
    name: mode === "register" ? name : (email.split("@")[0] || "Пользователь"),
    email: email,
    phone: email.includes("@") ? "+998 90 123 45 67" : email
  };

  AppState.currentUser = user;
  localStorage.setItem("dacha_user", JSON.stringify(user));
  renderNavigationUser();
  closeModal("authModal");
};

window.logoutUser = function() {
  AppState.currentUser = null;
  localStorage.removeItem("dacha_user");
  renderNavigationUser();
};

function renderNavigationUser() {
  if (!elements.navUserArea) return;

  if (AppState.currentUser) {
    elements.navUserArea.innerHTML = `
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm">
          ${AppState.currentUser.name.charAt(0)}
        </div>
        <span class="text-xs font-semibold hidden md:inline text-slate-800 dark:text-zinc-200">
          ${AppState.currentUser.name}
        </span>
        <button onclick="logoutUser()" class="text-xs text-red-500 hover:text-red-700 ml-1" title="${t("navLogout")}">
          ✕
        </button>
      </div>
    `;
  } else {
    elements.navUserArea.innerHTML = `
      <button onclick="openModal('authModal'); toggleAuthMode('login')" class="btn-primary text-xs py-2 px-3.5">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
        </svg>
        <span>${t("navLogin")}</span>
      </button>
    `;
  }
}

// --- ADMIN PANEL AUTHENTICATION & SECURITY ---
window.openAdminAuthModal = function() {
  if (AppState.isAdminAuthenticated) {
    navigateTo("admin");
  } else {
    openModal("adminAuthModal");
    const pwdInput = document.getElementById("adminPasswordInput");
    if (pwdInput) {
      pwdInput.value = "";
      setTimeout(() => pwdInput.focus(), 150);
    }
  }
};

window.checkAdminPassword = function(event) {
  event.preventDefault();
  const input = document.getElementById("adminPasswordInput")?.value;

  if (input === ADMIN_PASSWORD_HASH) {
    AppState.isAdminAuthenticated = true;
    sessionStorage.setItem("dacha_admin_auth", "true");
    closeModal("adminAuthModal");
    navigateTo("admin");
  } else {
    alert(t("adminWrongPassword"));
    const pwdInput = document.getElementById("adminPasswordInput");
    if (pwdInput) {
      pwdInput.value = "";
      pwdInput.focus();
    }
  }
};

window.logoutAdmin = function() {
  AppState.isAdminAuthenticated = false;
  sessionStorage.removeItem("dacha_admin_auth");
  navigateTo("home");
};

// --- ADMIN CRUD OPERATIONS ---
function renderAdminPanel() {
  renderAdminDachasList();
  renderAdminDeletedList();
  renderAdminBookingsList();
}

// Admin Tab 1: All Active Dachas
function renderAdminDachasList() {
  if (!elements.adminDachasList) return;
  const activeDachas = AppState.dachas.filter(d => !d.isDeleted);

  if (activeDachas.length === 0) {
    elements.adminDachasList.innerHTML = `
      <div class="col-span-full p-8 text-center text-slate-400">
        Нет активных дач. Добавьте новую во вкладке "Добавить дачу".
      </div>
    `;
    return;
  }

  elements.adminDachasList.innerHTML = activeDachas.map(d => `
    <div class="p-4 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm flex flex-col justify-between">
      <div>
        <div class="relative rounded-lg overflow-hidden aspect-video mb-3">
          <img src="${(d.images && d.images[0]) || ''}" alt="${d.name}" class="w-full h-full object-cover"/>
          <span class="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-600 text-white">
            ${d.category}
          </span>
          ${d.isBooked ? `
            <span class="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold bg-red-600 text-white">
              Забронирована (${d.bookedDaysRemaining} дн.)
            </span>
          ` : `
            <span class="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold bg-green-600 text-white">
              Свободна
            </span>
          `}
        </div>

        <h4 class="font-bold text-slate-900 dark:text-white text-base">${d.name}</h4>
        <div class="text-xs text-blue-600 dark:text-blue-400 font-extrabold mt-0.5">$${d.price} / сутки</div>
        <div class="text-xs text-slate-500 mt-1">${d.location}</div>
        <div class="text-xs text-slate-400 mt-1">Рейтинг: ⭐ ${d.stars || 5}</div>
      </div>

      <div class="mt-4 pt-3 border-t border-slate-100 dark:border-zinc-800 flex items-center gap-2">
        <button 
          onclick="openAdminEditModal('${d.id}')"
          class="flex-1 text-xs py-1.5 px-3 rounded-lg font-semibold bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 transition">
          ✏️ Изменить
        </button>
        <button 
          onclick="adminSoftDeleteDacha('${d.id}')"
          class="text-xs py-1.5 px-3 rounded-lg font-semibold bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-400 transition"
          title="${t("adminDeleteBtn")}">
          🗑️ Удалить
        </button>
      </div>
    </div>
  `).join("");
}

// Admin Tab 2: Add New Dacha
window.adminAddNewDacha = function(event) {
  event.preventDefault();

  const name = document.getElementById("addDachaName").value.trim();
  const price = parseFloat(document.getElementById("addDachaPrice").value) || 200;
  const category = document.getElementById("addDachaCategory").value;
  const stars = parseFloat(document.getElementById("addDachaStars").value) || 5;
  const location = document.getElementById("addDachaLocation").value.trim();
  const description = document.getElementById("addDachaDesc").value.trim();
  const imagesRaw = document.getElementById("addDachaImages").value.trim();

  // Split images by comma or newline
  const images = imagesRaw.split(/[\n,]+/).map(s => s.trim()).filter(Boolean);
  if (images.length === 0) {
    images.push("https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80");
  }

  const newDacha = {
    id: "dacha-" + Date.now(),
    name,
    price,
    category,
    stars,
    location,
    description,
    images,
    features: ["Wi-Fi", "Бассейн", "Мангал"],
    maxGuests: 12,
    isBooked: false,
    bookedDaysRemaining: 0,
    isDeleted: false,
    comments: []
  };

  AppState.dachas.unshift(newDacha);
  saveDachas();

  // Reset form
  document.getElementById("adminAddDachaForm").reset();
  alert("Дача успешно добавлена в каталог!");
  
  // Switch to All Dachas tab
  switchAdminTab('dachas');
};

// Admin Tab 3: Deleted Dachas (Trash) & Restore
function renderAdminDeletedList() {
  if (!elements.adminDeletedList) return;
  const deletedDachas = AppState.dachas.filter(d => d.isDeleted);

  if (deletedDachas.length === 0) {
    elements.adminDeletedList.innerHTML = `
      <div class="col-span-full p-8 text-center text-slate-400">
        ${t("emptyDeleted")}
      </div>
    `;
    return;
  }

  elements.adminDeletedList.innerHTML = deletedDachas.map(d => `
    <div class="p-4 rounded-xl border border-dashed border-red-200 dark:border-red-950 bg-red-50/20 dark:bg-zinc-900/50 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <img src="${(d.images && d.images[0]) || ''}" class="w-16 h-12 object-cover rounded-lg"/>
        <div>
          <h4 class="font-bold text-slate-900 dark:text-white text-sm">${d.name}</h4>
          <span class="text-xs text-slate-400">$${d.price} / день • ${d.category}</span>
        </div>
      </div>
      <button 
        onclick="adminRestoreDacha('${d.id}')"
        class="btn-primary text-xs py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white">
        ↩️ ${t("adminRestoreBtn")}
      </button>
    </div>
  `).join("");
}

window.adminSoftDeleteDacha = function(dachaId) {
  const dacha = AppState.dachas.find(d => d.id === dachaId);
  if (!dacha) return;

  if (confirm(`Вы уверены, что хотите удалить дачу "${dacha.name}"? Ее можно будет восстановить из корзины.`)) {
    dacha.isDeleted = true;
    saveDachas();
    renderAllViews();
  }
};

window.adminRestoreDacha = function(dachaId) {
  const dacha = AppState.dachas.find(d => d.id === dachaId);
  if (!dacha) return;

  dacha.isDeleted = false;
  saveDachas();
  renderAllViews();
};

// Admin Tab 4: Booked Dachas & Release
function renderAdminBookingsList() {
  if (!elements.adminBookingsList) return;
  const bookings = AppState.bookings;

  if (bookings.length === 0) {
    elements.adminBookingsList.innerHTML = `
      <div class="col-span-full p-8 text-center text-slate-400">
        ${t("emptyBookings")}
      </div>
    `;
    return;
  }

  elements.adminBookingsList.innerHTML = bookings.map(b => `
    <div class="p-4 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="text-xs px-2 py-0.5 rounded font-mono bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 font-bold">
            ${b.id}
          </span>
          <span class="text-xs text-slate-400">${b.createdAt}</span>
        </div>
        <h4 class="font-bold text-slate-900 dark:text-white text-base">${b.dachaName}</h4>
        <div class="text-xs text-slate-600 dark:text-zinc-300 mt-1">
          Клиент: <strong class="text-slate-900 dark:text-white">${b.clientName}</strong> (${b.clientPhone})
        </div>
        <div class="text-xs text-slate-500 mt-0.5">
          Срок: <strong>${b.days} суток</strong> • Сумма: <strong class="text-blue-600 dark:text-blue-400 font-extrabold">$${b.totalPrice}</strong>
        </div>
        ${b.notes ? `<div class="text-xs text-slate-400 mt-1 italic">Пожелания: "${b.notes}"</div>` : ''}
      </div>

      <div class="flex items-center gap-2">
        <button 
          onclick="adminReleaseDacha('${b.dachaId}', '${b.id}')"
          class="btn-primary text-xs py-2 px-3 bg-slate-800 dark:bg-white dark:text-black">
          🔓 ${t("adminReleaseBtn")}
        </button>
      </div>
    </div>
  `).join("");
}

window.adminReleaseDacha = function(dachaId, bookingId) {
  const dacha = AppState.dachas.find(d => d.id === dachaId);
  if (dacha) {
    dacha.isBooked = false;
    dacha.bookedDaysRemaining = 0;
    saveDachas();
  }

  AppState.bookings = AppState.bookings.filter(b => b.id !== bookingId);
  saveBookings();

  renderAllViews();
  alert("Дача успешно освобождена и снова доступна для бронирования!");
};

// Admin Edit Modal
window.openAdminEditModal = function(dachaId) {
  const dacha = AppState.dachas.find(d => d.id === dachaId);
  if (!dacha) return;

  AppState.editingDachaId = dachaId;

  document.getElementById("editDachaName").value = dacha.name || "";
  document.getElementById("editDachaPrice").value = dacha.price || 0;
  document.getElementById("editDachaCategory").value = dacha.category || "villa";
  document.getElementById("editDachaStars").value = dacha.stars || 5;
  document.getElementById("editDachaLocation").value = dacha.location || "";
  document.getElementById("editDachaDesc").value = dacha.description || "";
  document.getElementById("editDachaImages").value = (dacha.images || []).join("\n");

  openModal("adminEditModal");
};

window.adminSaveEditedDacha = function(event) {
  event.preventDefault();
  const dacha = AppState.dachas.find(d => d.id === AppState.editingDachaId);
  if (!dacha) return;

  dacha.name = document.getElementById("editDachaName").value.trim();
  dacha.price = parseFloat(document.getElementById("editDachaPrice").value) || dacha.price;
  dacha.category = document.getElementById("editDachaCategory").value;
  dacha.stars = parseFloat(document.getElementById("editDachaStars").value) || dacha.stars;
  dacha.location = document.getElementById("editDachaLocation").value.trim();
  dacha.description = document.getElementById("editDachaDesc").value.trim();

  const rawImgs = document.getElementById("editDachaImages").value.trim();
  const imgs = rawImgs.split(/[\n,]+/).map(s => s.trim()).filter(Boolean);
  if (imgs.length > 0) dacha.images = imgs;

  saveDachas();
  closeModal("adminEditModal");
  renderAllViews();
};

window.switchAdminTab = function(tabName) {
  document.querySelectorAll(".admin-tab-pane").forEach(p => p.classList.add("hidden"));
  document.querySelectorAll(".admin-nav-btn").forEach(b => {
    b.classList.remove("bg-blue-600", "text-white", "dark:bg-white", "dark:text-black");
    b.classList.add("text-slate-600", "dark:text-zinc-400");
  });

  const pane = document.getElementById(`admin-pane-${tabName}`);
  if (pane) pane.classList.remove("hidden");

  const btn = document.getElementById(`admin-btn-${tabName}`);
  if (btn) {
    btn.classList.add("bg-blue-600", "text-white", "dark:bg-white", "dark:text-black");
    btn.classList.remove("text-slate-600", "dark:text-zinc-400");
  }
};

// --- MODAL CONTROLS ---
window.openModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
};

window.closeModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
};

// --- EVENT LISTENERS SETUP ---
function setupEventListeners() {
  // Theme toggle
  if (elements.themeToggleBtn) {
    elements.themeToggleBtn.addEventListener("click", toggleTheme);
  }

  // Language change
  if (elements.langSelect) {
    elements.langSelect.addEventListener("change", (e) => setLanguage(e.target.value));
  }

  // Hash change
  window.addEventListener("hashchange", handleRoute);

  // Close modals on click outside content
  document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  });

  // AI Budget range slider listener
  const aiBudget = document.getElementById("aiBudgetInput");
  const aiBudgetValue = document.getElementById("aiBudgetValue");
  if (aiBudget && aiBudgetValue) {
    aiBudget.addEventListener("input", (e) => {
      aiBudgetValue.textContent = `$${e.target.value}`;
    });
  }
}

// Global exposure for template triggers
window.navigateTo = navigateTo;
window.filterCatalogByCategory = filterCatalogByCategory;

// Run App on Load
document.addEventListener("DOMContentLoaded", initApp);
