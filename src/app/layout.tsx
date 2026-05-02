import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
const siteName = "Fraction Calculator";
const siteDescription =
  "Use this free fraction calculator to add, subtract, multiply, divide, simplify fractions, and convert results to decimals or mixed numbers instantly.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "fraction calculator",
    "simplify fractions",
    "add fractions",
    "subtract fractions",
    "multiply fractions",
    "divide fractions",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteName,
    description: siteDescription,
    url: siteUrl,
    siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
  },
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/contact", label: "Contact" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <div className="site-shell">
          <header className="site-header">
            <div className="container site-header__inner">
              <Link href="/" className="brand">
                Fraction Calculator
              </Link>
              <nav aria-label="Main navigation">
                <ul className="nav-list">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </header>
          <main id="main-content" className="container site-main">
            {children}
          </main>
          <footer className="site-footer">
            <div className="container footer-grid">
              <div>
                <p className="footer-title">Fraction Calculator</p>
                <p className="footer-copy">
                  A fast, accessible fraction calculator for homework, kitchen
                  math, budgeting, and quick everyday conversions.
                </p>
              </div>
              <nav aria-label="Footer navigation">
                <ul className="footer-links">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
