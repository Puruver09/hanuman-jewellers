import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hanuman Jewellers | Gold & Silver Rates",
  description:
    "Hanuman Jewellers — trusted gold and silver jewellery with daily market rate updates.",
  icons: {
    icon: "/logo.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}