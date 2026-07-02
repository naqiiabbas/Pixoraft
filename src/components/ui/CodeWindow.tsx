/**
 * Decorative glass "code editor" graphic. Presentational only: the snippet is
 * a stylized illustration, not marketing copy, so it lives here rather than in
 * a data file. Syntax colors come from the --code-* tokens in globals.css.
 */

const LINES = [
  { n: 1, content: <span className="code-com">{"// pixoraft/ship.ts"}</span> },
  { n: 2, content: null },
  {
    n: 3,
    content: (
      <>
        <span className="code-key">export async function</span>{" "}
        <span className="code-fn">ship</span>
        <span className="code-plain">(project</span>
        <span className="code-plain">: </span>
        <span className="code-fn">Project</span>
        <span className="code-plain">) {"{"}</span>
      </>
    ),
  },
  {
    n: 4,
    content: (
      <>
        {"  "}
        <span className="code-key">const</span>{" "}
        <span className="code-plain">build = </span>
        <span className="code-key">await</span>{" "}
        <span className="code-fn">bundle</span>
        <span className="code-plain">(project)</span>
      </>
    ),
  },
  {
    n: 5,
    content: (
      <>
        {"  "}
        <span className="code-key">await</span>{" "}
        <span className="code-fn">deploy</span>
        <span className="code-plain">(build, {"{"}</span>
      </>
    ),
  },
  {
    n: 6,
    content: (
      <>
        {"    "}
        <span className="code-plain">regions: [</span>
        <span className="code-str">&quot;pk&quot;</span>
        <span className="code-plain">, </span>
        <span className="code-str">&quot;uk&quot;</span>
        <span className="code-plain">, </span>
        <span className="code-str">&quot;us&quot;</span>
        <span className="code-plain">],</span>
      </>
    ),
  },
  {
    n: 7,
    content: (
      <>
        {"    "}
        <span className="code-plain">scale: </span>
        <span className="code-str">&quot;auto&quot;</span>
        <span className="code-plain">,</span>
      </>
    ),
  },
  {
    n: 8,
    content: <span className="code-plain">{"  })"}</span>,
  },
  {
    n: 9,
    content: (
      <>
        {"  "}
        <span className="code-key">return</span>{" "}
        <span className="code-plain">{"{ status: "}</span>
        <span className="code-str">&quot;live&quot;</span>
        <span className="code-plain">, uptime: </span>
        <span className="code-str">&quot;99.9%&quot;</span>
        <span className="code-plain">{" }"}</span>
      </>
    ),
  },
  { n: 10, content: <span className="code-plain">{"}"}</span> },
];

export function CodeWindow() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-2xl shadow-black/40 backdrop-blur-xl">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400/70" />
        <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
        <span className="h-3 w-3 rounded-full bg-green-400/70" />
        <span className="ml-3 font-mono text-xs text-faint">ship.ts</span>
      </div>

      {/* Code body */}
      <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed">
        <code className="block">
          {LINES.map((line) => (
            <span key={line.n} className="grid grid-cols-[2rem_1fr] gap-4">
              <span className="select-none text-right text-faint/60">
                {line.n}
              </span>
              <span className="whitespace-pre">
                {line.content}
                {line.n === 10 ? (
                  <span className="cursor-blink ml-1 inline-block text-accent">
                    _
                  </span>
                ) : null}
              </span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
