// @/app/layout.tsx
import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { auth } from '@/auth';
import SessionWrapper from "@/components/auth/sessionWrapper.client";

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";

// FontAwesome Config
import '@fortawesome/fontawesome-svg-core/styles.css'; 
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

import Header from "@/components/blocks/header";

const archivo = Archivo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_SITE_NAME ?? "Next.js Directus App",
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION ?? "Next.js App displaying Directus API Content",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
      <SessionWrapper session={session}>
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