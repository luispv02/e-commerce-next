import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Autenticación",
    template: "%s | Tu Tienda",
  },
};


export default function AuthLayout({ children, }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8 sm:px-6">
      {children}
    </main>
  );
}