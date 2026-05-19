import{r as p,g as B,j as r,L as A,d as Me,a as Ae}from"./client-BfrtrBW3.js";import{a as Ee}from"./react-redux-wv76eOtH.js";import{u as Te,g as Fe,i as Re}from"./useImages11-4G7x0L8k.js";import{b as Ie,g as De}from"./CartSlice-0MZo1hEw.js";const N={auth:{isAuthenticated:!1,isVerified:!1,user:null},settings:{siteName:"Matjari",navbar:{logoPath:"",homeLabel:"HOME",categoryLabel:"CATEGORY",searchPlaceholder:"Search products...",links:[{label:"Telephone & Tablet",url:"/shop"},{label:"TV & High Tech",url:"/shop"},{label:"Computing",url:"/shop"},{label:"Home & Kitchen",url:"/shop"}]},hero:{title:"Welcome to Ecomerce",description:"Discover our best products",slides:[]},promo:{badge:"Festive Capsule",title:"Merry Shopping",description:"Discover bold essentials, statement accessories, and fresh arrivals curated to feel premium, warm, and gift-ready.",buttonLabel:"Explore Collection",buttonUrl:"/shop"},footer:{description:"Your one-stop destination for daily essentials, curated accessories, and a clean shopping experience.",quickLinks:[{label:"Home",url:"/"},{label:"Shop",url:"/shop"},{label:"Favorite",url:"/account/favorites"},{label:"Cart",url:"/cart"}],socialLinks:[{label:"Facebook",url:"#",icon:"f"},{label:"Twitter",url:"#",icon:"x"},{label:"GitHub",url:"#",icon:"g"},{label:"LinkedIn",url:"#",icon:"in"}],newsletterTitle:"Newsletter",newsletterText:"Get updates and special offers in your inbox.",newsletterPlaceholder:"Enter your email",newsletterButtonLabel:"Subscribe",copyright:"All rights reserved.",policyLabel:"Privacy Policy",termsLabel:"Terms & Conditions"}},categories:[],products:[],blogPosts:[],catalogMenu:[]};let E=null,O=null;async function Oe(){return E||(O||(O=fetch("/api/storefront",{headers:{Accept:"application/json"}}).then(async e=>{if(!e.ok)throw new Error(`Storefront request failed with status ${e.status}`);return e.json()}).then(e=>(E={...N,...e,settings:{...N.settings,...e.settings||{},navbar:{...N.settings.navbar,...e.settings?.navbar||{}},hero:{...N.settings.hero,...e.settings?.hero||{}},promo:{...N.settings.promo,...e.settings?.promo||{}},footer:{...N.settings.footer,...e.settings?.footer||{}}},auth:{...N.auth,...e.auth||{}},categories:Array.isArray(e.categories)?e.categories:[],products:Array.isArray(e.products)?e.products:[],blogPosts:Array.isArray(e.blogPosts)?e.blogPosts:[],catalogMenu:Array.isArray(e.catalogMenu)?e.catalogMenu:[]},E)).finally(()=>{O=null})),O)}function I(){const[e,t]=p.useState(E||N),[a,o]=p.useState(!E),[n,l]=p.useState(null);return p.useEffect(()=>{let i=!0;return Oe().then(g=>{i&&(t(g),l(null))}).catch(g=>{i&&l(g)}).finally(()=>{i&&o(!1)}),()=>{i=!1}},[]),{...e,loading:a,error:n}}const K=[{value:"en",label:"English"},{value:"fr",label:"Français"},{value:"ar",label:"العربية"}],le=K.reduce((e,t)=>(e[t.value]=t.label,e),{}),se={en:{account:"Account",cart:"Cart",catalog:"Catalog",categories:"Categories",favorites:"Favorites",language:"Language",search:"Search",searchPlaceholder:"Search for a product...",shop:"Shop",shopCollection:"Shop Collection",learnMore:"Learn more",shopByCategory:"Shop by Category",categorySectionSubtitle:"Create custom title modules with accent icons and decorative text.",featuredCategories:"Featured Categories",featuredProducts:"Featured Products",featuredProductsSubtitle:"Create custom title modules with accent icons and decorative text.",productTabs:{newArrivals:"New Arrivals",bestsellers:"Bestsellers",sale:"SALE"},freeShipping:"FREE SHIPPING",freeShippingDesc:"On orders over $200",blogScript:"Blog",blogTitle:"Latest News",blogSubtitle:"Discover our tips, inspiration and news to help you choose products with confidence.",testimonialsScript:"Testimonials",testimonialsTitle:"What customers say",testimonialsSubtitle:"MATJARI is loved by customers for its smooth shopping experience, curated selection and reliable service.",aboutScript:"Journal",aboutTitle:"About us",aboutText:"Since 2013, Journal has been the best selling and most loved OpenCart theme on the market. Now at version 3, it brings many new and revolutionary features with modern modules and flexible layouts.",aboutReadMore:"Read more →",newsletterTitle:"Sign up now & get 15% Off",newsletterText:"Stay up to date with news and promotions by signing up for our newsletter",newsletterPlaceholder:"Enter email",newsletterButtonLabel:"Sign Up",newsletterNote:"By subscribing you agree to receive emails from us.",quickLinks:"Quick Links",followUs:"Follow us",cartSummary:"Cart summary",viewCart:"View cart",total:"Total",allProducts:"All products",myMakeupProducts:"My makeup products",apiProducts:"API products",searchProductsPlaceholder:"Search products by name...",clear:"Clear",productCount:"Product(s)",localProductsLabel:"local",apiLoadedLabel:"API loaded",showingLabel:"showing",noProductsFound:"No products found",policyLabel:"Privacy Policy",termsLabel:"Terms & Conditions",footerDescription:"Explore premium selections, local favorites, and a smooth shopping experience.",footerNewsletterTitle:"Subscribe for Updates",footerNewsletterText:"Receive the latest offers and product news straight to your inbox.",footerCopyright:"Copyright © 2024, Your Store, All Rights Reserved",heroSlides:[{label:"Local Collection",title:"Images From Folder 11"},{label:"Full Gallery",title:"Every File, One Storefront"},{label:"Fresh Source",title:"Browse the Complete Set"}],promoHeadline:"Everything You Love, All in One Place",promoText:"Explore fashion, beauty, accessories, home essentials, and more in one elegant shopping experience.",promoShopCollection:"Shop Collection",promoLearnMore:"Learn more",fastShipping:"Fast Shipping",fastShippingDescription:"Delivered fast and securely right to your door.",secureShopping:"Secure Shopping",secureShoppingDescription:"Protecting your payments and personal information.",easyReturn:"Easy Return",easyReturnDescription:"Hassle-free returns and exchanges.",service24h:"24h Service",service24hDescription:"Support available around the clock.",testimonialPrevious:"Previous testimonial",testimonialNext:"Next testimonial",testimonialRating:"4.9/5",testimonialRatingLabel:"based on customer reviews",blogReadArticle:"Read article",newsletterSignup:"Sign Up",contactUs:"Contact Us",loginRequired:"Login required",loginPrompt:"You must log in or create an account to add this product to favorites.",loginButton:"Log in",registerButton:"Create account",close:"Close",topBrand:"Top Brand",addToCart:"Add to Cart",wishlist:"Wishlist",compare:"Compare"},fr:{account:"Compte",cart:"Panier",catalog:"Catalogue",categories:"Categories",favorites:"Favoris",language:"Langue",search:"Recherche",searchPlaceholder:"Rechercher un produit...",shop:"Boutique",shopCollection:"Voir la collection",learnMore:"En savoir plus",shopByCategory:"Acheter par catégorie",categorySectionSubtitle:"Créez des modules de titre personnalisés avec des icônes d'accentuation et du texte décoratif.",featuredCategories:"Catégories en vedette",featuredProducts:"Produits en vedette",featuredProductsSubtitle:"Créez des modules de titre personnalisés avec des icônes d'accentuation et du texte décoratif.",productTabs:{newArrivals:"Nouveautés",bestsellers:"Meilleures ventes",sale:"PROMO"},freeShipping:"LIVRAISON GRATUITE",freeShippingDesc:"Pour les commandes de plus de 200 $",blogScript:"Blog",blogTitle:"Dernières nouvelles",blogSubtitle:"Découvrez nos conseils, inspirations et nouveautés pour mieux choisir vos produits.",testimonialsScript:"Témoignages",testimonialsTitle:"Ce que disent nos clients",testimonialsSubtitle:"MATJARI est apprécié par ses clients pour son expérience d'achat simple, sa sélection de qualité et son service fiable.",aboutScript:"Journal",aboutTitle:"À propos de nous",aboutText:"Depuis 2013, Journal est le thème OpenCart le plus vendu et le plus apprécié du marché. Maintenant à la version 3, il offre de nouvelles fonctionnalités révolutionnaires avec des modules modernes et des mises en page flexibles.",aboutReadMore:"Lire la suite →",newsletterTitle:"Inscrivez-vous maintenant et obtenez 15% de réduction",newsletterText:"Restez à jour avec les actualités et les promotions en vous inscrivant à notre newsletter",newsletterPlaceholder:"Entrez votre e-mail",newsletterButtonLabel:"S'inscrire",newsletterNote:"En vous abonnant, vous acceptez de recevoir des e-mails de notre part.",quickLinks:"Liens rapides",followUs:"Suivez-nous",cartSummary:"Résumé du panier",viewCart:"Voir le panier",total:"Total",allProducts:"Tous les produits",myMakeupProducts:"Mes produits de maquillage",apiProducts:"Produits API",searchProductsPlaceholder:"Recherchez des produits par nom...",clear:"Effacer",productCount:"Produit(s)",localProductsLabel:"local",apiLoadedLabel:"API chargé",showingLabel:"affichage",noProductsFound:"Aucun produit trouvé",policyLabel:"Politique de confidentialité",termsLabel:"Conditions générales",footerDescription:"Explorez une sélection premium, des favoris locaux et une expérience d'achat fluide.",footerNewsletterTitle:"Abonnez-vous pour des mises à jour",footerNewsletterText:"Recevez les dernières offres et actualités produits directement dans votre boîte de réception.",footerCopyright:"Copyright © 2024, Votre boutique, Tous droits réservés",heroSlides:[{label:"Collection locale",title:"Images du dossier 11"},{label:"Galerie complète",title:"Tous les fichiers, une seule vitrine"},{label:"Source fraîche",title:"Parcourez l'ensemble complet"}],promoHeadline:"Tout ce que vous aimez, au même endroit",promoText:"Explorez la mode, la beauté, les accessoires, les essentiels pour la maison et bien plus encore dans une expérience de shopping élégante.",promoShopCollection:"Voir la collection",promoLearnMore:"En savoir plus",fastShipping:"Livraison rapide",fastShippingDescription:"Livraison rapide et sécurisée à votre porte.",secureShopping:"Achat sécurisé",secureShoppingDescription:"Protection de vos paiements et de vos informations personnelles.",easyReturn:"Retour facile",easyReturnDescription:"Retours et échanges sans tracas.",service24h:"Service 24h",service24hDescription:"Assistance disponible à toute heure.",testimonialPrevious:"Témoignage précédent",testimonialNext:"Témoignage suivant",testimonialRating:"4.9/5",testimonialRatingLabel:"basé sur les avis clients",blogReadArticle:"Lire l'article",newsletterSignup:"S'inscrire",contactUs:"Contactez-nous",loginRequired:"Connexion requise",loginPrompt:"Vous devez vous connecter ou créer un compte pour ajouter ce produit aux favoris.",loginButton:"Se connecter",registerButton:"Créer un compte",close:"Fermer",topBrand:"Marque de premier plan",addToCart:"Ajouter au panier",wishlist:"Liste de souhaits",compare:"Comparer"},ar:{account:"الحساب",cart:"السلة",catalog:"الكتالوج",categories:"الأقسام",favorites:"المفضلة",language:"اللغة",search:"بحث",searchPlaceholder:"ابحث عن منتج...",shop:"المتجر",shopCollection:"تسوق المجموعة",learnMore:"اعرف المزيد",shopByCategory:"تسوق حسب الفئة",categorySectionSubtitle:"أنشئ وحدات عنوان مخصصة مع أيقونات مميزة ونص زخرفي.",featuredCategories:"الفئات المميزة",featuredProducts:"المنتجات المميزة",featuredProductsSubtitle:"أنشئ وحدات عنوان مخصصة مع أيقونات مميزة ونص زخرفي.",productTabs:{newArrivals:"الوافدون الجدد",bestsellers:"الأكثر مبيعاً",sale:"تخفيضات"},freeShipping:"شحن مجاني",freeShippingDesc:"على الطلبات التي تزيد عن 200 دولار",blogScript:"المدونة",blogTitle:"أحدث المقالات",blogSubtitle:"اكتشف نصائحنا وإلهامنا وأخبارنا لمساعدتك على اختيار المنتجات بثقة.",testimonialsScript:"آراء العملاء",testimonialsTitle:"ماذا يقول العملاء",testimonialsSubtitle:"يحب العملاء MATJARI لتجربة التسوق السلسة والاختيار المنسق والخدمة الموثوقة.",aboutScript:"مجلة",aboutTitle:"من نحن",aboutText:"منذ 2013، كانت Journal القالب الأكثر مبيعًا والأكثر حبًا في السوق. الآن في الإصدار 3، يقدم ميزات جديدة وثورية مع وحدات حديثة وتصميمات مرنة.",aboutReadMore:"اقرأ المزيد →",newsletterTitle:"اشترك الآن واحصل على خصم 15%",newsletterText:"ابقَ على اطلاع بالأخبار والعروض من خلال الاشتراك في النشرة الإخبارية",newsletterPlaceholder:"أدخل البريد الإلكتروني",newsletterButtonLabel:"اشترك",newsletterNote:"باشتراكك، فإنك توافق على تلقي رسائل البريد الإلكتروني منا.",quickLinks:"روابط سريعة",followUs:"تابعنا",cartSummary:"ملخص السلة",viewCart:"عرض السلة",total:"الإجمالي",allProducts:"جميع المنتجات",myMakeupProducts:"منتجاتي التجميلية",apiProducts:"منتجات API",searchProductsPlaceholder:"ابحث عن منتج بالاسم...",clear:"مسح",productCount:"منتج(ات)",localProductsLabel:"محلي",apiLoadedLabel:"API تم تحميله",showingLabel:"يعرض",noProductsFound:"لم يتم العثور على منتجات",policyLabel:"سياسة الخصوصية",termsLabel:"الشروط والأحكام",footerDescription:"استكشف مجموعة مميزة، تفضيلات محلية، وتجربة تسوق سلسة.",footerNewsletterTitle:"اشترك للحصول على التحديثات",footerNewsletterText:"احصل على أحدث العروض وأخبار المنتجات مباشرة في بريدك.",footerCopyright:"حقوق النشر © 2024، متجركم، جميع الحقوق محفوظة",heroSlides:[{label:"مجموعة محلية",title:"صور من المجلد 11"},{label:"معرض كامل",title:"كل ملف، واجهة متجر واحدة"},{label:"مصدر جديد",title:"تصفح المجموعة الكاملة"}],promoHeadline:"كل ما تحبه في مكان واحد",promoText:"اكتشف الموضة والجمال والإكسسوارات ومستلزمات المنزل والمزيد ضمن تجربة تسوق أنيقة.",promoShopCollection:"تسوق المجموعة",promoLearnMore:"اعرف المزيد",fastShipping:"شحن سريع",fastShippingDescription:"توصيل سريع وآمن حتى بابك.",secureShopping:"تسوق آمن",secureShoppingDescription:"حماية مدفوعاتك ومعلوماتك الشخصية.",easyReturn:"إرجاع سهل",easyReturnDescription:"عمليات إرجاع وتبديل بدون عناء.",service24h:"خدمة 24 ساعة",service24hDescription:"الدعم متاح في أي وقت.",testimonialPrevious:"التعليق السابق",testimonialNext:"التعليق التالي",testimonialRating:"4.9/5",testimonialRatingLabel:"بناءً على تقييمات العملاء",blogReadArticle:"اقرأ المقال",newsletterSignup:"اشترك",contactUs:"اتصل بنا",loginRequired:"تسجيل الدخول مطلوب",loginPrompt:"يجب عليك تسجيل الدخول أو إنشاء حساب لإضافة هذا المنتج إلى المفضلة.",loginButton:"تسجيل الدخول",registerButton:"إنشاء حساب",close:"إغلاق",topBrand:"أفضل العلامات التجارية",addToCart:"أضف إلى السلة",wishlist:"قائمة الرغبات",compare:"مقارنة"}},H="matjari-language",G="matjari-language-change",W=K.map(e=>e.value);function He(){if(typeof window>"u")return"en";const e=window.localStorage.getItem("language")||window.localStorage.getItem(H);return W.includes(e)?e:"en"}function We(e){typeof document>"u"||(document.documentElement.lang=e,document.documentElement.dir=e==="ar"?"rtl":"ltr")}function S(){const[e,t]=p.useState(He);p.useEffect(()=>{We(e)},[e]),p.useEffect(()=>{if(typeof window>"u")return;const o=l=>{const i=l.detail?.language||window.localStorage.getItem("language")||window.localStorage.getItem(H);W.includes(i)&&t(i)},n=l=>{(l.key===H||l.key==="language")&&W.includes(l.newValue)&&t(l.newValue)};return window.addEventListener(G,o),window.addEventListener("storage",n),()=>{window.removeEventListener(G,o),window.removeEventListener("storage",n)}},[]);const a=o=>{W.includes(o)&&(t(o),typeof window<"u"&&(window.localStorage.setItem("language",o),window.localStorage.setItem(H,o),window.dispatchEvent(new CustomEvent(G,{detail:{language:o}}))))};return{currentLanguage:e,direction:e==="ar"?"rtl":"ltr",languageLabel:le[e]||le.en,setCurrentLanguage:a,t:se[e]||se.en}}var pe={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},ce=B.createContext&&B.createContext(pe),qe=["attr","size","title"];function Ve(e,t){if(e==null)return{};var a,o,n=$e(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)a=l[o],t.indexOf(a)===-1&&{}.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}function $e(e,t){if(e==null)return{};var a={};for(var o in e)if({}.hasOwnProperty.call(e,o)){if(t.indexOf(o)!==-1)continue;a[o]=e[o]}return a}function q(){return q=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var o in a)({}).hasOwnProperty.call(a,o)&&(e[o]=a[o])}return e},q.apply(null,arguments)}function ue(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})),a.push.apply(a,o)}return a}function V(e){for(var t=1;t<arguments.length;t++){var a=arguments[t]!=null?arguments[t]:{};t%2?ue(Object(a),!0).forEach(function(o){Ue(e,o,a[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):ue(Object(a)).forEach(function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(a,o))})}return e}function Ue(e,t,a){return(t=Ge(t))in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function Ge(e){var t=Ye(e,"string");return typeof t=="symbol"?t:t+""}function Ye(e,t){if(typeof e!="object"||!e)return e;var a=e[Symbol.toPrimitive];if(a!==void 0){var o=a.call(e,t);if(typeof o!="object")return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function ge(e){return e&&e.map((t,a)=>B.createElement(t.tag,V({key:a},t.attr),ge(t.child)))}function c(e){return t=>B.createElement(Je,q({attr:V({},e.attr)},t),ge(e.child))}function Je(e){var t=a=>{var{attr:o,size:n,title:l}=e,i=Ve(e,qe),g=n||a.size||"1em",u;return a.className&&(u=a.className),e.className&&(u=(u?u+" ":"")+e.className),B.createElement("svg",q({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},a.attr,o,i,{className:u,style:V(V({color:e.color||a.color},a.style),e.style),height:g,width:g,xmlns:"http://www.w3.org/2000/svg"}),l&&B.createElement("title",null,l),e.children)};return ce!==void 0?B.createElement(ce.Consumer,null,a=>t(a)):t(pe)}function Xe(e){return c({attr:{viewBox:"0 0 576 512"},child:[{tag:"path",attr:{d:"M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"},child:[]}]})(e)}function Ke(e){return c({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"},child:[]}]})(e)}function _e(e){return c({attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"},child:[]}]})(e)}function Hr(e){return c({attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"},child:[]}]})(e)}function Qe(e){return c({attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"},child:[]}]})(e)}function Wr(e){return c({attr:{viewBox:"0 0 496 512"},child:[{tag:"path",attr:{d:"M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"},child:[]}]})(e)}function Ze(e){return c({attr:{viewBox:"0 0 320 512"},child:[{tag:"path",attr:{d:"M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"},child:[]}]})(e)}function er(e){return c({attr:{viewBox:"0 0 640 512"},child:[{tag:"path",attr:{d:"M624 352h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h16c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm320 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-208H416V144h44.1l99.9 99.9V256z"},child:[]}]})(e)}function he(e){return c({attr:{viewBox:"0 0 576 512"},child:[{tag:"path",attr:{d:"M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"},child:[]}]})(e)}function xe(e){return c({attr:{viewBox:"0 0 576 512"},child:[{tag:"path",attr:{d:"M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"},child:[]}]})(e)}function de(e){return c({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"},child:[]}]})(e)}function rr(e){return c({attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z"},child:[]}]})(e)}function me(e){return c({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"},child:[]}]})(e)}function qr(e){return c({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"12",cy:"12",r:"10"},child:[]},{tag:"line",attr:{x1:"15",y1:"9",x2:"9",y2:"15"},child:[]},{tag:"line",attr:{x1:"9",y1:"9",x2:"15",y2:"15"},child:[]}]})(e)}function Vr(e){return c({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"},child:[]},{tag:"circle",attr:{cx:"12",cy:"7",r:"4"},child:[]}]})(e)}function $r(e){return c({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"rect",attr:{x:"1",y:"3",width:"15",height:"13"},child:[]},{tag:"polygon",attr:{points:"16 8 20 8 23 11 23 16 16 16 16 8"},child:[]},{tag:"circle",attr:{cx:"5.5",cy:"18.5",r:"2.5"},child:[]},{tag:"circle",attr:{cx:"18.5",cy:"18.5",r:"2.5"},child:[]}]})(e)}function Ur(e){return c({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"3 6 5 6 21 6"},child:[]},{tag:"path",attr:{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"},child:[]},{tag:"line",attr:{x1:"10",y1:"11",x2:"10",y2:"17"},child:[]},{tag:"line",attr:{x1:"14",y1:"11",x2:"14",y2:"17"},child:[]}]})(e)}function Gr(e){return c({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polygon",attr:{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"},child:[]}]})(e)}function Yr(e){return c({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"9",cy:"21",r:"1"},child:[]},{tag:"circle",attr:{cx:"20",cy:"21",r:"1"},child:[]},{tag:"path",attr:{d:"M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"},child:[]}]})(e)}function Jr(e){return c({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"},child:[]},{tag:"line",attr:{x1:"3",y1:"6",x2:"21",y2:"6"},child:[]},{tag:"path",attr:{d:"M16 10a4 4 0 0 1-8 0"},child:[]}]})(e)}function Xr(e){return c({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"12",cy:"12",r:"3"},child:[]},{tag:"path",attr:{d:"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"},child:[]}]})(e)}function tr(e){return c({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"22",y1:"2",x2:"11",y2:"13"},child:[]},{tag:"polygon",attr:{points:"22 2 15 22 11 13 2 9 22 2"},child:[]}]})(e)}function Kr(e){return c({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"11",cy:"11",r:"8"},child:[]},{tag:"line",attr:{x1:"21",y1:"21",x2:"16.65",y2:"16.65"},child:[]}]})(e)}function ar(e){return c({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"23 4 23 10 17 10"},child:[]},{tag:"polyline",attr:{points:"1 20 1 14 7 14"},child:[]},{tag:"path",attr:{d:"M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"},child:[]}]})(e)}function _r(e){return c({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"6 9 6 2 18 2 18 9"},child:[]},{tag:"path",attr:{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"},child:[]},{tag:"rect",attr:{x:"6",y:"14",width:"12",height:"8"},child:[]}]})(e)}function Qr(e){return c({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"12",y1:"5",x2:"12",y2:"19"},child:[]},{tag:"line",attr:{x1:"5",y1:"12",x2:"19",y2:"12"},child:[]}]})(e)}function Zr(e){return c({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"16.5",y1:"9.4",x2:"7.5",y2:"4.21"},child:[]},{tag:"path",attr:{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"},child:[]},{tag:"polyline",attr:{points:"3.27 6.96 12 12.01 20.73 6.96"},child:[]},{tag:"line",attr:{x1:"12",y1:"22.08",x2:"12",y2:"12"},child:[]}]})(e)}function et(e){return c({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"5",y1:"12",x2:"19",y2:"12"},child:[]}]})(e)}function or(e){return c({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"3",y1:"12",x2:"21",y2:"12"},child:[]},{tag:"line",attr:{x1:"3",y1:"6",x2:"21",y2:"6"},child:[]},{tag:"line",attr:{x1:"3",y1:"18",x2:"21",y2:"18"},child:[]}]})(e)}function rt(e){return c({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polygon",attr:{points:"1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"},child:[]},{tag:"line",attr:{x1:"8",y1:"2",x2:"8",y2:"18"},child:[]},{tag:"line",attr:{x1:"16",y1:"6",x2:"16",y2:"22"},child:[]}]})(e)}function tt(e){return c({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"},child:[]},{tag:"circle",attr:{cx:"12",cy:"10",r:"3"},child:[]}]})(e)}function fe(e){return c({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"},child:[]},{tag:"polyline",attr:{points:"22,6 12,13 2,6"},child:[]}]})(e)}function at(e){return c({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"},child:[]},{tag:"polyline",attr:{points:"16 17 21 12 16 7"},child:[]},{tag:"line",attr:{x1:"21",y1:"12",x2:"9",y2:"12"},child:[]}]})(e)}function ot(e){return c({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"rect",attr:{x:"3",y:"11",width:"18",height:"11",rx:"2",ry:"2"},child:[]},{tag:"path",attr:{d:"M7 11V7a5 5 0 0 1 10 0v4"},child:[]}]})(e)}function nt(e){return c({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"},child:[]},{tag:"polyline",attr:{points:"9 22 9 12 15 12 15 22"},child:[]}]})(e)}function it(e){return c({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"},child:[]}]})(e)}function nr(e){return c({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M3 18v-6a9 9 0 0 1 18 0v6"},child:[]},{tag:"path",attr:{d:"M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"},child:[]}]})(e)}function lt(e){return c({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"},child:[]},{tag:"polyline",attr:{points:"14 2 14 8 20 8"},child:[]},{tag:"line",attr:{x1:"16",y1:"13",x2:"8",y2:"13"},child:[]},{tag:"line",attr:{x1:"16",y1:"17",x2:"8",y2:"17"},child:[]},{tag:"polyline",attr:{points:"10 9 9 9 8 9"},child:[]}]})(e)}function st(e){return c({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"},child:[]},{tag:"circle",attr:{cx:"12",cy:"12",r:"3"},child:[]}]})(e)}function ct(e){return c({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"},child:[]},{tag:"polyline",attr:{points:"7 10 12 15 17 10"},child:[]},{tag:"line",attr:{x1:"12",y1:"15",x2:"12",y2:"3"},child:[]}]})(e)}function ut(e){return c({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"rect",attr:{x:"1",y:"4",width:"22",height:"16",rx:"2",ry:"2"},child:[]},{tag:"line",attr:{x1:"1",y1:"10",x2:"23",y2:"10"},child:[]}]})(e)}function dt(e){return c({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"},child:[]},{tag:"rect",attr:{x:"8",y:"2",width:"8",height:"4",rx:"1",ry:"1"},child:[]}]})(e)}function _(e){return c({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"9 18 15 12 9 6"},child:[]}]})(e)}function Q(e){return c({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"15 18 9 12 15 6"},child:[]}]})(e)}function pt(e){return c({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"6 9 12 15 18 9"},child:[]}]})(e)}function gt(e){return c({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"rect",attr:{x:"2",y:"7",width:"20",height:"14",rx:"2",ry:"2"},child:[]},{tag:"path",attr:{d:"M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"},child:[]}]})(e)}function ht(e){return c({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"},child:[]},{tag:"polyline",attr:{points:"3.27 6.96 12 12.01 20.73 6.96"},child:[]},{tag:"line",attr:{x1:"12",y1:"22.08",x2:"12",y2:"12"},child:[]}]})(e)}function xt(e){return c({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"18",y1:"20",x2:"18",y2:"10"},child:[]},{tag:"line",attr:{x1:"12",y1:"20",x2:"12",y2:"4"},child:[]},{tag:"line",attr:{x1:"6",y1:"20",x2:"6",y2:"14"},child:[]}]})(e)}function ir(e){return c({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"12",cy:"12",r:"4"},child:[]},{tag:"path",attr:{d:"M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"},child:[]}]})(e)}function mt(e){return c({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"5",y1:"12",x2:"19",y2:"12"},child:[]},{tag:"polyline",attr:{points:"12 5 19 12 12 19"},child:[]}]})(e)}function ft(e){return c({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"12",cy:"12",r:"10"},child:[]},{tag:"polyline",attr:{points:"12 16 16 12 12 8"},child:[]},{tag:"line",attr:{x1:"8",y1:"12",x2:"16",y2:"12"},child:[]}]})(e)}function jt(e){return c({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"19",y1:"12",x2:"5",y2:"12"},child:[]},{tag:"polyline",attr:{points:"12 19 5 12 12 5"},child:[]}]})(e)}function J(e){return c({attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0V0z"},child:[]},{tag:"path",attr:{d:"M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"},child:[]}]})(e)}function lr(e){return c({attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0z"},child:[]},{tag:"path",attr:{d:"M12 2 4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm6 9.09c0 4-2.55 7.7-6 8.83-3.45-1.13-6-4.82-6-8.83v-4.7l6-2.25 6 2.25v4.7z"},child:[]}]})(e)}function sr(e){return c({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M12 21l-8 -4.5v-9l8 -4.5l8 4.5v4.5"},child:[]},{tag:"path",attr:{d:"M12 12l8 -4.5"},child:[]},{tag:"path",attr:{d:"M12 12v9"},child:[]},{tag:"path",attr:{d:"M12 12l-8 -4.5"},child:[]},{tag:"path",attr:{d:"M22 18h-7"},child:[]},{tag:"path",attr:{d:"M18 15l-3 3l3 3"},child:[]}]})(e)}const cr=[{day:"09",month:"Sep",category:"Guide d'achat",title:"Comment mieux choisir vos essentiels du quotidien",slug:"comment-mieux-choisir-vos-essentiels-du-quotidien",excerpt:"Un guide simple pour selectionner des articles utiles, elegants et adaptes a votre style de vie.",comments:12,views:1840},{day:"02",month:"Aout",category:"Tendances",title:"Les tendances mode et accessoires a suivre",slug:"les-tendances-mode-et-accessoires-a-suivre",excerpt:"Explorez les pieces, details et nouveautes qui apportent une touche moderne a vos achats.",comments:9,views:2310},{day:"30",month:"Sep",category:"Lifestyle",title:"Les essentiels lifestyle a ajouter a votre panier",slug:"les-essentiels-lifestyle-a-ajouter-a-votre-panier",excerpt:"Une selection pratique pour simplifier vos achats et rendre votre quotidien plus agreable.",comments:7,views:1568},{day:"15",month:"Sep",category:"Conseils",title:"Idees cadeaux pour toutes les occasions",slug:"idees-cadeaux-pour-toutes-les-occasions",excerpt:"Trouvez l'inspiration pour offrir des produits utiles, raffines et adaptes a chaque moment important.",comments:15,views:2896},{day:"12",month:"Dec",category:"Maison & bureau",title:"Creer un espace pratique chez soi ou au bureau",slug:"creer-un-espace-pratique-chez-soi-ou-au-bureau",excerpt:"Decouvrez des indispensables maison, rangement, decoration et bureau pour mieux vous organiser.",comments:6,views:1324}],R=[{quote:"Commande facile, livraison rapide et produits conformes aux photos. J'ai beaucoup aime l'experience d'achat sur MATJARI.",author:"SARA M.",detail:"Cliente verifiee"},{quote:"Le site est clair, les produits sont bien presentes et le panier est simple a utiliser. Je recommande.",author:"YASSINE B.",detail:"Client verifie"},{quote:"J'ai trouve rapidement ce que je cherchais. Les favoris et le checkout rendent l'achat tres pratique.",author:"AMINA R.",detail:"Cliente verifiee"},{quote:"Tres belle interface, produits varies et navigation fluide. MATJARI donne une vraie impression premium.",author:"MEHDI K.",detail:"Client verifie"}];function P(e,t){return Re(e,t)}function X(e,t,a=0){const o=t.map(l=>l.toLowerCase());return e.find(l=>{const i=l.path?.toLowerCase()||"";return o.some(g=>i.includes(g))})?.url||P(e,a)}function ur(e,t=[],a=[],o=[],n={}){const l=Fe(e),i=n.hero||{},g=n.promo||{},u=i.title||"MATJARI",m=i.imagePath||P(l,0),h=[{label:i.badge||"Local Collection",title:u,image:m,description:i.description||"",primaryButtonLabel:i.primaryButtonLabel||"Shop Now",primaryButtonUrl:i.primaryButtonUrl||"/shop",secondaryButtonLabel:i.secondaryButtonLabel||"Learn More",secondaryButtonUrl:i.secondaryButtonUrl||"#about"},{label:"Full Gallery",title:"Every File, One Storefront",image:P(l,1),description:"",primaryButtonLabel:"Shop Now",primaryButtonUrl:"/shop",secondaryButtonLabel:"Learn More",secondaryButtonUrl:"#about"},{label:"Fresh Source",title:"Browse the Complete Set",image:P(l,2),description:"",primaryButtonLabel:"Shop Now",primaryButtonUrl:"/shop",secondaryButtonLabel:"Learn More",secondaryButtonUrl:"#about"}],j=Array.isArray(i.slides)?i.slides:[];return{imageCount:e.length,assets:{about:P(l,2),promo:X(l,["fashion-accessories/fashion-bags/totes","home-furniture/home-decor","fashion/men/casual-wear"],7),feature:P(l,12)},promo:{badge:g.badge||"Shop",title:g.title||void 0,description:g.description||void 0,buttonLabel:g.buttonLabel||void 0,buttonUrl:g.buttonUrl||"/shop",image:g.imagePath||X(l,["fashion-accessories/fashion-bags/totes","home-furniture/home-decor","fashion/men/casual-wear"],7)},categories:xr(a,l),products:hr(t),heroSlides:h.map((f,y)=>{const d=j[y]||{};return{label:d.badge||d.label||f.label,title:d.title||f.title,image:d.imagePath||d.image||f.image,description:d.description||f.description,primaryButtonLabel:d.primaryButtonLabel||d.buttonLabel||f.primaryButtonLabel,primaryButtonUrl:d.primaryButtonUrl||d.buttonUrl||f.primaryButtonUrl,secondaryButtonLabel:d.secondaryButtonLabel||f.secondaryButtonLabel,secondaryButtonUrl:d.secondaryButtonUrl||f.secondaryButtonUrl}}),blogPosts:dr(o,l),galleryImages:e}}function dr(e,t){const a=[["fashion-accessories/fashion-bags/totes","fashion-accessories/handbags"],["fashion/men/casual-wear","fashion/women"],["electronics/computing","electronics/mobile"],["home-furniture/home-decor","home-furniture"],["fashion-accessories/jewelry","fashion-accessories"]];return(Array.isArray(e)&&e.length>0?e:cr).map((n,l)=>({...n,day:n.day||"01",month:n.month||"Jan",comments:Number(n.comments??n.comments_count??0),views:Number(n.views??0),url:n.url||(n.slug?`/blog/${n.slug}`:"/blog"),image:n.image||X(t,a[l%a.length],l+18)||"/images/logomatjari.png"}))}function pr(e){return`${Number(e||0).toFixed(2)} DH`}function gr(e,t){return{id:e.id,slug:e.slug||"",brand:e.brand||e.categoryName||"MATJARI",name:e.name||"Produit",price:pr(e.price),rawPrice:Number(e.price||0),image:e.image||"",url:e.url||(e.slug?`/products/${e.slug}`:"/shop"),category:e.category||"",categoryName:e.categoryName||"",top:t<4}}function hr(e){return Array.isArray(e)?e.slice(0,240).map(gr):[]}function xr(e,t){return Array.isArray(e)?e.map((a,o)=>({name:a.name||"Categorie",slug:a.slug||"",count:Number(a.count||0),url:a.url||(a.slug?`/shop?category=${a.slug}`:"/shop"),image:a.image||P(t,o+3)})):[]}function mr(){p.useEffect(()=>{if(window.matchMedia("(prefers-reduced-motion: reduce)").matches||!("IntersectionObserver"in window)){Array.from(document.querySelectorAll("[data-animate]")).forEach(i=>i.classList.add("is-visible"));return}const t=new Set,a=new IntersectionObserver(l=>{l.forEach(i=>{i.isIntersecting&&(i.target.classList.add("is-visible"),a.unobserve(i.target))})},{threshold:.18,rootMargin:"0px 0px -70px 0px"}),o=()=>{document.querySelectorAll("[data-animate]").forEach(l=>{t.has(l)||(t.add(l),a.observe(l))})};o();const n=new MutationObserver(o);return n.observe(document.body,{childList:!0,subtree:!0}),()=>{a.disconnect(),n.disconnect()}},[])}function je(){const{settings:e}=I(),t=e?.siteName||"MATJARI",a=e?.navbar?.logoPath;return r.jsxs("span",{className:"journal-logo",children:[a&&r.jsx("img",{className:"journal-logo-image",src:a,alt:""}),r.jsx("span",{children:t})]})}function Y(){return r.jsx("span",{className:"journal-text-chevron","aria-hidden":"true"})}function D({script:e,title:t,subtitle:a,dark:o=!1}){return r.jsxs("div",{className:`journal-section-title ${o?"is-dark":""}`,children:[r.jsx("span",{children:e}),r.jsx("h2",{children:t}),a&&r.jsx("p",{children:a})]})}function fr(e,t=[]){const a=Array.isArray(e)&&e.length>0?e:t;return Array.isArray(a)?a.filter(o=>o?.slug&&o?.name).map(o=>{const n=Array.isArray(o.products)?o.products.filter(l=>l?.name&&l?.slug).slice(0,8):[];return{id:o.id,name:o.name,slug:o.slug,description:o.description||`Selection MATJARI autour de ${o.name}.`,count:Number(o.count||n.length||0),url:o.url||`/shop?category=${o.slug}`,products:n}}):[]}function jr({categories:e=[],auth:t=void 0,forceDocumentNavigation:a=!0}){const[o,n]=p.useState(!1),[l,i]=p.useState(!1),[g,u]=p.useState(""),[m,h]=p.useState(!1),[j,f]=p.useState(!1),[y,d]=p.useState(!1),[w,b]=p.useState(""),T=p.useRef(null),Z=p.useRef(null),ee=p.useRef(null),re=p.useRef(null),{auth:ve,settings:te,categories:ye=[],catalogMenu:ae=[]}=I(),F=te?.navbar||{},{currentLanguage:oe,languageLabel:we,setCurrentLanguage:ke,t:C}=S(),ne=e.length>0?e:ye,$=Array.isArray(F.links)?F.links:[],z=p.useMemo(()=>fr($.length>0?$:ae,ne),[ne,$,ae]),Le=F.categoryLabel||C.catalog,ie=F.searchPlaceholder||C.searchPlaceholder;p.useEffect(()=>{const s=()=>h(window.scrollY>18);return s(),window.addEventListener("scroll",s,{passive:!0}),()=>window.removeEventListener("scroll",s)},[]),p.useEffect(()=>{if(!o)return;const s=x=>{x.key==="Escape"&&n(!1)};return window.addEventListener("keydown",s),()=>window.removeEventListener("keydown",s)},[o]),p.useEffect(()=>{if(!j)return;const s=v=>{v.key==="Escape"&&f(!1)},x=v=>{ee.current?.contains(v.target)||f(!1)};return window.addEventListener("keydown",s),window.addEventListener("pointerdown",x),()=>{window.removeEventListener("keydown",s),window.removeEventListener("pointerdown",x)}},[j]),p.useEffect(()=>{if(!y)return;const s=v=>{v.key==="Escape"&&d(!1)},x=v=>{re.current?.contains(v.target)||d(!1)};return window.addEventListener("keydown",s),window.addEventListener("pointerdown",x),()=>{window.removeEventListener("keydown",s),window.removeEventListener("pointerdown",x)}},[y]),p.useEffect(()=>{if(!l)return;const s=L=>{L.key==="Escape"&&i(!1)},x=L=>{const Pe=T.current?.contains(L.target),Be=Z.current?.contains(L.target);!Pe&&!Be&&i(!1)};window.addEventListener("keydown",s),window.addEventListener("pointerdown",x);const v=T.current?.querySelector("input");return window.setTimeout(()=>v?.focus(),0),()=>{window.removeEventListener("keydown",s),window.removeEventListener("pointerdown",x)}},[l]);const Ce=(t??ve)?.isAuthenticated?"/dashboard":"/login",Se="/account/favorites";p.useEffect(()=>{if(!z.length){b("");return}z.some(s=>s.slug===w)||b(z[0].slug)},[w,z]);const k=z.find(s=>s.slug===w)||z[0],ze=s=>{ke(s),f(!1)},Ne=s=>{s.preventDefault();const x=g.trim();x&&(i(!1),window.location.assign(`/search?query=${encodeURIComponent(x)}`))},U=({to:s,className:x,ariaLabel:v,children:L})=>a?r.jsx("a",{href:s,className:x,"aria-label":v,children:L}):r.jsx(A,{href:s,className:x,"aria-label":v,children:L}),M=({href:s,className:x,children:v,...L})=>a?r.jsx("a",{href:s,className:x,...L,children:v}):r.jsx(A,{href:s,className:x,...L,children:v});return r.jsxs("header",{className:`journal-header ${m?"is-scrolled":""} ${o?"is-open":""}`,children:[r.jsxs("div",{className:"journal-header-inner",children:[r.jsxs("nav",{className:"journal-nav-left","aria-label":"Main navigation",children:[r.jsx("button",{type:"button",onClick:()=>n(s=>!s),"aria-label":"Open menu","aria-expanded":o,children:r.jsx(or,{})}),r.jsx(U,{to:"/shop",children:C.shop}),r.jsxs("div",{className:`journal-catalog-menu ${y?"is-open":""}`,ref:re,onMouseEnter:()=>d(!0),children:[r.jsxs("button",{type:"button",className:"journal-catalog-trigger","aria-haspopup":"menu","aria-expanded":y,onClick:()=>d(s=>!s),children:[Le," ",r.jsx(Y,{})]}),y&&r.jsxs("div",{className:"journal-catalog-dropdown",role:"menu",children:[r.jsx("div",{className:"journal-catalog-list","aria-label":"Catalog categories",children:z.map(s=>r.jsxs(M,{href:s.url||`/shop?category=${s.slug}`,className:`journal-catalog-item ${w===s.slug?"is-active":""}`,role:"menuitem",onMouseEnter:()=>b(s.slug),onFocus:()=>b(s.slug),onClick:()=>d(!1),children:[r.jsx("span",{"aria-hidden":"true"}),s.name]},s.slug))}),k&&r.jsxs("div",{className:"journal-catalog-detail",children:[r.jsxs("div",{className:"journal-catalog-heading",children:[r.jsx("span",{children:"Catalogue"}),r.jsx("strong",{children:k.name}),r.jsx("p",{children:k.description})]}),r.jsxs("div",{className:"journal-catalog-actions",children:[r.jsx(M,{href:k.url||`/shop?category=${k.slug}`,onClick:()=>d(!1),children:"Voir tous les produits"}),r.jsxs("span",{children:[k.count," produits"]})]}),k.products.length>0?r.jsx("div",{className:"journal-catalog-product-grid",children:k.products.map(s=>r.jsx(M,{href:s.url||`/products/${s.slug}`,onClick:()=>d(!1),children:s.name},s.id||s.slug))}):r.jsxs("div",{className:"journal-catalog-empty",children:[r.jsx("p",{children:"Aucun produit actif dans cette categorie pour le moment."}),r.jsx(M,{href:k.url||`/shop?category=${k.slug}`,onClick:()=>d(!1),children:"Voir tous les produits"})]})]})]})]})]}),r.jsx(U,{to:"/",className:"journal-logo-link",ariaLabel:F.homeLabel||`${te?.siteName||"MATJARI"} home`,children:r.jsx(je,{})}),r.jsxs("nav",{className:"journal-nav-right","aria-label":"Tools",children:[r.jsxs("div",{className:"journal-language-menu",ref:ee,children:[r.jsxs("button",{className:"journal-language-trigger",type:"button","aria-label":C.language,"aria-haspopup":"menu","aria-expanded":j,onClick:()=>f(s=>!s),children:[we," ",r.jsx(Y,{})]}),j&&r.jsx("div",{className:"journal-language-dropdown",role:"menu",children:K.map(s=>r.jsx("button",{type:"button",role:"menuitemradio","aria-checked":oe===s.value,className:oe===s.value?"is-active":"",dir:s.value==="ar"?"rtl":"ltr",onClick:()=>ze(s.value),children:s.label},s.value))})]}),r.jsxs("a",{href:"#currency",children:["USD ",r.jsx(Y,{})]}),r.jsx("button",{type:"button",ref:Z,"aria-label":C.search,"aria-expanded":l,onClick:()=>i(s=>!s),children:r.jsx(de,{})}),r.jsx("a",{className:"journal-icon-link",href:Ce,"aria-label":C.account,children:r.jsx(rr,{})}),r.jsx("a",{className:"journal-icon-link",href:Se,"aria-label":C.favorites,children:r.jsx(me,{})}),r.jsx(U,{to:"/cart",ariaLabel:C.cart,children:r.jsx(xe,{size:19})})]})]}),l&&r.jsx("div",{className:"journal-search-popover",ref:T,children:r.jsxs("form",{onSubmit:Ne,children:[r.jsx(de,{"aria-hidden":"true"}),r.jsx("input",{type:"search",value:g,onChange:s=>u(s.target.value),placeholder:ie,"aria-label":ie}),r.jsx("button",{type:"submit",children:C.search})]})}),o&&r.jsx("div",{className:"journal-mobile-panel",children:z.map(s=>r.jsxs("div",{className:"journal-mobile-catalog-group",children:[r.jsx(M,{href:s.url||`/shop?category=${s.slug}`,onClick:()=>{n(!1),d(!1)},children:s.name}),s.products.slice(0,3).map(x=>r.jsx(M,{href:x.url||`/products/${x.slug}`,onClick:()=>{n(!1),d(!1)},children:x.name},x.id||x.slug))]},s.slug))})]})}function br({heroSlides:e}){const[t,a]=p.useState(0),{t:o}=S(),n=()=>a(i=>(i+1)%e.length),l=()=>a(i=>(i-1+e.length)%e.length);return p.useEffect(()=>{const i=window.setInterval(n,6200);return()=>window.clearInterval(i)},[]),r.jsxs("section",{className:"journal-hero",id:"home","data-animate":!0,children:[e.map((i,g)=>r.jsxs("article",{className:`journal-hero-main ${t===g?"is-active":""}`,children:[i.image&&r.jsx("img",{src:i.image,alt:i.title,onError:u=>{u.currentTarget.src="/images/logomatjari.png"}}),r.jsxs("div",{className:"journal-hero-copy",children:[r.jsx("span",{children:i.label}),r.jsx("h1",{children:i.title}),i.description&&r.jsx("p",{children:i.description}),r.jsxs("div",{children:[r.jsx("a",{className:"journal-btn journal-btn-dark",href:i.primaryButtonUrl||"/shop",children:i.primaryButtonLabel||o.shopCollection}),r.jsxs("a",{className:"journal-text-link",href:i.secondaryButtonUrl||"#about",children:[i.secondaryButtonLabel||o.learnMore," ",r.jsx("span",{"aria-hidden":"true",children:"→"})]})]})]})]},i.title)),r.jsxs("div",{className:"journal-hero-nav","aria-label":"Slider controls",children:[r.jsx("button",{className:"journal-hero-arrow",type:"button","aria-label":"Previous slide",onClick:l,children:"‹"}),r.jsx("button",{className:"journal-hero-arrow",type:"button","aria-label":"Next slide",onClick:n,children:"›"})]}),r.jsx("div",{className:"journal-hero-dots",children:e.map((i,g)=>r.jsx("button",{type:"button",className:t===g?"is-active":"","aria-label":`Go to slide ${g+1}`,onClick:()=>a(g)},i.title))})]})}function vr({categories:e}){const t=p.useRef(null),{t:a}=S(),o=()=>{t.current?.scrollBy({left:Math.min(t.current.clientWidth*.78,520),behavior:"smooth"})};return r.jsxs("section",{className:"journal-section journal-categories",id:"catalog","data-animate":!0,children:[r.jsx(D,{script:a.categories,title:a.shopByCategory,subtitle:a.categorySectionSubtitle}),e.length===0?r.jsx("p",{className:"journal-empty-state",children:"No categories are available yet."}):r.jsxs("div",{className:"journal-category-carousel",children:[r.jsx("div",{className:"journal-category-row",ref:t,children:e.map(n=>r.jsxs("article",{className:"journal-category-card","data-animate":!0,children:[r.jsx("div",{className:"journal-category-image",children:r.jsx("img",{src:n.image,alt:n.name})}),r.jsxs("div",{className:"journal-category-copy",children:[r.jsx("h3",{children:n.name}),r.jsxs("p",{children:[n.count," ",a.productCount]}),r.jsxs("a",{href:n.url||`/shop?category=${n.slug}`,children:[a.shopCollection," ",r.jsx("span",{"aria-hidden":"true",children:"→"})]})]})]},n.name))}),r.jsx("button",{className:"journal-category-next",type:"button","aria-label":"Next categories",onClick:o,children:"→"})]}),r.jsx("div",{className:"journal-ticker","aria-label":"Promotions",children:r.jsx("div",{className:"journal-ticker-track",children:Array.from({length:6}).map((n,l)=>r.jsxs("span",{className:"journal-ticker-group",children:[r.jsx("b",{children:a.freeShipping}),r.jsx("span",{children:a.freeShippingDesc})]},l))})})]})}function be({product:e,compact:t=!1}){const a=Ee(),{auth:o}=I(),{t:n}=S(),[l,i]=p.useState(!1),[g,u]=p.useState(""),[m,h]=p.useState(!1),j=e.url||(e.slug?`/products/${e.slug}`:"/shop"),f=()=>{try{Me.visit(j)}catch{window.location.assign(j)}},y=b=>{b.preventDefault(),b.stopPropagation(),f()},d=b=>{if(b.stopPropagation(),!o?.isAuthenticated){i(!0);return}a(Ie({id:e.id,name:e.name,price:e.rawPrice,image:e.image,category:e.categoryName||e.category})),a(De()),u("Produit ajouté au panier."),window.setTimeout(()=>u(""),2200)},w=async b=>{if(b.stopPropagation(),!o?.isAuthenticated){i(!0);return}if(e.id)try{await Ae.post("/favorites/toggle",{product_id:e.id}),h(T=>!T)}catch{i(!0)}};return r.jsxs("article",{className:`journal-product-card ${t?"is-compact":""}`,"data-animate":!0,onClick:f,role:"link",tabIndex:0,onKeyDown:b=>{b.key==="Enter"&&f()},children:[e.sale&&r.jsx("span",{className:"journal-sale-flag",children:"%"}),e.top&&r.jsxs("span",{className:"journal-top-badge",children:[r.jsx(he,{})," ",n.topBrand]}),r.jsx("a",{className:"journal-product-image",href:j,onClick:y,children:r.jsx("img",{src:e.image||"/images/logomatjari.png",alt:e.name,onError:b=>{b.currentTarget.src="/images/logomatjari.png"}})}),r.jsx("span",{className:"journal-product-brand",children:e.brand}),r.jsx("h3",{children:r.jsx("a",{href:j,onClick:y,children:e.name})}),r.jsxs("p",{className:"journal-price",children:[r.jsx("strong",{children:e.price}),e.old&&r.jsx("del",{children:e.old})]}),r.jsxs("div",{className:"journal-card-actions",onClick:b=>b.stopPropagation(),children:[r.jsxs("button",{type:"button",onClick:d,children:[r.jsx(xe,{})," ",n.addToCart]}),r.jsx("button",{type:"button",className:m?"is-favorite":"","aria-label":n.wishlist,onClick:w,children:r.jsx(me,{})}),r.jsx("button",{type:"button","aria-label":n.compare,onClick:b=>b.stopPropagation(),children:r.jsx(ar,{})})]}),l&&r.jsx(yr,{onClose:()=>i(!1)}),g&&r.jsx(wr,{message:g})]})}function yr({onClose:e}){const{t}=S();return r.jsx("div",{className:"journal-favorite-prompt",role:"dialog","aria-modal":"true","aria-label":t.loginRequired,children:r.jsxs("div",{children:[r.jsx("button",{type:"button",onClick:e,"aria-label":t.close,children:"×"}),r.jsx("strong",{children:"Connexion requise"}),r.jsx("p",{children:"Vous devez vous connecter d'abord pour effectuer cette action."}),r.jsxs("div",{children:[r.jsx("a",{href:"/login",children:"Se connecter"}),r.jsx("a",{href:"/register",children:"Créer un compte"})]})]})})}function wr({message:e}){return r.jsx("div",{className:"journal-cart-notice",role:"status",children:e})}function kr({products:e}){const[t,a]=p.useState("newArrivals"),[o,n]=p.useState(!1),[l,i]=p.useState(!1),g=p.useRef(null),{t:u}=S(),m=[{key:"newArrivals",label:u.productTabs.newArrivals},{key:"bestsellers",label:u.productTabs.bestsellers},{key:"sale",label:u.productTabs.sale}],h=p.useMemo(()=>t==="sale"?e.filter(d=>d.sale):t==="bestsellers"?[...e].sort((d,w)=>+!!w.top-+!!d.top):e,[e,t]),j=()=>{const d=g.current;d&&(n(d.scrollLeft>8),i(d.scrollLeft+d.clientWidth<d.scrollWidth-8))};p.useEffect(()=>{g.current?.scrollTo({left:0,behavior:"smooth"}),window.setTimeout(j,120)},[t]),p.useEffect(()=>(j(),window.addEventListener("resize",j),()=>window.removeEventListener("resize",j)),[h]);const f=d=>{const w=g.current;w&&w.scrollBy({left:d*Math.max(w.clientWidth-90,260),behavior:"smooth"})},y=m.find(d=>d.key===t)?.label||u.productTabs.newArrivals;return r.jsxs("section",{className:"journal-section journal-products",id:"products","data-animate":!0,children:[r.jsx(D,{script:u.featuredProducts,title:u.featuredProducts,subtitle:u.featuredProductsSubtitle}),e.length===0?r.jsx("p",{className:"journal-empty-state",children:"No products are available yet."}):r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"journal-tabs",children:m.map(d=>r.jsx("button",{type:"button",className:t===d.key?"is-active":"",onClick:()=>a(d.key),children:d.label},d.key))}),r.jsxs("div",{className:"journal-products-carousel",children:[o&&r.jsx("button",{className:"journal-product-nav is-prev",type:"button","aria-label":"Previous products",onClick:()=>f(-1),children:"‹"}),r.jsx("div",{className:"journal-products-row",ref:g,tabIndex:0,"aria-label":`${y} product carousel`,onScroll:j,children:r.jsx("div",{className:"journal-products-track",children:h.map(d=>r.jsx(be,{product:d},`${t}-${d.name}`))})}),l&&r.jsx("button",{className:"journal-product-nav is-next",type:"button","aria-label":"Next products",onClick:()=>f(1),children:"›"})]})]})]})}function Lr(){const{t:e}=S();return r.jsx("section",{className:"journal-services","data-animate":!0,children:[[er,e.fastShipping,e.fastShippingDescription],[lr,e.secureShopping,e.secureShoppingDescription],[sr,e.easyReturn,e.easyReturnDescription],[nr,e.service24h,e.service24hDescription]].map(([t,a,o])=>r.jsxs("article",{className:"journal-service-item","data-animate":!0,children:[r.jsx(t,{}),r.jsx("h3",{children:a}),r.jsx("p",{children:o})]},a))})}function Cr({products:e,featureImage:t}){const a=p.useRef({}),[o,n]=p.useState({}),l=p.useMemo(()=>Sr(e),[t,e]),i=u=>{const m=a.current[u];m&&n(h=>({...h,[u]:{canScrollPrev:m.scrollLeft>8,canScrollNext:m.scrollLeft+m.clientWidth<m.scrollWidth-8}}))};p.useEffect(()=>{const u=()=>l.forEach(h=>i(h.title));u();const m=window.setTimeout(u,120);return window.addEventListener("resize",u),()=>{window.clearTimeout(m),window.removeEventListener("resize",u)}},[l]);const g=(u,m)=>{const h=a.current[u];h&&h.scrollBy({left:m*Math.max(h.clientWidth-90,260),behavior:"smooth"})};return r.jsxs("section",{className:"journal-section journal-featured",id:"featured","data-animate":!0,children:[r.jsx(D,{script:"Featured",title:"Featured Categories",subtitle:"Create custom title modules with accent icons and decorative text."}),r.jsx("div",{className:"journal-feature-showcase",children:l.map(u=>{const m=o[u.title]||{};return r.jsxs("div",{className:"journal-feature-carousel",children:[m.canScrollPrev&&r.jsx("button",{className:"journal-product-nav is-prev",type:"button","aria-label":`Previous ${u.title} products`,onClick:()=>g(u.title,-1),children:r.jsx(Q,{"aria-hidden":"true"})}),r.jsx("div",{className:"journal-feature-products",ref:h=>{a.current[u.title]=h},tabIndex:0,"aria-label":`${u.title} featured products carousel`,onScroll:()=>i(u.title),children:r.jsxs("div",{className:"journal-feature-track",children:[r.jsxs("article",{className:"journal-feature-tile","data-animate":!0,children:[r.jsxs("div",{className:"journal-feature-copy",children:[r.jsx("h3",{children:u.title}),r.jsx("div",{children:u.links.map(h=>r.jsx("a",{href:u.url,children:h},h))}),r.jsxs("a",{className:"journal-feature-more",href:u.url,children:["View More ",r.jsx(J,{})]})]}),u.image&&r.jsx("img",{src:u.image,alt:`${u.title} category`,onError:h=>{h.currentTarget.src="/images/logomatjari.png"}})]}),u.products.map((h,j)=>r.jsx(be,{product:h},`${u.title}-${h.name}-${j}`))]})}),m.canScrollNext&&r.jsx("button",{className:"journal-product-nav is-next",type:"button","aria-label":`Next ${u.title} products`,onClick:()=>g(u.title,1),children:r.jsx(_,{"aria-hidden":"true"})})]},u.title)})})]})}function Sr(e,t){const a=e.filter(n=>n.category==="electronics"),o=e.filter(n=>n.category==="shoes");return[{title:"Electronics",links:["Phones","Laptops","Tablets","Headphones"],url:"/shop?category=electronics",image:a.find(n=>n.image)?.image||"/images/logomatjari.png",products:a},{title:"Espadrilles & Shoes",links:["Espadrilles","Sneakers","Sandals","Boots"],url:"/shop?category=shoes",image:o.find(n=>n.image)?.image||"/images/logomatjari.png",products:o}].filter(n=>n.products.length>0||n.image)}function zr({promo:e}){const{t}=S(),a=e?.image;return r.jsx("section",{className:"journal-promo","data-animate":!0,style:{backgroundImage:`linear-gradient(90deg, rgba(231,216,200,.96), rgba(231,216,200,.78) 42%, rgba(231,216,200,.24) 78%), url(${a})`},children:r.jsxs("div",{children:[r.jsx("span",{children:e?.badge||t.shop}),r.jsx("h2",{children:e?.title||t.promoHeadline}),r.jsx("p",{children:e?.description||t.promoText}),r.jsx("a",{className:"journal-btn journal-btn-light",href:e?.buttonUrl||"/shop",children:e?.buttonLabel||t.promoShopCollection}),r.jsx("a",{className:"journal-text-link journal-light-link",href:"#catalog",children:t.promoLearnMore})]})})}function Nr(){const[e,t]=p.useState(0),{t:a}=S(),o=R[e],n=()=>t(i=>(i+1)%R.length),l=()=>t(i=>(i-1+R.length)%R.length);return r.jsxs("section",{className:"journal-testimonials","data-animate":!0,children:[r.jsx(D,{script:a.testimonialsScript,title:a.testimonialsTitle,subtitle:a.testimonialsSubtitle}),r.jsxs("div",{className:"journal-testimonial-stage",children:[r.jsx("button",{className:"journal-round-nav",type:"button","aria-label":a.testimonialPrevious,onClick:l,children:r.jsx(Q,{"aria-hidden":"true"})}),r.jsxs("div",{className:"journal-testimonial-copy",children:[r.jsxs("div",{className:"journal-rating","aria-label":`${a.testimonialRating} ${a.testimonialRatingLabel}`,children:[r.jsx("span",{"aria-hidden":"true",children:Array.from({length:5}).map((i,g)=>r.jsx(he,{},g))}),r.jsx("strong",{children:a.testimonialRating}),r.jsx("em",{children:a.testimonialRatingLabel})]}),r.jsx("div",{className:"journal-quotes","aria-hidden":"true",children:'"'}),r.jsx("blockquote",{children:o.quote}),r.jsxs("strong",{children:["- ",o.author]}),r.jsx("small",{children:o.detail}),r.jsx("div",{className:"journal-dots",children:R.map((i,g)=>r.jsx("button",{type:"button",className:g===e?"is-active":"","aria-label":`Show testimonial ${g+1}`,onClick:()=>t(g)},i.author))})]},o.author),r.jsx("button",{className:"journal-round-nav",type:"button","aria-label":a.testimonialNext,onClick:n,children:r.jsx(_,{"aria-hidden":"true"})})]})]})}function Pr({image:e}){return r.jsxs("section",{className:"journal-about",id:"about","data-animate":!0,children:[r.jsx("img",{src:e,alt:"About Journal skincare"}),r.jsxs("div",{children:[r.jsx("span",{children:"Journal"}),r.jsx("h2",{children:"About us"}),r.jsx("p",{children:"Since 2013, Journal has been the best selling and most loved OpenCart theme on the market. Now at version 3, it brings many new and revolutionary features with modern modules and flexible layouts."}),r.jsx("a",{className:"journal-btn journal-btn-outline",href:"#more",children:"Read more →"})]})]})}function Br({blogPosts:e}){const t=p.useRef(null),a=o=>{const n=t.current;n&&n.scrollBy({left:o*Math.max(n.clientWidth-96,280),behavior:"smooth"})};return r.jsxs("section",{className:"journal-section journal-blog",id:"blog","data-animate":!0,children:[r.jsx(D,{script:"Blog",title:"Latest News",subtitle:"Decouvrez nos conseils, inspirations et nouveautes pour mieux choisir vos produits."}),r.jsxs("div",{className:"journal-blog-carousel",children:[r.jsx("button",{className:"journal-product-nav is-prev",type:"button","aria-label":"Previous blog posts",onClick:()=>a(-1),children:r.jsx(Q,{"aria-hidden":"true"})}),r.jsx("div",{className:"journal-blog-row",ref:t,tabIndex:0,"aria-label":"Latest news carousel",children:r.jsx("div",{className:"journal-blog-track",children:e.map(o=>r.jsxs("article",{className:"journal-blog-card","data-animate":!0,children:[r.jsxs(A,{className:"journal-blog-image",href:o.url||`/blog/${o.slug}`,"aria-label":o.title,children:[r.jsx("img",{src:o.image,alt:o.title,onError:n=>{n.currentTarget.src="/images/logomatjari.png"}}),r.jsxs("div",{children:[r.jsx("strong",{children:o.day}),r.jsx("span",{children:o.month})]})]}),r.jsxs("p",{children:[o.category," / admin / ",o.comments," commentaires / ",o.views," vues"]}),r.jsx("h3",{children:r.jsx(A,{className:"journal-blog-title-link",href:o.url||`/blog/${o.slug}`,children:o.title})}),r.jsx("p",{children:o.excerpt}),r.jsxs(A,{href:o.url||`/blog/${o.slug}`,children:["Lire l'article ",r.jsx(J,{})]})]},o.title))})}),r.jsx("button",{className:"journal-product-nav is-next",type:"button","aria-label":"Next blog posts",onClick:()=>a(1),children:r.jsx(_,{"aria-hidden":"true"})})]}),r.jsx("div",{className:"journal-blog-more",children:r.jsxs(A,{href:"/blog",children:["Voir plus d’articles ",r.jsx(J,{})]})})]})}function Mr(){return r.jsxs("section",{className:"journal-newsletter","data-animate":!0,children:[r.jsx(fe,{}),r.jsx("h2",{children:"Sign up now & get 15% Off"}),r.jsx("p",{children:"Stay up to date with news and promotions by signing up for our newsletter"}),r.jsxs("form",{onSubmit:e=>e.preventDefault(),children:[r.jsx(ir,{}),r.jsx("input",{type:"email",placeholder:"Enter email","aria-label":"Email address"}),r.jsxs("button",{type:"submit",children:[r.jsx(tr,{})," Sign Up"]})]})]})}function Ar(){const{settings:e}=I(),t=e?.footer||{},a=t.quickLinks?.length?t.quickLinks:[{label:"About Us",url:"/about"},{label:"Blog",url:"/blog"},{label:t.policyLabel||"Privacy Policy",url:"/privacy"},{label:t.termsLabel||"Terms & Conditions",url:"/terms"}],o=t.socialLinks?.length?t.socialLinks:[];return r.jsxs("footer",{className:"journal-footer",children:[r.jsxs("div",{className:"journal-footer-main",children:[r.jsxs("div",{className:"journal-footer-brand",children:[r.jsx(je,{}),r.jsx("p",{children:t.description||"Your one-stop destination for daily essentials, curated accessories, and a clean shopping experience."}),r.jsxs("p",{children:[r.jsx(fe,{})," Contact Us"]}),r.jsx("div",{className:"journal-socials",children:o.length>0?o.map(n=>r.jsx("a",{href:n.url||"#","aria-label":n.label,children:n.icon||n.label?.slice(0,2)},`${n.label}-${n.url}`)):[Ze,Qe,Ke,_e,Xe].map((n,l)=>r.jsx("span",{children:r.jsx(n,{})},l))})]}),r.jsxs("div",{className:"journal-footer-col",children:[r.jsx("h3",{children:"Links"}),a.map(n=>r.jsx("a",{href:n.url||"#",children:n.label},`${n.label}-${n.url}`))]}),r.jsxs("div",{className:"journal-footer-col",children:[r.jsx("h3",{children:t.newsletterTitle||"Newsletter"}),r.jsx("p",{children:t.newsletterText||"Get updates and special offers in your inbox."}),r.jsxs("form",{onSubmit:n=>n.preventDefault(),children:[r.jsx("input",{type:"email",placeholder:t.newsletterPlaceholder||"Enter your email","aria-label":t.newsletterPlaceholder||"Enter your email"}),r.jsx("button",{type:"submit",children:t.newsletterButtonLabel||"Subscribe"})]})]})]}),r.jsxs("div",{className:"journal-copyright",children:[r.jsx("p",{children:t.copyright||"All rights reserved."}),r.jsxs("div",{children:[r.jsx("span",{children:"VISA"}),r.jsx("span",{children:"MC"}),r.jsx("span",{children:"AMEX"}),r.jsx("span",{children:"DISC"}),r.jsx("span",{children:"PayPal"}),r.jsx("span",{children:"stripe"})]})]})]})}function Er(){return r.jsx("style",{children:Tr})}function bt(){mr();const{images:e}=Te(),{auth:t,settings:a,products:o=[],categories:n=[],blogPosts:l=[]}=I(),i=p.useMemo(()=>ur(e,o,n,l,a),[l,n,o,e,a]);return r.jsxs("main",{className:"journal-page",children:[r.jsx(jr,{categories:i.categories,auth:t}),r.jsx(br,{heroSlides:i.heroSlides}),r.jsx(vr,{categories:i.categories}),r.jsx(kr,{products:i.products}),r.jsx(Lr,{}),r.jsx(Cr,{products:i.products,featureImage:i.assets.feature}),r.jsx(zr,{promo:i.promo}),r.jsx(Nr,{}),r.jsx(Pr,{image:i.assets.about}),r.jsx(Br,{blogPosts:i.blogPosts}),r.jsx(Mr,{}),r.jsx(Ar,{}),r.jsx(Er,{})]})}const Tr=`
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Ephesis&family=Great+Vibes&family=Inter:wght@400;500;600;700;800&family=Libre+Baskerville:wght@400;700&family=Playfair+Display:wght@500;600;700;800&display=swap');

.journal-page { --cream: #eee4dc; --soft: #f4f4f3; --ink: #202526; --muted: #687074; --line: #dedbd8; --accent: #b91f2c; min-height: 100vh; background: #fff; color: var(--ink); font-family: Inter, system-ui, sans-serif; }
.journal-page * { box-sizing: border-box; }
.journal-page a { color: inherit; text-decoration: none; }
.journal-page img { display: block; max-width: 100%; }
.journal-empty-state { margin: 26px auto 0; max-width: 520px; color: var(--muted); text-align: center; font-size: 15px; line-height: 1.7; }
.journal-header { position: relative; top: 0; z-index: 60; width: 100%; padding: 0 !important; background: #fff; border-top: 0; box-shadow: none; }
.journal-header-inner { height: 81px; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 24px; padding: 0 38px; }
.journal-nav-left, .journal-nav-right { display: flex; align-items: center; }
.journal-nav-left { gap: 28px; font-family: Inter, 'Helvetica Neue', Arial, sans-serif; font-size: 13.5px; font-weight: 400; letter-spacing: .09em; text-transform: uppercase; line-height: 20px; color: #2f3335; }
.journal-nav-right { justify-content: flex-end; gap: 13px; color: #555b5e; font-family: Inter, 'Helvetica Neue', Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 20px; }
.journal-nav-left a, .journal-nav-right a { display: inline-flex; align-items: center; gap: 5px; border: 0; background: transparent; box-shadow: none; white-space: nowrap; }
.journal-catalog-menu { position: relative; display: inline-flex; align-items: center; }
.journal-nav-left .journal-catalog-trigger { width: auto; height: auto; display: inline-flex; align-items: center; gap: 5px; border: 0; background: transparent; color: inherit; padding: 0; font-family: inherit; font-size: inherit; font-weight: inherit; letter-spacing: inherit; line-height: inherit; text-transform: inherit; white-space: nowrap; cursor: pointer; }
.journal-catalog-dropdown { position: absolute; left: 0; top: calc(100% + 18px); z-index: 260; width: min(1080px, calc(100vw - 52px)); min-height: 430px; display: grid; grid-template-columns: 270px minmax(0, 1fr); gap: 0; overflow: hidden; border: 1px solid rgba(32,37,38,.12); border-radius: 10px; background: rgba(255,255,255,.98); box-shadow: 0 28px 70px rgba(32,37,38,.18); backdrop-filter: blur(14px); animation: journalDropdownIn 170ms ease-out both; }
.journal-catalog-list { display: grid; align-content: start; gap: 3px; border-right: 1px solid rgba(32,37,38,.1); background: #fbfaf8; padding: 12px; }
.journal-catalog-item { position: relative; min-height: 38px; display: flex !important; align-items: center; gap: 10px !important; border-radius: 7px; padding: 0 12px 0 10px; color: #394044; font-size: 13px; font-weight: 600; letter-spacing: 0; line-height: 1.2; text-transform: none; transition: background-color 160ms ease, color 160ms ease, transform 160ms ease, box-shadow 160ms ease; }
.journal-catalog-item span { width: 6px; height: 6px; flex: 0 0 auto; border-radius: 999px; background: rgba(32,37,38,.22); transition: background-color 160ms ease, transform 160ms ease; }
.journal-catalog-item:hover,
.journal-catalog-item.is-active { background: #eee4dc; color: #111827; box-shadow: inset 3px 0 0 #202526; transform: translateX(2px); }
.journal-catalog-item:hover span,
.journal-catalog-item.is-active span { background: #202526; transform: scale(1.12); }
.journal-catalog-detail { display: flex; min-width: 0; flex-direction: column; padding: 26px 30px 28px; background: linear-gradient(135deg, #fff, #fbf7f2); }
.journal-catalog-heading { margin-bottom: 16px; }
.journal-catalog-heading span { display: block; margin-bottom: 6px; color: #b91f2c; font-size: 11px; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; }
.journal-catalog-heading strong { display: block; color: #202526; font-family: 'Playfair Display', Georgia, serif; font-size: 30px; font-weight: 600; line-height: 1.08; letter-spacing: 0; text-transform: none; }
.journal-catalog-heading p { max-width: 640px; margin: 10px 0 0; color: #687074; font-size: 14px; font-weight: 400; line-height: 1.7; letter-spacing: 0; text-transform: none; }
.journal-catalog-actions { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 18px; padding-bottom: 16px; border-bottom: 1px solid rgba(32,37,38,.09); }
.journal-catalog-actions a { min-height: 36px; display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; background: #202526; padding: 0 15px; color: #fff; font-size: 12px; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; transition: transform 160ms ease, background-color 160ms ease; }
.journal-catalog-actions a:hover { transform: translateY(-1px); background: #000; color: #fff; }
.journal-catalog-actions span { color: #687074; font-size: 12px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
.journal-catalog-product-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px 12px; }
.journal-catalog-product-grid a { min-height: 44px; display: flex; align-items: center; min-width: 0; border: 1px solid rgba(32,37,38,.08); border-radius: 8px; background: rgba(255,255,255,.76); padding: 9px 12px; color: #394044; font-size: 14px; font-weight: 600; letter-spacing: 0; line-height: 1.25; text-transform: none; transition: color 160ms ease, background-color 160ms ease, border-color 160ms ease, transform 160ms ease; }
.journal-catalog-product-grid a:hover { border-color: rgba(32,37,38,.18); background: rgba(238,228,220,.68); color: #111827; transform: translateX(3px); }
.journal-catalog-empty { margin-top: 12px; border: 1px dashed rgba(32,37,38,.18); border-radius: 8px; background: rgba(255,255,255,.68); padding: 18px; }
.journal-catalog-empty p { margin: 0 0 12px; color: #687074; font-size: 14px; line-height: 1.6; }
.journal-catalog-empty a { color: #202526; font-size: 13px; font-weight: 800; text-decoration: underline; text-underline-offset: 4px; }
[dir="rtl"] .journal-catalog-dropdown { left: auto; right: 0; }
[dir="rtl"] .journal-catalog-list { border-right: 0; border-left: 1px solid rgba(32,37,38,.1); }
[dir="rtl"] .journal-catalog-item:hover,
[dir="rtl"] .journal-catalog-item.is-active { box-shadow: inset -3px 0 0 #202526; transform: translateX(-2px); }
[dir="rtl"] .journal-catalog-product-grid a:hover { transform: translateX(-3px); }
.journal-language-menu { position: relative; display: inline-flex; align-items: center; }
.journal-nav-right .journal-language-trigger { width: auto; height: auto; display: inline-flex; align-items: center; gap: 5px; font-size: 14px; line-height: 20px; white-space: nowrap; }
.journal-language-dropdown { position: absolute; top: calc(100% + 14px); right: 0; z-index: 240; min-width: 168px; display: grid; gap: 4px; border: 1px solid rgba(32,37,38,.12); border-radius: 10px; background: rgba(255,255,255,.98); box-shadow: 0 22px 54px rgba(32,37,38,.16); padding: 8px; backdrop-filter: blur(12px); animation: journalDropdownIn 160ms ease-out both; }
.journal-nav-right .journal-language-dropdown button { width: 100%; height: auto; min-height: 38px; display: flex; align-items: center; justify-content: flex-start; border: 0; border-radius: 7px; background: transparent; color: #303438; padding: 0 11px; cursor: pointer; font-family: Inter, 'Helvetica Neue', Arial, sans-serif; font-size: 13px; font-weight: 500; line-height: 1; text-align: left; transition: background-color 160ms ease, color 160ms ease, transform 160ms ease; }
.journal-nav-right .journal-language-dropdown button:hover { background: rgba(238,228,220,.62); color: #111827; transform: translateX(2px); }
.journal-nav-right .journal-language-dropdown button.is-active { background: #f0e4d8; color: #111827; box-shadow: inset 3px 0 0 #202526; }
[dir="rtl"] .journal-language-dropdown { right: auto; left: 0; }
[dir="rtl"] .journal-nav-right .journal-language-dropdown button { text-align: right; justify-content: flex-end; }
[dir="rtl"] .journal-nav-right .journal-language-dropdown button:hover { transform: translateX(-2px); }
[dir="rtl"] .journal-nav-right .journal-language-dropdown button.is-active { box-shadow: inset -3px 0 0 #202526; }
@keyframes journalDropdownIn {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}
.journal-text-chevron { flex: 0 0 auto; display: inline-block; width: 0; height: 0; margin-top: 1px; border-left: 4px solid transparent; border-right: 4px solid transparent; border-top: 5px solid currentColor; opacity: .62; }
.journal-nav-left button, .journal-nav-right button { appearance: none; -webkit-appearance: none; display: inline-grid; place-items: center; width: 32px; height: 32px; border: 0; background: transparent; color: inherit; cursor: pointer; font-size: 20px; padding: 0; }
.journal-nav-left button { width: 23px; height: 17px; }
.journal-nav-left button svg { width: 23px; height: 17px; }
.journal-nav-right button, .journal-nav-right > a[aria-label="Cart"], .journal-icon-link { width: 32px; height: 32px; display: inline-grid; place-items: center; }
.journal-nav-right button svg, .journal-nav-right > a[aria-label="Cart"] svg, .journal-icon-link svg { width: 19px; height: 19px; stroke-width: 1.65; }
.journal-logo-link { width: 158px; height: 32px; display: grid; place-items: center; }
.journal-logo { display: inline-flex; align-items: center; justify-content: center; gap: 10px; color: #121212; font-family: 'Bodoni 72', Didot, 'Cormorant Garamond', Georgia, serif; font-size: 32px; font-weight: 500; letter-spacing: .065em; transform: none; line-height: 1; }
.journal-logo-image { width: auto; max-width: 34px; height: 34px; object-fit: contain; }
.journal-search-popover { position: absolute; right: 38px; top: calc(100% + 10px); z-index: 90; width: min(520px, calc(100vw - 32px)); border: 1px solid rgba(32,37,38,.12); border-radius: 8px; background: #fff; box-shadow: 0 24px 70px rgba(32,37,38,.16); padding: 12px; }
.journal-search-popover form { display: grid; grid-template-columns: 24px minmax(0, 1fr) auto; align-items: center; gap: 12px; }
.journal-search-popover svg { color: var(--muted); font-size: 18px; }
.journal-search-popover input { width: 100%; height: 46px; border: 1px solid var(--line); border-radius: 6px; background: var(--soft); color: var(--ink); padding: 0 14px; font: 500 15px Inter, system-ui, sans-serif; outline: 0; }
.journal-search-popover input:focus { border-color: var(--accent); background: #fff; }
.journal-search-popover button { min-height: 46px; border: 0; border-radius: 6px; background: #000; color: #fff; padding: 0 18px; cursor: pointer; font: 700 14px Inter, system-ui, sans-serif; transition: background-color 180ms ease, transform 180ms ease; }
.journal-search-popover button:hover { background: #262626; transform: translateY(-1px); }
.journal-mobile-panel { display: none; border-top: 1px solid var(--line); padding: 12px 24px; background: white; }
.journal-mobile-panel a { display: block; padding: 12px 0; }
.journal-mobile-catalog-group { display: grid; gap: 4px; }
.journal-mobile-catalog-group > a:first-child { font-weight: 800; color: #111827; }
.journal-mobile-catalog-group > a:not(:first-child) { margin-left: 12px; color: #687074; font-size: 13px; }

.journal-hero { position: relative; height: 617px; overflow: hidden; background: #1d130f; }
.journal-hero-main { position: absolute; inset: 0; overflow: hidden; background: #1d130f; }
.journal-hero-main::after { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(8,7,7,.58) 0%, rgba(8,7,7,.34) 34%, rgba(8,7,7,.08) 68%, rgba(8,7,7,.16) 100%); z-index: 1; }
.journal-hero-main video { width: 100%; height: 100%; object-fit: cover; object-position: center center; filter: saturate(.92) contrast(.92); transform: none; }
.journal-hero-copy { position: absolute; left: 48px; top: 128px; z-index: 2; width: min(740px, calc(100% - 520px)); color: #fff; padding: 34px 36px 36px; border-left: 1px solid rgba(255,255,255,.26); background: linear-gradient(90deg, rgba(12,10,9,.34), rgba(12,10,9,.12)); backdrop-filter: blur(1px); }
.journal-hero-copy span { font-family: Inter, system-ui, sans-serif; font-size: 13px; font-weight: 500; line-height: 1; letter-spacing: .18em; text-transform: uppercase; color: rgba(255,255,255,.78); }
.journal-promo span, .journal-about span { font-family: 'Ephesis', cursive; font-size: 39px; line-height: 1; color: rgba(255,255,255,.92); }
.journal-hero-copy h1 { margin: 34px 0 42px; font-family: 'Playfair Display', Georgia, serif; font-size: clamp(58px, 6.4vw, 82px); font-weight: 650; line-height: 1.08; letter-spacing: 0; word-spacing: 0; color: #fff; max-width: 12ch; }
.journal-hero-copy div { display: flex; align-items: center; gap: 28px; }
.journal-btn { display: inline-flex; align-items: center; justify-content: center; width: 205px; min-height: 58px; border-radius: 999px; padding: 0 32px; font-size: 16px; font-weight: 500; border: 0; }
.journal-btn-dark { background: #fff; color: #202526 !important; }
.journal-btn-light { background: white; color: #252b2c; }
.journal-btn-outline { border-color: #656a6c; background: transparent; color: #343a3c; }
.journal-text-link { display: inline-flex; align-items: center; gap: 8px; color: rgba(255,255,255,.82); font-size: 15px; font-weight: 500; letter-spacing: .02em; line-height: 1; border-bottom: 0; }
.journal-text-link span { font-family: inherit; font-size: 14px; letter-spacing: 0; text-transform: none; color: currentColor; transition: transform 180ms ease; }
.journal-text-link:hover span { transform: translateX(3px); }
.journal-light-link { color: #fff; margin-left: 28px; }
.journal-round-nav { width: 42px; height: 42px; display: inline-grid; place-items: center; border-radius: 50%; border: 1px solid rgba(32,37,38,.16); background: rgba(255,255,255,.94); color: #202526; box-shadow: 0 12px 28px rgba(32,37,38,.08); cursor: pointer; font-size: 18px; transition: transform 180ms ease, background-color 180ms ease, border-color 180ms ease, box-shadow 180ms ease; }
.journal-round-nav:hover { background: #fff; border-color: rgba(32,37,38,.3); box-shadow: 0 16px 34px rgba(32,37,38,.12); }
.journal-round-nav:first-child:hover { transform: translateX(-2px); }
.journal-round-nav:last-child:hover { transform: translateX(2px); }
.journal-hero-nav { position: absolute; right: 38px; top: 50%; z-index: 4; display: grid; gap: 12px; transform: translateY(-50%); }
.journal-hero-arrow { width: 40px; height: 40px; display: grid; place-items: center; border: 1px solid rgba(255,255,255,.34); border-radius: 50%; background: rgba(10,10,10,.18); color: rgba(255,255,255,.86); cursor: pointer; font-family: Georgia, serif; font-size: 24px; font-weight: 300; line-height: 1; transition: background-color 180ms ease, border-color 180ms ease, color 180ms ease, transform 180ms ease; }
.journal-hero-arrow:hover { background: rgba(255,255,255,.12); border-color: rgba(255,255,255,.56); color: #fff; transform: translateY(-1px); }
.journal-hero-dots { position: absolute; left: 84px; bottom: 46px; z-index: 3; display: flex; align-items: center; gap: 12px; color: #fff; }
.journal-hero-dots span, .journal-dots span { width: 7px; height: 7px; border-radius: 50%; background: currentColor; opacity: .8; }
.journal-hero-dots .is-active { width: 20px; height: 20px; border: 3px solid #fff; background: transparent; opacity: 1; }

.journal-section { padding: 86px 40px; overflow: hidden; }
.journal-section-title { max-width: 920px; margin: 0 auto 62px; text-align: center; }
.journal-section-title span { display: block; margin-bottom: -5px; font-family: 'Great Vibes', cursive; font-size: 54px; font-weight: 400; line-height: 1; color: #cfd0d1; }
.journal-section-title h2 { margin: 0 0 24px; font-family: 'Playfair Display', Georgia, serif; font-size: 39px; font-weight: 700; line-height: 1; color: #050505; }
.journal-section-title p { margin: 0; color: var(--muted); font-size: 18px; }
.journal-section-title.is-dark h2, .journal-section-title.is-dark p { color: #f3f3f3; }
.journal-section-title.is-dark span { color: rgba(255,255,255,.22); }

.journal-categories { padding-top: 92px; padding-bottom: 0; }
.journal-category-carousel { position: relative; overflow: hidden; }
.journal-category-row { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(300px, 1fr); gap: 14px; overflow-x: auto; overflow-y: hidden; padding: 2px 58px 6px 0; scroll-behavior: smooth; scrollbar-width: none; -ms-overflow-style: none; }
.journal-category-row::-webkit-scrollbar { display: none; width: 0; height: 0; }
.journal-category-card { min-height: 138px; display: grid; grid-template-columns: 104px minmax(0, 1fr); align-items: center; gap: 20px; padding: 22px 24px; background: var(--soft); border-radius: 7px; }
.journal-category-image { width: 104px; height: 94px; display: grid; place-items: center; overflow: hidden; }
.journal-category-card img { width: 86px; height: 86px; object-fit: contain; mix-blend-mode: multiply; }
.journal-category-copy { min-width: 0; }
.journal-category-card h3, .journal-feature-tile h3 { margin: 0 0 8px; font-family: 'Playfair Display', Georgia, serif; font-size: 25px; font-weight: 500; }
.journal-category-card p { margin: 0 0 12px; color: var(--muted); font-size: 14px; }
.journal-category-card a, .journal-feature-tile a, .journal-blog-card a { display: inline-flex; align-items: center; gap: 6px; color: #252b2c; font-size: 13px; font-weight: 600; letter-spacing: .04em; text-transform: uppercase; }
.journal-category-card a span { font-size: 13px; transition: transform 180ms ease; }
.journal-category-card a:hover span { transform: translateX(3px); }
.journal-category-next { position: absolute; right: 0; top: 50%; z-index: 3; width: 42px; height: 42px; display: grid; place-items: center; border: 1px solid rgba(32,37,38,.16); border-radius: 50%; background: rgba(255,255,255,.9); color: #202526; box-shadow: 0 12px 28px rgba(32,37,38,.08); cursor: pointer; font-family: Georgia, serif; font-size: 20px; line-height: 1; transform: translateY(-50%); transition: transform 180ms ease, background-color 180ms ease, border-color 180ms ease; }
.journal-category-next:hover { background: #fff; border-color: rgba(32,37,38,.28); transform: translateY(-50%) translateX(2px); }
.journal-ticker { margin: 58px -40px 0; height: 42px; display: flex; align-items: center; overflow: hidden; background: var(--cream); color: #202526; white-space: nowrap; }
.journal-ticker-track { min-width: max-content; display: flex; align-items: center; animation: journalMarquee 32s linear infinite; }
.journal-ticker-group { display: inline-flex; align-items: center; gap: 22px; padding-right: 22px; font: 15px Inter, system-ui, sans-serif; letter-spacing: .04em; }
.journal-ticker-group::after { content: "•"; color: rgba(32,37,38,.62); }
.journal-ticker b { font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
@keyframes journalMarquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.journal-tabs { display: flex; justify-content: center; gap: 46px; margin: -32px 0 42px; }
.journal-tabs button { border: 0; border-bottom: 2px solid transparent; background: transparent; padding: 8px 0; color: #777c7f; cursor: pointer; font: 24px Georgia, serif; }
.journal-tabs button.is-active { color: #171b1c; border-color: #171b1c; }
.journal-tabs button:last-child { color: var(--accent); }
.journal-blog-carousel { position: relative; width: min(100%, 1500px); margin: 0 auto; }
.journal-blog-row { overflow-x: auto; overflow-y: hidden; scroll-behavior: smooth; scroll-snap-type: x mandatory; scrollbar-width: none; -ms-overflow-style: none; padding: 2px 52px 14px; }
.journal-blog-row::-webkit-scrollbar { display: none; width: 0; height: 0; }
.journal-blog-track { display: flex; gap: 22px; align-items: stretch; }
.journal-blog-track > .journal-blog-card { flex: 0 0 clamp(400px, 29vw, 460px); scroll-snap-align: start; }
.journal-products-carousel { position: relative; width: min(100%, 1320px); margin: 0 auto; }
.journal-products-row { overflow-x: auto; overflow-y: hidden; scroll-behavior: smooth; scroll-snap-type: x mandatory; scrollbar-width: none; -ms-overflow-style: none; padding: 2px 3px 10px; }
.journal-products-row::-webkit-scrollbar { display: none; width: 0; height: 0; }
.journal-products-track, .journal-feature-track { display: flex; gap: 22px; align-items: stretch; }
.journal-products-track > .journal-product-card,
.journal-feature-track > .journal-product-card { flex: 0 0 calc((100% - 66px) / 4); scroll-snap-align: start; }
.journal-product-card { position: relative; height: 455px; min-width: 0; display: flex; flex-direction: column; padding: 16px 16px 0; overflow: hidden; background: var(--soft); border: 1px solid rgba(32,37,38,.08); border-radius: 6px; box-shadow: 0 12px 30px rgba(32,37,38,.04); cursor: pointer; }
.journal-product-card.is-compact { height: 430px; min-height: 430px; padding: 16px 16px 0; }
.journal-product-image { flex: 0 0 248px; height: 248px; display: grid; place-items: center; overflow: hidden; }
.journal-product-image img { width: min(82%, 205px); height: min(82%, 205px); object-fit: contain; mix-blend-mode: multiply; filter: drop-shadow(0 14px 16px rgba(0,0,0,.15)); }
.journal-sale-flag { position: absolute; left: 22px; top: 20px; z-index: 2; padding: 9px 7px; background: var(--accent); color: white; font-weight: 800; }
.journal-top-badge { position: absolute; right: 16px; top: 16px; z-index: 2; display: inline-flex; align-items: center; gap: 5px; border: 1px solid #555; border-radius: 3px; padding: 6px 9px; background: #fafafa; font-size: 12px; }
.journal-top-badge svg { color: #f5bf22; }
.journal-product-brand { color: #697175; font-size: 13px; text-decoration: underline; }
.journal-product-card h3 { min-height: 46px; margin: 8px 0 7px; font: 19px Georgia, serif; font-weight: 400; line-height: 1.22; }
.journal-price { margin: 0 0 16px; font: 18px Georgia, serif; }
.journal-price del { margin-left: 10px; color: #e25348; font-size: 15px; }
.journal-card-actions { margin: auto -16px 0; min-height: 58px; display: grid; grid-template-columns: 1fr auto auto; align-items: center; gap: 12px; border-top: 1px solid #dbd9d6; padding: 0 16px; }
.journal-card-actions button { display: inline-flex; align-items: center; gap: 8px; border: 0; background: transparent; color: #5a6164; cursor: pointer; font-size: 14px; }
.journal-card-actions button:first-child { min-width: 0; justify-content: flex-start; color: #252b2c; font-weight: 600; }
.journal-card-actions button.is-favorite { color: #b91f2c; }
.journal-cart-notice { position: fixed; left: 50%; bottom: 24px; z-index: 130; width: min(360px, calc(100vw - 32px)); transform: translateX(-50%); border-radius: 8px; background: #202526; color: #fff; padding: 12px 18px; text-align: center; font-size: 14px; font-weight: 700; box-shadow: 0 18px 42px rgba(0,0,0,.18); }
.journal-product-nav { position: absolute; top: 50%; z-index: 4; width: 42px; height: 42px; display: grid; place-items: center; border: 1px solid rgba(32,37,38,.16); border-radius: 50%; background: rgba(255,255,255,.94); color: #202526; box-shadow: 0 12px 28px rgba(32,37,38,.08); cursor: pointer; font-family: Georgia, serif; font-size: 30px; font-weight: 300; line-height: 1; transform: translateY(-50%); transition: transform 180ms ease, background-color 180ms ease, border-color 180ms ease, box-shadow 180ms ease; }
.journal-product-nav:hover { background: #fff; border-color: rgba(32,37,38,.3); box-shadow: 0 16px 34px rgba(32,37,38,.12); }
.journal-product-nav.is-prev { left: -18px; }
.journal-product-nav.is-next { right: -18px; }
.journal-product-nav.is-prev:hover { transform: translateY(-50%) translateX(-2px); }
.journal-product-nav.is-next:hover { transform: translateY(-50%) translateX(2px); }
.journal-blog-carousel .journal-product-nav { top: 50%; }
.journal-blog-carousel .journal-product-nav svg { width: 18px; height: 18px; stroke-width: 2; }
.journal-product-card.is-compact .journal-product-image { flex-basis: 220px; height: 220px; }
.journal-product-card.is-compact .journal-product-image img { width: 86%; height: 86%; object-fit: contain; }
.journal-product-card.is-compact h3 { min-height: 45px; margin: 8px 0 7px; font-size: 18px; line-height: 1.25; }
.journal-product-card.is-compact .journal-product-brand { font-size: 12px; }
.journal-product-card.is-compact .journal-price { margin-bottom: 14px; font-size: 17px; }
.journal-product-card.is-compact .journal-card-actions { margin-left: -16px; margin-right: -16px; min-height: 56px; gap: 10px; padding: 0 14px; }
.journal-product-card.is-compact .journal-card-actions button { font-size: 13px; }
.journal-products { padding-top: 74px; padding-bottom: 66px; }
.journal-products .journal-section-title { margin-bottom: 42px; }
.journal-products .journal-section-title h2 { margin-bottom: 16px; }
.journal-products .journal-tabs { gap: 34px; margin: -18px 0 30px; }
.journal-products .journal-tabs button { font-size: 20px; padding: 7px 0; }
.journal-products-carousel { width: min(100%, 1500px); }
.journal-products .journal-products-row { padding: 2px 48px 12px 3px; }
.journal-products .journal-products-track { gap: 20px; }
.journal-products .journal-products-track > .journal-product-card { flex: 0 0 clamp(300px, 21vw, 330px); }
.journal-products .journal-product-card { height: 418px; padding: 14px 14px 0; }
.journal-products .journal-product-image { flex-basis: 218px; height: 218px; }
.journal-products .journal-product-image img { width: min(80%, 176px); height: min(80%, 176px); object-fit: contain; }
.journal-products .journal-product-brand { font-size: 12px; }
.journal-products .journal-product-card h3 { min-height: 42px; margin: 7px 0 6px; font-size: 18px; line-height: 1.2; }
.journal-products .journal-price { margin-bottom: 12px; font-size: 17px; }
.journal-products .journal-price del { font-size: 14px; }
.journal-products .journal-card-actions { margin-left: -14px; margin-right: -14px; min-height: 54px; gap: 10px; padding: 0 14px; }
.journal-products .journal-card-actions button { font-size: 13px; }
.journal-products .journal-top-badge { right: 14px; top: 14px; padding: 5px 8px; font-size: 11px; }
.journal-products .journal-sale-flag { left: 16px; top: 14px; padding: 8px 6px; }
.journal-favorite-prompt { position: fixed; inset: 0; z-index: 120; display: grid; place-items: center; padding: 20px; background: rgba(20,20,20,.42); backdrop-filter: blur(4px); }
.journal-favorite-prompt > div { position: relative; width: min(430px, 100%); border-radius: 8px; border: 1px solid rgba(0,0,0,.1); background: #fff; padding: 30px; box-shadow: 0 24px 70px rgba(0,0,0,.18); }
.journal-favorite-prompt button { position: absolute; right: 14px; top: 12px; border: 0; background: transparent; color: #202526; font-size: 24px; cursor: pointer; }
.journal-favorite-prompt strong { display: block; color: #202526; font: 28px 'Playfair Display', Georgia, serif; }
.journal-favorite-prompt p { margin: 12px 0 22px; color: #687074; font-size: 15px; line-height: 1.65; }
.journal-favorite-prompt div div { display: flex; flex-wrap: wrap; gap: 10px; }
.journal-favorite-prompt a { min-height: 44px; display: inline-flex; align-items: center; justify-content: center; border-radius: 8px; border: 1px solid #000; background: #000; color: #fff; padding: 0 18px; font-weight: 700; }
.journal-favorite-prompt a + a { background: #fff; color: #202526; border-color: rgba(0,0,0,.16); }

.journal-services { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; padding: 40px 30px; text-align: center; background: var(--cream); }
.journal-services article { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 24px 18px; border-radius: 20px; background: rgba(255,255,255,.20); border: 1px solid transparent; transition: transform 300ms ease-out, box-shadow 300ms ease-out, background-color 300ms ease-out, border-color 300ms ease-out; }
.journal-services svg { margin: 0 auto; font-size: 32px; color: #555b5e; transition: transform 300ms ease-out, color 300ms ease-out; }
.journal-services h3 { margin: 12px 0 6px; font: 22px 'Playfair Display', Georgia, serif; color: #2b2b28; transition: color 300ms ease-out; }
.journal-services h3::after { content: ""; display: block; width: 0; height: 2px; margin: 8px auto 0; border-radius: 999px; background: rgba(46,34,24,.18); transition: width 300ms ease-out, background-color 300ms ease-out; }
.journal-services p { margin: 0; font-size: 14px; color: #554f4a; transition: color 300ms ease-out; }
.journal-services article:hover { transform: translateY(-4px); box-shadow: 0 16px 32px rgba(32,37,38,.10); background: rgba(255,255,255,.92); border-color: rgba(32,37,38,.08); }
.journal-services article:hover svg { transform: translateY(-3px); color: #23211d; }
.journal-services article:hover h3 { color: #12110f; }
.journal-services article:hover h3::after { width: 24px; background: rgba(46,34,24,.40); }
.journal-services article:hover p { color: #4c493f; }
.journal-feature-showcase { width: min(100%, 1320px); margin: 0 auto; display: grid; gap: 24px; }
.journal-feature-row { display: grid; grid-template-columns: minmax(230px, 260px) minmax(0, 1fr); gap: 22px; align-items: stretch; }
.journal-feature-carousel { position: relative; min-width: 0; }
.journal-feature-products { overflow-x: auto; overflow-y: hidden; scroll-behavior: smooth; scroll-snap-type: x mandatory; scrollbar-width: none; -ms-overflow-style: none; padding: 2px 48px 12px 3px; }
.journal-feature-products::-webkit-scrollbar { display: none; width: 0; height: 0; }
.journal-feature-tile { position: relative; height: 455px; min-height: 455px; display: flex; overflow: hidden; padding: 28px 24px; background: linear-gradient(135deg, #f1e4d8, #f8f5f1); border: 1px solid rgba(32,37,38,.08); border-radius: 6px; box-shadow: 0 12px 30px rgba(32,37,38,.04); }
.journal-feature-tile::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(255,255,255,.16), rgba(255,255,255,0)); pointer-events: none; }
.journal-feature-copy { position: relative; z-index: 2; width: 58%; display: flex; flex-direction: column; align-items: flex-start; }
.journal-feature-tile h3 { margin-bottom: 18px; font-size: 25px; }
.journal-feature-copy div { display: grid; gap: 8px; }
.journal-feature-tile .journal-feature-copy div a { display: block; color: #4f5659; font-size: 14px; font-weight: 400; letter-spacing: 0; line-height: 1.35; text-transform: none; }
.journal-feature-more { margin-top: auto; padding-top: 18px; }
.journal-feature-tile img { position: absolute; right: -18px; bottom: 0; z-index: 1; width: 70%; height: 78%; object-fit: contain; object-position: right bottom; mix-blend-mode: multiply; filter: drop-shadow(0 18px 18px rgba(70,55,45,.13)); }
.journal-featured .journal-feature-showcase { width: min(100%, 1500px); }
.journal-featured .journal-feature-track { gap: 20px; }
.journal-featured .journal-feature-track > .journal-product-card,
.journal-featured .journal-feature-tile { flex: 0 0 calc((100% - 60px) / 4); scroll-snap-align: start; }
.journal-featured .journal-feature-tile { height: 418px; min-height: 418px; padding: 24px 22px; }
.journal-featured .journal-feature-tile h3 { margin-bottom: 16px; font-size: 24px; }
.journal-featured .journal-feature-tile img { right: -20px; width: 68%; height: 72%; }
.journal-featured .journal-product-card { height: 418px; padding: 14px 14px 0; }
.journal-featured .journal-product-image { flex-basis: 218px; height: 218px; }
.journal-featured .journal-product-image img { width: min(80%, 176px); height: min(80%, 176px); object-fit: contain; }
.journal-featured .journal-product-brand { font-size: 12px; }
.journal-featured .journal-product-card h3 { min-height: 42px; margin: 7px 0 6px; font-size: 18px; line-height: 1.2; }
.journal-featured .journal-price { margin-bottom: 12px; font-size: 17px; }
.journal-featured .journal-price del { font-size: 14px; }
.journal-featured .journal-card-actions { margin-left: -14px; margin-right: -14px; min-height: 54px; gap: 10px; padding: 0 14px; }
.journal-featured .journal-card-actions button { font-size: 13px; }
.journal-featured .journal-top-badge { right: 14px; top: 14px; padding: 5px 8px; font-size: 11px; }
.journal-featured .journal-sale-flag { left: 16px; top: 14px; padding: 8px 6px; }
.journal-featured .journal-product-nav svg { width: 18px; height: 18px; stroke-width: 2; }
.journal-promo { min-height: 570px; display: flex; align-items: center; padding: 86px 40px; background-size: cover; background-position: center right; color: var(--ink); }
.journal-promo > div { width: min(850px, 58vw); }
.journal-promo span { color: rgba(88,77,67,.54); }
.journal-promo h2 { margin: 20px 0 22px; font: clamp(50px, 5vw, 74px) 'Playfair Display', Georgia, serif; line-height: 1.04; color: #141819; max-width: 12.8ch; }
.journal-promo p { max-width: 620px; margin: 0 0 44px; color: #55534f; font-size: 18px; line-height: 1.7; }
.journal-promo .journal-light-link { color: rgba(32,37,38,.78); }

.journal-testimonials { padding: 72px 40px 68px; text-align: center; overflow: hidden; background: linear-gradient(180deg, #fff, #faf8f5); }
.journal-testimonials .journal-section-title { margin-bottom: 36px; }
.journal-testimonials .journal-section-title h2 { margin-bottom: 16px; }
.journal-testimonials .journal-section-title p { max-width: 760px; margin: 0 auto; }
.journal-testimonial-stage { width: min(100%, 980px); display: grid; grid-template-columns: 44px minmax(0, 1fr) 44px; align-items: center; gap: 18px; margin: 0 auto; }
.journal-testimonial-copy { position: relative; min-height: 278px; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden; border: 1px solid rgba(32,37,38,.1); border-radius: 8px; background: rgba(255,255,255,.92); padding: 34px 44px 26px; box-shadow: 0 18px 42px rgba(32,37,38,.08); }
.journal-rating { display: inline-flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 18px; color: #202526; font-size: 13px; }
.journal-rating span { display: inline-flex; align-items: center; gap: 3px; color: #d6a348; }
.journal-rating svg { width: 14px; height: 14px; }
.journal-rating strong { color: #202526; font-family: Georgia, serif; font-size: 17px; letter-spacing: 0; }
.journal-rating em { color: #687074; font-style: normal; }
.journal-quotes { width: 34px; height: 34px; display: grid; place-items: center; margin: 0 auto 12px; border-radius: 50%; background: #eadbcb; color: #4f5659; font: 30px Georgia, serif; line-height: 1; }
.journal-testimonials blockquote { max-width: 760px; margin: 0 auto 18px; color: #3f4649; font-size: 20px; line-height: 1.55; font-style: italic; }
.journal-testimonials strong { color: #202526; font-family: Georgia, serif; letter-spacing: 1px; }
.journal-testimonials small { display: block; margin-top: 6px; color: #687074; font-size: 12px; letter-spacing: .08em; text-transform: uppercase; }
.journal-testimonials .journal-dots { margin-top: 20px; display: flex; justify-content: center; gap: 12px; }
.journal-dots .is-active { opacity: 1; }

.journal-about { display: grid; grid-template-columns: 1fr 1fr; gap: 90px; align-items: center; padding: 130px 40px 80px; background: linear-gradient(90deg, #f1e0cf, #fff 45%, #fff8ef); }
.journal-about img { width: 100%; height: 620px; object-fit: cover; }
.journal-about > div { max-width: 820px; }
.journal-about span { color: #c3c6c8; }
.journal-about h2 { margin: -12px 0 24px; font: 42px 'Playfair Display', Georgia, serif; }
.journal-about p { margin: 0 0 38px; color: #697075; font-size: 20px; line-height: 1.55; }
.journal-gallery { padding: 70px 40px 40px; overflow: hidden; background: #222829; }
.journal-gallery-row { display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 18px; align-items: stretch; max-height: 760px; overflow-y: auto; padding-right: 8px; scrollbar-width: thin; }
.journal-gallery-item { min-width: 0; margin: 0; overflow: hidden; border-radius: 6px; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.08); }
.journal-gallery-row img { width: 100%; height: 190px; object-fit: cover; opacity: .9; }
.journal-gallery-item figcaption { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; padding: 9px 10px; color: rgba(255,255,255,.72); font-size: 12px; }
.journal-gallery-status { grid-column: 1 / -1; color: rgba(255,255,255,.72); text-align: center; }

.journal-blog-card { height: 364px; display: flex; flex-direction: column; overflow: hidden; border: 1px solid rgba(32,37,38,.08); border-radius: 6px; background: #fff; box-shadow: 0 12px 30px rgba(32,37,38,.04); }
.journal-blog-image { position: relative; flex: 0 0 164px; height: 164px; display: block !important; overflow: hidden; border-radius: 2px 2px 0 0; background: var(--soft); }
.journal-blog-image img { width: 100%; height: 100%; object-fit: cover; }
.journal-blog-image div { position: absolute; left: 10px; top: 10px; width: 54px; height: 56px; display: grid; place-items: center; align-content: center; border-radius: 7px; background: #eadbcb; font-family: Georgia, serif; line-height: 1; box-shadow: 0 10px 22px rgba(32,37,38,.1); }
.journal-blog-image strong { font-size: 21px; }
.journal-blog-image span { font-size: 12px; }
.journal-blog-card > p:first-of-type { margin: 0; padding: 9px 16px; background: rgba(237,232,226,.86); color: #687074; font-size: 11px; line-height: 1.35; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.journal-blog-card h3 { display: -webkit-box; min-height: 0; margin: 12px 16px 7px; overflow: hidden; -webkit-box-orient: vertical; -webkit-line-clamp: 2; font: 20px Georgia, serif; font-weight: 400; line-height: 1.2; }
.journal-blog-card > p:not(:first-of-type) { display: -webkit-box; margin: 0 16px 8px; overflow: hidden; -webkit-box-orient: vertical; -webkit-line-clamp: 2; color: #666d70; font-size: 13px; line-height: 1.45; }
.journal-blog-card > a { margin: auto 12px 12px; padding: 12px 14px; border-radius: 999px; transition: gap 180ms ease, background-color 180ms ease, color 180ms ease; }
.journal-blog-card > a svg { flex: 0 0 auto; transition: transform 180ms ease; }
.journal-blog-card > a:hover { gap: 10px; background: rgba(237,232,226,.78); color: #15191a; }
.journal-blog-card > a:hover svg { transform: translateX(3px); }
.journal-blog-more { margin-top: 24px; display: flex; justify-content: center; }
.journal-blog-more a { min-height: 48px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; border-radius: 999px; background: #202526; color: #fff; padding: 0 24px; font-size: 13px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; box-shadow: 0 14px 30px rgba(32,37,38,.14); transition: transform 180ms ease, background-color 180ms ease, box-shadow 180ms ease; }
.journal-blog-more a:hover { transform: translateY(-2px); background: #000; color: #fff; box-shadow: 0 18px 36px rgba(32,37,38,.18); }
.journal-blog-more svg { flex: 0 0 auto; }

.journal-newsletter { padding: 96px 20px 82px; text-align: center; background: var(--cream); }
.journal-newsletter > svg { margin: 0 auto 22px; font-size: 46px; color: #202526; }
.journal-newsletter h2 { margin: 0 0 20px; font: clamp(38px, 3vw, 50px) 'Playfair Display', Georgia, serif; }
.journal-newsletter p { margin: 0 0 46px; color: #333; font-size: 19px; }
.journal-newsletter form { display: flex; align-items: center; justify-content: center; gap: 10px; }
.journal-newsletter form > svg { color: #a8a8a8; font-size: 34px; }
.journal-newsletter input { width: min(500px, 56vw); height: 56px; border: 1px solid #d5d5d5; border-radius: 999px; background: #f7f7f7; padding: 0 160px 0 28px; outline: 0; }
.journal-newsletter button { height: 46px; margin-left: -150px; display: inline-flex; align-items: center; gap: 8px; border: 0; border-radius: 999px; background: #202526; color: white; padding: 0 24px; cursor: pointer; }

.journal-footer { background: var(--soft); }
.journal-footer-main { display: grid; grid-template-columns: 1.2fr repeat(3, 1fr); gap: 74px; padding: 112px 42px 120px; }
.journal-footer-brand { background: white; margin: -112px 0 -120px -42px; padding: 112px 42px 120px; }
.journal-footer-brand .journal-logo { margin-bottom: 36px; font-size: 30px; }
.journal-footer-brand p { display: flex; align-items: center; gap: 12px; color: #526067; font-size: 18px; }
.journal-socials { display: flex; gap: 14px; margin-top: 38px; }
.journal-socials span, .journal-socials a { width: 54px; height: 54px; display: grid; place-items: center; border: 1px solid #e1e1e1; border-radius: 50%; background: white; color: #4e5b62; font-size: 20px; }
.journal-footer-col h3 { margin: 0 0 28px; font: 24px Georgia, serif; color: #070707; }
.journal-footer-col a { display: block; margin: 17px 0; color: #42515a; }
.journal-footer-col form { display: flex; align-items: center; gap: 8px; margin-top: 18px; }
.journal-footer-col input { min-width: 0; height: 42px; border: 1px solid #d8d8d8; border-radius: 999px; background: #fff; padding: 0 14px; color: #202526; outline: 0; }
.journal-footer-col button { height: 42px; border: 0; border-radius: 999px; background: #202526; color: #fff; padding: 0 16px; cursor: pointer; }
.journal-copyright { min-height: 86px; display: flex; justify-content: space-between; align-items: center; gap: 24px; padding: 0 42px; background: var(--cream); color: #514b47; }
.journal-copyright div { display: flex; gap: 9px; flex-wrap: wrap; justify-content: flex-end; }
.journal-copyright span { border-radius: 3px; background: #5c5c5c; color: white; padding: 6px 8px; font-weight: 800; font-size: 13px; }

.journal-header {
  position: sticky;
  transition: box-shadow 240ms ease, background-color 240ms ease, transform 240ms ease;
}
.journal-header.is-scrolled {
  background: rgba(255,255,255,.94);
  box-shadow: 0 14px 34px rgba(32,37,38,.1);
  backdrop-filter: blur(14px);
}
.journal-header.is-scrolled .journal-header-inner {
  height: 66px;
}
.journal-header-inner,
.journal-logo,
.journal-nav-left a,
.journal-nav-right a,
.journal-nav-left button,
.journal-nav-right button,
.journal-btn,
.journal-text-link,
.journal-round-nav,
.journal-card-actions button,
.journal-socials span,
.journal-socials a {
  transition: transform 220ms ease, color 220ms ease, background-color 220ms ease, border-color 220ms ease, opacity 220ms ease, box-shadow 220ms ease;
}
.journal-nav-left a:hover,
.journal-nav-right a:hover,
.journal-nav-left button:hover,
.journal-nav-right button:hover {
  color: var(--accent);
  transform: translateY(-2px);
}
.journal-nav-left .journal-catalog-item:hover,
.journal-nav-left .journal-catalog-item.is-active {
  color: #111827;
  transform: translateX(2px);
}
.journal-nav-left .journal-catalog-product-grid a:hover {
  color: #111827;
  transform: translateX(3px);
}
[dir="rtl"] .journal-nav-left .journal-catalog-item:hover,
[dir="rtl"] .journal-nav-left .journal-catalog-item.is-active {
  transform: translateX(-2px);
}
[dir="rtl"] .journal-nav-left .journal-catalog-product-grid a:hover {
  transform: translateX(-3px);
}
.journal-logo-link:hover .journal-logo {
  transform: translateY(-2px);
}
.journal-btn:hover,
.journal-card-actions button:hover,
.journal-socials span:hover, .journal-socials a:hover {
  transform: translateY(-3px);
}
.journal-hero-main {
  opacity: 0;
  visibility: hidden;
  transform: scale(1.035);
  transition: opacity 720ms ease, visibility 720ms ease, transform 720ms ease;
}
.journal-hero-main.is-active {
  opacity: 1;
  visibility: visible;
  transform: scale(1);
}
.journal-hero-main video,
.journal-hero-main img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 68% center;
}
.journal-hero-copy > * {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 620ms ease, transform 620ms cubic-bezier(.22,1,.36,1);
}
.journal-hero-main.is-active .journal-hero-copy > * {
  opacity: 1;
  transform: translateY(0);
}
.journal-hero-main.is-active .journal-hero-copy > *:nth-child(2) {
  transition-delay: 90ms;
}
.journal-hero-main.is-active .journal-hero-copy > *:nth-child(3) {
  transition-delay: 180ms;
}
.journal-hero-dots button,
.journal-dots button {
  width: 5px;
  height: 5px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: currentColor;
  color: inherit;
  opacity: .42;
  cursor: pointer;
  transition: width 220ms ease, height 220ms ease, opacity 220ms ease, background-color 220ms ease, border-color 220ms ease;
}
.journal-hero-dots button.is-active {
  width: 22px;
  height: 5px;
  border: 0;
  background: currentColor;
  opacity: 1;
}
.journal-dots button.is-active {
  width: 24px;
  opacity: 1;
}
.journal-category-card,
.journal-product-card,
.journal-feature-tile,
.journal-blog-card,
.journal-gallery-row img {
  transition: transform 260ms ease, box-shadow 260ms ease, filter 260ms ease;
}
.journal-category-card:hover,
.journal-product-card:hover,
.journal-feature-tile:hover,
.journal-blog-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 22px 45px rgba(32,37,38,.12);
}
.journal-product-card:hover .journal-product-image img,
.journal-blog-card:hover .journal-blog-image img,
.journal-gallery-row img:hover {
  transform: scale(1.045);
}
.journal-product-image img,
.journal-blog-image img,
.journal-gallery-row img {
  transition: transform 420ms cubic-bezier(.22,1,.36,1), opacity 220ms ease;
}
.journal-testimonial-copy {
  animation: journalFadeUp 420ms ease both;
}
[data-animate] {
  opacity: 0;
  transform: translateY(34px);
  transition: opacity 720ms ease, transform 720ms cubic-bezier(.22,1,.36,1);
}
[data-animate].is-visible {
  opacity: 1;
  transform: translateY(0);
}
@keyframes journalFadeUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@media (prefers-reduced-motion: reduce) {
  .journal-page *,
  .journal-page *::before,
  .journal-page *::after {
    animation: none !important;
    scroll-behavior: auto !important;
    transition-duration: .01ms !important;
  }
  [data-animate],
  .journal-hero-main,
  .journal-hero-copy > * {
    opacity: 1 !important;
    visibility: visible !important;
    transform: none !important;
  }
  .journal-hero-main:not(.is-active) {
    display: none;
  }
}

@media (max-width: 1180px) {
  .journal-header-inner { padding: 0 20px; }
  .journal-nav-left, .journal-nav-right { gap: 14px; }
  .journal-catalog-dropdown { width: min(940px, calc(100vw - 40px)); grid-template-columns: 260px minmax(0, 1fr); }
  .journal-catalog-product-grid { gap: 9px; }
  .journal-blog-track > .journal-blog-card { flex-basis: clamp(380px, 31vw, 440px); }
  .journal-feature-row { grid-template-columns: minmax(220px, 260px) minmax(0, 1fr); gap: 18px; }
  .journal-feature-products { gap: 18px; }
  .journal-gallery-row { grid-template-columns: repeat(3, 1fr); }
  .journal-footer-main { grid-template-columns: 1fr 1fr; }
  .journal-footer-brand { margin: 0; }
}

@media (max-width: 820px) {
  .journal-header { position: relative; }
  .journal-header-inner { height: 76px; grid-template-columns: auto 1fr auto; }
  .journal-nav-left a, .journal-nav-right a:not(.journal-icon-link):not(:last-child) { display: none; }
  .journal-catalog-menu { display: none; }
  .journal-nav-right button:nth-of-type(n+3) { display: none; }
  .journal-search-popover { left: 16px; right: 16px; top: calc(100% + 8px); width: auto; }
  .journal-search-popover form { grid-template-columns: 22px minmax(0, 1fr); }
  .journal-search-popover button { grid-column: 1 / -1; width: 100%; }
  .journal-logo-link { justify-self: center; }
  .journal-mobile-panel { display: grid; gap: 4px; }
  .journal-mobile-panel a { border-radius: 8px; padding: 12px 14px; color: #303438; font-size: 14px; font-weight: 600; transition: background-color 160ms ease, color 160ms ease, transform 160ms ease; }
  .journal-mobile-panel a:hover { background: #eee4dc; color: #111827; transform: translateX(2px); }
  .journal-hero { display: block; padding: 0; }
  .journal-hero-peek { display: none; }
  .journal-hero-main { height: 560px; }
  .journal-hero-copy { padding: 30px 32px; background: linear-gradient(90deg, rgba(12,10,9,.38), rgba(12,10,9,.16)); }
  .journal-hero-copy h1 { font-size: clamp(48px, 7vw, 68px); }
  .journal-hero-copy div { flex-wrap: wrap; gap: 20px; }
  .journal-section { padding: 64px 20px; }
  .journal-category-row { grid-auto-columns: minmax(300px, 86vw); }
  .journal-services { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .journal-about { grid-template-columns: 1fr; }
  .journal-blog-row { padding-left: 34px; padding-right: 34px; }
  .journal-blog-track > .journal-blog-card { flex-basis: calc((100% - 22px) / 2); }
  .journal-products-track > .journal-product-card,
  .journal-feature-track > .journal-product-card { flex-basis: calc((100% - 22px) / 2); }
  .journal-products .journal-products-track > .journal-product-card { flex-basis: calc((100% - 20px) / 2); }
  .journal-featured .journal-feature-track > .journal-product-card,
  .journal-featured .journal-feature-tile { flex-basis: calc((100% - 20px) / 2); }
  .journal-products .journal-products-row { padding-right: 34px; }
  .journal-featured .journal-feature-products { padding-right: 34px; }
  .journal-product-nav.is-prev { left: -4px; }
  .journal-product-nav.is-next { right: -4px; }
  .journal-feature-row { grid-template-columns: 1fr; }
  .journal-feature-tile { height: 360px; min-height: 360px; }
  .journal-services { gap: 28px; }
  .journal-promo > div { width: 100%; }
  .journal-testimonial-stage { grid-template-columns: 42px minmax(0, 1fr) 42px; gap: 10px; }
  .journal-testimonial-copy { min-height: 260px; padding: 30px 28px 24px; }
  .journal-about { gap: 38px; padding: 70px 20px; }
  .journal-about img { height: 420px; }
  .journal-gallery-row { grid-template-columns: 1fr; }
  .journal-gallery-row img, .journal-gallery-row img:nth-child(2), .journal-gallery-row img:nth-child(4), .journal-gallery-row img:nth-child(5) { height: 390px; transform: none; }
  .journal-newsletter form { flex-wrap: wrap; }
  .journal-newsletter input { width: 100%; padding-right: 28px; }
  .journal-newsletter button { width: 180px; margin-left: 0; justify-content: center; }
  .journal-footer-main, .journal-copyright { display: grid; grid-template-columns: 1fr; }
  .journal-footer-main { padding: 70px 24px; gap: 30px; }
  .journal-footer-brand { padding: 0; background: transparent; }
  .journal-copyright { padding: 24px; justify-content: start; }
}

@media (max-width: 1024px) {
  .journal-page {
    overflow-x: hidden;
  }

  .journal-header-inner {
    min-width: 0;
  }

  .journal-nav-left,
  .journal-nav-right {
    min-width: 0;
  }

  .journal-hero-copy {
    width: min(660px, calc(100% - 48px));
    left: 24px;
    top: auto;
    bottom: 84px;
  }

  .journal-hero-copy h1 {
    margin: 26px 0 32px;
    font-size: clamp(42px, 7vw, 64px);
  }

  .journal-category-card {
    grid-template-columns: 96px minmax(0, 1fr);
    min-width: 0;
    padding: 20px;
  }

  .journal-feature-row {
    grid-template-columns: 1fr;
  }

  .journal-product-card {
    min-height: 455px;
  }

  .journal-product-card.is-compact {
    min-height: 430px;
  }

  .journal-feature-tile {
    min-height: 360px;
  }
}

@media (max-width: 700px) {
  .journal-header-inner {
    height: auto;
    min-height: 76px;
    grid-template-columns: auto 1fr auto;
    padding: 14px 16px;
  }

  .journal-logo-link {
    width: auto;
    max-width: 150px;
  }

  .journal-logo {
    font-size: 40px;
  }

  .journal-mobile-panel {
    padding: 8px 18px 16px;
  }

  .journal-hero {
    height: 540px;
  }

  .journal-hero-main {
    height: 100%;
  }

  .journal-hero-copy {
    left: 18px;
    bottom: 76px;
    width: calc(100% - 36px);
    padding: 24px;
  }

  .journal-hero-copy span {
    font-size: 11px;
  }

  .journal-hero-copy h1 {
    margin: 20px 0 24px;
    font-size: clamp(38px, 12vw, 54px);
    line-height: 1.05;
  }

  .journal-hero-copy div,
  .journal-promo > div {
    width: 100%;
  }

  .journal-hero-copy div {
    align-items: stretch;
    gap: 12px;
  }

  .journal-btn {
    width: 100%;
    min-height: 52px;
    padding: 0 18px;
    font-size: 15px;
  }

  .journal-text-link {
    width: fit-content;
    font-size: 15px;
  }

  .journal-hero-nav {
    right: 16px;
    top: auto;
    bottom: 18px;
    grid-template-columns: repeat(2, 36px);
    gap: 8px;
    transform: none;
  }

  .journal-hero-arrow {
    width: 36px;
    height: 36px;
    font-size: 22px;
  }

  .journal-hero-dots {
    left: 18px;
    bottom: 34px;
    transform: none;
    gap: 9px;
  }

  .journal-section,
  .journal-categories,
  .journal-products,
  .journal-featured,
  .journal-blog,
  .journal-testimonials,
  .journal-gallery,
  .journal-newsletter {
    padding-left: 16px;
    padding-right: 16px;
  }

  .journal-section-title {
    margin-bottom: 34px;
  }

  .journal-section-title span {
    font-size: 42px;
  }

  .journal-section-title h2,
  .journal-about h2 {
    font-size: 31px;
  }

  .journal-section-title p,
  .journal-about p,
  .journal-newsletter p {
    font-size: 15px;
    line-height: 1.7;
  }

  .journal-category-row {
    grid-auto-flow: row;
    grid-auto-columns: auto;
    grid-template-columns: 1fr;
    overflow-x: visible;
    padding-right: 0;
  }

  .journal-category-next {
    display: none;
  }

  .journal-category-card {
    grid-template-columns: 86px minmax(0, 1fr);
    gap: 16px;
    padding: 18px;
  }

  .journal-category-image {
    width: 82px;
    height: 82px;
  }

  .journal-category-card img {
    width: 74px;
    height: 74px;
  }

  .journal-ticker {
    margin-left: -16px;
    margin-right: -16px;
    height: 38px;
  }

  .journal-tabs {
    gap: 18px;
    overflow-x: auto;
    justify-content: flex-start;
    padding-bottom: 4px;
  }

  .journal-tabs button {
    flex: 0 0 auto;
    font-size: 19px;
  }

  .journal-products {
    padding-top: 54px;
    padding-bottom: 52px;
  }

  .journal-products .journal-section-title {
    margin-bottom: 30px;
  }

  .journal-products .journal-tabs {
    margin: -14px 0 24px;
    gap: 18px;
  }

  .journal-products .journal-tabs button {
    font-size: 18px;
  }

  .journal-services,
  .journal-about {
    grid-template-columns: 1fr;
  }

  .journal-blog-track {
    gap: 16px;
  }

  .journal-blog-track > .journal-blog-card {
    flex-basis: min(100%, 340px);
  }

  .journal-blog-card {
    height: 356px;
  }

  .journal-blog-image {
    flex-basis: 158px;
    height: 158px;
  }

  .journal-blog-more {
    margin-top: 20px;
  }

  .journal-blog-more a {
    width: 100%;
    max-width: 320px;
  }

  .journal-feature-tile {
    height: 340px;
    min-height: 340px;
    padding: 26px 24px;
  }

  .journal-feature-tile img {
    width: 62%;
    height: 72%;
  }

  .journal-product-image {
    flex-basis: 238px;
    height: 238px;
  }

  .journal-products-track,
  .journal-feature-track {
    gap: 16px;
  }

  .journal-products-track > .journal-product-card,
  .journal-feature-track > .journal-product-card {
    flex-basis: min(100%, 340px);
  }

  .journal-products .journal-products-track > .journal-product-card {
    flex-basis: min(100%, 320px);
  }

  .journal-featured .journal-feature-track > .journal-product-card,
  .journal-featured .journal-feature-tile {
    flex-basis: min(100%, 320px);
  }

  .journal-products .journal-products-row {
    padding-right: 24px;
  }

  .journal-featured .journal-feature-products {
    padding-right: 24px;
  }

  .journal-product-card {
    height: 440px;
    min-height: 440px;
  }

  .journal-products .journal-product-card {
    height: 405px;
    min-height: 405px;
  }

  .journal-products .journal-product-image {
    flex-basis: 205px;
    height: 205px;
  }

  .journal-featured .journal-product-card,
  .journal-featured .journal-feature-tile {
    height: 405px;
    min-height: 405px;
  }

  .journal-featured .journal-product-image {
    flex-basis: 205px;
    height: 205px;
  }

  .journal-product-card.is-compact {
    height: 430px;
    min-height: 430px;
  }

  .journal-product-card h3 {
    min-height: 44px;
    font-size: 18px;
  }

  .journal-card-actions {
    grid-template-columns: 1fr 44px 44px;
    gap: 8px;
    min-height: 58px;
  }

  .journal-card-actions button {
    min-height: 44px;
    justify-content: center;
    font-size: 14px;
  }

  .journal-product-card.is-compact .journal-card-actions {
    grid-template-columns: 1fr 38px 38px;
  }

  .journal-product-card.is-compact .journal-card-actions button {
    min-height: 40px;
    font-size: 12px;
  }

  .journal-services {
    grid-template-columns: 1fr;
    padding: 32px 16px;
    gap: 20px;
  }

  .journal-services article {
    padding: 20px 14px;
    gap: 10px;
  }

  .journal-services svg {
    font-size: 28px;
  }

  .journal-services h3 {
    margin: 10px 0 4px;
    font-size: 18px;
  }

  .journal-services p {
    font-size: 13px;
  }

  .journal-promo {
    min-height: 430px;
    padding: 58px 18px;
    background-position: center;
  }

  .journal-promo h2 {
    margin-bottom: 18px;
    font-size: clamp(38px, 12vw, 54px);
  }

  .journal-promo p {
    margin-bottom: 28px;
    font-size: 15px;
  }

  .journal-light-link {
    display: inline-flex;
    margin: 18px 0 0;
  }

  .journal-testimonial-stage {
    grid-template-columns: 1fr;
    gap: 12px;
    margin-top: 0;
  }

  .journal-testimonial-stage .journal-round-nav {
    grid-row: 2;
    display: inline-grid;
  }

  .journal-testimonial-stage .journal-round-nav:first-child {
    justify-self: end;
    margin-right: 28px;
  }

  .journal-testimonial-stage .journal-round-nav:last-child {
    justify-self: start;
    margin-left: 28px;
  }

  .journal-testimonial-copy {
    min-height: 252px;
    padding: 28px 20px 22px;
  }

  .journal-rating {
    flex-wrap: wrap;
    gap: 8px;
  }

  .journal-testimonials blockquote {
    margin: 0 auto 16px;
    font-size: 17px;
  }

  .journal-about {
    padding: 58px 16px;
  }

  .journal-about img {
    height: 320px;
  }

  .journal-gallery-row {
    grid-template-columns: repeat(auto-fill, minmax(138px, 1fr));
    gap: 12px;
    max-height: 620px;
  }

  .journal-gallery-row img {
    height: 148px;
  }

  .journal-newsletter form {
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
    gap: 12px;
  }

  .journal-newsletter form > svg {
    display: none;
  }

  .journal-newsletter input,
  .journal-newsletter button {
    width: 100%;
    margin-left: 0;
  }

  .journal-newsletter input {
    padding: 0 18px;
  }

  .journal-footer-main,
  .journal-copyright {
    grid-template-columns: 1fr;
    padding-left: 20px;
    padding-right: 20px;
  }

  .journal-copyright div {
    justify-content: flex-start;
  }
}

@media (max-width: 390px) {
  .journal-hero-copy h1 {
    font-size: 36px;
  }

  .journal-category-card {
    grid-template-columns: 1fr;
  }

  .journal-category-image {
    width: 100%;
    height: 120px;
  }

  .journal-category-card img {
    width: 96px;
    height: 96px;
  }

  .journal-card-actions {
    grid-template-columns: 1fr;
  }

  .journal-products-track > .journal-product-card,
  .journal-feature-track > .journal-product-card {
    flex-basis: 100%;
  }

  .journal-products .journal-products-track > .journal-product-card {
    flex-basis: 100%;
  }

  .journal-featured .journal-feature-track > .journal-product-card,
  .journal-featured .journal-feature-tile {
    flex-basis: 100%;
  }

  .journal-blog-track > .journal-blog-card {
    flex-basis: 100%;
  }
}
`;export{ft as A,Xr as B,dt as C,gt as D,nt as E,Hr as F,ht as G,bt as H,xt as I,_ as J,pt as K,Gr as L,jr as M,Ar as N,Er as O,Kr as P,he as Q,st as R,ar as S,S as a,Wr as b,Ke as c,Ze as d,tt as e,it as f,Yr as g,Ur as h,Jr as i,ct as j,ut as k,K as l,mt as m,jt as n,et as o,Qr as p,$r as q,ot as r,lt as s,_r as t,I as u,Vr as v,Zr as w,at as x,qr as y,rt as z};
