import type { Metadata, Viewport } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "יובל פרויקטים",
  description:
    "תיק עבודות אישי שמרכז פרויקטים שבניתי בפיתוח אתרים, מערכות ניהול וממשקי משתמש בעברית.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "יובל",
  },
  icons: {
    icon: "/icon-192.png",
    apple: "/icon-192.png",
  },
};

export const viewport: Viewport = {
  // Matches the default (dark) design — used for the browser/OS UI chrome.
  themeColor: "#0a0a0f",
};

// Runs before paint: applies the saved theme (defaults to dark) so there is
// no flash and no hydration mismatch on the <html> class.
const themeInitScript = `
(function () {
  try {
    var t = localStorage.getItem("theme");
    if (t === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  } catch (e) {
    document.documentElement.classList.add("dark");
  }
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${heebo.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-sans">
        <ServiceWorkerRegister />
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
