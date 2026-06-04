# מרציפן — ספר פרויקט

> מסמך זה מתאר את פרויקט אתר **מאפיית מרציפן** כפי שהוא קיים בפועל במאגר הקוד (repository).
> כל הנאמר כאן נכתב לאחר קריאה ישירה של קוד המקור, ומשקף את המצב האמיתי של הפרויקט — כולל החלקים המוגמרים והחלקים שעדיין בתשתית/בבנייה.
> מונחים טכניים, שמות קבצים, שמות קומפוננטות, שמות ראוטים ומשתני סביבה נשמרים באנגלית במכוון.

---

## 1. סקירת הפרויקט

**מרציפן** הוא אתר תדמית ומכירה (marketing + catalog site) עבור מאפיית הבוטיק המיתולוגית "מרציפן" משוק מחנה יהודה בירושלים — המאפייה הידועה ברוגלך השוקולד החם שלה, הפועלת מאז 1986.

האתר הוא **Single Page Application** בנוי ב‑React, המציג את סיפור המותג, קטלוג מוצרים מלא, עמודי חגים, עמודי סניפים, מדריכי תוכן/SEO מקומיים, וכן תשתית מסחר (סל קניות, checkout, ניהול הזמנות, אזור לקוח ואזור ניהול) שחלקה פעיל וחלקה עדיין בשלב פיתוח/תשתית.

מבחינת בשלות, אפשר לחלק את הפרויקט לשלוש שכבות:

1. **שכבת השיווק והקטלוג (פעילה ומלוטשת)** — דף הבית, הקטלוג, עמוד מוצר, עמודי החגים, סניפים, אודות, צור קשר, עמודי תוכן ו‑SEO, סל קניות. זהו ליבת הפרויקט והחלק המוגמר.
2. **שכבת המסחר (תשתית בשלבים)** — checkout מבוסס Stripe, webhook לשמירת הזמנות, אינטגרציית Supabase, ומתאמי סליקה ישראליים (Cardcom / Tranzila / PayPlus) שעדיין מהווים שלד (stubs). מתג התשלומים כבוי כברירת מחדל.
3. **שכבת הצמיחה והניהול (תשתית/בנייה)** — אזור אדמין, אזור לקוח עם התחברות OTP ומועדון לקוחות, ועמודי SEO רבים. רובם מותנים ב‑backend פעיל ב‑Supabase.

**הבעיה שהאתר פותר:** נוכחות דיגיטלית מקצועית למאפייה מסורתית — מקום שבו לקוח יכול להכיר את המותג, לדפדף בקטלוג, להבין מה זמין לחגים ולשבת, למצוא את הסניף הקרוב ושעות הפתיחה, ולפנות בקלות (בעיקר דרך וואטסאפ) — תוך הנחת התשתית להזמנה ותשלום אונליין בהמשך.

---

## 2. מטרת הפרויקט

