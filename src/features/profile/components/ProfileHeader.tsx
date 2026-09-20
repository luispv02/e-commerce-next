import { FiUser } from "react-icons/fi";

interface ProfileHeaderProps {
  name: string;
  email: string;
}

export const ProfileHeader = ({ name, email }: ProfileHeaderProps) => {
  return (
    <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-4">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-slate-100">
          <FiUser className="size-5 text-slate-500" />
        </div>

        <div className="min-w-0">
          <h1 className="truncate text-md font-bold text-slate-950">
            {name}
          </h1>

          <p className="truncate text-sm text-slate-500">
            {email}
          </p>
        </div>
      </div>
    </div>
  );
};