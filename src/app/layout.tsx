import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MemePet",
  description: "Shared development foundation for the MemePet hackathon project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
