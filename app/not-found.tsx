import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center gap-6 px-5 text-center">
      <h1 className="text-5xl font-extrabold text-fg">404</h1>
      <p className="text-fg/60">הפרויקט שחיפשת לא נמצא.</p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        חזרה לפרויקטים
      </Link>
    </main>
  );
}
