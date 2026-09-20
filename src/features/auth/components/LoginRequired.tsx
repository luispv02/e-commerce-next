import Link from "next/link";
import { FiLock } from "react-icons/fi";

interface LoginRequiredProps {
  title?: string;
  message: string;
  returnTo: string;
}

export const LoginRequired = ({ title = "Inicia sesión para continuar", message, returnTo }: LoginRequiredProps) => {
  return (
    <main className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-slate-100">
        <FiLock className="size-6 text-slate-500" />
      </div>
      <h1 className="text-2xl font-bold text-slate-950">{title}</h1>
      <p className="max-w-sm text-slate-500">{message}</p>

      <div className="mt-2 flex gap-3">
        <Link
          href={`/login?from=${encodeURIComponent(returnTo)}`}
          className="rounded-lg bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Iniciar sesión
        </Link>

        <Link
          href={`/register?from=${encodeURIComponent(returnTo)}`}
          className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-50"
        >
          Crear cuenta
        </Link>
      </div>
    </main>
  );
}