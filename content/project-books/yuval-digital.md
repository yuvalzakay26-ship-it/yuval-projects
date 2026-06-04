# יובל דיגיטל — ספר פרויקט

> **מקור האמת הסמכותי עבור אתר Yuval Digital.**
>
> מסמך זה מתאר את הפרויקט בדיוק כפי שהוא קיים במאגר הקוד. כל ראוט, קומפוננטה, קובץ נתונים, סקריפט והחלטה ארכיטקטונית שמוזכרים כאן נקראו ישירות מקוד המקור. מפתח/ת חדש/ה אמור/ה להיות מסוגל/ת לקרוא את הספר הזה ולהבין במלואו את הפרויקט, לתחזק אותו, להרחיב אותו ולהמשיך בו — בלי שום הדרכה נוספת.
>
> נוצר לאחרונה מתוך קוד המקור: ענף `main`. דומיין: **yuvaldigital.co.il**.
>
> *הערה: גרסה זו היא תרגום עברי מקצועי של ספר הפרויקט. מזהי קוד, נתיבי קבצים, שמות חבילות, שמות קומפוננטות, משתני סביבה וכתובות URL נשמרו באנגלית במכוון כדי לשמר דיוק טכני. הגרסה האנגלית המלאה זמינה בקובץ `docs/PROJECT_BOOK.md`.*

---

## תוכן עניינים

