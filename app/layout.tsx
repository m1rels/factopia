import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@styles/globals.css";
import { ThemeProvider } from 'next-themes';

import Nav from "@components/Nav";
import Provider from "@components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Factopia",
  description: "Discover & Share Fun Facts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Provider>
        <ThemeProvider attribute="class">
        <div className="main dark:bg-slate-950">
          <div className="gradient" />
        </div>
        <main className="app">
          <Nav />
          {children}
        </main>
        </ ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