מטרת הפרויקט היא להעניק למאפייה ותיקה ומוכרת **חזית דיגיטלית ברמת מותג פרימיום**, נאמנה לסיפור ולערכים של העסק (משפחתיות, מסורת, טריות, כשרות בד"ץ), ובו בזמן להניח תשתית טכנית להמרת הגולש ללקוח.

יעדים עסקיים/מוצריים שעולים ישירות מהקוד:

- **חיזוק אמון (Trust):** רכיבי "trust signals" חוזרים בכל האתר — כשרות בד"ץ, אפייה טרייה כל בוקר, איסוף עצמי משלושה סניפים, מענה מהיר בוואטסאפ. כל הנתונים מנוסחים כך שיהיו **ניתנים להוכחה** ולא מומצאים (ראו ההערות ב‑`siteContent.js`).
- **ערוץ פנייה מהיר:** וואטסאפ נוכח בכל מקום (Navbar, Footer, CTA צף במובייל, עמוד צור קשר) כערוץ ההזמנה המרכזי בפועל.
- **לכידת לידים (Lead capture):** מודל יציאה (exit intent), רשימת המתנה לחגים, מועדון יום הולדת, ומועדון VIP בוואטסאפ.
- **SEO מקומי:** עמודי "מדריכים ירושלמיים", עמודי authority ל‑long-tail, בלוג "סיפורים", schema.org מובנה, sitemap ו‑robots — כולם מכוונים לדירוג מקומי ("רוגלך בירושלים", "מאפייה במחנה יהודה").
- **תשתית למסחר אמיתי:** סל קניות מתמשך, checkout, ושמירת הזמנות — כבסיס למעבר עתידי מהזמנה-בוואטסאפ להזמנה-ותשלום-אונליין.

---

## 3. קהל יעד

קהל היעד של האתר נגזר מאופי העסק ומהתוכן בפועל:

- **לקוחות המאפייה והקהל הירושלמי המקומי** — אנשים שמכירים את "מרציפן" ומחפשים מידע: מה אופים, מחירים, סניפים ושעות.
- **מחפשי מוצר לפי הקשר** — רכיב `OccasionPicker` בדף הבית ממקד גולשים לפי אירוע: מתנה, שבת, אירוח, מגש משרד, או תייר. זהו ניסוח שיווקי שמכוון את הקהל לפי כוונת הקנייה.
- **לקוחות חגים** — עמודי חנוכה (סופגניות) ושבועות (מוצרי חלב), ורשימת המתנה לחגים נוספים (ראש השנה, פורים).
- **גולשי מובייל** — חלק מהותי מהקהל. האתר בנוי mobile-first עם תפריט מובייל ייעודי, CTA צף תחתון, וכפתורי וואטסאפ/חיוג נגישים. הרבה מההתנהגויות (exit-intent, sticky CTA) מותאמות במיוחד למובייל.
- **תיירים ומחפשי מתנות ירושלמיות** — מוזכרים מפורשות כקהל ב‑`OccasionPicker` ובעמודי ה‑SEO.
- **לקוחות B2B (משרדים)** — עמוד "מגשי משרד" ומארז "מגש משרד" מכוונים להזמנות כמותיות חוזרות.

---

## 4. סטאק טכנולוגי

הרכיבים נלקחו ישירות מ‑`package.json` ומקוד המקור.

### ליבה (Runtime / Framework)
- **React 19** (`react`, `react-dom` ^19.2) — ספריית ה‑UI; הפרויקט מבוסס קומפוננטות פונקציונליות ו‑hooks.
- **Vite 7** (`vite` ^7.2) — כלי הבנייה ושרת הפיתוח (HMR). סקריפט `dev` מריץ `vite --open`.
- **react-router-dom 7** — ניתוב צד-לקוח (client-side routing), כולל ראוטים מקוננים (admin) ו‑lazy routes.

### עיצוב (Styling)
- **Tailwind CSS 4** (`tailwindcss` + `@tailwindcss/vite` ^4.1) — מערכת העיצוב המרכזית; מוטמעת כ‑Vite plugin (לא דרך PostCSS config נפרד). העיצוב נעשה כמעט כולו ב‑utility classes inline.
- **lucide-react** ו‑**react-icons** — ספריות אייקונים (lucide הוא הדומיננטי בקוד).

### SEO ו‑Meta
- **react-helmet-async** — הזרקת תגי `<title>`, meta, Open Graph ו‑canonical לכל עמוד (דרך קומפוננטת `SEO`). מסופק ב‑`HelmetProvider` ב‑`main.jsx`.

### Backend / נתונים
- **@supabase/supabase-js** — לקוח Supabase לקריאת קטלוג ותוכן, הזמנות, פרופיל לקוח, ואימות אדמין. כל השימוש מותנה (gated) בקיום משתני סביבה — בלעדיהם האתר נופל חזרה למצב "וואטסאפ בלבד".
- **zod** — סכמות ולידציה משותפות בין הלקוח לשרת (`src/lib/supabase/schema.js`).

### תשלומים (Payments)
- **@stripe/stripe-js** + **stripe** — מסלול ה‑checkout הפעיל כיום: יצירת Checkout Session ו‑webhook (`api/create-checkout-session.js`, `api/stripe-webhook.js`).
- מתאמי סליקה ישראליים — **Cardcom / Tranzila / PayPlus** — קיימים כשלד (`src/lib/payments/*`), מנותבים דרך Edge Function שטרם מומשה בצד שרת. מתג `VITE_PAYMENTS_ENABLED` כבוי כברירת מחדל.

### תקשורת / שיווק
- **@emailjs/browser** — שליחת טופס "צור קשר" ישירות מהדפדפן (עם fallback ל‑demo mode כשהמפתחות חסרים).

### תצפיתיות (Observability)
- **@sentry/react** + **@sentry/vite-plugin** — דיווח שגיאות בפרודקשן בלבד, עם ניקוי PII והעלאת source maps ל‑Sentry (ומחיקתם מתיקיית `dist`).

### כלי פיתוח (Dev)
- **eslint 9** + `eslint-plugin-react-hooks` + `eslint-plugin-react-refresh` — בקרת איכות קוד.
- **puppeteer** — קיים בתלויות הפיתוח (שימוש בצילומי מסך/בדיקות; ראו `capture_screenshots.js` בשורש).

> הערה: הפרויקט כתוב ב‑**JavaScript / JSX** (ולא TypeScript), למרות שקיים שימוש ב‑Zod לוולידציה בזמן ריצה.

---

## 5. מבנה הפרויקט

```
MarzipanBakery/
├─ index.html               # נקודת כניסה, lang="he" dir="rtl", טעינת Heebo
├─ vite.config.js           # Vite + React + Tailwind + Sentry (source maps)
├─ vercel.json              # קונפיגורציית פריסה (SPA rewrite, headers, cache)
├─ eslint.config.js         # כללי lint
├─ .env.example             # תיעוד כל משתני הסביבה (client + server)
├─ api/                     # פונקציות serverless (Vercel) — Stripe
│  ├─ create-checkout-session.js
│  └─ stripe-webhook.js
├─ lib/                     # קוד צד-שרת משותף
│  └─ catalog.js            # מראה (mirror) של הקטלוג לאימות מחירים בשרת
├─ public/                  # נכסים סטטיים: favicon, robots.txt, sitemap.xml, images/
└─ src/
   ├─ main.jsx              # bootstrap: Sentry, chunkReloader, GA, Routers, ErrorBoundary
   ├─ App.jsx               # מעטפת האפליקציה + טבלת הראוטים המלאה
   ├─ index.css / App.css   # סגנונות גלובליים, אנימציות, כללי נגישות
   ├─ assets/               # תמונות מיובאות (מוצרים, סניפים, חגים, לוגו)
   ├─ Components/           # כל קומפוננטות ה‑UI (מאורגנות לפי תחום)
   ├─ context/              # CartContext — ניהול סל הקניות
   ├─ data/                 # מקורות תוכן סטטיים (מוצרים, FAQ, סיפורים, SEO, תוכן עסק)
   ├─ hooks/                # useProducts / useProduct (שכבת נתוני Supabase)
   ├─ lib/                  # commerce, payments, customer, supabase, seo, admin, leads
   ├─ services/             # productsService — גישה לטבלת products ב‑Supabase
   └─ utils/                # analytics, sentry, chunkReloader, slugify
```

**אזורים מרכזיים ותפקידם:**

- **`src/Components/`** — מחולק לפי תחום: `Home/` (סקשני דף הבית), `Shared/` (רכיבים חוצי-אתר כמו SEO, TrustBar, נגישות), `Cart/`, `Checkout/` + `CheckoutPage/`, `Admin/`, `SEO/` (עמודי authority), `Stories/`, `Lead/`, ועמודי תוכן ייעודיים (`AboutPage/`, `BranchesPage/` וכו').
- **`src/data/`** — "מקור האמת" לתוכן סטטי: `productsData.js` (קטלוג מקומי), `siteContent.js` (פרטי עסק, סניפים, trust signals, מארזים), `faqData.js`, `stories.js`, `seoLandings.js`.
- **`src/lib/`** — לוגיקה עסקית ותשתית: `commerce/` (orders, pricing באגורות, slots לאיסוף), `payments/` (מתאמי סליקה), `customer/` (session, profile, referral, order history), `supabase/` (client + סכמות Zod), `seo/`.
- **`api/` + `lib/`** (שורש) — קוד צד-שרת ל‑Vercel: סליקת Stripe ושמירת הזמנות.

> **נקודה ארכיטקטונית חשובה:** קיימים **שני מקורות מוצרים** במקביל. הקטלוג בעמוד `/products` נטען מ‑**Supabase** (דרך `useProducts`/`productsService`), בעוד שדף הבית, עמודי החגים, וסל הקניות (`CartContext`) מסתמכים על הקובץ הסטטי **`productsData.js`**. זוהי תוצאה של מעבר הדרגתי מאתר סטטי לאתר מבוסס‑backend, וכדאי לאחד זאת בהמשך (ראו פרק 17).

---

## 6. מפת ראוטים / עמודים

טבלת הראוטים מוגדרת ב‑`src/App.jsx`. עמודי השיווק נטענים ישירות; שכבות ה‑checkout, האדמין וה‑SEO‑growth נטענות ב‑**lazy loading** (`React.lazy`) כדי לא להכביד על ה‑bundle הראשוני.

### עמודי שיווק / ליבה (טעינה ישירה)

| ראוט | קומפוננטה | תפקיד / מה מופיע |
|------|-----------|------------------|
| `/` | `Home` | דף הבית — משפך שיווקי מלא (ראו פרק 8). |
| `/products` | `ProductsPage` | הקטלוג המלא: סינון לפי קטגוריה, חיפוש חי, גריד מוצרים (נטען מ‑Supabase). |
| `/products/:slug` | `ProductPage` | עמוד מוצר בודד: תמונה, מחיר, תיאור, הוספה לסל, breadcrumbs, Product schema. |
| `/about` | `AboutPage` | סיפור המייסדים (שושנה ויוסף אוזרקו), הדור הבא, ערכי המותג. |
| `/branches` | `BranchesPage` | שלושת הסניפים על רקע מפה, סטטוס "פתוח/סגור" חי (מתעדכן כל 60 שניות), Waze וחיוג. |
| `/contact` | `ContactPage` | עוטף את קומפוננטת `Contact` — טופס יצירת קשר (EmailJS) + קישורי וואטסאפ/רשתות. |
| `/holidays/hanukkah` | `HanukkahPage` | קולקציית סופגניות חנוכה (מתוך `productsData.hanukkahCollection`) + CTA למארז חג. |
| `/holidays/shavuot` | `ShavuotPage` | קולקציית שבועות (מוצרי חלב, מערך מקומי בקומפוננטה) + CTA. |
| `/accessibility` | `AccessibilityPage` | הצהרת נגישות (ת"י 5568 / WCAG 2.0 AA) + פרטי רכז נגישות. |
| `/terms` | `TermsPage` | תנאי שימוש (10 סעיפים: הזמנות, ביטולים, כשרות, אלרגנים, אחריות, שיפוט). |
| `/privacy` | `PrivacyPage` | מדיניות פרטיות (חוק הגנת הפרטיות 1981) + כפתור ניהול עוגיות. |
| `/r/:code` | `Home` | נחיתת referral — לוכד קוד הפניה ומציג את דף הבית. |
| `*` | `NotFoundPage` | עמוד 404 עם הומור מותגי ו‑CTA לחזרה/קטלוג. |

### שכבת המסחר (lazy)

| ראוט | קומפוננטה | תפקיד |
|------|-----------|-------|
| `/checkout` | `CheckoutPage` | טופס פרטי לקוח + סיכום הזמנה; שולח ל‑`/api/create-checkout-session` ומפנה ל‑Stripe. |
| `/checkout/success` | `CheckoutSuccessPage` | מסך הצלחה לאחר תשלום. |
| `/checkout/cancel` | `CheckoutCancelPage` | מסך ביטול. |
| `/order/success` | `OrderSuccess` | אישור הזמנה. |
| `/order/confirmation` | `OrderConfirmation` | אישור/סיכום הזמנה. |
| `/order/payment/result` | `PaymentResult` | תוצאת תשלום (עבור מסלול הסליקה הישראלי). |
| `/account` | `AccountPage` | אזור לקוח: התחברות OTP, מועדון נאמנות, היסטוריית הזמנות, מועדפים, referral. תלוי‑backend. |

### שכבת הצמיחה / SEO (lazy)

| ראוט | קומפוננטה | תפקיד |
|------|-----------|-------|
| `/jerusalem` | `JerusalemHub` | מרכז "מדריכים ירושלמיים" — אינדקס עמודי ה‑authority. |
| `/jerusalem/:slug` | `AuthorityLanding` | תבנית אחידה ל‑5 עמודי נחיתה (best-rugelach, shabbat-pastries, gift-boxes, office-trays, mahane-yehuda-bakery-guide). |
| `/stories` | `StoriesIndex` | אינדקס בלוג "סיפורים מהמאפייה". |
| `/stories/:slug` | `StoryPage` | פוסט בודד + מוצרים קשורים + cross-links + Article schema. |

### שכבת הניהול (lazy, מוגנת)

| ראוט | קומפוננטה | תפקיד |
|------|-----------|-------|
| `/admin/login` | `AdminLogin` | התחברות אדמין (email/password מול Supabase). |
| `/admin` | `AdminLayout` (ב‑`ProtectedRoute`) | מעטפת לוח ניהול עם sidebar; מוגנת באימות. |
| `/admin` (index) | `AdminDashboard` | KPI: הזמנות והכנסות היום, ממתינות. |
| `/admin/products` | `AdminProducts` | ניהול מוצרים. |
| `/admin/orders` | `AdminOrders` | ניהול הזמנות. |
| `/admin/bundles` | `AdminBundles` | ניהול מארזים. |
| `/admin/growth` | `GrowthDashboard` | לוח צמיחה. |
| `/admin/crm` | `AdminCrm` | CRM. |

> **מסע משתמש טיפוסי (שכבת השיווק):** כניסה ל‑`/` → קריאה של ה‑Hero וה‑TrustBar → בחירת אירוע ב‑`OccasionPicker` או מעבר לקטלוג `/products` → צפייה במוצר `/products/:slug` → הוספה לסל → פתיחת `CartDrawer` → או המשך ל‑`/checkout`, או (התרחיש הנפוץ כיום) פנייה בוואטסאפ דרך ה‑CTA.

---

## 7. ניווט וחוויית משתמש

### Navbar (`src/Components/Navbar/Navbar.jsx`)
- סרגל **fixed** עליון, RTL, עם שינוי גובה ורקע בעת גלילה (`scrolled` state) — אפקט "מתעבה" עדין.
- **לוגו + wordmark** ("מאפיית מרציפן · ירושלים · 1986") שמופיע/נעלם לפי breakpoint כדי לשמור על ניקיון בסרגל.
- **6 קישורים ראשיים** בדסקטופ: הקטלוג · חגים ▾ · סניפים · אודותינו · סיפורים · צור קשר. "חגים" הוא dropdown (חנוכה / שבועות).
- **תפריט "מדריכים" ▾** — dropdown נפרד לעמודי ה‑SEO ארוכי-הזנב, כדי לא להעמיס על הסרגל.
- **פעולות:** כפתור וואטסאפ (אייקון), וכפתור "הסל שלי" (pill) עם מונה פריטים שמופיע כתג.
- **נגישות:** סגירה ב‑Escape, סגירת dropdown בלחיצה חיצונית, `aria-expanded`/`aria-controls`/`aria-label`, יעדי מגע ≥44px.

### תפריט מובייל
- ב‑`<lg` הכל מתקפל ל‑**sheet** יחיד שנפתח מלמעלה.
- ה‑sheet **portaled ל‑`document.body`** (דרך `createPortal`) כדי לחרוג מ‑stacking context ש‑App.jsx יוצר (`relative z-10`), כך שה‑sheet מכסה את ה‑Sticky CTA התחתון. זהו פתרון מוקפד לבעיית z-index אמיתית (מתועד בהערות בקוד).
- נעילת גלילה על `body` **וגם** `<html>` בזמן שהתפריט פתוח (טיפול ב‑iOS Safari).
- אזור backdrop נפרד שמתחיל מתחת לגובה הסרגל החי, כדי שהסרגל יישאר קריא.

### Footer (`src/Components/Footer/Footer.jsx`)
- רקע כהה (`#380909`) עם פס זהב עליון; 4 עמודות: מותג + כשרות + רשתות, ניווט + קישורים משפטיים, פרטי קשר (טל/וואטסאפ/מייל clickable), ושעות הסניף הראשי + קישור לכל הסניפים.
- שורת תחתית: זכויות יוצרים (שנה דינמית), מס' שנות פעילות, מס' סניפים, קישורים משפטיים, וכפתור "ניהול עוגיות".

### התנהגות ניווט כללית
- **`ScrollToTop`** — גלילה לראש העמוד בכל החלפת ראוט.
- **`ScrollToTopButton`** — כפתור צף שמופיע אחרי גלילה של 300px.
- **קישורים פעילים (active)** — מסומנים באמצעות `NavLink` עם קו תחתון זהב והדגשת צבע אדום.
- **`StickyMobileCTA`** — סרגל CTA תחתון במובייל בלבד, שמשתנה לפי מצב הסל (סל ריק → פנייה בוואטסאפ; סל מלא → "השלמת הזמנה · ₪X"); מוסתר בעמודים משפטיים.

---

## 8. דף הבית

דף הבית (`src/Components/Home/Home.jsx`) בנוי כ**משפך קריאה אחד**, ללא חזרות. סדר הסקשנים מתועד בקוד עצמו:

1. **Hero** (`Hero/Hero.jsx`) — הצהרת מותג: eyebrow עם דירוג Google, כותרת רב-שורתית, תיאור "קצב המאפייה", ושני CTA ראשיים (לקטלוג + וואטסאפ). כולל פס אמון (כשרות + שנות פעילות) ותמונה עריכותית עם תווית "since 1986". אנימציות fade-in-up מדורגות; RTL מלא (טקסט מיושר לימין בדסקטופ, ממורכז במובייל).
2. **TrustBar** (`Shared/TrustBar.jsx`) — ארבעה עמודי הרגעה שקטים מתחת ל‑Hero: כשרות בד"ץ, אפייה טרייה, איסוף עצמי, מענה וואטסאפ מהיר. כולל "זמן האפייה הבא" חי מתוך `getNextBakingTime()`.
3. **SignatureRugelach** (`Home/SignatureRugelach.jsx`) — סקשן כהה ועריכותי המוקדש למוצר העוגן (הרוגלך), מסופר כאגדה משפחתית, עם תמונה, ציטוט, ושלוש סטטיסטיקות.
4. **OccasionPicker** (`Home/OccasionPicker.jsx`) — פסיכולוגיית המרה: בחירת אירוע (מתנה/שבת/אירוח/משרד/תייר) שמובילה ל‑`/products?occasion=X`. כרטיס "מתנה" בולט (span רחב).
5. **Products** (`Products/Products.jsx`) — תצוגת קטגוריות מובחרת (8 קטגוריות) בגריד דסקטופ / רכבת גלילה אופקית במובייל.
6. **Bundles** (`Home/Bundles.jsx`) — מארזים מובנים (`POPULAR_BUNDLES`): מארז שבת, מגש משרד, מתנה למארח. הוספה לסל מוסיפה את כל פריטי המארז ופותחת את הסל.
7. **HeritageTimeline** (`Home/HeritageTimeline.jsx`) — ציר זמן מ‑1986 עד היום (4 אבני דרך), פריסה מתחלפת בדסקטופ.
8. **Reviews** (`Reviews/Reviews.jsx`) — הוכחה חברתית מעוגנת ב‑Google: דירוג 4.8 עם קישור חי לפרופיל, וביקורות מובחרות (אם `FEATURED_REVIEWS` מאוכלס — כרגע ריק במכוון, ללא ביקורות מומצאות).
9. **HolidayPreorderList** (`Lead/HolidayPreorderList.jsx`) — לכידת ליד בעלת ערך: רשימת המתנה לחגים (פסח מושמט במכוון — המאפייה חמץ).
10. **VIPClub** (`Home/VIPClub.jsx`) — CTA סופי להצטרפות למועדון וואטסאפ.
11. **FAQ** (`Home/FAQ.jsx`) — שאלות נפוצות בפריסת master-detail, כולל הזרקת `FAQPage` schema.

> סקשנים שהוסרו במכוון (מתועד בקוד): `WhyOrderToday`, `ProofStrip`, `About`, `BirthdayClub` — הקומפוננטות עדיין קיימות במאגר אך אינן מורכבות בדף הבית, כי המסר שלהן כבר נאמר טוב יותר במקום אחר.

**התנהגות מובייל בדף הבית:** רכבת גלילה אופקית בקטגוריות, פריסות שמתקפלות לטור יחיד, CTA צף תחתון, ואנימציות שמכבדות `prefers-reduced-motion`.

---

## 9. קטלוג / מוצרים / חגים

### הקטלוג (`/products`)
`ProductsPage` מציג גריד מוצרים רספונסיבי (1–3 טורים) עם פאנל סינון: **חיפוש חי** (על שם, תיאור ומילות מפתח) ו‑**קטגוריות** (רוגלך, מאפי חלב, סופגניות, עוגות, לחמים ועוד). הנתונים נטענים מ‑**Supabase** דרך `useProducts()`, עם 6 שלדי טעינה (skeletons), טיפול בשגיאה ובמצב ריק, והזרקת `ItemList` schema.

### עמוד מוצר (`/products/:slug`)
`ProductPage` טוען מוצר בודד דרך `useProduct(slug)`: תמונה (עם skeleton), שם, מחיר, תיאור, תג קטגוריה, תג "פופולרי" אם רלוונטי, סימוני טריות וכשרות, וכפתור "הוסף לסל" עם משוב. כולל breadcrumbs ו‑Product schema, ומצבי loading / error / not-found עם קישורי שחזור.

### נתוני המוצרים הסטטיים (`src/data/productsData.js`)
מקור המוצרים הסטטי (שמזין את הסל, דף הבית ועמודי החגים) מאורגן לקטגוריות:
`rugelach`, `sweetDairyPastries`, `bread`, `donuts`, `fridgeCakes`, `tarts`, `roundParveCakes`, `roundParveCakesNew`, `babkaCakes`, `hardCookies`, ו‑`hanukkahCollection`.
כל מוצר מכיל `id`, `name`, `image` (מיובאת מ‑`assets`), `priceValue` (מספר שלם בשקלים), `priceDisplay` (טקסט תצוגה, למשל `"50 ₪ לק"ג"`), `unit` (`unit`/`kg`), ולעיתים `tags` (כמו `bestseller`, `iconic`, `family-favorite`, `no-sugar`) ו‑`description`.

### עמודי חגים
- **חנוכה** (`/holidays/hanukkah`) — hero מלא, אינטרו, וגריד של 12 סופגניות מתוך `productsData.hanukkahCollection` (כל אחת עם תיאור, תג ומחיר), ובאנר CTA למארז חג המקשר לעמוד צור קשר.
- **שבועות** (`/holidays/shavuot`) — מבנה דומה (hero, גריד מוצרי חלב, CTA). כאן רשימת המוצרים **מקודדת בתוך הקומפוננטה** (ולא נטענת ממקור חיצוני) — נקודה לאיחוד עתידי.

### מארזים (`POPULAR_BUNDLES` ב‑`siteContent.js`)
שלושה מארזים אמיתיים מתוך פריטים קיימים, עם מחיר שהוא **סכום הפריטים** (ללא הנחה מומצאת), ודגל `enabled` שמאפשר להסתיר מארז ללא שינוי קוד. קיים גם מנגנון "הוסף ₪X לקבלת מתנה" (`BUNDLE_OFFER`) שכבוי כברירת מחדל במכוון.

---

## 10. עיצוב ו‑RTL

### תמיכה ב‑עברית / RTL
- ב‑`index.html`: `<html lang="he" dir="rtl">`.
- ב‑`App.jsx`: עטיפת האפליקציה כולה ב‑`<div dir="rtl">`, וכל הקומפוננטות נכתבו עם יישור ימני ופריסות שמתאימות ל‑RTL.
- ה‑Navbar, ה‑sheet במובייל וה‑dropdowns מוגדרים `dir="rtl"` במפורש.

### טיפוגרפיה
- גופן יחיד: **Heebo** (כל המשקלים 100–900), נטען מ‑Google Fonts עם `preconnect`. מוגדר כ‑`--font-heading` וכ‑`font-family` של ה‑body ב‑`index.css`.

### מערכת צבעים
בפועל, פלטת הצבעים בקומפוננטות מיושמת כ‑**Tailwind utility classes inline** עם ערכי hex מותגיים עקביים:
- רקע קרם: `#FDFBF7`
- חום כהה / טקסט: `#2D211E`, `#380909`, `#1A0F0A`
- אדום מותגי: `#B91C1C`
- זהב/accent: `#D4AF37`
- ירוק וואטסאפ: `#25D366`

> הערה לשקיפות: קובץ `index.css` מגדיר משתני `:root` ישנים יותר (אדום/כסף/שחור/אפור) עם הערה "Silver Accent (replacing Gold)", אך הקומפוננטות עצמן משתמשות בפועל בפלטת הקרם‑חום‑אדום‑זהב לעיל. כלומר חלק ממשתני ה‑CSS ב‑`:root` הם שאריות ואינם מקור האמת בפועל.

### פריסה (Layout)
- מיכל מרכזי (`max-w-7xl mx-auto`) ופריסות גריד/flex רספונסיביות.
- כותרות "פרימיום" עם קו תחתון זהב עריכותי (`.luxe-underline`).
- רקע דקורטיבי (`MagicalBackground`) עם כדורי gradient ואייקונים מונפשים, מאחורי התוכן (`z-0`, `pointer-events-none`).

### רספונסיביות ו‑mobile-first
- שימוש עקבי ב‑breakpoints של Tailwind (`sm`/`md`/`lg`/`xl`).
- יעדי מגע ≥44px, התחשבות ב‑`env(safe-area-inset-bottom)` במכשירים עם notch.
- אנימציות מותאמות אישית ב‑`index.css` (`fadeInUp`, `heartbeat`/`beat-color-mix`) עם כיבוד `prefers-reduced-motion`.

### גישת CSS
הגישה היא **utility-first עם Tailwind 4**, בתוספת `index.css` קטן ל: import של Tailwind, משתני שורש, keyframes, כללי נגישות (מצבי `data-a11y-*` על `<html>`), ושכבת הגנה מפני גלילה אופקית (`overflow-x: hidden; max-width: 100vw`).

---

## 11. קומפוננטות מרכזיות

מבחר הקומפוננטות בעלות התפקיד המרכזי. (רשימת הקבצים המלאה רחבה יותר — זוהי בחירה של בעלי המשקל.)

| קומפוננטה | נתיב | תפקיד / מה מרנדרת | היכן בשימוש |
|-----------|------|-------------------|-------------|
| `Navbar` | `Components/Navbar/Navbar.jsx` | ניווט ראשי RTL, dropdowns, תפריט מובייל portaled, כפתור סל ומונה. | גלובלי (App). |
| `Footer` | `Components/Footer/Footer.jsx` | פוטר כהה: ניווט, פרטי קשר, שעות, רשתות, קישורים משפטיים. | גלובלי (App). |
| `Hero` | `Components/Hero/Hero.jsx` | הצהרת מותג בדף הבית: כותרת, CTA כפול, פס אמון, תמונה עריכותית. | `Home`. |
| `ProductCard` | `Components/Product/ProductCard.jsx` | כרטיס מוצר: תמונה, תגים, מחיר, הוספה לסל מהירה, מעקב `view_item` ב‑IntersectionObserver. | קטלוג, סטוריז, עמודי authority. |
| `CartContext` | `context/CartContext.jsx` | ניהול סל גלובלי: הוספה/הסרה/כמות, חישוב סך, התמדה ב‑localStorage. | כל האתר (Provider ב‑App). |
| `CartDrawer` | `Components/Cart/CartDrawer.jsx` | מגירת סל נשלפת: פריטים, כמויות, סכום, מעבר ל‑checkout, upsell. | גלובלי (App). |
| `CartUpsell` | `Components/Cart/CartUpsell.jsx` | הצעות מוצר חכמות בתוך הסל (עד 2, מעדיף קטגוריות חדשות). | בתוך `CartDrawer`. |
| `SEO` | `Components/Shared/SEO.jsx` | הזרקת title/meta/OG דרך Helmet; בניית URL מוחלט לתמונת OG. | כל עמוד. |
| `SchemaMarkup` | `Components/Shared/SchemaMarkup.jsx` | הזרקת JSON-LD (`application/ld+json`). | עמודים עם schema. |
| `TrustBar` | `Components/Shared/TrustBar.jsx` | פס 4 אותות אמון + זמן אפייה חי. | `Home`, `CartDrawer`. |
| `StickyMobileCTA` | `Components/Shared/StickyMobileCTA.jsx` | CTA תחתון במובייל, משתנה לפי מצב הסל. | גלובלי (App). |
| `AccessibilityWidget` | `Components/Shared/AccessibilityWidget.jsx` | פאנל נגישות צף (גודל טקסט, ניגודיות, גווני אפור, הפחתת תנועה, קו תחתון), נשמר ב‑localStorage. | גלובלי (App). |
| `CookieConsent` | `Components/Shared/CookieConsent.jsx` | באנר הסכמת עוגיות (טכני + Analytics opt-in), מאתחל GA רק לאחר הסכמה. | גלובלי (App). |
| `ErrorBoundary` | `Components/Shared/ErrorBoundary.jsx` | תפיסת שגיאות רינדור + שגיאות טעינת chunk (ריענון עצמי), דיווח ל‑Sentry. | עוטף את כל האפליקציה (main). |
| `ExitIntentModal` | `Components/Lead/ExitIntentModal.jsx` | מודל יציאה (cursor בדסקטופ / scroll-back או חוסר פעילות במובייל), השתקה 14 יום. | גלובלי (App, lazy). |
| `ProtectedRoute` | `Components/Admin/ProtectedRoute.jsx` | שמירת ראוטי אדמין מאחורי אימות Supabase. | עוטף `/admin`. |

**props אופייניים:** `ProductCard` מקבל `product` (אובייקט עם `id`, `name`, `slug`, `image`, `priceDisplay`, `priceValue`, `category_slug`, `tags`, `description`, `unit`, `giftReady`). `SEO` מקבל `title`/`description`/`image`/`url`. `SchemaMarkup` מקבל `data`. `Breadcrumbs` מקבל `crumbs` (מערך של `{name, path}`).

---

## 12. נכסים ותמונות

- **`src/assets/`** — תמונות המוצרים, הסניפים, החגים, הלוגו, ותמונות עריכותיות (`OwnersHero`, `BakeryInterior`, `MahaneYehudaStreet` וכו'). אלו **מיובאות כמודולים** (`import ... from "../assets/..."`) ב‑`productsData.js`, `siteContent.js` ובקומפוננטות, כך ש‑Vite ממַשֵּׁק (hashes) ומבצע bundling/אופטימיזציה בבנייה. הפורמטים הם בעיקר `.jpg` ו‑`.png`.
- **`public/`** — נכסים סטטיים המוגשים כפי שהם: `favicon.jpg`, `robots.txt`, `sitemap.xml`, ותיקיית **`public/images/`** עם תמונות מוצרים ממוספרות לפי קטגוריה (`donuts/`, `hanukkah/`, `rugelach/`, `bread/` וכו'). ה‑IDs שם תואמים ל‑IDs בקטלוג, ומשמשים ככל הנראה את הקטלוג מבוסס‑Supabase (שמייצר נתיבי תמונה לפי id).
- **טעינה עצלה ו‑skeletons** — קומפוננטת `SkeletonImage` מציגה ספינר/שלד עד טעינת התמונה (עם `loading="lazy"` ומעבר opacity), משמשת בקטלוג ובעמוד המוצר.
- **caching** — `vercel.json` מגדיר כותרות cache נפרדות לתמונות (30 יום + `stale-while-revalidate`) ולנכסי build חתומים (`immutable`, שנה).

---

## 13. ביצועים והתאמה למובייל

- **Code splitting / lazy routes:** שכבות ה‑checkout, האדמין וה‑SEO‑growth נטענות ב‑`React.lazy` עם `Suspense`, כך שה‑bundle הראשוני של אתר השיווק נשאר קל.
- **`chunkReloader` (`utils/chunkReloader.js`):** מנגנון שמרפא לקוחות "תקועים" אחרי deploy — תופס שגיאות טעינת chunk, מבצע ריענון מבוקר (מקסימום 2 לכל session, debounce), מבטל רישום service workers ישנים, ובודק BFCache.
- **`ErrorBoundary`:** תופס כשלי chunk ומרענן עצמית במקום להציג מסך שגוי.
- **רספונסיביות:** mobile-first עם breakpoints של Tailwind; רכבות גלילה אופקיות במובייל; פריסות שמתקפלות לטור יחיד.
- **תפריט מובייל:** sheet portaled, נעילת גלילה, התחשבות ב‑safe-area.
- **טיפול בתמונות:** ייבוא דרך Vite (hashing + אופטימיזציה), `lazy` loading, ו‑`SkeletonImage`.
- **כותרות cache (Vercel):** נכסי build כ‑`immutable`; HTML כ‑`must-revalidate`; תמונות עם `stale-while-revalidate`.
- **כיבוד העדפות:** `prefers-reduced-motion` מכובד גם ב‑CSS וגם דרך widget הנגישות; הגנת `overflow-x` גלובלית מונעת גלילה אופקית לא רצויה.

> הערה: לא הוגדר chunking ידני מתקדם (manual chunks) מעבר ל‑lazy routes, ואין כרגע אופטימיזציית תמונות לפורמט מודרני (כמו המרה אוטומטית ל‑WebP/AVIF) — נקודות לשיפור עתידי.

---

## 14. SEO ונגישות

### SEO — מה קיים בפועל
SEO הוא תחום **מפותח** יחסית בפרויקט (לא בסיסי):
- **Meta דינמי לכל עמוד** דרך קומפוננטת `SEO` (react-helmet-async): title, description, Open Graph, locale `he_IL`, og:image.
- **Structured data (JSON-LD)** נרחב: `Bakery`/`LocalBusiness` schema גלובלי ב‑`App.jsx` (כתובת, geo, שעות, אמצעי תשלום, דירוג), `Product`, `ItemList`, `BreadcrumbList`, `FAQPage`, `Article`/`BlogPosting`, `CollectionPage` — דרך `SchemaMarkup` ו‑`localBusinessSchema.js`.
- **עמודי SEO ייעודיים:** 5 עמודי authority (`seoLandings.js`) עם `targetQueries` בעברית, ו‑5 סיפורי בלוג (`stories.js`).
- **`public/sitemap.xml`** — מפת אתר מלאה עם priorities, ו‑**`public/robots.txt`** שחוסם רק `/admin` ו‑`/api` ומפנה ל‑sitemap.
- **`index.html`** — title, description ו‑keywords בעברית, theme-color, ו‑preconnect לגופנים.
- **cleanUrls** ב‑Vercel (כתובות קנוניות ללא סיומת).

> מגבלה לשקיפות: זהו **SPA בצד-לקוח (CSR)** ללא SSR/SSG. ה‑meta וה‑schema מוזרקים בזמן ריצה דרך Helmet. זה עובד היטב לזחלני Google המודרניים, אך אינו זהה ל‑pre-rendering מלא; שירותי תצוגה מקדימה ישנים יותר עשויים לראות HTML ריק יחסית.

### נגישות — מה קיים בפועל
- **`AccessibilityWidget`** — פאנל צף עם: שינוי גודל טקסט (0.85–1.4), ניגודיות גבוהה, גווני אפור, הפחתת תנועה, והדגשת קישורים. ההגדרות נשמרות ב‑localStorage ומיושמות כ‑data-attributes על `<html>`.
- **הצהרת נגישות** (`/accessibility`) המצהירה על תאימות **ת"י 5568 / WCAG 2.0 AA** ופרטי רכז נגישות.
- **דפוסי נגישות בקוד:** `aria-label`/`aria-expanded`/`aria-controls`, ניווט מקלדת וסגירה ב‑Escape ב‑Navbar, `role="dialog"`/`aria-modal` בתפריט המובייל, יעדי מגע ≥44px, וכיבוד `prefers-reduced-motion`.
- **`index.css`** כולל מצבי נגישות מוקפדים (כולל הסבר מדוע ה‑grayscale filter מוחל על `<html>` ולא על `<body>` כדי לא לשבור `position: fixed`).

---

## 15. פריסה והפעלה

### הרצה מקומית
```bash
npm install        # (קיים .npmrc עם legacy-peer-deps=true)
npm run dev        # מריץ vite --open
```
ללא משתני סביבה, האתר עובד במצב "וואטסאפ בלבד": הקטלוג מ‑Supabase לא ייטען (gated), טופס הקשר ירוץ ב‑demo mode, ו‑Analytics/Sentry/תשלומים יהיו כבויים (no-op). זהו מצב תקין ומכוון לפיתוח.

### בנייה
```bash
npm run build      # vite build → תיקיית dist/
npm run preview    # תצוגה מקדימה של ה‑build
npm run lint       # eslint .
```
בבנייה, Vite מפיק source maps "hidden", ואם מוגדרים `SENTRY_AUTH_TOKEN`/`SENTRY_ORG`/`SENTRY_PROJECT` — ה‑plugin מעלה אותם ל‑Sentry ומוחק את קבצי ה‑`.map` מ‑`dist`.

### פריסה (Deployment)
- היעד הוא **Vercel** (קיים `vercel.json` וגם תיקיית `.vercel/` מקומית; ה‑schema, ה‑framework `vite`, וה‑URLs בהערות מצביעים מפורשות על Vercel).
- **`vercel.json`** מגדיר: `buildCommand: vite build`, `outputDirectory: dist`, `cleanUrls`, `trailingSlash: false`.
- **SPA rewrite:** `"/(.*)" → "/index.html"` כדי שכל הראוטים של React Router יעבדו ב‑refresh ישיר.
- **redirect** של `/assets/*.map` ל‑404 (source maps לעולם לא נחשפים).
- **כותרות אבטחה:** `X-Content-Type-Options`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy`, `Permissions-Policy`, ו‑**HSTS** עם preload.
- **כותרות cache** מובחנות לנכסי build, ל‑HTML ולתמונות.
- **פונקציות serverless** ב‑`api/` (Stripe) רצות על תשתית Vercel Functions.

> רמז מהיסטוריית ה‑git: הקומיטים האחרונים עוסקים ב‑Stripe Checkout + webhook, ב‑Sentry/observability, ובתיקוני SPA rewrite — כלומר הפרויקט בפיתוח פעיל ומכוון לפרודקשן על Vercel.

---

## 16. מצב הפרויקט הנוכחי

### מה מוגמר ופעיל (Production-ready)
- **כל שכבת השיווק והתוכן:** דף הבית על כל סקשניו, אודות, סניפים (עם סטטוס פתוח/סגור חי), צור קשר (EmailJS), עמודי חנוכה ושבועות, עמודי תוכן ו‑SEO, סיפורים, 404.
- **הקטלוג ועמוד המוצר** — נטענים מ‑Supabase דרך `useProducts`/`useProduct` (כשמשתני הסביבה מוגדרים), כולל חיפוש, סינון, skeletons וטיפול בשגיאות.
- **סל הקניות** — `CartContext` + `CartDrawer` + upsell + התמדה ב‑localStorage. עובד מקצה לקצה (מבוסס `productsData.js`).
- **תשתית SEO ונגישות** — schema, sitemap, robots, widget נגישות, הסכמת עוגיות.
- **תצפיתיות** — Sentry (פרודקשן) ו‑GA4 (מותנה הסכמה) מחווטים.
- **checkout מבוסס Stripe** — `CheckoutPage` + `api/create-checkout-session.js` + `api/stripe-webhook.js` (כולל אימות חתימה, idempotency, ושמירת הזמנה ב‑Supabase דרך RPC). דורש מפתחות Stripe/Supabase פעילים.

### מה קיים אך תלוי‑backend / כבוי כברירת מחדל
- **אזור לקוח (`/account`)** — התחברות OTP, מועדון נאמנות, היסטוריה, מועדפים, referral. כל הלוגיקה כתובה, אך מותנית ב‑Supabase Edge Functions פעילות; ללא backend מציג הודעת placeholder.
- **אזור אדמין (`/admin/*`)** — login, layout, dashboard עם KPI, ועמודי products/orders/bundles/growth/crm. ה‑layout וה‑dashboard מומשו; חלק מעמודי המשנה הם בעיקר שלד מעל Supabase.
- **לכידת לידים** (exit-intent, מועדון יום הולדת, רשימת המתנה לחגים) — כתובה ופעילה בצד-לקוח דרך `recordLead()`.

### מה שלד / לא גמור (Placeholder)
- **מתאמי סליקה ישראליים** (Cardcom / Tranzila / PayPlus, `src/lib/payments/*`) — שלדים שמנתבים ל‑Edge Function `create-payment-session` שעדיין **לא מומשה בצד שרת**. `VITE_PAYMENTS_ENABLED=false` (כבוי במכוון).
- **`ProductGallery`** (`Components/ProductGallery/ProductGallery.jsx`) — קומפוננטה ריקה עם `console.log` בלבד; ככל הנראה נטושה/בתהליך.
- **`api/stripe-webhook.js`** — שמירת ההזמנה מומשה, אך ה‑TODO בקוד מציין שצינור ה‑fulfillment המלא (התראות, קבלות, ניכוי מלאי) טרם הושלם.
- **`README.md`** — עדיין ה‑README הגנרי של תבנית Vite (לא הותאם לפרויקט).
- **שני מקורות מוצרים** (Supabase מול `productsData.js`) — חיים זה לצד זה וטרם אוחדו.

---

## 17. מדריך המשך עבודה

מדריך מעשי למפתח שממשיך את הפרויקט. **חשוב:** הסעיף מבחין בין מה שכבר קיים (פרק 16) לבין המלצות לשיפור שטרם מומשו.

### צעדים מעשיים מומלצים (לא מומשו עדיין)
1. **לאחד את מקור המוצרים.** כיום הקטלוג קורא מ‑Supabase והסל/דף-הבית/חגים מ‑`productsData.js`. כדאי להפוך את Supabase למקור יחיד (או לפחות לוודא שמזהי המוצרים תואמים מלאה), כדי שהסל לא יישבר על מוצר שקיים רק באחד המקורות.
2. **להשלים את צד-השרת של הסליקה הישראלית.** לממש את Edge Function `create-payment-session` עבור Cardcom/Tranzila/PayPlus, ולאחר בדיקות — להדליק `VITE_PAYMENTS_ENABLED=true`. לוודא שזרימת `/order/payment/result` סגורה.
3. **להשלים את צינור ה‑fulfillment** ב‑`stripe-webhook.js`: התראות לאדמין, שליחת אישור/קבלה ללקוח (SMS/וואטסאפ — משתני הסביבה כבר מתוכננים), וניכוי מלאי אם רלוונטי.
4. **לחבר את עמוד שבועות למקור נתונים** במקום מערך מקודד בתוך הקומפוננטה (כמו חנוכה דרך `productsData`).
5. **לכתוב README אמיתי** שמתאר את הפרויקט, משתני הסביבה והרצה — במקום תבנית ה‑Vite הגנרית.
6. **לנקות/להשלים שאריות:** `ProductGallery` (ריקה), הקומפוננטות שהוסרו מדף הבית (`WhyOrderToday`, `ProofStrip`, `About`, `BirthdayClub`) — להחליט אם למחוק או לשלב, וליישר את משתני הצבע ב‑`index.css` כך שישקפו את הפלטה בפועל.

### שיפורים מומלצים (איכות / ביצועים)
- **Pre-rendering / SSG** (למשל דרך מעבר ל‑Next.js או פתרון pre-render) כדי לחזק SEO מעבר ל‑CSR הנוכחי.
- **אופטימיזציית תמונות** — המרה ל‑WebP/AVIF ו‑responsive `srcset` (כיום בעיקר `.jpg`/`.png` עם `lazy`).
- **TypeScript** — הפרויקט גדל מספיק כדי להרוויח מטיפוסים (כבר יש Zod כבסיס לסכמות).
- **בדיקות אוטומטיות** — קיים Puppeteer בתלויות; כדאי לבסס עליו בדיקות E2E/צילומי מסך מסודרים.
- **ניהול מוצרים מלא באדמין** — להשלים את עמודי `AdminProducts`/`AdminOrders` מעל Supabase כך שיהוו ממשק ניהול עצמאי לבעלי המאפייה.

---

## 18. מה הפרויקט מוכיח

פרויקט "מרציפן" מדגים יכולת לבנות **אתר עסקי אמיתי, מלוטש ומלא**, עם תשומת לב גבוהה לפרטים ולחוויית המשתמש — ולא רק דמו לימודי.

מה הוא מוכיח עליי כמפתח:

- **React מתקדם (React 19):** ארכיטקטורת קומפוננטות מסודרת לפי תחום, ניהול state גלובלי דרך Context (`CartContext`), hooks מותאמים אישית (`useProducts`/`useProduct`), `Suspense` + `lazy` ל‑code splitting, ו‑`ErrorBoundary` עם התאוששות עצמית מכשלי chunk.
- **Tailwind ועיצוב ברמת מותג:** עיצוב utility-first עקבי, פלטת צבעים מותגית, טיפוגרפיה (Heebo), אנימציות מותאמות, ותחושת "פרימיום" אמיתית לאורך כל האתר.
- **UI בעברית ו‑RTL מלא:** טיפול נכון ב‑`dir="rtl"`, יישור, dropdowns ותפריט מובייל ב‑RTL, ופתרון בעיות אמיתיות (z-index/portals, נעילת גלילה ב‑iOS, הגנת overflow אופקי).
- **עיצוב רספונסיבי mobile-first:** תפריט מובייל ייעודי, CTA צף, רכבות גלילה, יעדי מגע, ו‑safe-area — מתוך הבנה שהקהל ברובו במובייל.
- **ניתוב (Routing):** מפת ראוטים עשירה עם ראוטים מקוננים (admin), ראוטים מוגנים (`ProtectedRoute`), פרמטרים (`:slug`), lazy routes, ונחיתות referral.
- **מבנה קומפוננטות ותחזוקתיות:** הפרדה ברורה בין UI, נתונים (`data/`), לוגיקה (`lib/`), שירותים (`services/`) ו‑hooks; "מקור אמת" יחיד לתוכן עסקי (`siteContent.js`) עם הערות שמסבירות החלטות.
- **ליטוש ויזואלי:** Hero עריכותי, ציר זמן מורשת, סקשני אמון, skeletons, ומיקרו-אינטראקציות מוקפדות.
- **מוכנות לפריסה (Deployment readiness):** קונפיגורציית Vercel מלאה (SPA rewrite, כותרות אבטחה, HSTS, cache), משתני סביבה מתועדים, תצפיתיות (Sentry/GA עם הסכמה), ופונקציות serverless.
- **חשיבה מוצרית ואחריותית:** SEO ונגישות מובנים, הסכמת עוגיות תואמת רגולציה, עמודים משפטיים (תנאי שימוש/פרטיות/נגישות), ועיקרון חוזר של **אי-המצאת נתונים** (trust signals וביקורות ניתנים להוכחה בלבד).

מעבר לכך, הפרויקט מדגים **ראייה מערכתית**: לא רק "אתר יפה", אלא תשתית מסחר (סל, checkout, Stripe, Supabase, מתאמי סליקה, אזור לקוח ואדמין) שנבנית בשלבים — מתוך הבנה של מסע הלקוח ושל ההבדל בין מה שצריך להיות חי עכשיו לבין מה שמונח כתשתית לעתיד.

---

## תקציר לפורטפוליו

### תיאור קצר
אתר מותג ומכירה ל‑מאפיית מרציפן הירושלמית — React 19 + Tailwind, בעברית מלאה (RTL), רספונסיבי ומוכן לפריסה ב‑Vercel.

### על הפרויקט
אתר תדמית ומכירה (SPA) למאפיית הבוטיק "מרציפן" משוק מחנה יהודה. האתר מציג סיפור מותג עשיר, קטלוג מוצרים עם חיפוש וסינון, עמודי חגים (חנוכה/שבועות), עמודי סניפים עם סטטוס פתיחה חי, ושכבת תוכן ו‑SEO מקומית (מדריכים, בלוג, schema.org). מעבר לחזית השיווקית, האתר כולל תשתית מסחר מתפתחת — סל קניות מתמשך, checkout מבוסס Stripe, אינטגרציית Supabase, אזור לקוח ואזור ניהול — שחלקה פעיל וחלקה מונח כתשתית לעתיד. כל הפרויקט בנוי בעברית RTL, mobile-first, עם דגש על ליטוש ויזואלי, נגישות (WCAG 2.0 AA), ומוכנות לפרודקשן.

### מה בניתי
- אתר React 19 (SPA) מלא בעברית RTL, מאורגן לפי תחומים, עם ניהול state דרך Context.
- דף בית כ‑משפך שיווקי: Hero, אותות אמון, מוצר עוגן, בחירת אירוע, קטגוריות, מארזים, ציר מורשת, ביקורות, לכידת לידים, מועדון VIP ו‑FAQ.
- קטלוג מוצרים עם חיפוש חי וסינון, עמוד מוצר, וסל קניות מתמשך (localStorage) עם upsell חכם.
- עמודי חגים, סניפים (סטטוס פתוח/סגור חי), אודות, צור קשר (EmailJS) ועמודי 404.
- שכבת SEO מקיפה: meta דינמי (Helmet), JSON-LD (Bakery/Product/FAQ/Article/Breadcrumb), sitemap, robots, ועמודי authority ובלוג.
- נגישות: widget מצבי תצוגה, הצהרת נגישות, ודפוסי ARIA/מקלדת לאורך האתר.
- תשתית מסחר: checkout, Stripe Checkout + webhook לשמירת הזמנות, מתאמי סליקה ישראליים (שלד), אזור לקוח ואדמין.
- תצפיתיות ופריסה: Sentry, GA4 מותנה-הסכמה, וקונפיגורציית Vercel מלאה (SPA rewrite, אבטחה, cache).

### טכנולוגיות
React 19 · Vite 7 · Tailwind CSS 4 (`@tailwindcss/vite`) · react-router-dom 7 · react-helmet-async · lucide-react / react-icons · Supabase (`@supabase/supabase-js`) · Zod · Stripe (`@stripe/stripe-js` + `stripe`) · EmailJS · Sentry (`@sentry/react` + vite-plugin) · ESLint · Puppeteer · פריסה ב‑Vercel (כולל serverless functions).

### מה הפרויקט מוכיח
הפרויקט מוכיח יכולת לבנות אתר עסקי אמיתי מקצה לקצה: ממשק React מודולרי ומלוטש בעברית RTL, עיצוב mobile-first ברמת מותג ב‑Tailwind, ניתוב עשיר (כולל ראוטים מקוננים, מוגנים ו‑lazy), וניהול state עם התמדה. מעבר לכך הוא מדגים ראייה מערכתית ואחריותית — SEO ונגישות מובנים, הסכמת עוגיות ועמודים משפטיים, תצפיתיות, ומוכנות פריסה מלאה ל‑Vercel — לצד תשתית מסחר (סל, checkout, Stripe, Supabase) שנבנית בשלבים מתוך הבנה של מסע הלקוח. זהו פרויקט שמשלב פיתוח frontend חזק עם חשיבה מוצרית, תשומת לב לפרטים, ויושרה בנתונים (אי-המצאת מספרים שיווקיים).
