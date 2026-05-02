import { FractionCalculator } from "./components/fraction-calculator";

export default function HomePage() {
  return (
    <div className="content-stack">
      <section className="hero">
        <div>
          <p className="eyebrow">Free online math tool</p>
          <h1>Fraction calculator for fast, accurate answers</h1>
          <p className="hero-copy">
            Add, subtract, multiply, divide, and simplify fractions in seconds.
            This free fraction calculator also shows decimal output and mixed
            numbers, making it useful for students, teachers, cooks, and anyone
            working with parts of a whole.
          </p>
          <ul className="hero-list">
            <li>Works with proper fractions, improper fractions, and whole numbers</li>
            <li>Shows simplified fraction, decimal value, and mixed-number result</li>
            <li>Runs instantly in your browser with keyboard-friendly controls</li>
          </ul>
        </div>
        <div className="section-card">
          <h2>Why use a fraction calculator?</h2>
          <p>
            Fraction math is easy to get wrong by hand, especially when you need
            common denominators or want the cleanest simplified answer. This
            tool handles the arithmetic and formatting for you right away.
          </p>
          <ul className="page-list section-spacing">
            <li>
              <strong>School math:</strong> check homework and practice steps.
            </li>
            <li>
              <strong>Recipes:</strong> scale ingredient amounts without mental math.
            </li>
            <li>
              <strong>DIY and budgeting:</strong> work with measurements and part values.
            </li>
          </ul>
        </div>
      </section>

      <FractionCalculator />

      <section className="info-grid" aria-label="Helpful information">
        <article className="content-card">
          <h2>How it works</h2>
          <p>
            Enter two fractions, choose an operation, and the calculator finds
            the result using exact numerator and denominator math before
            simplifying it.
          </p>
        </article>
        <article className="content-card">
          <h2>Example</h2>
          <p>
            For 3/4 + 2/3, the result is <strong>17/12</strong>, which can also
            be written as <strong>1 5/12</strong> or <strong>1.4167</strong>.
          </p>
        </article>
        <article className="content-card">
          <h2>Who it helps</h2>
          <p>
            Students, parents, teachers, bakers, contractors, and anyone who
            needs reliable fraction answers without installing an app.
          </p>
        </article>
      </section>

      <section className="section-card">
        <h2>Fraction calculator FAQ</h2>
        <ul className="faq-list">
          <li>
            <strong>Can I use whole numbers?</strong> Yes. Enter a whole number
            as a fraction with denominator 1.
          </li>
          <li>
            <strong>Does it simplify fractions?</strong> Yes. Results are reduced
            to lowest terms automatically.
          </li>
          <li>
            <strong>Can I see decimals too?</strong> Yes. The calculator shows a
            decimal approximation alongside the fraction result.
          </li>
        </ul>
      </section>
    </div>
  );
}
