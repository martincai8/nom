import type { Metadata } from "next";
import "./globals.css";
import { Inter, Space_Grotesk } from "next/font/google";
import { AuthProvider } from '@/utility/Auth'

const inter = Inter({ subsets: ["latin"] });
const space = Space_Grotesk({ subsets: ["latin"]});

export const metadata: Metadata = {
  title: "nom nom nom",
  description: "nom",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
