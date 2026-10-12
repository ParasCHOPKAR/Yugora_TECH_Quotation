import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yugora Tech Quotation | Digital & Enterprise Solutions",
  description: "Official quotation generator with categorized services catalog and print-ready PDF export.",
  icons: {
    icon: [
      { url: "/LOGO_FINAL.png?v=2", type: "image/png" },
      { url: "/favicon.ico?v=2" },
    ],
    shortcut: "/LOGO_FINAL.png?v=2",
    apple: "/LOGO_FINAL.png?v=2",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/LOGO_FINAL.png?v=2" type="image/png" />
        <link rel="shortcut icon" href="/LOGO_FINAL.png?v=2" type="image/png" />
        <link rel="apple-touch-icon" href="/LOGO_FINAL.png?v=2" />
      </head>
      <body>{children}</body>
    </html>
  );
}
