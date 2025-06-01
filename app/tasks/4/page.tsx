import Link from "next/link";

export default function Task4Page() {
  return (
    <>
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Task 4: React 19 Improvements</h1>
        <p className="text-lg">
          Explore React 19's new use() hook for simplified Context consumption and cleaner component architecture.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Objective</h2>
          <p>
            Learn how React 19's new use() hook makes working with Context more intuitive and less verbose than
            useContext, providing better TypeScript integration and cleaner component code.
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
                  Create a character selection interface with a theme/settings Context using React 19's new use() hook
                  instead of the traditional useContext.
                </p>
              </li>
              <li>
                <p>
                  Implement a comprehensive theme system with light, dark, and cosmic modes that affects the visual
                  styling of all components.
                </p>
              </li>
              <li>
                <p>Create nested components that consume the context using the simplified use() API.</p>
              </li>
              <li>
                <p>
                  Test the theme switching and display mode changes to see how the use() hook simplifies Context
                  consumption across multiple components.
                </p>
              </li>
            </ol>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Key Concepts</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>use() hook: Simpler Context consumption than useContext</li>
              <li>Enhanced TypeScript integration and type inference</li>
              <li>Cleaner component architecture with less boilerplate</li>
              <li>React 19's improved Context patterns and performance</li>
              <li>Context providers and consumers with modern syntax</li>
              <li>Conditional rendering based on context state</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Implementation Tips</h2>
            <div className="rounded-lg border p-4 bg-neutral-50">
              <ul className="list-disc pl-6 space-y-2 text-sm">
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
                  <strong>State Updates:</strong> Demonstrate context updates affecting all consuming components.
                </li>
                <li>
                  <strong>Theme System:</strong> Implement multiple visual themes with consistent styling.
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
              <h3 className="font-semibold mb-2">use() Hook Benefits:</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Simpler syntax than useContext</li>
                <li>Works with Promises and other async operations</li>
                <li>Better TypeScript integration</li>
                <li>More intuitive API for new developers</li>
                <li>Enhanced error handling and debugging</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Context Improvements:</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Cleaner component architecture</li>
                <li>Reduced boilerplate code</li>
                <li>Better performance optimizations</li>
                <li>Improved developer experience</li>
                <li>Enhanced debugging capabilities</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-lg border p-6 bg-green-50">
          <h2 className="text-xl font-semibold mb-3">📝 What You'll Learn</h2>
          <ul className="list-disc pl-5 text-sm text-green-700 space-y-1">
            <li>How to use React 19's new use() hook instead of useContext</li>
            <li>Implementing Context providers with React 19's simplified patterns</li>
            <li>Building responsive theme systems with context state</li>
            <li>Creating cleaner component hierarchies with modern React patterns</li>
            <li>Managing application-wide settings with the new Context API</li>
            <li>Understanding the benefits of the use() hook over traditional patterns</li>
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
            href="/tasks"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Back to Tasks Overview
          </Link>
        </div>
      </div>
    </>
  );
}
