import { LoginRequired } from "@/features/auth/components/LoginRequired";
import { ProfileHeader } from "@/features/profile/components/ProfileHeader";
import { ProfileMenu } from "@/features/profile/components/ProfileMenu";
import { getSession } from "@/lib/auth-utils";

export default async function ProfilePage() {
  const session = await getSession();

  if (!session) {
    return (
      <LoginRequired
        title="Inicia sesión para ver tu perfil"
        message="Accede a tu cuenta para consultar tus pedidos y administrar tu información."
        returnTo="/profile"
      />
    );
  }

  return (
    <section className="mx-auto w-full max-w-3xl">
      <ProfileHeader
        name={session.user.name}
        email={session.user.email}
      />

      <ProfileMenu isAdmin={session.user.role === "admin"} />
    </section>
  );
}