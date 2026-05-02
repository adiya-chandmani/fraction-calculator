import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy details for the fraction calculator website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <article className="content-card">
      <h1>Privacy Policy</h1>
      <p>
        This site is designed to be privacy-friendly. Fraction calculations happen
        in your browser and the tool does not require an account.
      </p>
      <ul className="page-list section-spacing">
        <li>
          <strong>No account required:</strong> you can use the calculator without signing up.
        </li>
        <li>
          <strong>No sensitive input expected:</strong> only simple math values are needed.
        </li>
        <li>
          <strong>Future analytics:</strong> if privacy-safe analytics are added later, this page should be updated first.
        </li>
      </ul>
    </article>
  );
}
