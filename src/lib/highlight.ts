/**
 * Lightweight code tokenizer for the decorative CodeWindow graphic. Not a real
 * language parser: it splits a line into comment / string / number / keyword /
 * function / plain tokens, good enough for the short curated snippets in the
 * services data. Colors map to the --code-* tokens in globals.css.
 */

export type TokenClass =
  | "code-com"
  | "code-str"
  | "code-num"
  | "code-key"
  | "code-fn"
  | "code-plain";

export interface Token {
  cls: TokenClass;
  text: string;
}

const KEYWORDS = new Set([
  "const",
  "let",
  "var",
  "function",
  "return",
  "await",
  "async",
  "export",
  "import",
  "from",
  "if",
  "else",
  "for",
  "while",
  "new",
  "class",
  "type",
  "interface",
  "public",
  "private",
  "void",
  "def",
  "end",
  "on",
  "jobs",
  "steps",
  "run",
  "true",
  "false",
  "null",
  "undefined",
]);

const PATTERN = new RegExp(
  [
    "(\\/\\/.*$|#.*$)", // 1 line comment
    "(\"(?:[^\"\\\\]|\\\\.)*\"|'(?:[^'\\\\]|\\\\.)*'|`(?:[^`\\\\]|\\\\.)*`)", // 2 string
    "(\\b\\d+(?:\\.\\d+)?\\b)", // 3 number
    "([A-Za-z_$@][A-Za-z0-9_$]*)", // 4 word
    "(\\s+)", // 5 whitespace
    "([^\\s])", // 6 any other single char
  ].join("|"),
  "g",
);

export function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  PATTERN.lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = PATTERN.exec(line)) !== null) {
    if (match[1]) {
      tokens.push({ cls: "code-com", text: match[1] });
    } else if (match[2]) {
      tokens.push({ cls: "code-str", text: match[2] });
    } else if (match[3]) {
      tokens.push({ cls: "code-num", text: match[3] });
    } else if (match[4]) {
      const word = match[4];
      const nextChar = line[PATTERN.lastIndex];
      if (KEYWORDS.has(word)) {
        tokens.push({ cls: "code-key", text: word });
      } else if (nextChar === "(") {
        tokens.push({ cls: "code-fn", text: word });
      } else {
        tokens.push({ cls: "code-plain", text: word });
      }
    } else {
      tokens.push({ cls: "code-plain", text: match[5] ?? match[6] ?? "" });
    }
  }

  return tokens;
}
