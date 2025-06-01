import Link from "next/link";

export default function Task4Page() {
  return (
    <>
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Task 4: React 19 Improvements</h1>
        <p className="text-lg">
          Explore React 19's enhanced metadata handling and the new simplified Context API with the use() hook.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Objective</h2>
          <p>
            Learn how React 19 simplifies metadata management with dynamic page titles and how the new use() hook makes
            working with Context more intuitive and less verbose than useContext.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Instructions</h2>
          <div className="space-y-4">
            <ol className="list-decimal pl-6 space-y-4">
              <li>
                <p>
                  Work in the file <code>app/tasks/4/work/page.tsx</code> - character data fetching and basic structure
                  are already implemented for you.
                </p>
              </li>
              <li>
                <p>
                  Create a character selection interface that dynamically updates the page title based on the selected
                  character using React 19's enhanced metadata handling.
                </p>
              </li>
              <li>
                <p>
                  Implement a theme/settings Context using React 19's new use() hook instead of the traditional
                  useContext.
                </p>
              </li>
              <li>
                <p>Create nested components that consume the context using the simplified use() API.</p>
              </li>
              <li>
                <p>
                  Test the dynamic page title by selecting different characters and observe how the browser tab title
                  changes.
                </p>
              </li>
            </ol>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Key Concepts</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Dynamic metadata: Page titles that update based on application state</li>
              <li>use() hook: Simpler Context consumption than useContext</li>
              <li>Cleaner component architecture with less boilerplate</li>
              <li>React 19's enhanced metadata APIs for better SEO and UX</li>
              <li>Context providers and consumers with modern syntax</li>
              <li>Conditional rendering based on context state</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Implementation Tips</h2>
            <div className="rounded-lg border p-4 bg-neutral-50">
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>
                  <strong>Dynamic Titles:</strong> Use React 19's metadata APIs to update document title.
                </li>
                <li>
                  <strong>use() Hook:</strong> Replace useContext(MyContext) with use(MyContext).
                </li>
                <li>
                  <strong>Context Structure:</strong> Create theme/settings context with clear state management.
                </li>
                <li>
                  <strong>Component Hierarchy:</strong> Show how use() simplifies nested component consumption.
                </li>
                <li>
                  <strong>State Updates:</strong> Demonstrate context updates triggering metadata changes.
                </li>
                <li>
                  <strong>Error Boundaries:</strong> Handle context not available scenarios gracefully.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Workshop Files</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-semibold mb-2">Work Area</h3>
              <p className="text-sm text-neutral-600 mb-3">Implement React 19 improvements</p>
              <Link
                href="/tasks/4/work"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3"
              >
                Open Work File
              </Link>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-semibold mb-2">Solution</h3>
              <p className="text-sm text-neutral-600 mb-3">View complete implementation</p>
              <Link
                href="/tasks/4/solution"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
              >
                View Solution
              </Link>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-semibold mb-2">React 19 Guide</h3>
              <p className="text-sm text-neutral-600 mb-3">Learn about React 19 features</p>
              <a
                href="https://react.dev/blog/2024/04/25/react-19"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
              >
                React 19 Blog ↗
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-lg border p-6 bg-blue-50">
          <h2 className="text-xl font-semibold mb-3">🆕 React 19 Improvements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Dynamic Metadata:</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Page titles update based on application state</li>
                <li>Better SEO with dynamic meta descriptions</li>
                <li>Simpler API for document head management</li>
                <li>Automatic cleanup of metadata changes</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">use() Hook Benefits:</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Simpler syntax than useContext</li>
                <li>Works with Promises and other async operations</li>
                <li>Better TypeScript integration</li>
                <li>More intuitive API for new developers</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-lg border p-6 bg-green-50">
          <h2 className="text-xl font-semibold mb-3">📝 What You'll Learn</h2>
          <ul className="list-disc pl-5 text-sm text-green-700 space-y-1">
            <li>How to dynamically update page titles based on selected content</li>
            <li>Implementing Context providers with React 19's simplified patterns</li>
            <li>Using the new use() hook instead of useContext for cleaner code</li>
            <li>Building responsive theme systems with context state</li>
            <li>Managing application-wide settings with modern React patterns</li>
            <li>Creating better user experiences with dynamic metadata</li>
          </ul>
        </div>

        <div className="flex justify-between pt-6">
          <Link
            href="/tasks/3"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Previous Task: Server Actions
          </Link>
          <Link
            href="/tasks/5"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Next Task: React Compiler
          </Link>
        </div>
      </div>
    </>
  );
}
