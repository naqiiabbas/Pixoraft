export default function Home() {
  return (
    <main className="flex-1">
      <section
        aria-labelledby="scaffold-heading"
        className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center gap-6 px-6 py-24"
      >
        <p className="font-mono text-sm text-accent">
          [ phase 1 / foundation ready ]
        </p>
        <h1
          id="scaffold-heading"
          className="font-display text-4xl font-semibold tracking-tight sm:text-5xl"
        >
          Websites and software that perform, not just impress.
        </h1>
        <p className="max-w-xl text-lg text-muted">
          Scaffold complete. Design tokens, fonts, and the motion system are in
          place. Sections are built next, top to bottom.
        </p>
        <p className="font-mono text-sm text-faint">
          [ status: accepting new projects for Q3 2026 ]
        </p>
      </section>
    </main>
  );
}
