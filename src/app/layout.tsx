import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VibeWish — Aesthetic Wishes for Gen Z",
  description: "Create & share interactive personalized vibes for your loved ones",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased selection:bg-rose-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
