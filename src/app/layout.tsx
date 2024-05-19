import type { Metadata } from "next";
import "./globals.css";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { AuthProvider } from '@/utility/Auth'

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
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
