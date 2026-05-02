import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact information for the fraction calculator website.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <article className="content-card">
      <h1>Contact</h1>
      <p>
        For feedback, corrections, or partnership questions related to this
        microtool, use the contact details connected to the site deployment or repository.
      </p>
      <ul className="page-list section-spacing">
        <li>
          <strong>Best channel:</strong> open a GitHub issue once the repository is live.
        </li>
        <li>
          <strong>Response scope:</strong> bug reports, UX suggestions, and SEO improvements are welcome.
        </li>
      </ul>
    </article>
  );
}
