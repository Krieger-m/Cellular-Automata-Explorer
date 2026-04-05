import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";
import { Header } from "@/_components/Header";
import { Navbar } from "@/_components/Navbar";
import { Spacing } from "@/_components/Spacing";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cellular Automata Explorer",
  description:
    "A curated collection of cellular automata with unique behaviors and visual patterns",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Header />
        <Spacing height={2} />

        {/* <Navbar /> */}

        {children}
        <Spacing height={2} />
      </body>
    </html>
  );
}
