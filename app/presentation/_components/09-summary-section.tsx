import Link from "next/link";

export default function SummarySection() {
  return (
    <section id="summary" className="space-y-4">
      <h2 className="text-3xl font-bold">09. Summary and Next Steps</h2>
      <div className="space-y-4">
        <p>
          React 19's major features work together to improve developer experience and app performance. Server Components
          and Actions simplify data fetching and mutations, new hooks enhance form handling and optimistic updates,
          while the Compiler provides automatic optimizations. Enhanced asset loading, metadata handling, and simpler
          APIs for refs and context further refine the development workflow.
        </p>
        <div className="rounded-lg border p-4 bg-muted/50">
          <h3 className="text-xl font-semibold text-foreground mb-2">Ready to Code with React 19?</h3>
          <p>
            Let's put these concepts into practice! Head to the{" "}
            <Link href="/tasks" className="text-primary hover:underline">
              Workshop Tasks
            </Link>{" "}
            to start building with React 19's new features.
          </p>
        </div>
      </div>
    </section>
  );
}
