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
    title: "Marzipan",
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
    liveUrl: "#",
  },
  {
    title: "Yuval Digital",
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
    techStack: ["Next.js", "Tailwind CSS", "UI"],
    status: "live",
    image: "/projects/yuval-digital.svg",
    liveUrl: "#",
  },
  {
    title: "פרויקט עורך דין",
    slug: "lawyer-project",
    shortDescription:
      "אתר / מערכת עבור עורך דין, להצגת שירותים, מידע ויצירת קשר בצורה ברורה ונגישה.",
    longDescription:
      "אתר ומערכת עבור עורך דין, שנועדו להציג את תחומי ההתמחות, המידע המקצועי ודרכי יצירת הקשר בצורה ברורה, אמינה ונגישה. הדגש בפרויקט היה על אמון, נגישות וקלות ניווט עבור לקוחות פוטנציאליים.",
    whatIBuilt: [
      "עמודי הצגת שירותים ותחומי התמחות",
      "אזור מידע מקצועי ברור ומסודר",
      "טופס ואמצעי יצירת קשר נגישים",
      "עיצוב רספונסיבי ונקי המשדר אמינות",
    ],
    techStack: ["React", "Responsive UI", "Client Project"],
    status: "in-progress",
    image: "/projects/lawyer-project.svg",
    liveUrl: "#",
  },
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
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "AI-assisted workflow"],
    status: "in-progress",
    image: "/projects/life-management-system.svg",
    liveUrl: "#",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
