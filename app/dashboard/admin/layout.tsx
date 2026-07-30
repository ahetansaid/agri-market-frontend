import { AdminShell } from "@/components/admin/admin-shell";

export const metadata = { title: "Back-office" };

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
