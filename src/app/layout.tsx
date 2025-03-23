import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SumFei's Portfolio",
  description: "Personal site powered by Next.js + Notion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-white text-gray-900">
        <div className="min-h-screen flex flex-col">
          <main className="flex-1 w-full max-w-3xl mx-auto px-6 py-12">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
