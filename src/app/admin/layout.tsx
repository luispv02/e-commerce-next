import type { Metadata } from "next";
import { AdminShell } from "@/features/admin/components/AdminShell";
import { requireAdmin } from "@/lib/auth-utils";

export const metadata: Metadata = {
  title: {
    default: "Panel de administración",
    template: "%s | Admin",
  },
  robots: {
    index: false,
    follow: false,
  }
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {

  await requireAdmin();

  return (
    <AdminShell>
      {children}
    </AdminShell>
  )
}
