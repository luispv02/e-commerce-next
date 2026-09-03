"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff, FiLock, FiMail, FiUser, FiUserPlus } from "react-icons/fi";
import { registerSchema, type RegisterFormValues } from "../schemas/register.schema";

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    console.log('Register', values)
  };

  return (
    <section className="flex w-full max-w-md flex-col items-center py-4 sm:py-6">
      <Link href="/" className="flex items-center text-slate-950">
        <span className="flex size-8 items-center justify-center rounded-lg bg-slate-950 text-base font-black text-white sm:size-9 sm:text-lg">
          E
        </span>
        <span className="font-bold">-</span>
        <span className="text-lg font-semibold tracking-tight sm:text-xl">
          commerce
        </span>
      </Link>

      <div className="mt-6 w-full rounded-2xl border border-slate-200 bg-white px-4 py-6 shadow-[0_12px_40px_rgba(15,23,42,0.06)] sm:mt-8 sm:px-8 sm:py-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-[1.75rem]">
            Crear una cuenta
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            Crea tu cuenta para comenzar a comprar.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4 sm:mt-7 sm:space-y-5" noValidate>
          <div>
            <label htmlFor="name" className="text-sm font-semibold text-slate-950">
              Nombre
            </label>
            <div className="relative mt-1.5">
              <FiUser className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="Tu nombre"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                {...register("name")}
                className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3.5 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950 sm:h-12"
              />
            </div>
            {errors.name && (
              <p id="name-error" className="mt-1.5 text-xs font-medium text-red-600">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-semibold text-slate-950">
              Correo electrónico
            </label>
            <div className="relative mt-1.5">
              <FiMail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="correo@ejemplo.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                {...register("email")}
                className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3.5 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950 sm:h-12"
              />
            </div>
            {errors.email && (
              <p id="email-error" className="mt-1.5 text-xs font-medium text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-semibold text-slate-950">
              Contraseña
            </label>
            <div className="relative mt-1.5">
              <FiLock className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Mínimo 8 caracteres"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
                {...register("password")}
                className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-11 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950 sm:h-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword((currentValue) => !currentValue)}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                className="absolute right-1.5 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-950"
              >
                {showPassword ? <FiEyeOff className="size-4" /> : <FiEye className="size-4" />}
              </button>
            </div>
            {errors.password && (
              <p id="password-error" className="mt-1.5 text-xs font-medium text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(15,23,42,0.16)] transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400 sm:h-12"
          >
            <FiUserPlus className="size-4" />
            Crear cuenta
          </button>
        </form>

        <div className="mt-6 border-t border-slate-200 pt-5 text-center sm:mt-8 sm:pt-6">
          <p className="text-sm text-slate-500">
            ¿Ya tienes una cuenta?
          </p>
          <Link href="/login" className="mt-1.5 inline-block text-sm font-semibold text-slate-950 underline decoration-slate-950 underline-offset-4 transition hover:text-slate-600">
            Iniciar sesión
          </Link>
        </div>
      </div>
    </section>
  );
};
