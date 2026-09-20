import Link from "next/link";
import { Card } from "@/components/ui/Card";

export default function PetHomePage() {
  const isDevelopment = process.env.NODE_ENV === "development";

  return (
    <main className="page-shell">
      <Card className="home-card">
        <p className="eyebrow">Pet home</p>
        <h1>Wallet-linked pet home is not live yet.</h1>
        <p className="lede">
          Adoption, daily care, and confirmed progress require a deployed
          registry and a connected wallet. That work is not available in this
          build. No fictional pet is shown here as live state.
        </p>
        {isDevelopment ? (
          <p>
            <Link href="/dev/pet">Open the fictional pet UI preview</Link>
          </p>
        ) : null}
      </Card>
    </main>
  );
}
