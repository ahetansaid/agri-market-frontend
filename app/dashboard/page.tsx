import { redirect } from "next/navigation";

// /dashboard n'a pas de vue propre : on envoie vers l'espace producteur.
export default function DashboardIndex() {
  redirect("/dashboard/producer");
}
