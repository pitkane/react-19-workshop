export default function IntroductionSection() {
  return (
    <section id="introduction" className="space-y-4">
      <h2 className="text-3xl font-bold">01. What's New in React 19</h2>
      <div className="space-y-4">
        <p className="text-lg">
          Welcome to our React 19 workshop! This session is designed for experienced React & TypeScript developers.
          While we use Next.js 15 and the App Router for this workshop, the React 19 features we'll explore are valid
          across all React frameworks. Next.js has been at the forefront of implementing these features first, making it
          an ideal platform for learning React 19's capabilities before applying them to your preferred framework.
        </p>
        <div className="rounded-lg border p-4 bg-muted/50">
          <h3 className="text-xl font-semibold text-foreground mb-2">Agenda</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>React 18 Recap and Context</li>
            <li>React 19's Server Components (RSC)</li>
            <li>React 19's "use client" and "use server" Directives</li>
            <li>React 19's Server Actions and Form Handling</li>
            <li>React 19's New Hooks for Actions and Transitions</li>
            <li>The React 19 Compiler</li>
            <li>Other Notable Improvements in React 19 (Asset Loading, Metadata, Refs, Context, Promises)</li>
            <li>Hands-on Workshop Tasks</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
