"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { contactSeller } from "@/lib/auth";
import { MessageCircle, Loader2 } from "lucide-react";

export function ContactSellerButton({
  announcementId,
  label = "Contacter le vendeur",
  className,
}: {
  announcementId: number;
  label?: string;
  className?: string;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    if (!user) {
      router.push(`/login?next=/annonces/${announcementId}`);
      return;
    }
    setLoading(true);
    try {
      const c = await contactSeller(announcementId);
      router.push(`/messages/${c.conversation_id}`);
    } catch {
      setLoading(false);
    }
  };

  return (
    <button type="button" onClick={onClick} disabled={loading} className={className}>
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.5} />
      ) : (
        <MessageCircle className="h-4 w-4" strokeWidth={2.5} />
      )}
      {label}
    </button>
  );
}
