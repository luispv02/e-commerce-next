"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiChevronDown, FiMapPin } from "react-icons/fi";
import { ShippingAddressFormData, shippingAddressSchema } from "../schemas/address";
import { mexicanStates } from "../data/mexican-states";


interface AddressFormProps {
  onContinue?: (data: ShippingAddressFormData) => void;
}

export const AddressForm = ({ onContinue }: AddressFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ShippingAddressFormData>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      street: "",
      neighborhood: "",
      postalCode: "",
      city: "",
      state: "",
      references: "",
      saveAddress: false,
    },
  });

  const onSubmit = (data: ShippingAddressFormData) => {
    onContinue?.(data);
  };

  return (
    <section className="overflow-hidden rounded-lg border border-[#c5d3e6] bg-white">
      <div className="flex items-center gap-4 bg-linear-to-r from-white to-[#f7fbff] px-5 py-4 md:px-6">
        <div className="relative flex size-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
          <FiMapPin className="size-6" />
        </div>

        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-950">
            Dirección de envío
          </h2>

          <p className="mt-1 text-sm text-[#38558a]">
            Completa la información para continuar.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="px-5 pb-5 pt-4 md:px-6 md:pb-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-slate-950">
              Nombre completo
            </span>

            <input
              {...register("fullName")}
              placeholder="Ej. Juan Pérez"
              aria-invalid={!!errors.fullName}
              className="mt-2 h-11 w-full rounded-md border border-[#bfd0e6] bg-white px-4 text-sm text-slate-950 outline-none placeholder:text-[#7d91b4] focus:border-blue-500 focus:ring-2 focus:ring-blue-100 aria-invalid:border-red-500"
            />

            {errors.fullName && (
              <span className="mt-1 block text-xs text-red-500">
                {errors.fullName.message}
              </span>
            )}
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-950">
              Teléfono
            </span>

            <input
              {...register("phone")}
              type="tel"
              inputMode="numeric"
              placeholder="Ej. 55 1234 5678"
              aria-invalid={!!errors.phone}
              className="mt-2 h-11 w-full rounded-md border border-[#bfd0e6] bg-white px-4 text-sm text-slate-950 outline-none placeholder:text-[#7d91b4] focus:border-blue-500 focus:ring-2 focus:ring-blue-100 aria-invalid:border-red-500"
            />

            {errors.phone && (
              <span className="mt-1 block text-xs text-red-500">
                {errors.phone.message}
              </span>
            )}
          </label>

          <label className="block md:col-span-2">
            <span className="text-sm font-medium text-slate-950">
              Calle y número
            </span>

            <input
              {...register("street")}
              placeholder="Ej. Av. Reforma 123"
              aria-invalid={!!errors.street}
              className="mt-2 h-11 w-full rounded-md border border-[#bfd0e6] bg-white px-4 text-sm text-slate-950 outline-none placeholder:text-[#7d91b4] focus:border-blue-500 focus:ring-2 focus:ring-blue-100 aria-invalid:border-red-500"
            />

            {errors.street && (
              <span className="mt-1 block text-xs text-red-500">
                {errors.street.message}
              </span>
            )}
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-950">
              Colonia
            </span>

            <input
              {...register("neighborhood")}
              placeholder="Ej. Roma Norte"
              aria-invalid={!!errors.neighborhood}
              className="mt-2 h-11 w-full rounded-md border border-[#bfd0e6] bg-white px-4 text-sm text-slate-950 outline-none placeholder:text-[#7d91b4] focus:border-blue-500 focus:ring-2 focus:ring-blue-100 aria-invalid:border-red-500"
            />

            {errors.neighborhood && (
              <span className="mt-1 block text-xs text-red-500">
                {errors.neighborhood.message}
              </span>
            )}
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-950">
              Código postal
            </span>

            <input
              {...register("postalCode")}
              inputMode="numeric"
              maxLength={5}
              placeholder="Ej. 06700"
              aria-invalid={!!errors.postalCode}
              className="mt-2 h-11 w-full rounded-md border border-[#bfd0e6] bg-white px-4 text-sm text-slate-950 outline-none placeholder:text-[#7d91b4] focus:border-blue-500 focus:ring-2 focus:ring-blue-100 aria-invalid:border-red-500"
            />

            {errors.postalCode && (
              <span className="mt-1 block text-xs text-red-500">
                {errors.postalCode.message}
              </span>
            )}
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-950">
              Ciudad
            </span>

            <input
              {...register("city")}
              placeholder="Ej. Ciudad de México"
              aria-invalid={!!errors.city}
              className="mt-2 h-11 w-full rounded-md border border-[#bfd0e6] bg-white px-4 text-sm text-slate-950 outline-none placeholder:text-[#7d91b4] focus:border-blue-500 focus:ring-2 focus:ring-blue-100 aria-invalid:border-red-500"
            />

            {errors.city && (
              <span className="mt-1 block text-xs text-red-500">
                {errors.city.message}
              </span>
            )}
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-950">
              Estado
            </span>

            <div className="relative mt-2">
              <select
                {...register("state")}
                defaultValue=""
                aria-invalid={!!errors.state}
                className="h-11 w-full appearance-none rounded-md border border-[#bfd0e6] bg-white px-4 pr-10 text-sm text-[#172849] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 aria-invalid:border-red-500"
              >
                <option value="" disabled>
                  Selecciona un estado
                </option>

                {mexicanStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>

              <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[#38558a]" />
            </div>

            {errors.state && (
              <span className="mt-1 block text-xs text-red-500">
                {errors.state.message}
              </span>
            )}
          </label>
        </div>

        <label className="mt-4 block">
          <span className="text-sm font-medium text-slate-950">
            Referencias de entrega{" "}
            <span className="font-normal text-[#7d91b4]">
              (opcional)
            </span>
          </span>

          <textarea
            {...register("references")}
            maxLength={200}
            placeholder="Ej. Entre la calle 5 y 6, casa color blanco, portón negro."
            aria-invalid={!!errors.references}
            className="mt-2 min-h-17 w-full resize-none rounded-md border border-[#bfd0e6] bg-white px-4 py-3 text-sm text-slate-950 outline-none placeholder:text-[#7d91b4] focus:border-blue-500 focus:ring-2 focus:ring-blue-100 aria-invalid:border-red-500"
          />

          {errors.references ? (
            <span className="mt-1 block text-xs text-red-500">
              {errors.references.message}
            </span>
          ) : (
            <span className="block text-right text-xs text-[#38558a]">
              Máximo 200 caracteres
            </span>
          )}
        </label>

        <label className="mt-4 flex cursor-pointer items-center gap-3">
          <input
            {...register("saveAddress")}
            type="checkbox"
            className="w-4 h-4"
          />

          <span className="block text-sm font-medium text-slate-950">
            ¿Guardar esta dirección en mi cuenta?
          </span>
        </label>

        <div className="mt-6 border-t border-[#d9e3f0] pt-5">
          <button
            type="submit"
            className="ml-auto inline-flex h-12 w-full items-center justify-center gap-3 rounded-md bg-slate-950 px-7 text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto sm:min-w-60 cursor-pointer"
          >
            Continuar al resumen
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </form>
    </section>
  );
};