"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { tokenizeLine } from "@/lib/highlight";

/**
 * Decorative glass "code editor" graphic. Presentational: pass a filename and a
 * plain source string; syntax colors come from the lightweight tokenizer
 * (lib/highlight) using the --code-* tokens in globals.css.
 *
 * With `typewriter`, the snippet types itself out line by line on a slow loop
 * (respecting prefers-reduced-motion). Full height is always reserved so the
 * surrounding layout never shifts as characters appear.
 */
interface CodeWindowProps {
  filename: string;
  snippet: string;
  /** Optional signature color (per pillar). Defaults to the theme accent. */
  accent?: string;
  /** Animate the code typing itself out, on a loop. Defaults to static. */
  typewriter?: boolean;
}

const CHAR_MS = 55; // slow, readable typing cadence
const NEWLINE_MS = 350; // brief pause when moving to the next line
const END_PAUSE_MS = 2200; // hold the finished snippet before looping
const START_DELAY_MS = 500;

export function CodeWindow({
  filename,
  snippet,
  accent,
  typewriter = false,
}: CodeWindowProps) {
  const reduced = useReducedMotion() ?? false;
  const accentColor = accent ?? "var(--accent)";

  const full = snippet.replace(/\n+$/, "");
  const fullLines = full.split("\n");
  const animate = typewriter && !reduced;

  // Number of characters revealed so far (across the whole snippet).
  const [count, setCount] = useState(animate ? 0 : full.length);

  useEffect(() => {
    if (!animate) {
      setCount(full.length);
      return;
    }

    let i = 0;
    let timer: ReturnType<typeof setTimeout>;

    const step = () => {
      if (i >= full.length) {
        // Finished: hold, then reset and type again.
        timer = setTimeout(() => {
          i = 0;
          setCount(0);
          timer = setTimeout(step, START_DELAY_MS);
        }, END_PAUSE_MS);
        return;
      }
      i += 1;
      setCount(i);
      const justTyped = full[i - 1];
      timer = setTimeout(step, justTyped === "\n" ? NEWLINE_MS : CHAR_MS);
    };

    setCount(0);
    timer = setTimeout(step, START_DELAY_MS);
    return () => clearTimeout(timer);
  }, [animate, full]);

  // Text visible on each line, and which line the cursor sits on.
  const visibleLines = animate ? full.slice(0, count).split("\n") : fullLines;
  const cursorLine = animate ? visibleLines.length - 1 : fullLines.length - 1;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-2xl shadow-black/40 backdrop-blur-xl">
      {/* Signature accent bar */}
      <div
        className="h-0.5 w-full"
        style={{
          background: `linear-gradient(90deg, ${accentColor}, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400/70" />
        <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
        <span className="h-3 w-3 rounded-full bg-green-400/70" />
        <span
          className="ml-2 h-2 w-2 rounded-full"
          style={{ backgroundColor: accentColor }}
          aria-hidden="true"
        />
        <span className="font-mono text-xs text-faint">{filename}</span>
      </div>

      {/* Code body — all rows always rendered so height is stable */}
      <pre className="max-w-full overflow-x-auto p-5 font-mono text-[13px] leading-relaxed">
        <code className="block w-max min-w-full">
          {fullLines.map((_, i) => {
            const text = (animate ? visibleLines[i] : fullLines[i]) ?? "";
            return (
              <span key={i} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-4">
                <span className="select-none text-right text-faint/60">
                  {i + 1}
                </span>
                <span className="whitespace-pre">
                  {text.length === 0
                    ? " "
                    : tokenizeLine(text).map((tok, j) => (
                        <span key={j} className={tok.cls}>
                          {tok.text}
                        </span>
                      ))}
                  {i === cursorLine && (
                    <span
                      className="cursor-blink ml-1 inline-block"
                      style={{ color: accentColor }}
                    >
                      _
                    </span>
                  )}
                </span>
              </span>
            );
          })}
        </code>
      </pre>
    </div>
  );
}
