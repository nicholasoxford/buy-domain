import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: {
    icon: "/domain-dash-icon-only.svg",
  },
  title: "Domain Dash - Monetize Your Dormant Domains",
  description:
    "Turn your unused domains into profit with Domain Dash. Choose from affordable templates or hassle-free hosting.",
  openGraph: {
    title: "Domain Dash - Monetize Your Dormant Domains",
    description:
      "Turn your unused domains into profit with Domain Dash. Choose from affordable templates or hassle-free hosting.",
    images: ["https://assets.bigskydevcon.com/domain-bridge.png"],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-dvh flex flex-col bg-slate-900`}
      >
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
