import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MainLayout from "./_components/layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "🔥 Portfolio API",
  description: "Create Your Own Portfolio!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainLayout >
          {children}
        </MainLayout>
      </body>
    </html >
  );
}
