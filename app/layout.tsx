import type { Metadata } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import { AuthProvider } from "@/lib/auth-context";
import { BackToTop } from "@/components/ui/back-to-top";
import { FloatingChat } from "@/components/ui/floating-chat";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
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
      className={`${inter.variable} ${fraunces.variable} ${jetbrains.variable} h-full antialiased`}
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
