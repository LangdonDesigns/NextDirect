import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { SessionProvider } from 'next-auth/react'
import SessionWrapper from "@/components/auth/sessionWrapper";

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";

import Header from "@/components/blocks/header";

const archivo = Archivo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_SITE_NAME ?? "Next.js Directus App",
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION ?? "Next.js App displaying Directus API Content",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <SessionWrapper>
        <html lang="en">
          <body className={archivo.className}>
            <Header />
            <div id="content">
              <main>{children}</main>
            </div>
          </body>
        </html>
      </SessionWrapper>
  );
}