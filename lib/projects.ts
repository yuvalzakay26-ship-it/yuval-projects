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
    image: "/projects/life-management-system.svg",
    liveUrl:
      "https://life-vault-ai-git-master-yuvalzakay26-8804s-projects.vercel.app",
  },
  {
    title: "מערכת מתכונים",
    slug: "recipe-vault",
    shortDescription:
      "מערכת אישית לניהול מתכונים, שמירה, עריכה וארגון של מתכונים במקום אחד.",
    longDescription:
      "מערכת אישית לניהול מתכונים שמאפשרת לשמור, לערוך ולארגן מתכונים במקום אחד. המערכת נבנתה כדי להפוך אוסף מתכונים מפוזר למאגר מסודר ונוח לחיפוש, עם חוויית שימוש פשוטה ותמיכה מלאה בעברית.",
    whatIBuilt: [
      "מאגר מתכונים עם שמירה ועריכה",
      "ארגון וסידור מתכונים לפי קטגוריות",
      "ממשק נוח לחיפוש וגישה מהירה",
      "תמיכה מלאה בעברית וכיווניות RTL",
    ],
    techStack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    status: "live",
    image: "/projects/recipe-vault.svg",
    liveUrl:
      "https://yuval-recipe-vault-bmjm5pwli-yuvalzakay26-8804s-projects.vercel.app",
  },
  {
    title: "מרציפן",
    slug: "marzipan",
    shortDescription:
      "אתר תדמית וקטלוג למאפייה, עם עיצוב רספונסיבי ותמיכה מלאה בעברית.",
    longDescription:
      "אתר תדמית וקטלוג למאפייה Marzipan, שנבנה כדי להציג את המוצרים והמותג בצורה חמה ומזמינה. האתר מותאם לחלוטין למובייל ותומך באופן מלא בעברית ובכיווניות RTL, עם דגש על חוויית גלישה נעימה וזמני טעינה מהירים.",
    whatIBuilt: [
      "עיצוב ובניית עמוד בית עם הצגת מוצרים מרכזיים",
      "קטלוג מוצרים רספונסיבי המותאם למסכים קטנים",
      "תמיכה מלאה בעברית וכיווניות RTL",
      "התאמה מלאה למובייל עם דגש על מהירות",
    ],
    techStack: ["React", "Tailwind CSS", "RTL"],
    status: "live",
    image: "/projects/marzipan.svg",
    liveUrl:
      "https://marzipan-bakery-btx22ieti-yuvalzakay26-8804s-projects.vercel.app",
  },
  {
    title: "יובל דיגיטל",
    slug: "yuval-digital",
    shortDescription:
      "אתר אישי להצגת שירותים דיגיטליים, מיתוג, בניית אתרים ופתרונות לעסקים.",
    longDescription:
      "אתר אישי ומקצועי המרכז את השירותים הדיגיטליים שאני מציע — מיתוג, בניית אתרים ופתרונות מותאמים לעסקים. האתר נבנה כדי לשדר אמינות ומקצועיות, עם מבנה ברור שמוביל את המבקר מהיכרות ועד יצירת קשר.",
    whatIBuilt: [
      "עמוד נחיתה מקצועי להצגת השירותים",
      "מבנה תוכן ברור שמוביל ליצירת קשר",
      "מיתוג ויזואלי אחיד לאורך האתר",
      "ביצועים גבוהים ותאימות מלאה למובייל",
    ],
    techStack: ["React", "Tailwind CSS", "UI", "RTL"],
    status: "live",
    image: "/projects/yuval-digital.svg",
    liveUrl:
      "https://yuval-digital-g29k0bymo-yuvalzakay26-8804s-projects.vercel.app",
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
    image: "/projects/pizza-romi.svg",
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
    image: "/projects/yuvalcode-platform.svg",
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
    image: "/projects/lawyer-project.svg",
    liveUrl:
      "https://ester-law-website-hc8bp0bwb-yuvalzakay26-8804s-projects.vercel.app",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
