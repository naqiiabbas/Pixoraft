/**
 * Styled gradient cover used until real project screenshots exist. Not a gray
 * box: a themed blue gradient with the project initials. Gradient variant is
 * chosen by index so a grid reads as varied.
 */
const GRADIENTS = ["work-grad-1", "work-grad-2", "work-grad-3"];

export function GradientPlaceholder({
  initials,
  index = 0,
}: {
  initials: string;
  index?: number;
}) {
  const grad = GRADIENTS[index % GRADIENTS.length];
  return (
    <div
      className={`relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl border border-white/10 ${grad}`}
      aria-hidden="true"
    >
      <span className="font-display text-5xl font-bold tracking-tight text-white/85">
        {initials}
      </span>
      <span className="absolute bottom-3 right-3 font-mono text-[10px] text-white/40">
        [ preview ]
      </span>
    </div>
  );
}
