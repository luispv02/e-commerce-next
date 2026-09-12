import clsx from "clsx";

interface FormToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const FormToggle = ({ checked, onChange, disabled }: FormToggleProps) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={clsx("relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition cursor-pointer", checked ? "bg-blue-600" : "bg-slate-300", disabled && "cursor-not-allowed opacity-50")}
    >
      <span className={clsx("inline-block size-4 transform rounded-full bg-white shadow transition-transform duration-200", checked ? "translate-x-6" : "translate-x-1")} />
    </button>
  );
};
