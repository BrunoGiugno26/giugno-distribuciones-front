// ./app/layout.tsx
import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";

import type { Metadata } from "next";
import { Ubuntu, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import SyncWrapper from "@/components/sync-wrapper";
import FloatingWhatsAppButton from "./(routes)/peluquerias/reventa/components/FloatingWhatsAppButton";

const ubuntu = Ubuntu({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Giugno Distribuciones",
  description: "Bienvenido a nuestro ecommerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      localization={esES}
      appearance={{
        variables: {
          colorPrimary: "#1A1A1A",
          colorText: "#1A1A1A",
          colorBackground: "#FFFFFF",
          colorInputBackground: "FAFAFA",
          colorShimmer: "#E0E0E0",
        },
        elements: {
          card: {
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            border: "1px solid #E0E0E0",
          },
          // Personalización del botón principal ("Continuar", "Registrarse")
          formButtonPrimary: {
            // Eliminar mayúsculas forzadas
            textTransform: "none",
            // Color de fondo profesional (negro o el color de tu marca)
            backgroundColor: "#1A1A1A",
            "&:hover": {
              backgroundColor: "#333333",
            },
            transition: "background-color 0.3s ease",
          },

          formFieldInput: {
            border: "1px solid #E0E0E0",
            transition: "border-color 0.3s ease",
            "&:hover": {
              borderColor: "#A0A0A0",
            },
          },
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${ubuntu.variable} ${geistMono.variable} antialiased`}
          suppressHydrationWarning
        >
          <SyncWrapper />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <FloatingWhatsAppButton/>
            {children}
            <Footer />
            <Toaster richColors position="top-right" visibleToasts={1} />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
