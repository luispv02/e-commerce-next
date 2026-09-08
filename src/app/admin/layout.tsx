import type { Metadata } from "next";
import { AdminShell } from "@/features/admin/components/AdminShell";

export const metadata: Metadata = {
  title: "Dashboard | Admin",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminShell>
      {children}
    </AdminShell>
  )
}
