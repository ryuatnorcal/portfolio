import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Menu from "@/components/Menu";
import Email from "@/components/Email";
import Footer from "@/components/Footer";
import { LocaleProvider, useLocale } from "@/hooks/useLocale";
import { ContentProvider } from "@/hooks/useContent";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ryu's Portfolio",
  description: "Showcase of my projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-full min-h-screen-footer">
          <LocaleProvider>
            <Menu />
            {children}
            <Email />
          </LocaleProvider>
        </div>
        <Footer />
      </body>
    </html>
  );
}