1. [סקירת הפרויקט](#חלק-1--סקירת-הפרויקט)
2. [סטאק טכנולוגי](#חלק-2--סטאק-טכנולוגי)
3. [מפת ראוטים מלאה](#חלק-3--מפת-ראוטים-מלאה)
4. [מלאי קומפוננטות מלא](#חלק-4--מלאי-קומפוננטות-מלא)
5. [ארכיטקטורת ניווט](#חלק-5--ארכיטקטורת-ניווט)
6. [ניתוח מעמיק של דף הבית](#חלק-6--ניתוח-מעמיק-של-דף-הבית)
7. [מערכת יצירת לידים](#חלק-7--מערכת-יצירת-לידים)
8. [מערכת נגישות](#חלק-8--מערכת-נגישות)
9. [מערכת SEO](#חלק-9--מערכת-seo)
10. [מערכת ביצועים](#חלק-10--מערכת-ביצועים)
11. [ארכיטקטורת עיצוב](#חלק-11--ארכיטקטורת-עיצוב)
12. [נכסים](#חלק-12--נכסים)
13. [ארכיטקטורת פריסה](#חלק-13--ארכיטקטורת-פריסה)
14. [מצב הפרויקט הנוכחי](#חלק-14--מצב-הפרויקט-הנוכחי)
15. [מדריך המשך עבודה](#חלק-15--מדריך-המשך-עבודה)

---

## חלק 1 — סקירת הפרויקט

### מהו הפרויקט

Yuval Digital הוא **אתר שיווק ויצירת לידים דו-לשוני (עברית / אנגלית)** עבור *Yuval Digital* — סטודיו דיגיטלי עצמאי ומודרני, שהוקם ומופעל על ידי **Yuval Zakay (יובל זכאי)**. הסטודיו בונה אתרים מודרניים, דפי נחיתה, אוטומציות עסקיות ותהליכי עבודה מבוססי-AI עבור עסקים קטנים ובינוניים בישראל.

מבחינה טכנית, האתר הוא **אפליקציית React מסוג Single-Page שעוברת prerender סטטי**. הוא נכתב כאפליקציית React + Vite, ובזמן ה-build עובר prerender ל-HTML סטטי מלא עבור כל ראוט שפורסם, באמצעות `vite-react-ssg`. התוצאה היא אתר שנטען כמו דף סטטי (מצוין ל-SEO, לסורקים ולציור הראשון של המסך) אך מתנהג כ-SPA לאחר ההידרציה (ניווט מיידי בצד הלקוח, החלפת ערכת נושא/שפה, אנימציות חשיפה).

קובץ ה-`package.json` מתאר את הפרויקט כך: *"Premium bilingual digital presence for Yuval — software engineer, AI developer, automation builder."*

### יעדים עסקיים

האתר קיים כדי לבצע משימה אחת ברמה גבוהה במיוחד: **להמיר מבקרים ללידים איכותיים** עבור הסטודיו, ובמקביל לבסס את המותג של הסטודיו ואת זהות המייסד כישויות אמינות ברשת. באופן קונקרטי:

- להציג את שירותי הסטודיו (אתרים, דפי נחיתה, אוטומציה, AI) בצורה ברורה ומשכנעת.
- לבנות אמון במהירות באמצעות הוכחות, שקיפות תהליך, תיק עבודות, סיפור מייסד/אודות ושאלות נפוצות.
- ללכוד לידים דרך מספר ערוצים בעלי חיכוך נמוך (טופס יצירת קשר, WhatsApp, טלפון, אימייל).
- לבסס זהות עקבית וקריאה-למכונה של העסק ושל האדם, עבור Google וחיפוש מבוסס-AI ("entity building").

### מיצוב המותג

הטקסטים והסכימה ממצבים בעקביות את Yuval Digital כ**סטודיו דיגיטלי עצמאי ומודרני** — ולא כסוכנות גדולה או תאגיד בדיוני. תיאור ה-`ProfessionalService` בקובץ `src/data/jsonld.js` מציין שהסטודיו בונה מערכות ש"מתוכננות כמערכות שמשתלבות יחד, ולא ככלים מבודדים", וצומת ה-`Person` ממצב את Yuval Zakay כ-"Founder & Developer" מעורב ומעשי (hands-on). מסגור כן, מונחה-מייסד, של פרויקט-אחד-בכל-פעם הוא בחירה מכוונת, והוא חוזר לאורך השאלות הנפוצות ("תשומת לב אישית וגישה ממוקדת של פרויקט אחד בכל פעם"), בדף האודות ובדף הבית. כל טקסט עתידי צריך לשמר מיצוב זה: להדגיש ישירוּת, מלאכה מודרנית ותשומת לב אישית — ולא לרמוז על היקף שאין לסטודיו.

### קהל היעד

**בעלי עסקים קטנים ובינוניים בישראל** הזקוקים לנוכחות דיגיטלית מקצועית, או שמעוניינים להפוך חלקים מהתפעול שלהם לאוטומטיים/מבוססי-AI. הקהל דו-לשוני: עברית היא שפת ברירת המחדל והעיקרית (RTL), עם מראה מלא באנגלית (LTR) עבור מבקרים בינלאומיים או כאלה שמעדיפים אנגלית. הסכימה והטקסטים מכוונים שוב ושוב ל"עסקים קטנים ובינוניים".

### יעדי יצירת לידים

יצירת לידים היא יעד ההמרה המרכזי. האתר מנתב לקוחות פוטנציאליים להפיכתם ללידים באמצעות:

- **טופס יצירת קשר** מרובה-שדות (`src/sections/Contact.jsx`) שמבצע POST ל-proxy בצד השרת (`/api/contact`), אשר מעביר את הלידים ל-pipeline של **n8n webhook → Airtable**.
- ערוץ **WhatsApp** קבוע (כפתור צף + סרגל פעולות במובייל + פוטר), עם הודעת פתיחה בעברית ממולאת מראש.
- קישורים ישירים ל**טלפון** (`tel:`) ול**אימייל** (`mailto:`).
- **באנרי CTA** (`src/components/CtaBanner.jsx`) הממוקמים בנקודות נשירה טבעיות לאורך דף הבית וכל דף משני.

כל אינטראקציה עם CTA מצוידת באירועי אנליטיקס (`track(...)`) כדי שניתן יהיה למדוד את המשפך.

### יעדי SEO

על פי הזיכרון של הפרויקט עצמו והעיצוב של `src/data/jsonld.js`, יעד ה-SEO הנוכחי הוא **בניית ישויות (Person + Brand)** ולא דירוג אגרסיבי על מילות מפתח. האתר:

- מפרסם גרף ישויות מקושר של schema.org (`WebSite` + `Person` + `ProfessionalService`/`LocalBusiness` + `FAQPage`), שבו כל צומת נתפר לשאר באמצעות ערכי `@id` יציבים.
- מבצע prerender ל-HTML מלא עבור כל ראוט שפורסם, כך שסורקים וחיפוש מבוסס-AI רואים תוכן אמיתי, ולא קליפת SPA ריקה.
- פולט מטא-דאטה של canonical, hreflang ו-OpenGraph לכל ראוט.
- מתחזק מערכת של דפי שירות ובלוג שנבנתה במפורש כדי להעמיק סמכות נושאית (topical authority) ולחזק את הקשר מייסד ↔ מותג.

### יעדי המרה

דף הבית בנוי כ**משפך המרה** מכוון (מתועד בתוך הקוד ב-`src/pages/Home.jsx`):

```
Hero → TrustStrip → CTA → Trust → Services → Packages → CTA → Process → Projects → Stack → About → FAQ → CTA (strong) → Contact
```

כל שלב מצמצם חיכוך, בונה אמון, או מציע "מסלול יציאה" להמרה. שלושה באנרי CTA משולבים לאורך הדף כדי ללכוד מבקרים מהוססים לפני שהם מגיעים לטופס.

### מפת דרכים עתידית

תצורת הראוטים (`src/router/routes.jsx`) ומערכת הקטלוגים חושפות את נתיב הצמיחה המתוכנן:

- **דפי שירות מפורטים**: 3 פורסמו (`business-websites`, `landing-pages`, `ai-automation`); 3 נוספים מוגדרים כטיוטות בקטלוג (`ai-business-systems`, `internal-tools`, `seo`) וממתינים לכתיבת תוכן.
- **משטח בלוג / מערכת עריכה**: מאמר אחד פורסם, 2 בטיוטה. הבלוג עולה לאוויר רק לאחר שפורסם לפחות מאמר אחד (`BLOG_HAS_PUBLISHED`).
- **משטחים עתידיים שמורים**: קובץ הראוטים משאיר placeholders בהערה עבור `industries/:slug` ו-`insights/:slug`.

ראו [חלק 14](#חלק-14--מצב-הפרויקט-הנוכחי) ו-[חלק 15](#חלק-15--מדריך-המשך-עבודה) למצב מפורט ולצעדים המומלצים הבאים.

---

## חלק 2 — סטאק טכנולוגי

חלק זה מתעד כל טכנולוגיה בשימוש, מדוע נבחרה, ועל מה היא אחראית. רשימת התלויות הסמכותית היא `package.json`.

### React (`react` / `react-dom` ^18.3.1)

- **על מה אחראית**: כל שכבת ה-UI — כל דף, layout, section וקומפוננטה הם רכיבי React פונקציונליים. הניהול של ה-state נעשה באמצעות hooks ו-React Context (ערכת נושא, נגישות, שפה).
- **מדוע נבחרה**: זהו מודל הרכיבים הדומיננטי, הוא משתלב נקי עם Vite ועם `vite-react-ssg`, וה-Context API שלו מבטא בצורה נקייה את הדאגות החוצות-מערכת של האפליקציה (theme, a11y, locale).

### Vite (`vite` ^5.3.1, `@vitejs/plugin-react` ^4.3.1)

- **על מה אחראי**: שרת הפיתוח (HMR), pipeline ה-build לפרודקשן, פתרון מודולים, code splitting ו-CSS code splitting. מוגדר ב-`vite.config.js`.
- **מדוע נבחר**: שרת פיתוח מהיר, תמיכה מובנית ב-ESM, והוא הבסיס ש-`vite-react-ssg` בנוי מעליו. ההגדרה גם מגדירה סט מקיף של path aliases (`@`, `@components`, `@sections`, `@pages`, `@layout`, `@router`, `@styles`, `@hooks`, `@utils`, `@data`, `@i18n`, `@theme`, `@assets`, `@a11y`) כדי שה-imports יישארו קריאים.

### vite-react-ssg (`vite-react-ssg` ^0.9.1-beta.1)

- **על מה אחראי**: **יצירת אתר סטטי (Static Site Generation).** הוא מבצע prerender לעץ הראוטים של React ל-HTML סטטי עבור כל נתיב שמוחזר מ-`includedRoutes()`. הוא גם מספק את הקומפוננטה `<Head>` (re-export של `react-helmet-async`) שבה משתמש `src/components/Seo.jsx`, ומספק את ה-`HelmetProvider` וה-`RouterProvider` ברמת הפריימוורק.
- **מדוע נבחר**: הוא מאפשר לכתוב אפליקציית React/React-Router רגילה ולקבל HTML סטטי מלא וסריק לכל ראוט — חיוני ליעד ה-SEO/entity-building — מבלי לאמץ פריימוורק כבד יותר. פקודת ה-build היא `vite-react-ssg build`.
- **הגדרות מפתח** (`vite.config.js → ssgOptions`):
  - `dirStyle: 'nested'` — כל URL הופך לתיקייה משלו + `index.html` (לדוגמה `/he/page/privacy/index.html`), כך ש-Vercel מגיש אותם כנתיבים סטטיים נקיים.
  - `script: 'async'` — טעינת סקריפטים אסינכרונית כדי לצמצם חסימת רינדור בציור הראשון.
  - `formatting: 'none'` — pretty-printing היה גורם ל-hydration mismatches.
  - `includedRoutes()` — מחשב את רשימת ה-prerender המלאה מתוך רשימת הלוקאלים, הדפים הסטטיים, והרשומות ש**פורסמו** בקטלוגי השירותים והמאמרים.
  - `entry: 'src/main.jsx'`.

### React Router (`react-router-dom` ^6.30.3)

- **על מה אחראי**: ניתוב בצד הלקוח לאחר שהדף עבר הידרציה. עץ הראוטים ב-`src/router/routes.jsx` הוא מקור האמת היחיד, המשמש גם את `vite-react-ssg` (ל-prerender) וגם את React Router (לניווט).
- **מדוע נבחר**: זהו הראוטר הסטנדרטי, והוא משתלב ישירות עם ה-data router של `vite-react-ssg`. הטיפול בלוקאל (סגמנט `:lang`), ההפניות (redirects), ה-layouts וטעינת ראוטים עצלה (lazy) — כולם משתמשים בפרימיטיבים שלו (`Outlet`, `useParams`, `Navigate`, `lazy`).

### react-helmet-async (`react-helmet-async` ^2.0.5)

- **על מה אחראי**: ניהול ה-head של המסמך לכל ראוט (title, meta, canonical, hreflang, OG/Twitter, JSON-LD). הגישה אליו דרך ה-re-export של `<Head>` מ-`vite-react-ssg`, בתוך `src/components/Seo.jsx`.
- **מדוע נבחר**: הוא עובד גם בזמן prerender של SSR/SSG (ה-head נלכד ומוזרק ל-HTML הסטטי) וגם בצד הלקוח. הקוד טוען במכוון **רק** `HelmetProvider` אחד (זה של הפריימוורק) — הערות ב-`RootLayout` מזהירות שהוספת provider שני תשבור את הזרקת ה-head ב-SSR (בלוק ה-`ssr` ב-`vite.config.js` שומר את `react-helmet-async` כמופע יחיד מבודד (externalized), כך שה-provider וה-consumer חולקים אותו context).

### צד שרת: Upstash ו-proxy יצירת הקשר

- **`@upstash/ratelimit` ^2.0.5 + `@upstash/redis` ^1.34.3**: מפעילים את מגביל הקצב (rate limiter) על פונקציית ה-serverless ‏`/api/contact` (‏5 בקשות / 60 שניות לכל IP, חלון נע). מוגדר רק כאשר `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` קיימים; אחרת המגביל אינו פועל (פיתוח מקומי).
- **`resend` ^4.8.0**: קיים בתלויות אך **אינו מיובא** על ידי ה-`api/contact.js` הנוכחי. צינור יצירת הקשר מעביר כעת ל-n8n webhook במקום לשלוח אימייל ישירות דרך Resend. זהו שריד ישן (legacy), שמצוין כחוב טכני ב-[חלק 14](#חלק-14--מצב-הפרויקט-הנוכחי).

### כלי Build / תמונות

- **`sharp` ^0.34.5** (dev): משמש את `scripts/convert-mockup-images.mjs` להמרת צילומי מסך של mockups מ-PNG לגרסאות AVIF ו-WebP.

### ארכיטקטורת CSS

- **CSS רגיל, ללא פריימוורק.** העיצוב הוא מערכת CSS שכבתית שנכתבה ידנית (ראו [חלק 11](#חלק-11--ארכיטקטורת-עיצוב)): שכבות גלובליות ב-`src/styles/` (`reset.css`, `variables.css`, `globals.css`, `animations.css`, `a11y.css`, בתוספת `critical.css` המתוחזק ידנית), וקבצי `.css` צמודים לכל קומפוננטה/section ומיובאים על ידיהם.
- **מדוע**: שליטה מלאה במערכת העיצוב, ערכות נושא דרך CSS custom properties, ופרוסת critical-CSS זעירה לציור ראשון. ללא עלות זמן-ריצה של utility-classes או CSS-in-JS.

### Pipeline של ה-build

ה-build הוא רצף בן שלושה שלבים שמוגדר ב-`package.json`:

1. `build`: `vite-react-ssg build` — מבצע prerender לכל הראוטים הכלולים אל `dist/`.
2. `postbuild`: `node scripts/generate-sitemap.mjs` ואז `node scripts/inline-critical-css.mjs` — מייצר את ה-sitemap מתוך ה-HTML שנפלט, ואז מטמיע critical CSS והופך את גיליון הסגנונות הראשי ללא-חוסם.

סקריפטים נוספים: `dev` (שרת פיתוח Vite), `build:client` (build בצד-לקוח בלבד, ללא SSG), `preview` (הגשת ה-build בפורט 4173), `lint` (ESLint, מדיניות אפס אזהרות).

### פריסה ואחסון (Deployment & Hosting)

- **Vercel.** מוגדר על ידי `vercel.json` (‏`framework: null`, ‏`buildCommand: npm run build` מותאם, ‏`outputDirectory: dist`). ‏Vercel גם מארח את פונקציית ה-serverless ‏`api/contact.js` (‏`maxDuration: 10`). ראו [חלק 13](#חלק-13--ארכיטקטורת-פריסה).

### דומיין

- **yuvaldigital.co.il** (עם alias של `www.`). ה-origin מקודד קשיח כ-`https://yuvaldigital.co.il` ב-`src/data/jsonld.js`, ב-`src/components/Seo.jsx`, בסקריפט ה-sitemap וב-allowlist של ה-origin ב-API.

### כלי אנליטיקס ו-SEO

- **Google Analytics 4** (`VITE_GA4_ID`), **Microsoft Clarity** (`VITE_CLARITY_ID`), ו-**Cloudflare Web Analytics** (`VITE_CLOUDFLARE_BEACON_TOKEN`) — כולם הצטרפות-בבחירה (opt-in) דרך משתני סביבה; מזהים חסרים אינם טוענים שום סקריפט. GA4 + Clarity מחווטים דרך `src/utils/analytics.js`; ה-beacon של Cloudflare מוזרק על ידי `Seo.jsx`.
- **Google Search Console** — טוקן אימות דרך `VITE_GSC_VERIFICATION` (מרונדר כ-`<meta>` רק כאשר הוגדר).

### אינטגרציות backend (חיצוניות)

- **n8n** webhook (`N8N_WEBHOOK_URL`, ברירת מחדל מופע מתארח ב-Railway) מקבל לידים מאומתים וכותב אותם ל-**Airtable**.

---

## חלק 3 — מפת ראוטים מלאה

כל הניתוב מוגדר ב-`src/router/routes.jsx` ונצרך באופן זהה על ידי ה-prerenderer ועל ידי ה-router בצד הלקוח. כל ראוט תוכן חי תחת סגמנט `:lang` (‏`he` או `en`). ‏`he` הוא לוקאל ברירת המחדל.

### טבלת ראוטים

| ראוט (תבנית) | מטרה | קומפוננטות עיקריות |
|---|---|---|
| `/` | אינדקס שורש — מפנה ללוקאל | `RootLayout` → `RootIndexRedirect` |
| `/page/:slug` | נתיב משפטי legacy ללא קידומת — הפניה ללוקאל ברירת המחדל | `RootLayout` → `LegacyRedirect` |
| `/:lang` (index) | **דף הבית** (משפך ההמרה) | `LangLayout` → `Home` |
| `/:lang/about` | דף אודות / מייסד | `About` (lazy) |
| `/:lang/page/privacy` | מדיניות פרטיות | `PrivacyPolicy` (lazy) → `LegalPage` |
| `/:lang/page/accessibility` | הצהרת נגישות | `AccessibilityStatement` (lazy) → `LegalPage` |
| `/:lang/services/:slug` | דף שירות מפורט | `Service` (lazy) |
| `/:lang/blog` | אינדקס בלוג | `Blog` (lazy) |
| `/:lang/blog/:slug` | דף מאמר | `Article` (lazy) |
| `/*` (catch-all) | כל נתיב לא ידוע | `RootIndexRedirect` |

### כתובות URL שעברו prerender (פורסמו)

`includedRoutes()` מרחיב, עבור כל אחד מ-`['he','en']`:

- סטטי: `''` (בית), `/about`, `/page/privacy`, `/page/accessibility`
- שירות: `/services/business-websites`, `/services/landing-pages`, `/services/ai-automation` (שלושת השירותים עם `published: true`)
- בלוג (רק אם `BLOG_HAS_PUBLISHED`): `/blog`, `/blog/modern-websites-help-small-businesses-look-professional`

כך שסט הכתובות החי והאינדקסבילי הוא בקירוב **2 לוקאלים × 9 נתיבים ≈ 18 ראוטים שעברו prerender**, כל אחד נפלט כתיקייה משלו + `index.html`.

### פירוט לכל ראוט

**`/` (RootIndexRedirect)** — *מה הוא עושה*: מפנה את השורש החשוף לדף בית של לוקאל. *מדוע הוא קיים*: אין דף נחיתה ניטרלי-שפה; כל דף חייב להיות בלוקאל ספציפי לצורך SSG דטרמיניסטי וסריקוּת. *לוגיקה*: ברירת מחדל לעברית, אך מכבד רמז "last-visited" מ-`localStorage` כאשר הוא תקף. בפרודקשן Vercel גם מבצע `/ → /he` כ-302 ב-edge. *מטרת SEO*: נמנע משורש כפול שמתחרה בדפי הבית הקנוניים של הלוקאלים.

**`/:lang` (Home)** — *מה הוא עושה*: מרנדר את משפך דף הבית המלא. *מסע משתמש*: זוהי נקודת הכניסה העיקרית לרוב המבקרים והיעד של רוב ה-CTA. *מטרת SEO*: מפרסם את גרף הישויות המלא (`WebSite + Person + ProfessionalService + FAQPage`) ובעל עדיפות `1.0` ב-sitemap.

**`/:lang/about` (About)** — *מה הוא עושה*: מספר את סיפור המייסד + הסטודיו על פני חמישה sections. *מדוע הוא קיים*: בניית ישויות — הוא מקשר את ה-`Person` (Yuval Zakay) ל-`Organization` (Yuval Digital) באמצעות סכימת `AboutPage`. *מסע משתמש*: שלב אמון עבור לקוחות פוטנציאליים בשלב ההחלטה. *מטרת SEO*: `AboutPage` שה-`mainEntity` שלו מצביע באמצעות `@id` אל ה-Person הקנוני.

**`/:lang/services/:slug` (Service)** — *מה הוא עושה*: צלילה לעומק של שירות בודד עם hero, מסגור בעיה, מה כלול, תהליך בנייה, שאלות נפוצות ושירותים קשורים. *מדוע הוא קיים*: כל דף מכוון לאשכול מילות מפתח ומנתב ליצירת קשר. *מסע משתמש*: כרטיס במקטע Services → דף שירות → יצירת קשר. *מטרת SEO*: סכימת `Service` + `BreadcrumbList` (+ `FAQPage`), מילות מפתח לכל לוקאל, טופולוגיית קישורים פנימיים דרך `related`.

**`/:lang/blog` ו-`/:lang/blog/:slug`** — *מה הם עושים*: דף אינדקס מערכת ודפי מאמר. *מדוע הם קיימים*: רוחב נושאי וחיזוק ישויות (ה-`author`/`publisher` של כל מאמר מקושרים באמצעות `@id` ל-Person/Org הקנוניים). *מטרת SEO*: סכימת `Blog` / `BlogPosting` + `BreadcrumbList`; רק מאמרים שפורסמו נשלחים לאוויר.

**`/:lang/page/privacy` ו-`/:lang/page/accessibility`** — *מה הם עושים*: דפי חוק/ציות המרונדרים דרך מעטפת `LegalPage` המשותפת. *מדוע הם קיימים*: ציות משפטי (פרטיות) וציות לחוק הנגישות הישראלי (הצהרת נגישות). *מטרת SEO*: במכוון **אינם** מפרסמים מידע מובנה — הם אינם משטחי ישויות.

---

## חלק 4 — מלאי קומפוננטות מלא

הקומפוננטות חיות בשלושה עצים: UI לשימוש חוזר ב-`src/components/`, "כרום" של layout ב-`src/layout/`, ואבני בניין ברמת דף ב-`src/sections/`. לכל קומפוננטה יש קובץ `.css` צמוד אלא אם צוין אחרת.

### 4.1 קומפוננטות לשימוש חוזר (`src/components/`)

#### `Button.jsx`
- **מטרה**: פרימיטיב כפתור/קישור פולימורפי.
- **Props**: `as` (ברירת מחדל `'button'`), `variant` (ברירת מחדל `'primary'` — למשל `gradient`, `ghost`), `size` (ברירת מחדל `'md'`), `className`, `iconStart`, `iconEnd`, `children`, `...rest`.
- **State**: אין (פרזנטציוני).
- **תלויות**: יוטיליטי `cn`.
- **בשימוש על ידי**: Navbar, CtaBanner, MobileActionBar, Hero, Packages, ServiceHero, AboutCta, ArticleList, ועוד.
- **פונקציה ויזואלית**: כפתור מעוצב המרונדר כאלמנט כלשהו (`<button>`, `<a>`, `<Link>`); התווית עטופה ב-span, האייקונים `aria-hidden`.
- **פונקציה עסקית**: משטח ה-CTA העקבי בכל האתר.

#### `Container.jsx`
- **מטרה**: עוטף layout עם רוחב מקסימלי + ריווח אופקי.
- **Props**: `as` (ברירת מחדל `'div'`), `className`, `children`, `...rest`.
- **תלויות**: `cn`. **בשימוש על ידי**: כמעט כל section/layout. **פונקציה**: אוכף קצב תוכן עקבי.

#### `Logo.jsx`
- **מטרה**: סמל מותג + wordmark עם ניתוב חכם.
- **Props**: `compact` (סמל בלבד), `variant` (ברירת מחדל `'nav'`, גם `'drawer'`), `onClick`.
- **תלויות**: `useLanguage`, `useLocation`, `Link`, `cn`.
- **פונקציה ויזואלית**: סמל SVG עם gradient + wordmark, מודע ל-RTL. בדף הבית זהו עוגן לראש הדף; מחוץ לדף הבית זהו `<Link>` לדף הבית של הלוקאל.
- **פונקציה עסקית**: עוגן זכירוּת מותג ב-navbar, ב-drawer ובפוטר.

#### `LanguageSwitcher.jsx`
- **מטרה**: החלפה בין HE ↔ EN.
- **תלויות**: `useLanguage` (`toggleLocale`). **בשימוש על ידי**: Navbar (פעולות דסקטופ + העדפות ב-drawer).
- **פונקציה עסקית**: גישה דו-לשונית; מחליף לוקאל תוך שמירה על הנתיב הנוכחי (דרך `swapLocale`).

#### `ThemeToggle.jsx`
- **מטרה**: החלפה בין ערכת נושא בהירה ↔ כהה.
- **תלויות**: `useTheme`, `useLanguage`. **פונקציה ויזואלית**: אייקון שמש/ירח. **פונקציה עסקית**: העדפת משתמש + ציפיית UX מודרנית; מכבד reduced motion.

#### `CtaBanner.jsx`
- **מטרה**: באנר המרה לשימוש חוזר הממוקם בנקודות נשירה במשפך.
- **Props**: `variant` (מפתח דלי i18n בשם `ctaBanner.<variant>`, ברירת מחדל `'afterHero'`), `tone` (`'soft'` | `'strong'`).
- **תלויות**: `Container`, `Button`, `Reveal`, `useLanguage`, `WHATSAPP_HREF`, `cn`, `track`.
- **פונקציה ויזואלית**: eyebrow + כותרת + גוף + שני כפתורים (CTA ליצירת קשר + WhatsApp), עטוף ב-`Reveal`.
- **פונקציה עסקית**: לכידת המרה משנית; דף הבית משתמש בשלושה (`afterHero` רך, `afterPackages` רך, `beforeFooter` חזק).

#### `TrustStrip.jsx`
- **מטרה**: רצועת הוכחה קומפקטית בת 3 פריטים סמוך ל-hero.
- **תלויות**: `Container`, `Reveal`, `useLanguage` (`dict.trustStrip.items`). מחזיר `null` אם אין פריטים.
- **פונקציה עסקית**: אמינות מוקדמת (מהירות / אבטחה / לגיטימיות); מרונדר באופן eager (ללא chunk) בדף הבית.

#### `Counter.jsx`
- **מטרה**: מספר מונפש שמופעל בגלילה.
- **Props**: `value` (חובה), `prefix`, `suffix`, `duration` (ברירת מחדל `1400`), `className`.
- **State**: `display` (ערך מונפש), `startedRef`. **תלויות**: `useReveal`, `requestAnimationFrame`; מכבד `prefers-reduced-motion`.
- **פונקציה עסקית**: מפנה תשומת לב למדדי אמינות (למשל ב-Hero).

#### `Reveal.jsx`
- **מטרה**: עוטף אנימציית כניסה מבוסס IntersectionObserver.
- **Props**: `as` (ברירת מחדל `'div'`), `variant` (ברירת מחדל `'up'`), `delay` (ms, ל-staggering), `className`, `children`, `...rest`.
- **תלויות**: `useReveal`, `cn`. **בשימוש על ידי**: רוב ה-sections.
- **פונקציה עסקית**: ליטוש/דינמיות נתפסים; מנפיש רק תוכן שנמצא במסך.

#### `DeviceMockup.jsx`
- **מטרה**: מסגרת דפדפן/טלפון סביב צילומי מסך של תיק עבודות.
- **Props**: `variant` (`'browser'` | `'phone'`), `url`, `className`, `children`, `...rest`. מסומן `aria-hidden` (דקורטיבי).
- **בשימוש על ידי**: מקטע Projects. **פונקציה עסקית**: גורם לתיק העבודות להיראות מקצועי ובהקשר.

#### `WhatsAppFab.jsx`
- **מטרה**: כפתור WhatsApp צף.
- **State**: `visible` (אחרי גלילה של 320px), `hidden` (כאשר `#contact` בתצוגה).
- **תלויות**: `useLanguage`, `WHATSAPP_HREF`, `cn`, `track`. **נטען בעצלות (lazy)** על ידי `AppShell`.
- **פונקציה עסקית**: ערוץ הצ'אט העיקרי הזמין תמיד (WhatsApp הוא אפליקציית ההודעות הדומיננטית בישראל); מסתתר במהלך מקטע יצירת הקשר כדי לא להתחרות בטופס המוטמע.

#### `ScrollToTopFab.jsx`
- **מטרה**: כפתור צף "חזרה למעלה" (מופיע אחרי ~500px). **נטען בעצלות**.
- **תלויות**: `useLanguage`; מכבד reduced-motion ואת דגל pause-animations של הנגישות.

#### `MobileActionBar.jsx`
- **מטרה**: סרגל דביק למובייל בלבד עם Call / WhatsApp / Quote.
- **State**: `visible` (אחרי 280px), `hidden` (כאשר `#contact` בתצוגה).
- **תלויות**: `useLanguage`, `useLocation`, `PHONE_HREF`, `WHATSAPP_HREF`, `cn`, `track`. **נטען בעצלות**.
- **פונקציה עסקית**: ממקסם המרה במובייל באמצעות שלושה ערוצים מותאמי-מגע.

#### `AccessibilityToolbar.jsx`
- **מטרה**: פאנל בקרת נגישות צף. **נטען בעצלות**.
- **State**: `open`, בתוספת `panelRef` / `triggerRef`. **תלויות**: `useLanguage`, `useA11y`, `cn`, `Link`.
- **פונקציה ויזואלית**: FAB פותח דיאלוג עם stepper לגודל טקסט, חמישה toggles (ניגודיות, גווני אפור, קו תחתון לקישורים, פונט קריא, השהיית אנימציות), reset, וקישור להצהרת הנגישות. ראו [חלק 8](#חלק-8--מערכת-נגישות).

#### `Seo.jsx`
- **מטרה**: ה-head של המסמך לכל ראוט. מכוסה בפירוט ב-[חלק 9](#חלק-9--מערכת-seo).
- **Props**: `title`, `description`, `path` (סיומת ניטרלית-לוקאל), `image` (ברירת מחדל favicon), `jsonLd` (מערך), `noindex`.

### 4.2 Mockups (`src/components/mockups/`)

רישום (registry) של ויזואלים לתיק העבודות, מיוצא דרך barrel ב-`index.js`:

- **`MarzipanMockup.jsx`** ו-**`YuvalMockup.jsx`** — צילומי מסך אמיתיים (לקוח/עצמי) המרונדרים דרך `<picture>` עם מקורות AVIF/WebP/PNG, נטענים בעצלות; תומכים ב-`variant` ‏`'browser'`/`'phone'`.
- **`ClinicMockup.jsx`** (קביעת תורים), **`RestaurantMockup.jsx`** (תפריט + עגלה), **`LeadgenMockup.jsx`** (טופס לידים), **`LawMockup.jsx`** (אתר משרד עו"ד דו-לשוני) — ממשקי קונספט שנבנו ידנית, דקורטיביים, המדגימים יכולת על פני ורטיקלים שונים. ‏`LawMockup` קורא את הלוקאל דרך `useLanguage`.

### 4.3 Layout (`src/layout/`)

- **`RootLayout.jsx`** — מעטפת עליונה מעל `:lang`. טוען את `ThemeProvider` ו-`A11yProvider`, את ה-`<Outlet/>`, את `ScrollManager` ואת `AnalyticsListener` (מאתחל אנליטיקס פעם אחת, יורה `pageview` בכל שינוי path/search). במכוון **אינו** טוען `HelmetProvider`.
- **`LangLayout.jsx`** — מעטפת לוקאל. מאמת את `:lang`; לא תקין → `<Navigate to="/he" replace />`. עוטף את הילדים ב-`LanguageProvider` וב-`AppShell`, עם `<Suspense fallback={null}>` עבור ראוטים עצלים.
- **`AppShell.jsx`** — ה"כרום" הויזואלי: skip link, ‏`Navbar`, ‏`<main id="main">`, ‏`Footer`, וארבעת ה-widgets הצפים העצלים (WhatsApp, ScrollToTop, MobileActionBar, AccessibilityToolbar). ה-UI הקבוע ממוקם **מחוץ** ל-`.app-shell__content` כך שפילטר הנגישות של גווני אפור (היוצר containing block) לא ישבור אלמנטים עם `position: fixed`.
- **`Navbar.jsx`** — *מטרה*: ניווט ראשי דביק + drawer למובייל. *Props*: אין. *State*: `open` (drawer); בתוספת router/locale דרך `useParams`/`useLocation`. *תלויות*: `Container`, `Logo`, `LanguageSwitcher`, `ThemeToggle`, `Button`, `useLanguage`, `useScrollProgress(8)`, `navLinks`, `track`, `cn`. *בשימוש על ידי*: `AppShell`. *פונקציה ויזואלית*: סרגל בגובה 72px שמקבל `nav--scrolled` אחרי 8px; קישורים + פעולות בדסקטופ, בורגר במובייל → drawer מלא עם scrim. *פונקציה עסקית*: ניווט בראש המשפך ו-CTA קבוע. ההתנהגות מפורטת ב-[חלק 5](#חלק-5--ארכיטקטורת-ניווט).
- **`Footer.jsx`** — *מטרה*: פוטר האתר (מראה של ניווט, יצירת קשר, משפטי, שקיפות). *Props*: אין. *State*: אין (קורא `useParams`/`useLocation` לפתרון עוגנים; `year` מ-`new Date()`). *תלויות*: `Container`, `Logo`, `useLanguage`, `navLinks`, `BLOG_HAS_PUBLISHED`, קבועי יצירת קשר, אייקונים מוטמעים. *בשימוש על ידי*: `AppShell`. *פונקציה ויזואלית*: פריסה בת ארבעה אזורים (מותג+WhatsApp מהיר, ניווט, רשימת יצירת קשר, ואז שקיפות/משפטי/זכויות יוצרים/אותיות קטנות). *פונקציה עסקית*: ניווט משני + ערוצי יצירת קשר זמינים תמיד + אותות אמון/בעלות.
- **`ScrollManager.jsx`** — מקור האמת היחיד להתנהגות גלילה (גלילה-לראש, שחזור בעת back/forward דרך `sessionStorage`, וגלילת עוגני hash מבוססת האצלת-קליקים). הוא **מחליף** במכוון את `<ScrollRestoration>` של React Router כדי לתקן תקלת תזמון ("first click does nothing") מול content-visibility.

### 4.4 Sections (`src/sections/`)

ה-sections הם בלוקי הרכבה ברמת דף. כמעט כולם צורכים את `useLanguage()` לטקסטים ועוטפים תוכן ב-`Reveal` לאנימציית כניסה. הם נחלקים לארבע משפחות: דף-בית, דף-אודות, דף-שירות ובלוג.

#### Sections של דף הבית (`src/sections/`)

**`Hero.jsx`** — *מיקום*: `src/sections/Hero.jsx`. *מטרה*: וו זהות בפריים הראשון; נושא את ה-`<h1 id="hero-title">` היחיד של הדף. *תפקיד המרה*: שני CTA — ראשי → Contact, משני → Projects — שניהם עם `track()`; chips של נושאים מקשרים עמוק לדפי שירות שפורסמו. *קומפוננטות בשימוש*: `Container`, `Button` (gradient + ghost), `Counter`, אייקוני SVG מוטמעים `ArrowIcon`/`PlayIcon`. *State/hooks*: `useLanguage`, `track`. *מקורות נתונים*: `dict.hero.*`, `SERVICE_CATALOG` (לפתרון כתובות שירות), `dict.hero.topics`. *ערך SEO*: ה-`<h1>` היחיד (`aria-labelledby="hero-title"`); מדדי אמינות; קישורים פנימיים ל-slugs של שירותים.

**`Trust.jsx`** — *מיקום*: `src/sections/Trust.jsx`. *מטרה*: גריד של אותות אמון לצמצום חיכוך מיד אחרי ה-CTA הראשון. *תפקיד המרה*: צמצום סיכון. *קומפוננטות בשימוש*: `Container`, `Reveal`, `trustIcons`. *State/hooks*: `useLanguage`. *מקורות נתונים*: `dict.trust.items` (id/title/body), `src/data/trust.jsx`. *ערך SEO*: `<article>` לכל טענה עם כותרות `<h3>`.

**`Services.jsx`** — *מיקום*: `src/sections/Services.jsx`. *מטרה*: "מה אני בונה" — גריד כרטיסי השירות (שער לדפים המפורטים). *תפקיד המרה*: מנתב לקוחות לדפי שירות ממוקדי-מילות-מפתח; רק slugs עם `published` מקשרים החוצה, השאר נופלים חזרה ל-`#services`. *קומפוננטות בשימוש*: `Container`, `Reveal` (staggered), `Link`, `serviceIcons`, ‏`ServiceCard` פנימי. *State/hooks*: `useLanguage`. *מקורות נתונים*: `dict.services.items`, `SERVICE_CATALOG` (בדיקת published + slug), `serviceIcons`. *ערך SEO*: כותרות שירות `<h3>`; משטח קישורים פנימיים חזק.

**`Packages.jsx`** — *מיקום*: `src/sections/Packages.jsx`. *מטרה*: שכבות תמחור שקופות של נקודת התחלה. *תפקיד המרה*: מצמצם חיכוך רכישה; חבילה אחת מודגשת; כל ה-CTA → `#contact`. *קומפוננטות בשימוש*: `Container`, `Reveal`, `Button`, `CheckIcon`/`ArrowIcon`, `cn`. *State/hooks*: `useLanguage`. *מקורות נתונים*: `dict.packages.plans` (id/name/tagline/price/priceNote/for/deliverables/highlight/badge/cta). *ערך SEO*: `<article>` לכל חבילה עם `<h3>` ורשימת מסירות מסומנת בצ'ק.

**`Process.jsx`** — *מיקום*: `src/sections/Process.jsx`. *מטרה*: "איך אני עובד" — ציר זמן מתודולוגי בן חמישה שלבים. *תפקיד המרה*: מצמצם סיכון נתפס על ידי הפיכת ההתקשרות למוחשית. *קומפוננטות בשימוש*: `Container`, `Reveal`, קו/דופק דקורטיביים בציר. *State/hooks*: `useLanguage`. *מקורות נתונים*: `dict.process.steps` (id/index/title/body). *ערך SEO*: שלבים בסמנטיקת רשימה (`role="list"`/`listitem`) עם כותרות `<h3>`; מספרי האינדקס `aria-hidden`.

**`Projects.jsx`** — *מיקום*: `src/sections/Projects.jsx`. *מטרה*: תיק עבודות / הוכחה חברתית, מגשר בין המקטעים החינוכיים למסחריים. *תפקיד המרה*: הוכחה מוחשית; פרויקטים מובחרים מקשרים ל-live demos / case studies (עם `track()`) ומסמנים עבודה אמיתית מול קונספט; מסתיים ב-CTA ל-`#contact`. *קומפוננטות בשימוש*: `Container`, `Reveal`, `DeviceMockup`, רישום ה-mockups, `ProjectCard`/`ServiceLinkCard`, `ArrowIcon`/`CheckIcon`/`StarIcon`/`SparkleIcon`. *State/hooks*: `useLanguage`, `track`. *מקורות נתונים*: `dict.projects.items` (id/featured/kind/title/subtitle/solution/category/tags/skills/features/liveUrl/caseStudyUrl), `projectVisuals` (`src/data/projects.js`), `dict.projects.stats`, `dict.projects.finalCta`. *ערך SEO*: מטא-דאטה עשירה של פרויקטים ברשימות סמנטיות; קישור יוצא + פנימי.

**`Stack.jsx`** — *מיקום*: `src/sections/Stack.jsx`. *מטרה*: שקיפות טכנולוגית (קבוצות frontend / workflow / quality). *תפקיד המרה*: סמכות והרגעה לגבי עמידות-לעתיד. *קומפוננטות בשימוש*: `Container`, `Reveal`, אייקוני קבוצה. *State/hooks*: `useLanguage`. *מקורות נתונים*: `dict.stack.groups` (id/title/items{name,hint}). *ערך SEO*: `<article>` לכל קבוצה עם כותרות `<h3>`.

**`About.jsx` (דף הבית)** — *מיקום*: `src/sections/About.jsx`. *מטרה*: סיפור מייסד קומפקטי + ארבעה עמודים ממוספרים (01–04) עם דיוקן המייסד. *תפקיד המרה*: מאניש את המותג; אמון עמוק יותר. *קומפוננטות בשימוש*: `Container`, `Reveal` (וריאנט שמאל), `<img>` דיוקן (lazy), ‏`<article>` עמודים. *State/hooks*: `useLanguage` (מפצל את `t('about.body')` לפי שורות כפולות). *מקורות נתונים*: `/yuvalImg.jpg`, `dict.about.pillars`, `dict.about.*`. *ערך SEO*: `<h2>` + alt דיוקן מ-i18n; ארבעה עמודי `<h3>`.

**`Authority.jsx`** — *מיקום*: `src/sections/Authority.jsx`. *מטרה*: מטריצת אמינות של שישה בידולים (ישיר, מודרני, כן, דו-לשוני, מוקפד, ממוקד-צמיחה). *תפקיד המרה*: הוכחה חברתית ללא case studies. *קומפוננטות בשימוש*: `Container`, `Reveal`, שישה אייקוני authority מוטמעים. *State/hooks*: `useLanguage`. *מקורות נתונים*: `dict.authority.items` (id/title/body). *ערך SEO*: כותרות `<h3>` בתוך `<article>`. *(זמין בעץ ה-sections כגריד אמינות חלופי.)*

**`Faq.jsx` (דף הבית)** — *מיקום*: `src/sections/Faq.jsx`. *מטרה*: טיפול בהתנגדויות; אקורדיון שהפריט הראשון בו פתוח כברירת מחדל. *תפקיד המרה*: שער החיכוך האחרון לפני הטופס; מסתיים ב-CTA ליצירת קשר. *קומפוננטות בשימוש*: `Container`, `Reveal`, `PlusIcon`, קישור CTA ליצירת קשר. *State/hooks*: `useState(openId)`, `useLanguage`. *מקורות נתונים*: `dict.faq.items` (id/q/a). *ערך SEO*: משקף את ה-`FAQPage` JSON-LD בדף הבית; כפתורי אקורדיון `aria-expanded`; כותרת `<h2>`.

**`Contact.jsx` (דף הבית)** — *מיקום*: `src/sections/Contact.jsx`. *מטרה*: נקודת ההמרה הסופית — טופס הלידים. *תפקיד המרה*: המשפך מגיע לשיאו כאן; מצבי הצלחה/שגיאה + כרטיסי יצירת קשר ישירים שתמיד מוצגים. *קומפוננטות בשימוש*: `Container`, `Reveal`, `Button`, שדות טופס, honeypot, רשימת אמון. *State/hooks*: `useState(status)`, `useState(errorText)`, `useRef(abortRef)`, `useRef(errorRef)`, `useEffect`, `useLanguage`, `track`. *מקורות נתונים*: `dict.contactExtra` (labels/options/trust/messages), `dict.contact`, `src/data/contact.js`, מבצע POST ל-`/api/contact`. *ערך SEO*: שדות עם labels, אותות אמון, קישור פרטיות. פירוט מלא של הצינור ב-[חלק 7](#חלק-7--מערכת-יצירת-לידים).

#### Sections של דף האודות (`src/sections/about/`)

**`AboutHero.jsx`** — *מטרה*: hero ייעודי לאודות עם דיוקן, תפקיד ורשימת עובדות `<dl>`. *תפקיד המרה*: חיבור אישי ללקוחות בשלב ההחלטה. *קומפוננטות*: `Container`, `Reveal` (שמאל), דיוקן eager (`fetchpriority="high"`). *נתונים*: `/yuvalImg.jpg`, `dict.aboutPage.hero` (eyebrow/name/role/lede/facts). *SEO*: שם המייסד ב-`<h1>`; alt דיוקן; רשימת עובדות מובנית.

**`AboutStory.jsx`** — *מטרה*: נרטיב "למה הסטודיו קיים". *תפקיד המרה*: אמון מבוסס-סיפור. *קומפוננטות*: `Container`, `Reveal`. *נתונים*: `dict.aboutPage.story` (eyebrow/title/paragraphs). *SEO*: `<h2>` + פסקאות `<p>`.

**`AboutPhilosophy.jsx`** — *מטרה*: "איך הסטודיו עובד" — ארבעה עמודי גישה. *תפקיד המרה*: בידול מתודולוגי. *קומפוננטות*: `Container`, `Reveal`, גריד ממוספר. *נתונים*: `dict.aboutPage.philosophy` (eyebrow/title/subtitle/pillars). *SEO*: `<h2>` + עמודי `<h3>` (01–04).

**`AboutNow.jsx`** — *מטרה*: שקיפות לגבי השלב הנוכחי וכיוון. *תפקיד המרה*: מיצוב כנות. *קומפוננטות*: `Container`, `Reveal`, נרטיב דו-טורי + רשימת כיוונים. *נתונים*: `dict.aboutPage.now` (eyebrow/title/paragraphs/directions). *SEO*: `<h2>` + כיוונים ברשימת תבליטים.

**`AboutCta.jsx`** — *מטרה*: CTA סוגר בדף האודות. *תפקיד המרה*: מנתב קוראים מעורבים ליצירת קשר. *קומפוננטות*: `Container`, `Reveal`, `Button` (ראשי → contact, משני → home). *State/hooks*: `useLanguage`, `track`. *נתונים*: `dict.aboutPage.cta`. *SEO*: `<h2>` + תוויות פעלי-פעולה.

#### Sections של דף השירות (`src/sections/service/`)

אלה מונחי-נתונים דרך props מ-`Service.jsx` (שמחפש טקסט ארוך ב-`dict.servicePages[i18nKey]`).

**`ServiceHero.jsx`** — *מטרה*: hero ספציפי לשירות עם breadcrumb. *תפקיד המרה*: שני CTA (contact + projects). *קומפוננטות*: `Container`, `Button`, breadcrumb `<nav aria-label="Breadcrumb">`, `ChevronIcon`. *State/hooks*: `useLanguage`, `track`. *Props/נתונים*: `data` (eyebrow/titleLead/titleHighlight/lede/subtitle), `slug`. *SEO*: `<h1>` + breadcrumb.

**`ServiceProblem.jsx`** — *מטרה*: מסגור בעיה — מנסח את הפער שהשירות ממלא. *תפקיד המרה*: טיפול בהתנגדויות. *קומפוננטות*: `Container`, `Reveal`, גריד כרטיסי בעיה. *Props/נתונים*: `data` (eyebrow/title/body/items). *SEO*: `<h2>` + כרטיסי בעיה `<h3>`.

**`ServiceFlow.jsx`** — *מטרה*: תהליך בנייה בן 5 שלבים ספציפי לשירות. *תפקיד המרה*: התאמת מתודולוגיה / צמצום סיכון. *קומפוננטות*: `Container`, `Reveal`, ציר זמן `<ol>` ממוספר. *Props/נתונים*: `data` (eyebrow/title/body/steps). *SEO*: `<h2>` + רשימה מסודרת עם שלבי `<h3>`.

**`ServiceInclusions.jsx`** — *מטרה*: מסירות קונקרטיות "מה כלול". *תפקיד המרה*: הרגעת ערך. *קומפוננטות*: `Container`, `Reveal`, כרטיסי check-icon. *Props/נתונים*: `data` (eyebrow/title/body/items). *SEO*: `<h2>` + מסירות `<h3>`.

**`ServiceFaq.jsx`** — *מטרה*: אקורדיון שאלות נפוצות ממוקד-שירות. *תפקיד המרה*: טיפול אחרון בהתנגדויות. *קומפוננטות*: `Container`, `Reveal`, אקורדיון, קישור ל-FAQ בדף הבית. *State/hooks*: `useState(openId)`. *Props/נתונים*: `data` (eyebrow/title/items{q,a}). *SEO*: אקורדיון `aria-expanded`; תואם לסכימת `FAQPage` של דף השירות.

**`ServiceRelated.jsx`** — *מטרה*: קישורים צולבים לשירותים קשורים לטובת סמכות נושאית. *תפקיד המרה*: מכירה צולבת בתוך המשפך. *קומפוננטות*: `Container`, `Reveal`, `Link`, `serviceIcons`. *State/hooks*: `useLanguage`. *Props/נתונים*: `relatedSlugs`, `getService(slug)`, `dict.services.items`. *SEO*: קישורי שירות `<h3>`; טופולוגיית קישורים פנימיים.

#### Sections של הבלוג (`src/sections/blog/`)

**`BlogHero.jsx`** — *מטרה*: hero לאינדקס הבלוג עם breadcrumb. *תפקיד המרה*: מעודד עיון (לא-המרה). *קומפוננטות*: `Container`, breadcrumb, `ChevronIcon`. *State/hooks*: `useLanguage`. *SEO*: `<h1>` + breadcrumb.

**`ArticleList.jsx`** — *מטרה*: גריד מאמרים באינדקס הבלוג עם תאריכים מודעי-לוקאל + זמן קריאה; CTA חלופי במצב ריק. *תפקיד המרה*: עיון + CTA משני כשריק. *קומפוננטות*: `Container`, `Reveal`, `Button`. *State/hooks*: `useLanguage`, `readingMinutes()`. *Props/נתונים*: `entries` (slug/title/lede/publishDate). *SEO*: קישורי מאמר + מטא.

**`ArticleHero.jsx`** — *מטרה*: hero למאמר עם תאריך פרסום + זמן קריאה. *תפקיד המרה*: אמינות מערכת. *קומפוננטות*: `Container`, breadcrumb, `<time dateTime>`, `ChevronIcon`. *State/hooks*: `useLanguage` (תאריך `Intl` מודע-לוקאל). *Props/נתונים*: `entry.publishDate`, `title`, `lede`, `minutes`. *SEO*: `<h1>` + `<time>`.

**`ArticleBody.jsx`** — *מטרה*: מרנדר מאמר מבוסס-nodes. *תפקיד המרה*: כרטיסי קישור-שירות בתוך התוכן מניעים כוונה מסחרית. *קומפוננטות*: `Container`, מרנדר nodes, `ServiceLinkCard`. *State/hooks*: `useLanguage`. *Props/נתונים*: מערך `nodes`; סוגי nodes נתמכים `p`, `h2`, `h3`, `ul`, `ol`, `quote`, `callout`, `link` (slug → `getService`). *SEO*: `<h2>`/`<h3>` עם id אוטומטי, רשימות, ציטוטים, קישורים פנימיים.

**`ArticleRelated.jsx`** — *מטרה*: מסילות של מאמרים קשורים + שירותים קשורים. *תפקיד המרה*: שומר על מעורבות הקוראים; קישורי שירות ממירים. *קומפוננטות*: `Container`, `Reveal`, `Link`, `serviceIcons`; מחזיר `null` אם אין דבר קשור. *State/hooks*: `useLanguage`. *Props/נתונים*: slugs של `relatedArticles`/`relatedServices`, `getArticle`/`isPublishedArticle`, גופי מאמרים נטענים ב-glob, `getService`, `dict.services.items`. *SEO*: טופולוגיית קישורים פנימיים על פני משטחי מערכת + מסחר.

### 4.5 שכבת הנתונים (`src/data/`)

שכבת הנתונים היא מודל התוכן שמניע את הניתוב, ה-sitemap, הסכימה והקישורים הפנימיים. ההתייחסות לקבצים אלה כמקור האמת היא הדפוס הארכיטקטוני המרכזי של הפרויקט.

- **`serviceCatalog.js`** — רישום עבור `/:lang/services/:slug`. מייצא את `SERVICE_CATALOG` (6 רשומות; לכל אחת: `slug`, `id`, `i18nKey`, `published`, `keywords` לכל לוקאל, `related[]`), וכן `SERVICE_BY_SLUG`, `PUBLISHED_SERVICES`, `getService(slug)`, `isPublishedSlug(slug)`. פורסמו: `business-websites`, `landing-pages`, `ai-automation`; טיוטות: `ai-business-systems`, `internal-tools`, `seo`.
- **`articleCatalog.js`** — רישום עבור `/:lang/blog` + `/:lang/blog/:slug`. מייצא את `ARTICLE_CATALOG` (3 רשומות; לכל אחת: `slug`, `i18nKey`, `published`, `publishDate`, `topic`, `tags`, `relatedServices`, `relatedArticles`), וכן `ARTICLE_BY_SLUG`, `PUBLISHED_ARTICLES` (ממוין מהחדש לישן), `getArticle`, `isPublishedArticle`, ו-`BLOG_HAS_PUBLISHED` (שולט בכל משטח הבלוג).
- **`projects.js`** — `projectVisuals` ממופתח לפי מזהה פרויקט (`marzipan`, `yuval`, `clinic`, `restaurant`, `leadgen`, `law`, `default`); כל אחד מספק `accent` (gradient), `glow` (צל rgba), `chip` (תווית קטגוריה) המשמשים כ-CSS custom properties במקטע Projects.
- **`services.jsx`** — `serviceIcons` (אייקוני SVG ב-JSX ממופתחים `web/landing/automation/ai/systems/presence`) המשמשים את המקטעים Services, ServiceRelated ו-ArticleRelated.
- **`trust.jsx`** — `trustIcons` (אייקוני SVG ב-JSX ממופתחים לפי מזהה פריט אמון) המשמשים את מקטע Trust.
- **`nav.js`** — `navLinks` (מודל הניווט anchor/route; ראו [חלק 5](#חלק-5--ארכיטקטורת-ניווט)).
- **`contact.js`** — מקור אמת יחיד לפרטי יצירת קשר: `OWNER_NAME`, `EMAIL`, קבועי טלפון (`PHONE_LOCAL`, `PHONE_INTL`, גרסאות raw), `EMAIL_HREF`, `PHONE_HREF`, ו-`WHATSAPP_HREF` (עם הודעה בעברית ממולאת מראש).
- **`seo.js`** — `seoCopy`: `{ title, description }` לכל ראוט ולכל לוקאל עבור home, privacy, accessibility, about, blog ושלושת השירותים שפורסמו.
- **`jsonld.js`** — גרף המידע המובנה + פונקציות בונה (ראו [חלק 9](#חלק-9--מערכת-seo)).
- **`articles/<locale>/<i18nKey>.js`** — גופי מאמרים לכל לוקאל, כל אחד `export default { title, lede, body: ArticleNode[] }`. כעת `he/modernWebsites.js` ו-`en/modernWebsites.js`.

### 4.6 Hooks, utils, i18n ו-theme

**Hooks (`src/hooks/`)**
- `useLanguage()` — מחזיר את ה-`LanguageContext` (`locale`, `dir`, `isRtl`, `dict`, `t`, `setLocale`, `toggleLocale`); זורק שגיאה מחוץ ל-`LanguageProvider`.
- `useTheme()` — מחזיר את ה-`ThemeContext` (`theme`, `isDark`, `setTheme`, `toggleTheme`).
- `useA11y()` — מחזיר את ה-`A11yContext` (הגדרות + מוטטורים).
- `useReveal()` — מבוסס IntersectionObserver; מחזיר `ref` + בוליאני `revealed` (מופעל פעם אחת).
- `useScrollProgress(threshold = 8)` — מחזיר `{ scrolled }` (אמת ברגע ש-`scrollY` חוצה את הסף).

**Utils (`src/utils/`)**
- `analytics.js` — façade מעל GA4 + Microsoft Clarity. `initAnalytics()` מאתחל את שניהם בתוך `requestIdleCallback` (מדלג על Clarity במצב save-data); `pageview(path, title)` מדווח על pageviews וירטואליים של SPA; `track(name, params)` מתעד אירועים עסקיים ב-snake_case. ללא פעולה כשמזהים חסרים.
- `cn.js` — עוזר classnames רקורסיבי זעיר (strings/arrays/objects).
- `readingTime.js` — `wordCount(body)` ו-`readingMinutes(body)` (190 מילים לדקה, מכוונן דו-לשונית, מינימום 1) על עצי nodes של מאמרים.
- `scrollToHash.js` — גלילת hash אמינה: מנסה שוב עד 30 frames, מקדם זמנית מקטעי `content-visibility:auto` כדי למדוד offsets אמיתיים, גולל בצורה חלקה (תוך כיבוד reduced motion), מנהל focus, משחזר מצב, ומחזיר פונקציית ניקוי.

**i18n (`src/i18n/`)**
- `index.js` — `locales` (`{ he, en }`), `localeOrder` (`['he','en']`), `DEFAULT_LOCALE` (`'he'`), `getLocale(code)`, ו-`translate(dict, path)` שעובר על נתיב מפתח עם נקודות (למשל `servicePages.businessWebsites.eyebrow`) ונופל חזרה למחרוזת הנתיב אם חסר.
- `he.js` / `en.js` — מילוני הלוקאל המלאים (nav, hero, sections, דפי שירות, contact, טקסטי a11y/משפטי וכו').
- `LanguageProvider.jsx` — provider לוקאל מונחה-URL (ראו [חלק 5](#חלק-5--ארכיטקטורת-ניווט)).

**Theme (`src/theme/`)**
- `tokens.js` — מראה JS של טוקני ה-CSS (ערכי צבע light/dark ב-`themes`) ומפתחות אחסון (`THEME_STORAGE_KEY`, `LANG_STORAGE_KEY`).
- `ThemeProvider.jsx` — state של ערכת הנושא, התמדה, החלה לפני-ציור והמעבר ה"קולנועי" (ראו [חלק 5](#חלק-5--ארכיטקטורת-ניווט)).

---

## חלק 5 — ארכיטקטורת ניווט

### Navbar (`src/layout/Navbar.jsx`)

ה-navbar הוא header דביק (`.nav`) שמוסיף מחלקה `nav--scrolled` ברגע שהדף נגלל מעבר ל-8px (`useScrollProgress(8)`). הוא מרנדר:

- **מותג**: `Logo`.
- **קישורים ראשיים**: נבנים מ-`src/data/nav.js` (`navLinks`). כל רשומה היא או **anchor** (מזהה section בדף הבית) או **route** (דף אח כמו `about`). הקומפוננטה הפנימית `NavEntry` פותרת את ה-href הנכון:
  - בדף הבית, anchors מרונדרים כ-`<a href="#section">` רגיל כך שהאצלת הקליקים של `ScrollManager` מטפלת בגלילה בצורה אמינה.
  - מחוץ לדף הבית, anchors מרונדרים כ-`<Link to="/he#section">` (הגלילה מתרחשת ברגע ש-`Home` נטען).
  - רשומות route מרונדרות תמיד כ-`<Link to="/:lang/<route>">`.
- **פעולות דסקטופ**: `LanguageSwitcher`, `ThemeToggle`, וכפתור CTA עם gradient (`nav.cta`) מחווט ל-`track('cta_nav_click', { source: 'navbar_desktop' })`.
- **בורגר מובייל**: מחליף את ה-drawer; ‏`aria-expanded` / `aria-controls="primary-drawer"`.

סדר `navLinks`: ‏`services` (anchor), `about` (route), `packages`, `process`, `projects`, `faq`, `contact` (anchors).

### ניווט מובייל (drawer)

ה-drawer (`<aside id="primary-drawer" role="dialog" aria-modal="true">`) וה-scrim שלו חיים במכוון **מחוץ** ל-`<header>` — ל-`.nav` יש `backdrop-filter`, שאחרת היה יוצר containing block ששובר את מידות ה-drawer/scrim הקבועות. התנהגות:

- פתיחה קובעת `body.no-scroll` ו-`body.drawer-open` (נועלת גלילת רקע).
- `Escape` סוגר; ניווט (שינוי `pathname`) סוגר; קליק על ה-scrim סוגר.
- תוכן ה-drawer: header מותג + כפתור סגירה, אותם קישורי ניווט (staggered דרך `--i`), מקטע העדפות (שפה + ערכת נושא), ו-CTA תחתון (`track('cta_nav_click', { source: 'navbar_drawer' })`).

### Footer (`src/layout/Footer.jsx`)

הפוטר משקף את הניווט וחושף יצירת קשר:

- **טור מותג**: לוגו, tagline, וקישור WhatsApp מהיר.
- **טור ניווט**: אותם `navLinks` (מודעים ל-anchor/route), בתוספת קישור Blog כאשר `BLOG_HAS_PUBLISHED`.
- **טור יצירת קשר**: אימייל (`EMAIL_HREF`), טלפון (`PHONE_HREF`), WhatsApp (`WHATSAPP_HREF`), כולם מ-`src/data/contact.js`, עם אייקוני SVG מוטמעים ו-`dir="ltr"` על ה-spans של מספרים/אימייל.
- **שורת שקיפות** (בעלות + אזור שירות), **ניווט משפטי** (פרטיות, נגישות, יצירת קשר), זכויות יוצרים עם השנה הנוכחית, והערת "שימוש בלתי מורשה" באותיות קטנות. כל התוויות מגיעות ממילון ה-i18n.

### החלפת שפה

מונחית על ידי סגמנט ה-URL ‏`:lang`, ולא localStorage (ראו `LanguageProvider.jsx`). ‏`swapLocale(next)` משכתב את הקידומת `/he|/en` של הנתיב הנוכחי ומנווט, תוך שמירה על `search` + `hash`. זה הופך כל ראוט לדטרמיניסטי עבור סורקים ומאפשר להחלפת שפה לשמור את המשתמש באותו דף. ‏`localStorage` שומר רק רמז חד-כיווני של "last visited locale" המשמש את ההפניה מ-`/` החשוף.

### מצב כהה (Dark mode)

`ThemeProvider` (`src/theme/ThemeProvider.jsx`) מחזיק את `theme` (ברירת מחדל `'light'`), מתמיד אותו ב-`localStorage` (`yuval-digital:theme`), ומשקף אותו כ-`data-theme` על `<html>` בתוספת ה-meta של `theme-color`. כדי למנוע הבזק, `index.html` מריץ סקריפט מוטמע שמחיל את ערכת הנושא השמורה **לפני** ש-React נטען. ההחלפה מריצה מעבר "קולנועי" של blur+dim+scale (מחלקת `theme-transitioning`, ~190ms פנימה / ~240ms החוצה) אלא אם `prefers-reduced-motion`, ואז ההחלפה מיידית.

### מערכת נגישות (רלוונטי לניווט)

skip link (`<a href="#main" class="skip-link">`) הוא האלמנט הראשון בר-ה-focus. ‏`<main id="main" tabIndex={-1}>` הוא יעד הדילוג. סרגל הנגישות המלא מתועד ב-[חלק 8](#חלק-8--מערכת-נגישות).

---

## חלק 6 — ניתוח מעמיק של דף הבית

דף הבית (`src/pages/Home.jsx`) הוא נכס ההמרה המרכזי. ‏`Hero` ו-`TrustStrip` מרונדרים באופן eager (מעל הקפל); כל מה שמתחת מפוצל ל-chunks עצלים שנטענים תחת `<Suspense>` יחיד, כך שפריים ה-LCP אינו נחסם על ידי עשרה רכיבי section, שישה mockups, טופס יצירת הקשר ו-~80KB של CSS למקטעים. ה-`<Seo>` בראש מפרסם את ה-title/description של דף הבית (`seoCopy.home`) ואת גרף הישויות המלא `homeJsonLd`.

סדר המשפך ותפקיד כל מקטע:

### Hero (`src/sections/Hero.jsx`)
- **מטרה**: וו + זהות בפריים הראשון; כותרת ראשית (`<h1 id="hero-title">`).
- **תפקיד המרה**: שני CTA — ראשי ל-Contact, משני ל-Projects — שניהם עם `track(...)`. ‏chips של נושאים מקשרים לדפי שירות שפורסמו (נפתרים דרך `SERVICE_CATALOG`).
- **קומפוננטות**: `Container`, `Button` (gradient + ghost), `Counter`, אייקוני SVG מוטמעים.
- **ערך SEO**: ה-`<h1>` היחיד; מדדי אמון (מענה תוך <24h, 100% מותאם אישית, דו-לשוני); קישורים פנימיים ל-slugs של שירותים.

### TrustStrip (`src/components/TrustStrip.jsx`)
- **מטרה**: עוגן הוכחה קומפקטי מיד מתחת ל-hero. **תפקיד המרה**: צמצום חיכוך מוקדם. **ערך SEO**: מינימלי; מחזק מילות מפתח של אמינות.

### באנר CTA — `afterHero` (רך)
- **מטרה**: מסלול יציאה מוקדם למבקרים שמוכנים לדבר. **תפקיד המרה**: לכידת תנועה בעלת כוונה גבוהה לפני שהם גוללים.

### Trust (`src/sections/Trust.jsx`)
- **מטרה**: צמצום חיכוך עם גריד אותות אמון (`dict.trust.items`, אייקונים מ-`src/data/trust.jsx`). **תפקיד המרה**: צמצום סיכון. **ערך SEO**: כותרות טענה `<h3>` בתוך `<article>`.

### Services (`src/sections/Services.jsx`)
- **מטרה**: "מה אני בונה" — גריד השירותים. **תפקיד המרה**: מנתב לקוחות לדפי שירות מפורטים (רק slugs עם `published` מקשרים החוצה; השאר נופלים חזרה ל-`#services`). **קומפוננטות**: `Container`, `Reveal`, `Link`, אייקוני שירות (`src/data/services.jsx`). **ערך SEO**: כותרות `<h3>`; קישורים פנימיים לדפי שירות ממוקדי-מילות-מפתח.

### Packages (`src/sections/Packages.jsx`)
- **מטרה**: שכבות תמחור שקופות של נקודת התחלה (`dict.packages.plans`). **תפקיד המרה**: מצמצם חיכוך רכישה; כל ה-CTA מצביעים ל-`#contact`; חבילה אחת מודגשת. **ערך SEO**: `<article>` לכל חבילה עם `<h3>` ומסירות מסומנות בצ'ק.

### באנר CTA — `afterPackages` (רך)
- **מטרה**: ללכוד היסוס מיד אחרי התמחור.

### Process (`src/sections/Process.jsx`)
- **מטרה**: "איך אני עובד" — ציר זמן מתודולוגי בן 5 שלבים (`dict.process.steps`). **תפקיד המרה**: מצמצם סיכון נתפס על ידי הצגת בדיוק מה קורה. **ערך SEO**: שלבים בסמנטיקת רשימה עם כותרות `<h3>`.

### Projects (`src/sections/Projects.jsx`)
- **מטרה**: תיק עבודות / הוכחה חברתית. **תפקיד המרה**: הוכחה מוחשית; פרויקטים מובחרים מקשרים ל-live demos / case studies (עם `track`), ומבחינים בין עבודה אמיתית לקונספט. **קומפוננטות**: `DeviceMockup`, רישום ה-mockups, `projectVisuals` (`src/data/projects.js`) לצבעי accent/glow. **ערך SEO**: מטא-דאטה של פרויקטים ברשימות סמנטיות; קישור פנימי חזק; CTA סוגר ל-`#contact`.

### Stack (`src/sections/Stack.jsx`)
- **מטרה**: שקיפות טכנולוגית (`dict.stack.groups`). **תפקיד המרה**: סמכות/אמינות. **ערך SEO**: `<article>` לכל קבוצה עם כותרות `<h3>`.

### About (`src/sections/About.jsx`)
- **מטרה**: סיפור מייסד קומפקטי + ארבעה עמודים ממוספרים; דיוקן המייסד (`/yuvalImg.jpg`). **תפקיד המרה**: מאניש את המותג. **ערך SEO**: `<h2>` + טקסט alt לדיוקן מ-i18n.

### FAQ (`src/sections/Faq.jsx`)
- **מטרה**: טיפול בהתנגדויות (`dict.faq.items`); אקורדיון שהפריט הראשון בו פתוח כברירת מחדל. **תפקיד המרה**: שער החיכוך האחרון לפני הטופס; מסתיים ב-CTA ליצירת קשר. **ערך SEO**: תואם ל-`FAQPage` JSON-LD שמפורסם בראוט הבית; כפתורי `aria-expanded`.

### באנר CTA — `beforeFooter` (חזק)
- **מטרה**: הדחיפה הסופית והחזקה ביותר להמרה.

### Contact (`src/sections/Contact.jsx`)
- **מטרה**: נקודת ההמרה הסופית — טופס הלידים. מכוסה לעומק ב-[חלק 7](#חלק-7--מערכת-יצירת-לידים).

---

## חלק 7 — מערכת יצירת לידים

יצירת לידים היא סיבת הקיום של האתר. קיימים ארבעה ערוצים, כולם מצוידים באנליטיקס.

### 7.1 טופס יצירת הקשר (`src/sections/Contact.jsx` → `/api/contact`)

**שדות**: `name` (חובה), `email` (חובה), `message` (חובה), בתוספת אופציונליים `phone`, `businessType`, `projectType`/`service`, `budget`, `timeline`. שדה **honeypot** מוסתר בשם `company` לוכד בוטים. אפשרויות ה-select מגיעות מ-`dict.contactExtra` (`projectTypeOptions`, `budgetOptions`, `timelineOptions`).

**מכונת מצבים**: `status` עובר במחזור `idle → sending → success | error`. ‏`AbortController` (`abortRef`) מבטל בקשות בתהליך; בעת שגיאה, ה-focus עובר לאזור שגיאה (`errorRef`) עבור קוראי מסך.

**שליחה**: מבצע POST של JSON ל-`/api/contact`:
```json
{ "name", "email", "phone", "service", "message",
  "businessType", "budget", "timeline", "locale", "timestamp" }
```
**טיפול בתגובה**: ‏200 → מצב הצלחה + `track('contact_submit', ...)`. שגיאות ממפות קודי שגיאה מהשרת (`invalid_email`, `missing_fields`, `rate_limited`, …) להודעות מתורגמות + `track('contact_submit_error', { reason })`.

**UX של הצלחה / fallback**: בהצלחה, מוצעים למשתמש מעקבי WhatsApp וטלפון. כרטיסי WhatsApp / טלפון / אימייל ישירים תמיד מוצגים כ-fallback ללא קשר למצב הטופס.

### 7.2 Proxy בצד השרת (`api/contact.js`, פונקציית Vercel)

פונקציית ה-serverless היא גבול האבטחה והמסירה:

1. **שמירת method** — רק `POST` (אחרת 405).
2. **Allowlist של origin** — בפרודקשן, ה-`Origin`/`Referer` של הבקשה חייבים להיות `yuvaldigital.co.il` או `www.yuvaldigital.co.il` (אחרת 403). מושבת בלא-פרודקשן.
3. **הגבלת קצב** — חלון נע של Upstash, ‏5 בקשות / 60 שניות לכל IP (לפי `x-forwarded-for`). ללא פעולה אם משתני הסביבה של Upstash חסרים; נכשל-פתוח (fails open) בשגיאות Upstash.
4. **Honeypot** — אם `company` ממולא, מחזיר `200` שקט (הבוט לא מקבל אות).
5. **אימות וניקוי** — חיתוך/הגבלת אורך לכל שדה (`clean`), אימות צורת אימייל, דורש name+email+message. סובלני ל-`projectType` הישן מול `service` הנוכחי.
6. **העברה ל-n8n** — מבצע POST של ה-payload הנקי ל-`N8N_WEBHOOK_URL` עם timeout של 8 שניות (`AbortController`); ‏n8n כותב את הליד ל-**Airtable**. ממפה כשלים מעלה ל-`502` / `504` / `500`. הראוט שולח `Cache-Control: no-store`.

ה-proxy הזה נמנע מ-CORS של דפדפן-ל-n8n ושומר את הגבלת הקצב + allowlist ה-origin על Vercel.

### 7.3 WhatsApp

`WHATSAPP_HREF` (`src/data/contact.js`) הוא `https://wa.me/972533339341` עם הודעת פתיחה בעברית ממולאת מראש. נחשף דרך: ה-`WhatsAppFab` הצף (דסקטופ/טאבלט), ה-`MobileActionBar` (מובייל), הקישור המהיר + רשימת יצירת הקשר בפוטר, ה-`CtaBanner`-ים, ומצב ההצלחה של הטופס. WhatsApp הוא הערוץ בעל הכוונה הגבוהה ביותר והחיכוך הנמוך ביותר עבור השוק הישראלי.

### 7.4 טלפון ואימייל

`PHONE_HREF` (`tel:+972533339341`) ו-`EMAIL_HREF` (`mailto:yuvalzakay25@gmail.com`) מופיעים בפוטר, במקטע יצירת הקשר, בסרגל הפעולות במובייל (טלפון), ובבלוקי יצירת הקשר של הדפים המשפטיים. פורמטי התצוגה (`PHONE_LOCAL`, `PHONE_INTL`) נשמרים בנפרד מפורמטי הקישור.

### 7.5 באנרי CTA ומסלולי יציאה במשפך

מופעים של `CtaBanner` בשלושה מיקומים בדף הבית (ובכל דף משני) מספקים הזדמנויות המרה חוזרות, כל אחד משלב CTA ליצירת קשר עם כפתור WhatsApp ופולט אנליטיקס בעת אינטראקציה.

---

## חלק 8 — מערכת נגישות

נגישות היא מערכת מהמעלה הראשונה הניתנת לשליטת המשתמש (חשוב לציות לחוק הנגישות הישראלי), הבנויה מ-provider של Context, פאנל בקרה, CSS המונע על ידי data-attributes, ודף הצהרה שפורסם.

### ארכיטקטורה

**`src/a11y/A11yProvider.jsx`** מחזיק את אובייקט ההגדרות ומתמיד אותו ב-`localStorage` (`yuvaldigital:a11y:v1`):

```js
DEFAULT_A11Y = { textSize: 'md', contrast: false, grayscale: false,
                 underlineLinks: false, readableFont: false, pauseAnimations: false }
```

`textSize` הוא אחד מ-`['sm','md','lg','xl','xxl']`. בכל שינוי הגדרות, `applyToDom` כותב attributes על `<html>`: ‏`data-a11y-text="<size>"` ו-`data-a11y-<flag>="on"` לכל בוליאני מופעל (למשל `data-a11y-underline-links`). ה-context חושף `setTextSize`, `adjustTextSize(delta)`, `toggle(key)`, `reset`, ודגל `isDefault`.

### בקרות (`src/components/AccessibilityToolbar.jsx`)

FAB צף הנטען בעצלות פותח דיאלוג המציע: **stepper לגודל טקסט** (− / נוכחי / +), חמישה **toggles** (ניגודיות גבוהה, גווני אפור, קו תחתון לקישורים, פונט קריא, השהיית אנימציות), כפתור **reset**, וקישור לדף **הצהרת הנגישות**. הסרגל קורא/כותב דרך `useA11y()`.

### ניהול state

ה-state הוא React Context + `localStorage`, מאותחל סינכרונית מהאחסון (`readInitial`) כך שהעדפות שורדות רענון. מכיוון שההגדרות ממופות ל-attributes על `<html>`, הן חלות גלובלית ומיידית ללא prop drilling.

### השפעה ויזואלית (`src/styles/a11y.css`)

כל attribute מניע CSS:
- **גודל טקסט**: מקנה קנה-מידה לפונט השורש (`sm` 93.75% … `xxl` 128%).
- **ניגודיות גבוהה**: פלטת שחור/לבן (או צהוב-על-שחור במצב כהה); מסיר gradients ואלמנטים פסבדו דקורטיביים; כופה רקעי כפתור אחידים.
- **גווני אפור**: ‏`filter: grayscale` על `.app-shell__content` בלבד (כך שהסרגל עצמו נשאר צבעוני, וה-UI הקבוע — שחי מחוץ לעוטף הזה — אינו מושפע).
- **קו תחתון לקישורים**: מוסיף קו תחתון לקישורי גוף (למעט כפתורים/FABs/נ-CTA בניווט).
- **פונט קריא**: מחסנית Arial/Tahoma/Heebo, ריווח אותיות וגובה שורה מוגדלים.
- **השהיית אנימציות**: מצמצם את כל האנימציות/מעברים ל-~0 (למעט פאנל הנגישות עצמו).

### דף ההצהרה

`src/pages/AccessibilityStatement.jsx` (ראוט `/:lang/page/accessibility`) מרנדר, דרך מעטפת `LegalPage` המשותפת, את ההתאמות, התקנים הנתמכים, ונתיב יצירת קשר לדיווח על בעיות. ה-`skip-link`, ניהול ה-focus (`main` בר-focus; ‏`LegalPage` מעביר focus ל-`<h1>` שלו), וה-markup הסמנטי משלימים את המערכת.

---

## חלק 9 — מערכת SEO

למערכת ה-SEO שני עמודים: **מטא-דאטה של head לכל ראוט** (`src/components/Seo.jsx`) ו**גרף מידע מובנה מקושר** (`src/data/jsonld.js`), שניהם נפלטים ל-HTML סטטי בזמן ה-prerender.

### תגיות מטא ו-head (`Seo.jsx`)

`<Seo>` משתמש ב-`<Head>` של `vite-react-ssg` כדי לרנדר, לכל ראוט:
- `<html lang dir>` (לוקאל + כיוון), `<title>`, `<meta name="description">`.
- אופציונלי `<meta name="robots" content="noindex, follow">` כאשר `noindex`.
- מטא אימות GSC אופציונלי (`VITE_GSC_VERIFICATION`).
- `<link rel="canonical">` = `https://yuvaldigital.co.il/<locale><path>`.
- חלופות **hreflang** עבור `he` ו-`en`, בתוספת `x-default` → עברית.
- **OpenGraph**: `og:type/url/title/description/locale/site_name/image/image:alt`, בתוספת `og:locale:alternate` עבור הלוקאל השני.
- **Twitter**: כרטיס `summary_large_image`.
- **JSON-LD**: כל blob ב-prop של `jsonLd` מרונדר כ-`<script type="application/ld+json">`.
- beacon אנליטיקס אופציונלי של Cloudflare (`VITE_CLOUDFLARE_BEACON_TOKEN`).

`index.html` במכוון **אינו** שולח `<title>`/`<description>` סטטיים כדי להימנע מתגיות כפולות על פני דפים שעברו prerender; ‏Helmet מספק תגיות ספציפיות-ראוט בזמן ה-prerender ועל ה-SPA לפני הציור.

### גרף מידע מובנה (`src/data/jsonld.js`)

דף הבית מפרסם `homeJsonLd = [website, person, professionalService, faqPage]`, תפור באמצעות ערכי `@id` יציבים:
- `WebSite` (`#website`) — `publisher` → Org.
- `Person` (`#yuvalzakay`) — Yuval Zakay, ‏`worksFor` → Org, עם `knowsAbout`, `knowsLanguage`, `contactPoint`.
- `ProfessionalService` (`#yuvaldigital`, ‏`additionalType: LocalBusiness`) — שם, יצירת קשר, `founder` → Person, ‏`areaServed: Israel`, ‏`priceRange`, ‏`OfferCatalog` של שישה שירותים, ‏`sameAs` ל-WhatsApp.
- `FAQPage` — חמש שאלות-תשובות המשקפות את ה-FAQ בדף הבית.

פונקציות בונה מייצרות גרפים ספציפיים-דף שמשתמשים שוב באותם `@id` כך ש-Google רואה זהות עקבית אחת:
- `serviceJsonLd(...)` → `Service` + `BreadcrumbList` (+ `FAQPage`).
- `blogJsonLd(...)` → `Blog` (מקושר `isPartOf` ל-WebSite, ‏`publisher`/`author` לפי `@id`) המונה `BlogPosting`-ים.
- `articleJsonLd(...)` → `BlogPosting` + `BreadcrumbList`, ‏`author`/`publisher`/`isPartOf` לפי `@id`, ‏`mainEntityOfPage`, ספירת מילים, תאריכים.
- `aboutJsonLd(...)` → `AboutPage` שה-`mainEntity` שלו → Person וה-`about` → Org.

### Sitemap, robots, canonicals

- **Sitemap**: ‏`scripts/generate-sitemap.mjs` סורק את `dist/` עבור כל `index.html` שנפלט, ממפה כל אחד לראוט שלו, מסנן לראוטים עם קידומת לוקאל (משמיט את ה-SPA fallback), וכותב `dist/sitemap.xml` עם חלופות hreflang (+ `x-default` עברית), ‏`priority` 1.0 לדפי בית של לוקאל / 0.5 אחרת, ‏`changefreq: monthly`. הוא נשאר מסונכרן עם מה שעבר prerender בפועל — אין רשימה נפרדת לתחזק.
- **robots.txt** (`public/robots.txt`): מתיר את כל הסורקים ומצביע ל-sitemap.
- **Canonicals ו-hreflang**: נפלטים לכל ראוט על ידי `Seo.jsx` (ראו לעיל).

### איך הכול משתלב

מכיוון שכל ראוט שפורסם עובר prerender ל-HTML סטטי המכיל את ה-title, ה-description, ה-canonical, ה-hreflang, תגיות OG ו-JSON-LD שלו, סורקים ומנועי חיפוש מבוססי-AI מקבלים גרף ישויות מלא ועקבי-עצמית ללא הרצת JavaScript. טיוטות (שירותים/מאמרים שלא פורסמו) מוחרגות מ-prerender, מ-sitemap ומקישורים פנימיים, כך שדפים לא גמורים לעולם לא מגיעים ל-Google.

---

## חלק 10 — מערכת ביצועים

הביצועים מהונדסים סביב עדיפות אחת: ציור ראשון / LCP מהיר ולא-חסום בדף הבית בעברית. הקומיטים האחרונים (`fix critical css floating ui first paint`, `fix critical css first paint navbar`, `performance optimization`) משקפים עבודה פעילה כאן.

### Prerendering סטטי (SSG)

`vite-react-ssg` פולט HTML מרונדר במלואו לכל ראוט, כך שהדפדפן מצייר תוכן משמעותי לפני ש-React עובר הידרציה. זהו הבסיס גם לביצועים וגם ל-SEO.

### Critical CSS + גיליון סגנונות ראשי לא-חוסם (`scripts/inline-critical-css.mjs`)

ה-build המקורי שלח `app-*.css` יחיד בגודל ~130 KiB חוסם-רינדור (~63 KiB לא-בשימוש מעל הקפל), שגרם ל-FCP ≈ 4.6 שניות במובייל איטי. תיקון ה-postbuild:
- מטמיע פרוסת **`src/styles/critical.css` בגודל ~4 KiB** המתוחזקת ידנית (hero, navbar, container, כפתורים, ברירות מחדל של FAB, מצב מוסתר של drawer/scrim) לתוך כל `index.html` כ-`<style data-critical>`, ממוקם לפני ה-`<link>` הראשון כך שהוא cascade-ים ראשון.
- משכתב את קישור ה-`app-*.css` של הפריימוורק ל**לא-חוסם** דרך `media="print" onload="this.media='all'"`, עם fallback של `<noscript>` עבור סורקים ללא-JS.

### טעינה עצלה ו-code splitting

- **רמת ראוט**: ‏`About`, `PrivacyPolicy`, `AccessibilityStatement`, `Service`, `Blog`, `Article` הם imports של `lazy()` (`routes.jsx`). ‏SSG ממתין להם בזמן ה-prerender כך שה-HTML הסטטי עדיין שלם.
- **רמת section**: דף הבית מרנדר באופן eager רק את `Hero` + `TrustStrip`; עשרת ה-sections האחרים + באנרי CTA נטענים תחת `<Suspense>` יחיד (`Home.jsx`).
- **רמת widget**: ארבעת ה-widgets הצפים עצלים ב-`AppShell` (~12 KiB JS + ~700 שורות CSS נשמרים מחוץ ל-bundle של דף הבית).
- **chunk ידני**: ‏`vite.config.js` מבודד את `react`/`react-dom` ל-chunk ארוך-חיים בשם `react` ב-build בצד הלקוח.

### פונטים לא-חוסמי-רינדור (`index.html`)

Google Fonts נטענים עם `media="print" onload="this.media='all'"` + fallback של `<noscript>` ו-`display=swap`. רק **Heebo** (משקלים 400/600/700/800) נמצא בנתיב הקריטי; ‏Inter שמור ל-`[dir='ltr']` descendants, וחוסך לדף הבית בעברית ~80 KiB של הורדות Inter לא-בשימוש. רמזי `preconnect` מחממים את מקורות הפונטים.

### Content-visibility ותקינות גלילה

מקטעים מתחת לקפל משתמשים ב-`content-visibility: auto` (ב-`critical.css`/`globals.css`) כדי לדלג על עבודת רינדור מחוץ-למסך. מכיוון שזה מסבך את ה-offsets של עוגנים, `src/utils/scrollToHash.js` מקדם זמנית את המקטע היעד ל-`content-visibility: visible`, מנסה שוב על פני עד 30 frames, ואז משחזר אותו — מה שהופך ניווט hash לאמין.

### תמונות

mockups של צילומי מסך אמיתיים משתמשים ב-`<picture>` עם מקורות **AVIF/WebP/PNG**, ‏`loading="lazy"`, ‏`decoding="async"` ועדיפות fetch נמוכה. ‏`scripts/convert-mockup-images.mjs` (sharp) מייצר את גרסאות ה-AVIF (q82) / WebP (q92).

### אנליטיקס נדחה

`src/utils/analytics.js` מאתחל את GA4 + Clarity בתוך `requestIdleCallback` כך שסקריפטים של צד שלישי לעולם לא חוסמים הידרציה, ומדלג על Clarity במצב `prefers-reduced-data` / save-data.

### ערכת נושא/לוקאל ללא layout shift

ערכת הנושא מוחלת לפני-ציור על ידי סקריפט מוטמע ב-`index.html`; הלוקאל מונחה-URL ואפוי ל-HTML שעבר prerender — אף אחד מהם אינו גורם להבזק או ל-reflow בטעינה.

### Edge caching (`vercel.json`)

HTML של לוקאל מוגש עם `Cache-Control: public, max-age=0, s-maxage=3600, must-revalidate` (מטמון CDN של שעה, מאומת מחדש), בעוד `/api/contact` הוא `no-store`.

---

## חלק 11 — ארכיטקטורת עיצוב

### שכבות גלובליות (`src/styles/`, מיובאות פעם אחת ב-`main.jsx`)

סדר ה-import חשוב והוא: ‏`reset.css → variables.css → globals.css → animations.css → a11y.css`.

- **`reset.css`** — reset מודרני: ‏`box-sizing: border-box`, מרג'ינים מאופסים, ‏`min-height: 100dvh`, ברירות מחדל רספונסיביות למדיה, ירושה ל-form-controls, איפוס רשימות/עוגנים, וכיבוי גורף של `prefers-reduced-motion`.
- **`variables.css`** — **שכבת טוקני העיצוב** (ראו להלן).
- **`globals.css`** — ברירות מחדל לאלמנטים ופרימיטיבים משותפים: סקאלת כותרות (`h1` ‏`clamp(2.5rem,…,5.5rem)` וכו'), סגנון פסקה (`text-wrap: pretty`), ‏`.container`, ריווח בלוק של `section`, ‏גלולת `.eyebrow`, ‏`.text-gradient`, דפוסי surface/hover מורמים, focus rings, scrollbar ממותג, מפרידים דקיקים, ‏scroll-margin לעוגנים, דילוג מקטעים עם `content-visibility`, ועוזרי sr-only/skip-link.
- **`animations.css`** — מינימלי; שולח רק את ה-keyframe של `pulseGlow`.
- **`a11y.css`** — ממפה את ה-`data-a11y-*` attributes ל-overrides ויזואליים (ראו [חלק 8](#חלק-8--מערכת-נגישות)).
- **`critical.css`** — פרוסת ~4 KiB המתוחזקת ידנית והמוטמעת בזמן build (לא מיובאת בזמן ריצה).

מעבר לאלה, **כל קומפוננטה ו-section צומדים `.css` משלהם** (למשל `Navbar.css`, `Hero.css`, `Contact.css`), המיובא על ידי הקומפוננטה. ‏`cssCodeSplit` של Vite שומר את ה-CSS לכל ראוט ב-chunks נפרדים.

### משתנים ומערכת ערכות נושא (`src/styles/variables.css` + `src/theme/tokens.js`)

מערכת הטוקנים משתמשת ב-CSS custom properties על `:root`, כאשר `[data-theme='dark']` דורס את סט הצבעים. קבוצות הטוקנים כוללות:
- **צבעים**: ‏`--color-{bg,surface,border,text,accent,success,warning,danger}` עם וריאנטים `-soft/-muted/-strong/-glow`.
- **מותג**: ‏`--brand-{electric #2563eb, violet #7c3aed, cyan #06b6d4, ink, charcoal, …}`.
- **צללים**: ‏`--shadow-{xs..xl,glow}`. **ריווח**: ‏`--space-1..32` (סקאלת 4px). **רדיוסים**: ‏`--radius-{xs..2xl,pill,circle}`.
- **טיפוגרפיה**: ‏`--font-{sans-en,sans-he,display,mono}`, ‏`--fs-{xs..6xl}`, ‏`--fw-{light..black}`, ‏leading/tracking.
- **תנועה**: ‏`--ease-{out,in-out,spring}`, ‏`--dur-{fast,base,slow,xslow}`.
- **Layout**: ‏`--container-max: 1240px`, ‏`--container-px: clamp(1.1rem,4vw,2.5rem)`, ‏`--section-py: clamp(3.5rem,9vw,8rem)`, ‏`--navbar-h: 72px`.
- **Z-index**: ‏`--z-{nav 50, overlay 80, modal 100, toast 120}`.

`src/theme/tokens.js` הוא מראה ה-JS — הוא מייצא אובייקט `themes` (ערכי צבע light/dark) ואת מפתחות האחסון `THEME_STORAGE_KEY` (`yuval-digital:theme`) ו-`LANG_STORAGE_KEY`.

### אסטרטגיית עיצוב רספונסיבי

Mobile-first, סקאלה זורמת דרך `clamp()` על טיפוגרפיה, ריווח ו-padding של מקטעים (כך שרוב ה-layouts מתאימים את עצמם ללא breakpoints). ‏breakpoints ב-CSS של קומפוננטות מטפלים בשינויים מבניים (למשל מעבר הניווט ל-burger/drawer, גרידים מתמוטטים לטור יחיד). ‏RTL/LTR מטופל על ידי `dir` על `<html>` בתוספת logical properties והחלפת הפונט עברית/אנגלית.

---

## חלק 12 — נכסים

### לוגואים וסמל מותג

- הלוגו הראשי הוא **SVG, מרונדר בקוד** על ידי `src/components/Logo.jsx` (סמל gradient + wordmark) — אין קובץ לוגו רסטרי.
- **`public/favicon.svg`** — ה-favicon, משמש גם כ-`logo`/`image` של OG/JSON-LD (`https://yuvaldigital.co.il/favicon.svg`).

### אייקונים

כל האייקונים הם **SVG מוטמע**, ולא פונט אייקונים או sprite:
- אייקוני שירות: ‏`src/data/services.jsx` (`serviceIcons`, ממופתחים `web/landing/automation/ai/systems/presence`).
- אייקוני אמון: ‏`src/data/trust.jsx` (`trustIcons`).
- אייקונים לכל קומפוננטה מוגדרים מוטמעים (Mail/Phone/WhatsApp בפוטר, chevrons ב-Navbar, אייקוני Check/Arrow/Star/Sparkle/Plus במקטעים וכו').

### תמונות

תחת `public/`:
- **`public/yuvalImg.jpg`** — דיוקן המייסד (בשימוש על ידי מקטע About בדף הבית ו-`AboutHero`).
- **`public/projects/marzipan/`** — צילומי מסך של Marzipan Bakery ב-PNG + AVIF/WebP שנוצרו (למשל ל-`1`, `6` יש את כל שלושת הפורמטים).
- **`public/projects/yuval-digital/`** — צילומי מסך עצמיים/תיק עבודות ב-PNG + AVIF/WebP (`1`, `2`).

אלה נצרכים על ידי `MarzipanMockup` / `YuvalMockup` דרך `<picture>` למשא-ומתן על פורמט.

### פונטים

נטענים מ-**Google Fonts** (לא מאוחסנים עצמית): **Heebo** (עברית/קריטי, משקלים 400/600/700/800) ו-**Inter** (אנגלית/LTR, משקלים 400/600/700), שניהם עם `display=swap` וטעינה לא-חוסמת (ראו [חלק 10](#חלק-10--מערכת-ביצועים)). משפחות הפונטים מופנות דרך טוקני `--font-*`.

### נכסי אימות / תצורה

- `public/.gsc-verification.README.md` — הערה על גישת אימות Search Console (הטוקן עצמו מוגדר דרך env, לא נכלל ב-commit).
- `public/robots.txt` — הנחיות לסורקים + מצביע ל-sitemap.

---

## חלק 13 — ארכיטקטורת פריסה

### GitHub

הפרויקט הוא מאגר Git; ענף העבודה הוא **`main`** (גם בסיס הפרודקשן/PR). ההיסטוריה האחרונה מציגה קומיטים ממוקדי-ביצועים ואת המעבר ל-proxy יצירת קשר מבוסס-n8n.

### ענפים

`main` הוא הענף הארוך-חיים היחיד ומקור הפריסה. (עבודת פיצ'ר צריכה להתפצל מ-`main` ולהתמזג דרך PR — ראו [חלק 15](#חלק-15--מדריך-המשך-עבודה).)

### Vercel (`vercel.json`)

האחסון והפריסה הם על **Vercel**, מוגדרים במפורש מכיוון ש-`framework` הוא `null` (Vercel לא מזהה אוטומטית; ה-build המותאם הוא בשימוש):
- `buildCommand: "npm run build"`, ‏`outputDirectory: "dist"`.
- `cleanUrls: true`, ‏`trailingSlash: false`.
- **פונקציית serverless**: ‏`api/contact.js` עם `maxDuration: 10`.
- **הפניות (redirects)**: ‏`/ → /he` (זמני), ‏`/page/:slug → /he/page/:slug` (קבוע 301).
- **שכתובים (rewrites)**: ‏`/he/:path*` ו-`/en/:path*` → ה-`index.html` של הלוקאל המתאים (SPA fallback לראוטים בצד-לקוח שלא עברו prerender).
- **Headers**: ‏`no-store` עבור `/api/contact`; ‏`public, max-age=0, s-maxage=3600, must-revalidate` עבור HTML של לוקאל.

### משתני סביבה (`.env.example`)

פרודקשן (env של פרויקט Vercel): ‏`N8N_WEBHOOK_URL`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` (צד שרת); ומשתני לקוח ציבוריים `VITE_GA4_ID`, `VITE_CLARITY_ID`, `VITE_GSC_VERIFICATION`, `VITE_CLOUDFLARE_BEACON_TOKEN`. כל משתני האנליטיקס/אימות בצד הלקוח בטוחים לחשיפה ומוגדרים ל"כבוי" כשהם ריקים.

### תהליך ה-build וזרימת הפריסה (commit → production)

1. מפתח/ת דוחף/ת ל-`main` (או ממזג/ת PR).
2. Vercel מפעיל build שמריץ `npm run build`:
   - `vite-react-ssg build` מבצע prerender לכל נתיב מ-`includedRoutes()` אל `dist/<locale>/<path>/index.html` ומאגד את ה-JS/CSS בצד הלקוח.
   - `postbuild` מריץ את `generate-sitemap.mjs` (כותב `dist/sitemap.xml` מתוך ה-HTML שנפלט) ואז את `inline-critical-css.mjs` (מטמיע critical CSS, הופך את גיליון הסגנונות הראשי ללא-חוסם) על פני כל קבצי ה-HTML ב-`dist`.
3. Vercel פורס את `dist/` כנכסים סטטיים מאחורי ה-CDN שלו, פורס את `api/contact.js` כפונקציית serverless, ומחיל את ה-redirects/rewrites/headers מ-`vercel.json`.
4. בזמן ריצה: HTML סטטי של לוקאל מוגש (ומוטמן ב-edge לשעה); ניווט בצד-לקוח מטופל על ידי React Router; שליחות טופס פוגעות ב-`/api/contact` → n8n → Airtable.

---

## חלק 14 — מצב הפרויקט הנוכחי

### הושלם (מיושם וחי)

- **ארכיטקטורת ליבה**: ‏SSG דרך `vite-react-ssg`, ניתוב דו-לשוני מונחה-URL (`he`/`en`), מחסנית ה-providers השכבתית (Theme, A11y, Language) וה"כרום" של `AppShell`.
- **דף הבית**: משפך ההמרה המלא (Hero, TrustStrip, 3 באנרי CTA, Trust, Services, Packages, Process, Projects, Stack, About, FAQ, Contact) עם טעינה עצלה ברמת section.
- **דף אודות**: חמישה sections (Hero, Story, Philosophy, Now, CTA) עם סכימת `AboutPage`.
- **דפי שירות**: 3 פורסמו (`business-websites`, `landing-pages`, `ai-automation`), כל אחד עם hero/problem/inclusions/flow/FAQ/related + סכימת `Service`/`Breadcrumb`/`FAQ`.
- **בלוג**: המערכת בנויה במלואה; מאמר אחד פורסם (`modern-websites-help-small-businesses-look-professional`), עם אינדקס, רינדור מאמר (גוף מבוסס-nodes), זמן קריאה, מסילות קשורות, וסכימת `Blog`/`BlogPosting`.
- **משפטי**: מדיניות פרטיות + הצהרת נגישות דרך מעטפת `LegalPage` המשותפת.
- **צינור לידים**: טופס יצירת קשר → `/api/contact` (allowlist של origin, הגבלת קצב Upstash, honeypot, אימות) → n8n → Airtable; בתוספת ערוצי WhatsApp/טלפון/אימייל.
- **נגישות**: סרגל הניתן לשליטת המשתמש (גודל טקסט + 5 toggles), מותמד, דף הצהרה, skip link, ניהול focus.
- **SEO**: גרף ישויות מקושר, head לכל ראוט, hreflang/canonicals, sitemap בזמן build, robots.
- **ביצועים**: הטמעת critical-CSS, גיליון סגנונות ראשי + פונטים לא-חוסמים, content-visibility, תמונות עצלות רב-פורמט, אנליטיקס נדחה, chunk ידני של React.
- **אנליטיקס**: ‏façade של GA4 + Clarity + beacon של Cloudflare, כולם מגודרים-env.

### בתהליך / בטיוטה (מבנה קיים, תוכן ממתין)

- **טיוטות שירות** (`published: false`): ‏`ai-business-systems`, `internal-tools`, `seo` — רשומים ב-`serviceCatalog.js`, ממתינים לטקסט `servicePages.<key>` ב-`src/i18n/{he,en}.js`.
- **טיוטות מאמר** (`published: false`): ‏`what-business-automation-actually-means`, `more-than-pretty-website` — רשומים ב-`articleCatalog.js`, ממתינים לקבצי גוף תחת `src/data/articles/{he,en}/`.
- **ראוטים שמורים**: ‏`industries/:slug`, `insights/:slug` (placeholders בהערה ב-`routes.jsx`).

### בעיות ידועות / נקודות למעקב

- **מורכבות `scrollToHash`**: גלילת עוגני hash נאבקת ב-`content-visibility: auto` ודרשה workaround של 30 frames. כרגע היא אמינה אך שבירה — שינויים ב-CSS של נראות מקטעים או ב-`ScrollManager` עלולים להחזיר את תקלת "first click does nothing".
- **אין בדיקות אוטומטיות**: אין חבילת בדיקות; רק ESLint. רגרסיות נתפסות ידנית.
- **Critical CSS מתוחזק ידנית**: ‏`critical.css` חייב להתעדכן ידנית כאשר ה-markup מעל הקפל משתנה, אחרת הציור הראשון עלול להיראות לא-מעוצב/מוזז.

### חוב טכני / שיפורים עתידיים

- **תלות `resend` אינה בשימוש**: צינור יצירת הקשר עבר ל-n8n; ‏`resend` (^4.8.0) נשאר ב-`package.json` וניתן להסירו.
- **כתובת n8n קשיחה כברירת מחדל**: ‏`api/contact.js` נופל חזרה לכתובת Railway מילולית כש-`N8N_WEBHOOK_URL` לא מוגדר — תקין כברירת מחדל אך כדאי לשמור ב-env בלבד.
- **אין CMS**: שירותים ומאמרים נכתבים כקבצי קוד/נתונים. תקין בהיקף הנוכחי; ‏CMS עשוי להיות מוצדק ככל שהתוכן גדל.
- **קבוע origin יחיד משוכפל**: ‏`https://yuvaldigital.co.il` חוזר על פני `jsonld.js`, `Seo.jsx`, וסקריפטי ה-build — ניתן לרכז.

---

## חלק 15 — מדריך המשך עבודה

אם מפתח/ת חדש/ה יורש/ת את הפרויקט מחר, הנה הנתיב לפרודוקטיביות.

### מה לקרוא קודם (לפי הסדר)

1. **המסמך הזה.**
2. `package.json` + `vite.config.js` + `vercel.json` — חוזה ה-build, ה-SSG והפריסה.
3. `src/router/routes.jsx` — עץ הראוטים ורשימת ה-prerender של `includedRoutes()` (עמוד השדרה של האפליקציה).
4. `src/main.jsx`, `src/layout/RootLayout.jsx`, `src/layout/LangLayout.jsx`, `src/layout/AppShell.jsx` — איך מורכבים ה-providers, הלוקאל וה"כרום".
5. `src/pages/Home.jsx` — משפך ההמרה.
6. `src/data/jsonld.js` + `src/components/Seo.jsx` — מערכת ה-SEO/ישויות.
7. `src/data/serviceCatalog.js` + `src/data/articleCatalog.js` — מודל התוכן שמניע ראוטים, sitemap, סכימה וקישורים פנימיים.
8. `api/contact.js` + `src/sections/Contact.jsx` — צינור הלידים.

### קבצים חשובים (סט ה"נושאי-משקל")

- **Routing/SSG**: ‏`src/router/routes.jsx`, `vite.config.js` (`ssgOptions.includedRoutes`).
- **מודל תוכן**: ‏`src/data/serviceCatalog.js`, `src/data/articleCatalog.js`, `src/i18n/{he,en}.js`, `src/data/articles/**`.
- **SEO**: ‏`src/data/jsonld.js`, `src/components/Seo.jsx`, `scripts/generate-sitemap.mjs`.
- **ביצועים**: ‏`scripts/inline-critical-css.mjs`, `src/styles/critical.css`, `index.html` (אתחול font/theme).
- **יצירת קשר**: ‏`api/contact.js`, `src/sections/Contact.jsx`, `src/data/contact.js`.
- **תקינות גלילה**: ‏`src/layout/ScrollManager.jsx`, `src/utils/scrollToHash.js`.

### החלטות חשובות שיש לכבד

- **ה-URL הוא מקור האמת ללוקאל** — אסור להחזיר לוקאל מונחה-localStorage (זה שובר את הדטרמיניזם של SSG ואת הסורקים).
- **רק `HelmetProvider` אחד** (זה של הפריימוורק) — הוספת אחר שוברת את הזרקת ה-head ב-SSR.
- **זהות סכימה אחת** — השתמשו שוב ב-`@id`-ים שב-`jsonld.js`; אל תגדירו מחדש את ה-Person/Org בכל דף.
- **גידור פרסום** — `published: false` שומר טיוטות מחוץ ל-prerender, ל-sitemap ולקישורים פנימיים. השתמשו בזה; אל תקשרו לטיוטות ידנית.
- **UI קבוע נשאר מחוץ ל-`.app-shell__content`** — פילטר הנגישות של גווני אפור יוצר containing block ששובר `position: fixed`.

### אזורים מסוכנים (לשנות בזהירות)

- **`ScrollManager.jsx` + `scrollToHash.js`** — מערכת העוגנים/גלילה עדינה (content-visibility + ניסיונות חוזרים). בדקו עוגנים בתוך-דף (קליק ראשון), שחזור back/forward, וקישורי `#anchor` חוצי-דפים אחרי כל שינוי.
- **`critical.css`** — חייב לשקף את ה-markup מעל הקפל; טעויות מופיעות כ-FOUC או layout shift בציור הראשון.
- **`inline-critical-css.mjs`** — ה-regex שלו מכוון לקישור `app-*.css` של הפריימוורק; אם שמות פלט ה-build משתנים, השכתוב פשוט לא יפעל (silently no-ops).
- **`api/contact.js`** — ה-allowlist של origin ומגביל הקצב רלוונטיים-אבטחה; אמתו אחרי כל שינוי דומיין או תשתית.
- **סקריפט אתחול ערכת הנושא ב-`index.html`** — חייב להישאר מסונכרן עם `ThemeProvider.readInitialTheme` כדי להימנע מהבזק.

### איך להוסיף תוכן (משימות נפוצות)

- **דף שירות חדש**: הוסיפו רשומה ל-`SERVICE_CATALOG` (`slug`, `id`, `i18nKey`, `keywords`, `related`, `published: true`), ואז כתבו `servicePages.<i18nKey>` ב-`src/i18n/he.js` וב-`en.js`. ראוטים, sitemap, סכימה וקישורי דף הבית קולטים זאת אוטומטית.
- **מאמר חדש**: הוסיפו ל-`ARTICLE_CATALOG` (`slug`, `i18nKey`, `publishDate`, `published: true`, קשרים), ואז צרו `src/data/articles/he/<i18nKey>.js` ו-`en/<i18nKey>.js` המייצאים `{ title, lede, body: ArticleNode[] }`.
- **קישור ניווט חדש**: הוסיפו ל-`src/data/nav.js` (anchor או route) ואת מחרוזות ה-i18n התואמות ב-`nav.<key>`.

### מפת דרכים מומלצת להמשך

1. **פרסום השירותים בטיוטה** (`ai-business-systems`, `internal-tools`, `seo`) — לטקסט כבר יש מפתחות שמורים ויעדי מילות מפתח.
2. **הרחבת הבלוג** — פרסמו את שני המאמרים בטיוטה כדי להעמיק סמכות נושאית ולהפעיל את משטח הבלוג במלואו.
3. **הסרת `resend`** וריכוז קבוע ה-origin (פירעון חוב קטן).
4. **הוספת שכבת test/CI מינימלית** — לכל הפחות smoke tests ל-build, לרשימת ה-prerender, וללוגיקת האימות של `/api/contact`.
5. **שקלו את המשטחים השמורים `industries/:slug` / `insights/:slug`** ברגע שתוכן השירות והבלוג בשל.
6. **המשך עבודת Core Web Vitals** — שמרו את `critical.css` מיושר עם שינויי hero/navbar ונטרו את ה-LCP על `/he`.

---

---

## נספח א' — מפת מאגר עם הערות

```
yuval-digital/
├─ index.html                  # מעטפת HTML: אתחול ערכת נושא, מעביר hash, פונטים לא-חוסמים
├─ package.json                # תלויות + סקריפטים build/dev/lint/preview
├─ vite.config.js              # תצורת Vite + SSG, aliases, includedRoutes, manualChunks
├─ vercel.json                 # build/output, redirects, rewrites, headers, contact function
├─ .env.example                # משתני סביבה מתועדים (n8n, Upstash, analytics, GSC)
├─ README.md, MASTER_PROJECT_BLUEPRINT.md, NEXT_ACTION_PLAN.md,
│  WORKING_RULES_AND_STANDARDS.md   # מסמכי פרויקט נרטיביים (משלימים)
│
├─ api/
│  └─ contact.js               # proxy לידים serverless ב-Vercel → n8n (rate limit, allowlist, honeypot)
│
├─ docs/                       # מסמכים תומכים (brand, content-rules, design-system, seo, …)
│  ├─ PROJECT_BOOK.md          # ספר הפרויקט (אנגלית)
│  └─ PROJECT_BOOK.he.md       # ← מסמך זה (עברית)
│
├─ public/                     # מוגש כפי שהוא בשורש האתר
│  ├─ favicon.svg              # favicon + לוגו OG/JSON-LD
│  ├─ robots.txt               # התרת סורקים + מצביע sitemap
│  ├─ yuvalImg.jpg             # דיוקן המייסד
│  └─ projects/{marzipan,yuval-digital}/*.{png,avif,webp}   # צילומי מסך לתיק עבודות
│
├─ scripts/
│  ├─ generate-sitemap.mjs     # postbuild: dist/sitemap.xml מתוך ה-HTML שנפלט
│  ├─ inline-critical-css.mjs  # postbuild: הטמעת critical CSS + גיליון סגנונות ראשי לא-חוסם
│  └─ convert-mockup-images.mjs# המרה חד-פעמית PNG → AVIF/WebP (sharp)
│
└─ src/
   ├─ main.jsx                 # נקודת כניסת SSG; מייבא CSS גלובלי; ViteReactSSG(routes)
   │
   ├─ router/
   │  ├─ routes.jsx            # עץ ראוטים + includedRoutes() (מקור אמת יחיד)
   │  ├─ RootIndexRedirect.jsx # / → /:lang (ברירת מחדל עברית, רמז localStorage)
   │  └─ LegacyRedirect.jsx    # /page/:slug → /:lang/page/:slug
   │
   ├─ layout/
   │  ├─ RootLayout.jsx        # providers של Theme + A11y, ScrollManager, AnalyticsListener
   │  ├─ LangLayout.jsx        # אימות :lang, LanguageProvider, AppShell, Suspense
   │  ├─ AppShell.jsx          # skip link, Navbar, main, Footer, widgets צפים עצלים
   │  ├─ Navbar.jsx + .css     # header דביק + drawer מובייל
   │  ├─ Footer.jsx + .css     # מראה ניווט + יצירת קשר + משפטי
   │  └─ ScrollManager.jsx     # גלילה-לראש / שחזור / האצלת קליקים ל-hash
   │
   ├─ pages/                   # About, Service, Blog, Article, Home,
   │                           # PrivacyPolicy, AccessibilityStatement, LegalPage(+css)
   │
   ├─ sections/                # מקטעי דף הבית + תתי-עצים about/ service/ blog/ (+ .css לכל אחד)
   │
   ├─ components/              # Button, Container, Logo, CtaBanner, TrustStrip, Counter,
   │  │                        # Reveal, DeviceMockup, WhatsAppFab, ScrollToTopFab,
   │  │                        # MobileActionBar, AccessibilityToolbar, ThemeToggle,
   │  │                        # LanguageSwitcher, Seo (+ .css צמוד)
   │  └─ mockups/              # Marzipan/Yuval (אמיתי) + Clinic/Restaurant/Leadgen/Law (קונספט)
   │
   ├─ data/                    # serviceCatalog, articleCatalog, projects, services, trust,
   │                           # nav, contact, seo, jsonld, articles/<locale>/*
   │
   ├─ i18n/                    # index.js, he.js, en.js, LanguageProvider.jsx
   ├─ theme/                   # ThemeProvider.jsx, tokens.js
   ├─ a11y/                    # A11yProvider.jsx
   ├─ hooks/                   # useLanguage, useTheme, useA11y, useReveal, useScrollProgress
   ├─ utils/                   # analytics, cn, readingTime, scrollToHash
   └─ styles/                  # reset, variables, globals, animations, a11y, critical
```

## נספח ב' — דף עזר לקונבנציות מפתח

- **Path aliases**: ייבוא דרך `@components`, `@sections`, `@pages`, `@layout`, `@router`, `@styles`, `@hooks`, `@utils`, `@data`, `@i18n`, `@theme`, `@a11y` (מוגדרים ב-`vite.config.js`).
- **Origin**: ‏`https://yuvaldigital.co.il` (canonical, סכימה, sitemap, allowlist של ה-API).
- **לוקאל ברירת מחדל**: ‏`he` (RTL); משני `en` (LTR).
- **מפתחות אחסון**: ערכת נושא `yuval-digital:theme`, נגישות `yuvaldigital:a11y:v1`, בתוספת רמז last-visited-locale.
- **אירועי אנליטיקס**: ‏snake_case, למשל `cta_hero_click`, `cta_nav_click`, `contact_submit`, `contact_submit_error`, `whatsapp_click`, `phone_click`, `email_click`.
- **שער פרסום**: ‏`published: true` על רשומת קטלוג הוא מה שגורם לדף לעבור prerender, להיכנס ל-sitemap, ולקבל קישור מה-UI.
- **הוספת prerender לראוט**: זה זורם אוטומטית מהקטלוגים דרך `includedRoutes()` — ללא עריכות ידניות של sitemap או רשימת ראוטים.

---

*סוף ספר הפרויקט. מסמך זה משקף את המאגר כפי שנקרא מקוד המקור בענף `main`. כאשר הארכיטקטורה משתנה, עדכנו ספר זה — הוא נועד להישאר מקור האמת היחיד עבור Yuval Digital.*
