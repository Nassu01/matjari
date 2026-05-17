import { useEffect, useState } from "react";

export const languageOptions = [
  { value: "en", label: "English" },
  { value: "fr", label: "Français" },
  { value: "ar", label: "العربية" },
];

export const languageLabels = languageOptions.reduce((labels, language) => {
  labels[language.value] = language.label;
  return labels;
}, {});

export const translations = {
  en: {
    account: "Account",
    cart: "Cart",
    catalog: "Catalog",
    categories: "Categories",
    favorites: "Favorites",
    language: "Language",
    search: "Search",
    searchPlaceholder: "Search for a product...",
    shop: "Shop",
    shopCollection: "Shop Collection",
    learnMore: "Learn more",
    shopByCategory: "Shop by Category",
    categorySectionSubtitle: "Create custom title modules with accent icons and decorative text.",
    featuredCategories: "Featured Categories",
    featuredProducts: "Featured Products",
    featuredProductsSubtitle: "Create custom title modules with accent icons and decorative text.",
    productTabs: {
      newArrivals: "New Arrivals",
      bestsellers: "Bestsellers",
      sale: "SALE",
    },
    freeShipping: "FREE SHIPPING",
    freeShippingDesc: "On orders over $200",
    blogScript: "Blog",
    blogTitle: "Latest News",
    blogSubtitle: "Discover our tips, inspiration and news to help you choose products with confidence.",
    testimonialsScript: "Testimonials",
    testimonialsTitle: "What customers say",
    testimonialsSubtitle: "MATJARI is loved by customers for its smooth shopping experience, curated selection and reliable service.",
    aboutScript: "Journal",
    aboutTitle: "About us",
    aboutText:
      "Since 2013, Journal has been the best selling and most loved OpenCart theme on the market. Now at version 3, it brings many new and revolutionary features with modern modules and flexible layouts.",
    aboutReadMore: "Read more →",
    newsletterTitle: "Sign up now & get 15% Off",
    newsletterText: "Stay up to date with news and promotions by signing up for our newsletter",
    newsletterPlaceholder: "Enter email",
    newsletterButtonLabel: "Sign Up",
    newsletterNote: "By subscribing you agree to receive emails from us.",
    quickLinks: "Quick Links",
    followUs: "Follow us",
    cartSummary: "Cart summary",
    viewCart: "View cart",
    total: "Total",
    allProducts: "All products",
    myMakeupProducts: "My makeup products",
    apiProducts: "API products",
    searchProductsPlaceholder: "Search products by name...",
    clear: "Clear",
    productCount: "Product(s)",
    localProductsLabel: "local",
    apiLoadedLabel: "API loaded",
    showingLabel: "showing",
    noProductsFound: "No products found",
    policyLabel: "Privacy Policy",
    termsLabel: "Terms & Conditions",
    footerDescription: "Explore premium selections, local favorites, and a smooth shopping experience.",
    footerNewsletterTitle: "Subscribe for Updates",
    footerNewsletterText: "Receive the latest offers and product news straight to your inbox.",
    footerCopyright: "Copyright © 2024, Your Store, All Rights Reserved",
    heroSlides: [
      { label: "Local Collection", title: "Images From Folder 11" },
      { label: "Full Gallery", title: "Every File, One Storefront" },
      { label: "Fresh Source", title: "Browse the Complete Set" },
    ],
    promoHeadline: "Everything You Love, All in One Place",
    promoText: "Explore fashion, beauty, accessories, home essentials, and more in one elegant shopping experience.",
    promoShopCollection: "Shop Collection",
    promoLearnMore: "Learn more",
    fastShipping: "Fast Shipping",
    fastShippingDescription: "Delivered fast and securely right to your door.",
    secureShopping: "Secure Shopping",
    secureShoppingDescription: "Protecting your payments and personal information.",
    easyReturn: "Easy Return",
    easyReturnDescription: "Hassle-free returns and exchanges.",
    service24h: "24h Service",
    service24hDescription: "Support available around the clock.",
    testimonialPrevious: "Previous testimonial",
    testimonialNext: "Next testimonial",
    testimonialRating: "4.9/5",
    testimonialRatingLabel: "based on customer reviews",
    blogReadArticle: "Read article",
    newsletterSignup: "Sign Up",
    contactUs: "Contact Us",
    loginRequired: "Login required",
    loginPrompt: "You must log in or create an account to add this product to favorites.",
    loginButton: "Log in",
    registerButton: "Create account",
    close: "Close",
    topBrand: "Top Brand",
    addToCart: "Add to Cart",
    wishlist: "Wishlist",
    compare: "Compare",
  },
  fr: {
    account: "Compte",
    cart: "Panier",
    catalog: "Catalogue",
    categories: "Categories",
    favorites: "Favoris",
    language: "Langue",
    search: "Recherche",
    searchPlaceholder: "Rechercher un produit...",
    shop: "Boutique",
    shopCollection: "Voir la collection",
    learnMore: "En savoir plus",
    shopByCategory: "Acheter par catégorie",
    categorySectionSubtitle: "Créez des modules de titre personnalisés avec des icônes d'accentuation et du texte décoratif.",
    featuredCategories: "Catégories en vedette",
    featuredProducts: "Produits en vedette",
    featuredProductsSubtitle: "Créez des modules de titre personnalisés avec des icônes d'accentuation et du texte décoratif.",
    productTabs: {
      newArrivals: "Nouveautés",
      bestsellers: "Meilleures ventes",
      sale: "PROMO",
    },
    freeShipping: "LIVRAISON GRATUITE",
    freeShippingDesc: "Pour les commandes de plus de 200 $",
    blogScript: "Blog",
    blogTitle: "Dernières nouvelles",
    blogSubtitle: "Découvrez nos conseils, inspirations et nouveautés pour mieux choisir vos produits.",
    testimonialsScript: "Témoignages",
    testimonialsTitle: "Ce que disent nos clients",
    testimonialsSubtitle: "MATJARI est apprécié par ses clients pour son expérience d'achat simple, sa sélection de qualité et son service fiable.",
    aboutScript: "Journal",
    aboutTitle: "À propos de nous",
    aboutText:
      "Depuis 2013, Journal est le thème OpenCart le plus vendu et le plus apprécié du marché. Maintenant à la version 3, il offre de nouvelles fonctionnalités révolutionnaires avec des modules modernes et des mises en page flexibles.",
    aboutReadMore: "Lire la suite →",
    newsletterTitle: "Inscrivez-vous maintenant et obtenez 15% de réduction",
    newsletterText: "Restez à jour avec les actualités et les promotions en vous inscrivant à notre newsletter",
    newsletterPlaceholder: "Entrez votre e-mail",
    newsletterButtonLabel: "S'inscrire",
    newsletterNote: "En vous abonnant, vous acceptez de recevoir des e-mails de notre part.",
    quickLinks: "Liens rapides",
    followUs: "Suivez-nous",
    cartSummary: "Résumé du panier",
    viewCart: "Voir le panier",
    total: "Total",
    allProducts: "Tous les produits",
    myMakeupProducts: "Mes produits de maquillage",
    apiProducts: "Produits API",
    searchProductsPlaceholder: "Recherchez des produits par nom...",
    clear: "Effacer",
    productCount: "Produit(s)",
    localProductsLabel: "local",
    apiLoadedLabel: "API chargé",
    showingLabel: "affichage",
    noProductsFound: "Aucun produit trouvé",
    policyLabel: "Politique de confidentialité",
    termsLabel: "Conditions générales",
    footerDescription: "Explorez une sélection premium, des favoris locaux et une expérience d'achat fluide.",
    footerNewsletterTitle: "Abonnez-vous pour des mises à jour",
    footerNewsletterText: "Recevez les dernières offres et actualités produits directement dans votre boîte de réception.",
    footerCopyright: "Copyright © 2024, Votre boutique, Tous droits réservés",
    heroSlides: [
      { label: "Collection locale", title: "Images du dossier 11" },
      { label: "Galerie complète", title: "Tous les fichiers, une seule vitrine" },
      { label: "Source fraîche", title: "Parcourez l'ensemble complet" },
    ],
    promoHeadline: "Tout ce que vous aimez, au même endroit",
    promoText:
      "Explorez la mode, la beauté, les accessoires, les essentiels pour la maison et bien plus encore dans une expérience de shopping élégante.",
    promoShopCollection: "Voir la collection",
    promoLearnMore: "En savoir plus",
    fastShipping: "Livraison rapide",
    fastShippingDescription: "Livraison rapide et sécurisée à votre porte.",
    secureShopping: "Achat sécurisé",
    secureShoppingDescription: "Protection de vos paiements et de vos informations personnelles.",
    easyReturn: "Retour facile",
    easyReturnDescription: "Retours et échanges sans tracas.",
    service24h: "Service 24h",
    service24hDescription: "Assistance disponible à toute heure.",
    testimonialPrevious: "Témoignage précédent",
    testimonialNext: "Témoignage suivant",
    testimonialRating: "4.9/5",
    testimonialRatingLabel: "basé sur les avis clients",
    blogReadArticle: "Lire l'article",
    newsletterSignup: "S'inscrire",
    contactUs: "Contactez-nous",
    loginRequired: "Connexion requise",
    loginPrompt: "Vous devez vous connecter ou créer un compte pour ajouter ce produit aux favoris.",
    loginButton: "Se connecter",
    registerButton: "Créer un compte",
    close: "Fermer",
    topBrand: "Marque de premier plan",
    addToCart: "Ajouter au panier",
    wishlist: "Liste de souhaits",
    compare: "Comparer",
  },
  ar: {
    account: "الحساب",
    cart: "السلة",
    catalog: "الكتالوج",
    categories: "الأقسام",
    favorites: "المفضلة",
    language: "اللغة",
    search: "بحث",
    searchPlaceholder: "ابحث عن منتج...",
    shop: "المتجر",
    shopCollection: "تسوق المجموعة",
    learnMore: "اعرف المزيد",
    shopByCategory: "تسوق حسب الفئة",
    categorySectionSubtitle: "أنشئ وحدات عنوان مخصصة مع أيقونات مميزة ونص زخرفي.",
    featuredCategories: "الفئات المميزة",
    featuredProducts: "المنتجات المميزة",
    featuredProductsSubtitle: "أنشئ وحدات عنوان مخصصة مع أيقونات مميزة ونص زخرفي.",
    productTabs: {
      newArrivals: "الوافدون الجدد",
      bestsellers: "الأكثر مبيعاً",
      sale: "تخفيضات",
    },
    freeShipping: "شحن مجاني",
    freeShippingDesc: "على الطلبات التي تزيد عن 200 دولار",
    blogScript: "المدونة",
    blogTitle: "أحدث المقالات",
    blogSubtitle: "اكتشف نصائحنا وإلهامنا وأخبارنا لمساعدتك على اختيار المنتجات بثقة.",
    testimonialsScript: "آراء العملاء",
    testimonialsTitle: "ماذا يقول العملاء",
    testimonialsSubtitle: "يحب العملاء MATJARI لتجربة التسوق السلسة والاختيار المنسق والخدمة الموثوقة.",
    aboutScript: "مجلة",
    aboutTitle: "من نحن",
    aboutText:
      "منذ 2013، كانت Journal القالب الأكثر مبيعًا والأكثر حبًا في السوق. الآن في الإصدار 3، يقدم ميزات جديدة وثورية مع وحدات حديثة وتصميمات مرنة.",
    aboutReadMore: "اقرأ المزيد →",
    newsletterTitle: "اشترك الآن واحصل على خصم 15%",
    newsletterText: "ابقَ على اطلاع بالأخبار والعروض من خلال الاشتراك في النشرة الإخبارية",
    newsletterPlaceholder: "أدخل البريد الإلكتروني",
    newsletterButtonLabel: "اشترك",
    newsletterNote: "باشتراكك، فإنك توافق على تلقي رسائل البريد الإلكتروني منا.",
    quickLinks: "روابط سريعة",
    followUs: "تابعنا",
    cartSummary: "ملخص السلة",
    viewCart: "عرض السلة",
    total: "الإجمالي",
    allProducts: "جميع المنتجات",
    myMakeupProducts: "منتجاتي التجميلية",
    apiProducts: "منتجات API",
    searchProductsPlaceholder: "ابحث عن منتج بالاسم...",
    clear: "مسح",
    productCount: "منتج(ات)",
    localProductsLabel: "محلي",
    apiLoadedLabel: "API تم تحميله",
    showingLabel: "يعرض",
    noProductsFound: "لم يتم العثور على منتجات",
    policyLabel: "سياسة الخصوصية",
    termsLabel: "الشروط والأحكام",
    footerDescription: "استكشف مجموعة مميزة، تفضيلات محلية، وتجربة تسوق سلسة.",
    footerNewsletterTitle: "اشترك للحصول على التحديثات",
    footerNewsletterText: "احصل على أحدث العروض وأخبار المنتجات مباشرة في بريدك.",
    footerCopyright: "حقوق النشر © 2024، متجركم، جميع الحقوق محفوظة",
    heroSlides: [
      { label: "مجموعة محلية", title: "صور من المجلد 11" },
      { label: "معرض كامل", title: "كل ملف، واجهة متجر واحدة" },
      { label: "مصدر جديد", title: "تصفح المجموعة الكاملة" },
    ],
    promoHeadline: "كل ما تحبه في مكان واحد",
    promoText: "اكتشف الموضة والجمال والإكسسوارات ومستلزمات المنزل والمزيد ضمن تجربة تسوق أنيقة.",
    promoShopCollection: "تسوق المجموعة",
    promoLearnMore: "اعرف المزيد",
    fastShipping: "شحن سريع",
    fastShippingDescription: "توصيل سريع وآمن حتى بابك.",
    secureShopping: "تسوق آمن",
    secureShoppingDescription: "حماية مدفوعاتك ومعلوماتك الشخصية.",
    easyReturn: "إرجاع سهل",
    easyReturnDescription: "عمليات إرجاع وتبديل بدون عناء.",
    service24h: "خدمة 24 ساعة",
    service24hDescription: "الدعم متاح في أي وقت.",
    testimonialPrevious: "التعليق السابق",
    testimonialNext: "التعليق التالي",
    testimonialRating: "4.9/5",
    testimonialRatingLabel: "بناءً على تقييمات العملاء",
    blogReadArticle: "اقرأ المقال",
    newsletterSignup: "اشترك",
    contactUs: "اتصل بنا",
    loginRequired: "تسجيل الدخول مطلوب",
    loginPrompt: "يجب عليك تسجيل الدخول أو إنشاء حساب لإضافة هذا المنتج إلى المفضلة.",
    loginButton: "تسجيل الدخول",
    registerButton: "إنشاء حساب",
    close: "إغلاق",
    topBrand: "أفضل العلامات التجارية",
    addToCart: "أضف إلى السلة",
    wishlist: "قائمة الرغبات",
    compare: "مقارنة",
  },
};

