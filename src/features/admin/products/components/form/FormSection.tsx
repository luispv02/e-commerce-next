interface FormSectionProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  iconClassName?: string;
}

export const FormSection = ({ icon, title, subtitle, children, iconClassName = "bg-slate-100 text-slate-700" }: FormSectionProps) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5">
      <div className="mb-5 flex items-start gap-3">
        <span className={`inline-flex size-9 shrink-0 items-center justify-center rounded-lg ${iconClassName}`}>
          {icon}
        </span>
        <div>
          <h2 className="text-sm font-semibold text-slate-950">{title}</h2>
          {subtitle ? <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p> : null}
        </div>
      </div>

      {children}
    </section>
  );
};
