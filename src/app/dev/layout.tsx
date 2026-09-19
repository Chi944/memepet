import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default function DevelopmentPreviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return children;
}
