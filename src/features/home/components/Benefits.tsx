import clsx from "clsx";
import { BsShieldCheck, BsTruck } from "react-icons/bs";
import { FiRotateCcw } from "react-icons/fi";
import { LuLockKeyhole } from "react-icons/lu";


const benefits = [
  {
    icon: BsTruck,
    title: "Envío gratis",
    description: "En compras mayores a $999",
  },
  {
    icon: BsShieldCheck,
    title: "Garantía de 1 año",
    description: "En todos los productos",
  },
  {
    icon: FiRotateCcw,
    title: "Devoluciones fáciles",
    description: "30 días para cambios",
  },
  {
    icon: LuLockKeyhole,
    title: "Pagos seguros",
    description: "Compra 100% protegida",
  },
];

export const Benefits = () => {
  return (
    <section className="pt-7">
      <div className="grid rounded-2xl border border-slate-200 bg-white sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map(({ icon: Icon, title, description }, index) => (
          <div
            key={title}
            className={clsx("flex items-center gap-4 px-6 py-5", index !== 0 && "border-slate-200 sm:border-l")}
          >
            <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-slate-200">
              <Icon className="size-5 text-slate-800" />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-950">
                {title}
              </p>

              <p className="mt-1 text-xs text-slate-500">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}