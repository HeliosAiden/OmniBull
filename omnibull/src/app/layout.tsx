import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from 'next-themes'
import { SolanaProvider } from "@/lib/chains/solana";
import { EVMProvider } from "@/lib/chains/evm";

import { SideBarProvider } from "@/contexts/SideBarContext";
import LayoutRouter from "@/app/components/layouts/LayoutRouter";

import { SupabaseSessionProvider } from "@/contexts/SupabaseSessionContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OmniBull",
  description: "Hybrid CEX + DEX analytics & journaling tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/logo/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/logo/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/logo/favicon-16x16.png" />
        <link rel="manifest" href="/images/logo/site.webmanifest"></link>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SupabaseSessionProvider>
            <EVMProvider>
              <SolanaProvider>
                <SideBarProvider>
                  <LayoutRouter>
                    {children}
                  </LayoutRouter>
                </SideBarProvider>
              </SolanaProvider>
            </EVMProvider>
          </SupabaseSessionProvider>
        </ThemeProvider>

      </body>
    </html>
  );
}
