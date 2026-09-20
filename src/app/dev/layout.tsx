import Link from "next/link";
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

  return (
    <>
      {/* Sticky, so the fictional-data warning survives scrolling and screenshots. */}
      <p className="dev-banner">
        <span>Developer preview — every value below is fictional.</span>
        <Link href="/">Back to the real app</Link>
      </p>
      {children}
    </>
  );
}
