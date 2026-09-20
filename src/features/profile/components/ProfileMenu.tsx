import { LogoutButton } from "./LogoutButton";
import { ProfileMenuItems } from "./ProfileMenuItems";


interface ProfileMenuProps {
  isAdmin: boolean;
}

export const ProfileMenu = ({ isAdmin }: ProfileMenuProps) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="divide-y divide-slate-100">
        <ProfileMenuItems isAdmin={isAdmin} />

        <LogoutButton />
      </div>
    </div>
  );
};