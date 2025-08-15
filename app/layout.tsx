import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/config/environment.vars";
import { ThemeProvider } from "@/components/theme/themeProvider";
import { Toaster } from "sonner";
import { NextAuthProvider } from "./Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const myUrl = process.env.MY_URL_SITE;

export const metadata: Metadata = {
  metadataBase: new URL(myUrl),
  title: "Cincit 2025",
  description:
    "CINCIT es un congreso internacional de inteligencia artificial y tecnología organizado por la Escuela Profesional de Ingeniería de Sistemas de la Universidad Nacional José María Arguedas.",
  openGraph: {
    title: "Cincit",
    description:
      "Congreso Internacional de Inteligencia Artificial y Tecnología",
    images: "/robot.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-PE" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextAuthProvider>{children}</NextAuthProvider>
          <Toaster
            richColors
            closeButton
            duration={3000}
            position="top-center"
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
