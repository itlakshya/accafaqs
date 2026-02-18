import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ACCA FAQs - Lakshya",
  description: "Frequently Asked Questions for ACCA Initial Registration process at Lakshya ACCA coaching institute.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
