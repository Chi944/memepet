import Link from "next/link";
import { Card } from "@/components/ui/Card";

const previewLinks = [
  { href: "/dev/pet", label: "Pet UI preview" },
  { href: "/dev/landing", label: "Landing UI preview" },
  { href: "/dev/community", label: "Community UI preview" },
];

export default function Home() {
  const isDevelopment = process.env.NODE_ENV === "development";

  return (
    <main className="page-shell">
      <Card className="home-card">
        <p className="eyebrow">MemePet development foundation</p>
        <h1>One shared application, ready for interface work.</h1>
        <p className="lede">
          This baseline provides stable component inputs, approved Mochi stage
          art, and wallet-free local previews. Live adoption, care, persistence,
          and community data are not implemented yet.
        </p>

        {isDevelopment ? (
          <nav aria-label="Developer previews" className="preview-links">
            {previewLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        ) : (
          <p className="status-note">
            Developer previews are intentionally unavailable in production.
          </p>
        )}
      </Card>
    </main>
  );
}
