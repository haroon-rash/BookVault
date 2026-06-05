/**
 * Root layout — fonts, global CSS, metadata, and app-wide providers.
 */

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "BookVault — Online Bookstore",
    template: "%s | BookVault",
  },
  description: "Browse, search, and shop curated books.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} min-h-screen antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
