"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

/** Garde d'accès : réserve la zone au personnel (`is_staff`). */
export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace("/login?next=/dashboard/admin");
    } else if (!user.is_staff) {
      router.replace("/dashboard/producer");
    }
  }, [isLoading, user, router]);

  if (isLoading || !user || !user.is_staff) {
    return (
      <main className="grid min-h-screen place-items-center bg-sand-50">
        <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
      </main>
    );
  }
  return <>{children}</>;
}
