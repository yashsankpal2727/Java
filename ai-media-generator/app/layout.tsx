import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "AI Media Studio - Generate Images & Videos from Text",
  description: "Transform your ideas into stunning visuals and videos using AI. Perfect for creative projects, marketing, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
