import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn what this fraction calculator does and who it helps.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <article className="content-card">
      <h1>About this fraction calculator</h1>
      <p>
        This site is a lightweight microtool built to solve one job well:
        calculate fractions quickly and present the answer in useful formats.
      </p>
      <ul className="page-list section-spacing">
        <li>
          <strong>Fast:</strong> every calculation runs instantly in the browser.
        </li>
        <li>
          <strong>Accessible:</strong> labels, keyboard support, and readable output come standard.
        </li>
        <li>
          <strong>Practical:</strong> it shows simplified fractions, mixed numbers, and decimals.
        </li>
      </ul>
    </article>
  );
}
