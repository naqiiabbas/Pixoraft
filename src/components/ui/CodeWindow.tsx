import { tokenizeLine } from "@/lib/highlight";

/**
 * Decorative glass "code editor" graphic. Presentational only: pass a filename
 * and a plain source string; syntax colors are applied by the lightweight
 * tokenizer (lib/highlight) using the --code-* tokens in globals.css.
 */
interface CodeWindowProps {
  filename: string;
  snippet: string;
  /** Optional signature color (per pillar). Defaults to the theme accent. */
  accent?: string;
}

export function CodeWindow({ filename, snippet, accent }: CodeWindowProps) {
  const lines = snippet.replace(/\n+$/, "").split("\n");
  const accentColor = accent ?? "var(--accent)";

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

      {/* Code body */}
      <pre className="max-w-full overflow-x-auto p-5 font-mono text-[13px] leading-relaxed">
        <code className="block w-max min-w-full">
          {lines.map((line, i) => (
            <span key={i} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-4">
              <span className="select-none text-right text-faint/60">
                {i + 1}
              </span>
              <span className="whitespace-pre">
                {line.length === 0 ? (
                  " "
                ) : (
                  tokenizeLine(line).map((tok, j) => (
                    <span key={j} className={tok.cls}>
                      {tok.text}
                    </span>
                  ))
                )}
                {i === lines.length - 1 && (
                  <span
                    className="cursor-blink ml-1 inline-block"
                    style={{ color: accentColor }}
                  >
                    _
                  </span>
                )}
              </span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
