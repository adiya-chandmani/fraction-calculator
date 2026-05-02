"use client";

import { useMemo, useState } from "react";

type Operator = "+" | "-" | "×" | "÷";

const EXAMPLES: Array<{ left: string; right: string; operation: Operator }> = [
  { left: "3/4", right: "2/3", operation: "+" },
  { left: "5/6", right: "1/4", operation: "-" },
  { left: "7/8", right: "2/5", operation: "×" },
];

type Fraction = {
  numerator: number;
  denominator: number;
};

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);

  while (y !== 0) {
    const temp = y;
    y = x % y;
    x = temp;
  }

  return x || 1;
}

function simplifyFraction(fraction: Fraction): Fraction {
  if (fraction.denominator === 0) {
    return fraction;
  }

  const sign = fraction.denominator < 0 ? -1 : 1;
  const numerator = fraction.numerator * sign;
  const denominator = fraction.denominator * sign;
  const divisor = gcd(numerator, denominator);

  return {
    numerator: numerator / divisor,
    denominator: denominator / divisor,
  };
}

function parseFraction(value: string): Fraction | null {
  const cleaned = value.trim();

  if (!cleaned) {
    return null;
  }

  if (/^-?\d+$/.test(cleaned)) {
    return { numerator: Number(cleaned), denominator: 1 };
  }

  const match = cleaned.match(/^(-?\d+)\s*\/\s*(-?\d+)$/);

  if (!match) {
    return null;
  }

  const numerator = Number(match[1]);
  const denominator = Number(match[2]);

  if (denominator === 0) {
    return null;
  }

  return simplifyFraction({ numerator, denominator });
}

function formatFraction(fraction: Fraction): string {
  if (fraction.denominator === 1) {
    return `${fraction.numerator}`;
  }

  return `${fraction.numerator}/${fraction.denominator}`;
}

function formatMixedNumber(fraction: Fraction): string {
  const simplified = simplifyFraction(fraction);
  const whole = Math.trunc(simplified.numerator / simplified.denominator);
  const remainder = Math.abs(simplified.numerator % simplified.denominator);

  if (remainder === 0) {
    return `${whole}`;
  }

  if (whole === 0) {
    return `${simplified.numerator}/${simplified.denominator}`;
  }

  return `${whole} ${remainder}/${simplified.denominator}`;
}

function calculate(left: Fraction, right: Fraction, operator: Operator): Fraction | null {
  switch (operator) {
    case "+":
      return simplifyFraction({
        numerator: left.numerator * right.denominator + right.numerator * left.denominator,
        denominator: left.denominator * right.denominator,
      });
    case "-":
      return simplifyFraction({
        numerator: left.numerator * right.denominator - right.numerator * left.denominator,
        denominator: left.denominator * right.denominator,
      });
    case "×":
      return simplifyFraction({
        numerator: left.numerator * right.numerator,
        denominator: left.denominator * right.denominator,
      });
    case "÷":
      if (right.numerator === 0) {
        return null;
      }

      return simplifyFraction({
        numerator: left.numerator * right.denominator,
        denominator: left.denominator * right.numerator,
      });
    default:
      return null;
  }
}

export function FractionCalculator() {
  const [leftValue, setLeftValue] = useState("3/4");
  const [rightValue, setRightValue] = useState("2/3");
  const [operator, setOperator] = useState<Operator>("+");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    const left = parseFraction(leftValue);
    const right = parseFraction(rightValue);

    if (!left || !right) {
      return { error: "Enter valid fractions like 3/4, -5/6, or whole numbers like 2." };
    }

    const calculated = calculate(left, right, operator);

    if (!calculated) {
      return { error: "This calculation is not possible. Check for division by zero." };
    }

    const decimal = calculated.numerator / calculated.denominator;

    return {
      left: formatFraction(left),
      right: formatFraction(right),
      simplified: formatFraction(calculated),
      mixed: formatMixedNumber(calculated),
      decimal: decimal.toFixed(4).replace(/\.0+$/, "").replace(/(\.\d*?)0+$/, "$1"),
      sentence: `${formatFraction(left)} ${operator} ${formatFraction(right)} = ${formatFraction(calculated)}`,
    };
  }, [leftValue, rightValue, operator]);

  const handleExample = (example: { left: string; right: string; operation: Operator }) => {
    setLeftValue(example.left);
    setRightValue(example.right);
    setOperator(example.operation);
    setCopied(false);
  };

  const handleCopy = async () => {
    if ("error" in result) {
      return;
    }

    try {
      await navigator.clipboard.writeText(result.sentence);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="tool-card" aria-labelledby="calculator-title">
      <h2 id="calculator-title">Free fraction calculator</h2>
      <p>
        Enter two fractions and choose an operation to get an exact answer,
        simplified fraction, mixed number, and decimal form.
      </p>

      <div className="tool-grid section-spacing">
        <div className="fraction-form-grid">
          <div className="form-row">
            <label htmlFor="left-fraction">First fraction</label>
            <input
              id="left-fraction"
              name="left-fraction"
              type="text"
              inputMode="text"
              autoComplete="off"
              spellCheck={false}
              placeholder="3/4"
              value={leftValue}
              onChange={(event) => {
                setLeftValue(event.target.value);
                setCopied(false);
              }}
            />
          </div>

          <div className="form-row">
            <label htmlFor="operator">Operation</label>
            <select
              id="operator"
              name="operator"
              value={operator}
              onChange={(event) => {
                setOperator(event.target.value as Operator);
                setCopied(false);
              }}
            >
              <option value="+">Add (+)</option>
              <option value="-">Subtract (-)</option>
              <option value="×">Multiply (×)</option>
              <option value="÷">Divide (÷)</option>
            </select>
          </div>

          <div className="form-row">
            <label htmlFor="right-fraction">Second fraction</label>
            <input
              id="right-fraction"
              name="right-fraction"
              type="text"
              inputMode="text"
              autoComplete="off"
              spellCheck={false}
              placeholder="2/3"
              value={rightValue}
              onChange={(event) => {
                setRightValue(event.target.value);
                setCopied(false);
              }}
            />
          </div>
        </div>

        <p className="muted">Examples: 3/4, 5/6, -2/3, 7, 11/8</p>

        <div className="button-row" aria-label="Example fraction calculations">
          {EXAMPLES.map((example) => (
            <button
              key={`${example.left}-${example.operation}-${example.right}`}
              type="button"
              className="secondary"
              onClick={() => handleExample(example)}
            >
              Try {example.left} {example.operation} {example.right}
            </button>
          ))}
        </div>

        {"error" in result ? (
          <p className="message error" aria-live="polite">
            {result.error}
          </p>
        ) : (
          <div className="result-box" aria-live="polite">
            <div className="result-grid">
              <div>
                <p className="muted">Exact result</p>
                <p className="result-code">{result.simplified}</p>
              </div>
              <div>
                <p className="muted">Mixed number</p>
                <p className="result-code">{result.mixed}</p>
              </div>
              <div>
                <p className="muted">Decimal</p>
                <p className="result-code">{result.decimal}</p>
              </div>
            </div>
            <div>
              <p className="muted">Equation</p>
              <p className="result-code">{result.sentence}</p>
            </div>
            <div className="button-row">
              <button type="button" onClick={handleCopy}>
                Copy result
              </button>
            </div>
            <p className={`message ${copied ? "success" : "muted"}`}>
              {copied ? "Copied to clipboard." : "Ready for homework checks, recipes, and quick reference."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
