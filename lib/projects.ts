export type ProjectStatus = "live" | "in-progress" | "concept";

export interface Project {
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  whatIBuilt: string[];
  techStack: string[];
  status: ProjectStatus;
  image: string;
  liveUrl: string;
  githubUrl?: string;
  /** What the project proves — shown only when present. */
  proof?: string;
  /** Internal route to a dedicated project book — shown only when present. */
  projectBookHref?: string;
}

export const projects: Project[] = [
  {
    title: "מערכת ניהול חיים",
    slug: "life-management-system",
    shortDescription:
      "מערכת אישית לניהול תחומי חיים, מסמכים, פעולות ותהליכים חשובים במקום אחד.",
    longDescription:
      "מערכת אישית לניהול תחומי החיים השונים במקום אחד — מסמכים, פעולות ותהליכים חשובים. המערכת נבנתה כדי לרכז מידע מפוזר לכדי לוח בקרה אחד נוח, עם זרימת עבודה נתמכת בכלי AI שמסייעת לארגן ולהתקדם.",
    whatIBuilt: [
      "לוח בקרה מרכזי לניהול תחומי חיים",
      "ניהול מסמכים, פעולות ותהליכים במקום אחד",
      "זרימת עבודה נתמכת בכלי AI",
      "ארכיטקטורה מודולרית הניתנת להרחבה",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "AI", "Supabase"],
    status: "live",
    image: "/projects/life-management-system.png",
    liveUrl:
      "https://life-vault-ai-git-master-yuvalzakay26-8804s-projects.vercel.app",
  },
  {
    title: "מערכת מתכונים",
    slug: "recipe-vault",
    shortDescription:
      "כספת מתכונים אישית בעברית (RTL) עם שמירה בענן, אימות משתמשים והעלאת תמונות וסרטוני הכנה — נבנתה ב־Next.js ו־Supabase.",
    longDescription:
      "כספת המתכונים היא אפליקציית ווב אישית בעברית לשמירה, ארגון והכנה של מתכוני בית. המערכת מאפשרת למשתמש מחובר ליצור, לערוך ולמחוק מתכונים שנשמרים בענן ומקושרים לחשבונו, לצרף תמונה ראשית וסרטון הכנה — קישור חיצוני או קובץ שמועלה — ולגלוש במתכונים לפי קטגוריות. כל הממשק בנוי mobile-first ובעברית מלאה, עם תמיכה טבעית ב־RTL.",
    whatIBuilt: [
      "מערכת CRUD מלאה למתכונים מול Supabase Postgres",
      "אימות משתמשים עם אימייל וסיסמה וגם Google OAuth",
      "Row Level Security להפרדת נתונים בין משתמשים",
      "העלאת תמונות וסרטונים ל־Supabase Storage",
      "ולידציית סוג וגודל קבצים",
      "טופס משותף להוספה ולעריכה",
      "תצוגת מתכון מלאה עם מצרכים, שלבים, הערות, תמונה וסרטון",
      "סינון מתכונים לפי קטגוריות",
      "מתכוני seed שמוצגים גם ללא התחברות",
      "הגנות בטיחות לעריכה ומחיקה",
      "טיפול במצבי טעינה, שגיאה, ריק ולא־מוגדר",
      "ממשק עברי RTL ומובייל־פירסט",
      "תיעוד פריסה ל־GitHub, Vercel ו־Supabase",
    ],
    techStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 3",
      "Supabase Auth",
      "Supabase Postgres",
      "Row Level Security",
      "Supabase Storage",
      "@supabase/supabase-js",
      "@supabase/ssr",
      "next/font",
      "Turbopack",
      "ESLint",
      "Vercel",
    ],
    proof:
      "הפרויקט מוכיח יכולת לבנות מוצר ווב אמיתי למשתמש קצה — מאפיון חוויית המשתמש ועד שכבת הנתונים והאבטחה. הוא מדגים שליטה בזרימות CRUD מלאות, אינטגרציה עם Supabase, אימות משתמשים, RLS כהפרדה אמיתית בין משתמשים, אחסון מדיה, טיפול במצבי קצה, וממשק עברי RTL המותאם למובייל. בנוסף, הוא מדגים בגרות מוצרית: פעולות משתמש בטוחות, ניסוח רגוע וברור, והבחנה כנה בין מה שקיים לבין מה שלא נבנה.",
    projectBookHref: "/projects/recipe-vault/project-book",
    status: "live",
    image: "/projects/recipe-vault.png",
    liveUrl:
      "https://yuval-recipe-vault-bmjm5pwli-yuvalzakay26-8804s-projects.vercel.app",
  },
  {
    title: "מרציפן",
    slug: "marzipan",
    shortDescription:
      "אתר מותג ומכירה למאפיית מרציפן הירושלמית — React 19 + Tailwind, בעברית מלאה (RTL), רספונסיבי ומוכן לפריסה ב־Vercel.",
    longDescription:
      "אתר תדמית ומכירה למאפיית הבוטיק מרציפן משוק מחנה יהודה. האתר מציג סיפור מותג עשיר, קטלוג מוצרים עם חיפוש וסינון, עמודי חגים, עמודי סניפים עם סטטוס פתיחה חי, ושכבת תוכן ו־SEO מקומית. מעבר לחזית השיווקית, האתר כולל תשתית מסחר מתפתחת: סל קניות מתמשך, checkout מבוסס Stripe, אינטגרציית Supabase, אזור לקוח ואזור ניהול — כאשר חלק מהשכבות פעילות וחלקן מונחות כתשתית לעתיד.",
    whatIBuilt: [
      "אתר React 19 מלא בעברית RTL",
      "דף בית שיווקי הבנוי כמשפך המרה",
      "קטלוג מוצרים עם חיפוש וסינון",
      "עמוד מוצר בודד",
      "סל קניות מתמשך עם localStorage",
      "עמודי חגים",
      "עמודי סניפים עם סטטוס פתוח/סגור חי",
      "עמוד אודות, צור קשר ועמודי 404",
      "שכבת SEO עם meta דינמי, JSON-LD, sitemap ו־robots",
      "נגישות עם widget מצבי תצוגה והצהרת נגישות",
      "תשתית מסחר: Stripe Checkout, webhook, Supabase, אזור לקוח ואזור ניהול",
      "התאמה מלאה למובייל ו־RTL",
    ],
    techStack: [
      "React 19",
      "Vite 7",
      "Tailwind CSS 4",
      "react-router-dom 7",
      "react-helmet-async",
      "lucide-react",
      "react-icons",
      "Supabase",
      "Zod",
      "Stripe",
      "EmailJS",
      "Sentry",
      "ESLint",
      "Puppeteer",
      "Vercel",
    ],
    proof:
      "הפרויקט מוכיח יכולת לבנות אתר עסקי אמיתי מקצה לקצה: ממשק React מודולרי ומלוטש בעברית RTL, עיצוב mobile-first ברמת מותג, ניתוב עשיר, ניהול state עם התמדה, SEO ונגישות מובנים, עמודים משפטיים, תצפיתיות, ופריסה מלאה ל־Vercel. מעבר לכך, הוא מדגים חשיבה מוצרית ומערכתית דרך תשתית מסחר שנבנית בשלבים — סל, checkout, Stripe, Supabase, אזור לקוח ואזור ניהול.",
    projectBookHref: "/projects/marzipan/project-book",
    status: "live",
    image: "/projects/marzipan.png",
    liveUrl:
      "https://marzipan-bakery-btx22ieti-yuvalzakay26-8804s-projects.vercel.app",
  },
  {
    title: "יובל דיגיטל",
    slug: "yuval-digital",
    shortDescription:
      "אתר שיווק ויצירת לידים דו־לשוני לסטודיו דיגיטלי, עם תמיכה מלאה ב־RTL/LTR, SEO ופריסה לפרודקשן.",
    longDescription:
      "Yuval Digital הוא אתר שיווק ויצירת לידים דו־לשוני עבור סטודיו דיגיטלי עצמאי שמציג שירותי בניית אתרים, דפי נחיתה, אוטומציות ותהליכי עבודה מבוססי AI לעסקים קטנים ובינוניים בישראל.",
    whatIBuilt: [
      "אתר שיווק דו־לשוני בעברית ובאנגלית",
      "מבנה RTL/LTR לפי שפה",
      "דף בית שיווקי הבנוי כמשפך המרה",
      "דפי שירותים מפורטים",
      "דף אודות",
      "דפי פרטיות ונגישות",
      "מערכת יצירת לידים עם טופס יצירת קשר",
      "קישורי WhatsApp, טלפון ואימייל",
      "מערכת SEO עם metadata, canonical, hreflang ו־JSON-LD",
      "מצב כהה/בהיר",
      "מערכת נגישות",
      "אופטימיזציות ביצועים ו־static prerendering",
    ],
    techStack: [
      "React",
      "Vite",
      "vite-react-ssg",
      "React Router",
      "react-helmet-async",
      "CSS",
      "Vercel",
      "Upstash",
      "n8n",
      "Airtable",
      "Google Analytics",
      "Microsoft Clarity",
    ],
    proof:
      "הפרויקט מוכיח יכולת לבנות אתר עסקי אמיתי מקצה לקצה: מיתוג, חוויית משתמש, נגישות, SEO, ביצועים, יצירת לידים, תמיכה דו־לשונית ופריסה לפרודקשן.",
    projectBookHref: "/projects/yuval-digital/project-book",
    status: "live",
    image: "/projects/yuval-digital.png",
    liveUrl: "https://yuvaldigital.co.il/he",
  },
  {
    title: "פיצה רומי",
    slug: "pizza-romi",
    shortDescription:
      "אתר תדמית ותפריט לפיצרייה, עם חוויית משתמש פשוטה, ברורה ומותאמת למובייל.",
    longDescription:
      "אתר תדמית ותפריט לפיצרייה רומי, שנבנה כדי להציג את התפריט והמותג בצורה ברורה ומזמינה. הדגש בפרויקט היה על חוויית משתמש פשוטה ונקייה, עם התאמה מלאה למובייל וניווט קל אל התפריט ויצירת הקשר.",
    whatIBuilt: [
      "עמוד בית מזמין עם הצגת המותג",
      "תפריט ברור ומסודר וקל לניווט",
      "חוויית משתמש פשוטה ומותאמת למובייל",
      "תמיכה מלאה בעברית וכיווניות RTL",
    ],
    techStack: ["React", "Tailwind CSS", "Responsive UI"],
    status: "live",
    image: "/projects/pizza-romi.png",
    liveUrl:
      "https://pizza-romi-v2-p3qxh9561-yuvalzakay26-8804s-projects.vercel.app",
  },
  {
    title: "פלטפורמת YuvalCode",
    slug: "yuvalcode-platform",
    shortDescription:
      "פלטפורמת תוכן ולמידה להצגת קורסים, שיעורים, פרויקטים ותוכן מקצועי בעברית.",
    longDescription:
      "פלטפורמת תוכן ולמידה שנבנתה כדי להציג קורסים, שיעורים, פרויקטים ותוכן מקצועי בעברית במקום אחד. הפלטפורמה מתמקדת בהנגשת ידע בצורה מסודרת ונוחה, עם מבנה תוכן ברור וחוויית למידה רציפה.",
    whatIBuilt: [
      "מבנה להצגת קורסים ושיעורים",
      "אזור פרויקטים ותוכן מקצועי",
      "ניווט ברור בין יחידות התוכן",
      "תמיכה מלאה בעברית וכיווניות RTL",
    ],
    techStack: ["React", "Vite", "Tailwind CSS", "Content Platform"],
    status: "live",
    image: "/projects/yuvalcode-platform.png",
    liveUrl:
      "https://yuvalcode-platform-41se2it59-yuvalzakay26-8804s-projects.vercel.app",
  },
  {
    title: "אתר עורך דין",
    slug: "lawyer-project",
    shortDescription:
      "אתר תדמית לעורכת דין, להצגת שירותים, מידע מקצועי ויצירת קשר בצורה ברורה ונגישה.",
    longDescription:
      "אתר תדמית לעורכת דין, שנועד להציג את תחומי ההתמחות, המידע המקצועי ודרכי יצירת הקשר בצורה ברורה, אמינה ונגישה. הדגש בפרויקט היה על אמון, נגישות וקלות ניווט עבור לקוחות פוטנציאליים.",
    whatIBuilt: [
      "עמודי הצגת שירותים ותחומי התמחות",
      "אזור מידע מקצועי ברור ומסודר",
      "טופס ואמצעי יצירת קשר נגישים",
      "עיצוב רספונסיבי ונקי המשדר אמינות",
    ],
    techStack: ["React", "Tailwind CSS", "Client Project", "RTL"],
    status: "live",
    image: "/projects/lawyer-project.png",
    liveUrl:
      "https://ester-law-website-hc8bp0bwb-yuvalzakay26-8804s-projects.vercel.app",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
