import type { Metadata } from "next";
import { Poppins, JetBrains_Mono } from "next/font/google";
import { AuthProvider } from "@/lib/auth-context";
import { BackToTop } from "@/components/ui/back-to-top";
import { FloatingChat } from "@/components/ui/floating-chat";
import "./globals.css";

// Police principale de la charte IDA : Poppins
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Agri Market Africa — L'agriculture africaine en ligne",
    template: "%s — Agri Market Africa",
  },
  description:
    "La marketplace de référence pour l'agriculture africaine. 54 pays, sans commission, sans intermédiaire.",
  keywords: [
    "marketplace agricole",
    "afrique",
    "producteurs",
    "coopératives",
    "bio",
    "made in africa",
  ],
  authors: [{ name: "IDA International / NourDign" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${poppins.variable} ${jetbrains.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AuthProvider>{children}</AuthProvider>
        <BackToTop />
        <FloatingChat />
      </body>
    </html>
  );
}