const storageKey = "matjari-language";
const languageEvent = "matjari-language-change";
const validLanguages = languageOptions.map((language) => language.value);

function getInitialLanguage() {
  if (typeof window === "undefined") {
    return "en";
  }

  const storedLanguage = window.localStorage.getItem("language") || window.localStorage.getItem(storageKey);

  return validLanguages.includes(storedLanguage) ? storedLanguage : "en";
}

function applyLanguageDirection(language) {
  if (typeof document === "undefined") return;

  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
}

export function useStorefrontLanguage() {
  const [currentLanguage, setCurrentLanguageState] = useState(getInitialLanguage);

  useEffect(() => {
    applyLanguageDirection(currentLanguage);
  }, [currentLanguage]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const syncLanguage = (event) => {
      const nextLanguage =
        event.detail?.language || window.localStorage.getItem("language") || window.localStorage.getItem(storageKey);

      if (validLanguages.includes(nextLanguage)) {
        setCurrentLanguageState(nextLanguage);
      }
    };

    const syncStorage = (event) => {
      if ((event.key === storageKey || event.key === "language") && validLanguages.includes(event.newValue)) {
        setCurrentLanguageState(event.newValue);
      }
    };

    window.addEventListener(languageEvent, syncLanguage);
    window.addEventListener("storage", syncStorage);

    return () => {
      window.removeEventListener(languageEvent, syncLanguage);
      window.removeEventListener("storage", syncStorage);
    };
  }, []);

  const setCurrentLanguage = (language) => {
    if (!validLanguages.includes(language)) return;

    setCurrentLanguageState(language);

    if (typeof window !== "undefined") {
      window.localStorage.setItem("language", language);
      window.localStorage.setItem(storageKey, language);
      window.dispatchEvent(new CustomEvent(languageEvent, { detail: { language } }));
    }
  };

  return {
    currentLanguage,
    direction: currentLanguage === "ar" ? "rtl" : "ltr",
    languageLabel: languageLabels[currentLanguage] || languageLabels.en,
    setCurrentLanguage,
    t: translations[currentLanguage] || translations.en,
  };
}
