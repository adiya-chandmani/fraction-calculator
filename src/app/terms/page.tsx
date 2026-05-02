import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for the fraction calculator website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <article className="content-card">
      <h1>Terms of Use</h1>
      <p>
        By using this website, you agree to use the tool at your own discretion.
        The information is provided as-is for general utility.
      </p>
      <ul className="page-list section-spacing">
        <li>
          <strong>No warranty:</strong> the calculator is offered without guarantees for any specific use.
        </li>
        <li>
          <strong>Fair use:</strong> do not misuse the site or attempt to disrupt its availability.
        </li>
        <li>
          <strong>Updates:</strong> content and functionality may improve over time.
        </li>
      </ul>
    </article>
  );
}
