"use client";

import { useMemo, useState } from "react";

const EXAMPLES = ["#3B82F6", "#111827", "#F97316"];

type ConversionResult = {
  normalizedHex: string;
  rgb: string;
  cssRgb: string;
};

function convertHexToRgb(value: string): ConversionResult | null {
  const cleaned = value.trim().replace(/^#/, "");

  if (!/^[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/.test(cleaned)) {
    return null;
  }

  const expanded =
    cleaned.length === 3
      ? cleaned
          .split("")
          .map((char) => char + char)
          .join("")
      : cleaned;

  const red = Number.parseInt(expanded.slice(0, 2), 16);
  const green = Number.parseInt(expanded.slice(2, 4), 16);
  const blue = Number.parseInt(expanded.slice(4, 6), 16);

  return {
    normalizedHex: `#${expanded.toUpperCase()}`,
    rgb: `${red}, ${green}, ${blue}`,
    cssRgb: `rgb(${red}, ${green}, ${blue})`,
  };
}

export function HexConverter() {
  const [hexValue, setHexValue] = useState("#3B82F6");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => convertHexToRgb(hexValue), [hexValue]);

  const handleExample = (example: string) => {
    setHexValue(example);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!result) {
      return;
    }

    try {
      await navigator.clipboard.writeText(result.cssRgb);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="tool-card" aria-labelledby="converter-title">
      <h2 id="converter-title">Free HEX to RGB converter</h2>
      <p>
        Paste a 3-digit or 6-digit HEX color and get the RGB value instantly.
        Use the copy button to drop the CSS-ready output into your code.
      </p>

      <div className="tool-grid section-spacing">
        <div className="form-row">
          <label htmlFor="hex-value">HEX color code</label>
          <input
            id="hex-value"
            name="hex-value"
            type="text"
            inputMode="text"
            autoComplete="off"
            spellCheck={false}
            placeholder="#3B82F6"
            aria-describedby="hex-help"
            value={hexValue}
            onChange={(event) => {
              setHexValue(event.target.value);
              setCopied(false);
            }}
          />
          <p id="hex-help" className="muted">
            Examples: #fff, #111827, #F97316
          </p>
        </div>

        <div className="button-row" aria-label="Example colors">
          {EXAMPLES.map((example) => (
            <button
              key={example}
              type="button"
              className="secondary"
              onClick={() => handleExample(example)}
            >
              Try {example}
            </button>
          ))}
        </div>

        {result ? (
          <div className="result-box" aria-live="polite">
            <div
              className="result-swatch"
              style={{ backgroundColor: result.normalizedHex }}
              aria-label={`Preview swatch for ${result.normalizedHex}`}
            />
            <div>
              <p className="muted">Normalized HEX</p>
              <p className="result-code">{result.normalizedHex}</p>
            </div>
            <div>
              <p className="muted">RGB values</p>
              <p className="result-code">{result.rgb}</p>
            </div>
            <div>
              <p className="muted">CSS output</p>
              <p className="result-code">{result.cssRgb}</p>
            </div>
            <div className="button-row">
              <button type="button" onClick={handleCopy}>
                Copy RGB
              </button>
            </div>
            <p className={`message ${copied ? "success" : "muted"}`}>
              {copied ? "Copied to clipboard." : "Ready to copy into CSS or design docs."}
            </p>
          </div>
        ) : (
          <p className="message error" aria-live="polite">
            Enter a valid 3-digit or 6-digit HEX color code.
          </p>
        )}
      </div>
    </section>
  );
}
