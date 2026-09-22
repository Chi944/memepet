import type { NextConfig } from "next";

/**
 * These pages ask a wallet to sign. Next.js sets none of this by default, so
 * without it the signing surface can be framed by any origin.
 */
const securityHeaders = [
  // frame-ancestors is the modern control; X-Frame-Options covers older agents.
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
];

const nextConfig: NextConfig = {
  agentRules: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;