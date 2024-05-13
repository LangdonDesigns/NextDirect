import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/auth/sessionWrapper";

//Styles
import 'bootstrap/dist/css/bootstrap.min.css';
//import "bootstrap/dist/js/bootstrap.min.js";

import Header from "@/components/blocks/header";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_SITE_NAME ?? "Next.js App",
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
      <body>
      <Header />
      <div id="content" className="container">
        <main className={inter.className}>{children} </main>
      </div>
      </body>
    </html>
    </SessionWrapper>
  );
}
