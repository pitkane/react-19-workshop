import Link from "next/link";

export default function Task5Page() {
  return (
    <>
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Task 5: React Compiler Optimization</h1>
        <p className="text-lg">
          Explore how React 19's Compiler automatically optimizes components without manual memoization using
          React.memo, useMemo, or useCallback.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Objective</h2>
          <p>
            Create components that demonstrate expensive computations and see how the React Compiler automatically
            optimizes them compared to manual optimization techniques. Learn when and how the compiler helps improve
            performance.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Instructions</h2>
          <div className="space-y-4">
            <ol className="list-decimal pl-6 space-y-4">
              <li>
                <p>
                  Work in the file <code>app/tasks/5/work/page.tsx</code> - character data fetching and basic structure
                  are already implemented for you.
                </p>
              </li>
              <li>
                <p>
                  Create an expensive computation component that processes character data (e.g., calculating character
                  stats, filtering, or sorting operations).
                </p>
              </li>
              <li>
                <p>
                  Add interactive elements (buttons, filters) that trigger re-renders and observe how the compiler
                  automatically optimizes expensive calculations.
                </p>
              </li>
              <li>
                <p>
                  Compare the performance behavior with and without the React Compiler using browser dev tools (React
                  Profiler, console logs).
                </p>
              </li>
              <li>
                <p>
                  Experiment with different scenarios: prop changes, state updates, and nested component re-renders to
                  see compiler optimization in action.
                </p>
              </li>
            </ol>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Key Concepts</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>React Compiler automatically memoizes components, functions, and expensive calculations.</li>
              <li>No need for manual React.memo, useMemo, or useCallback in most cases.</li>
              <li>Build-time optimization that analyzes and optimizes your components.</li>
              <li>Compiler detects when props or dependencies change and only re-runs when necessary.</li>
              <li>Works best with pure functions and immutable data patterns.</li>
              <li>Reduces bundle size by eliminating manual optimization boilerplate.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Implementation Tips</h2>
            <div className="rounded-lg border p-4 bg-neutral-50">
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>
                  <strong>Expensive Operations:</strong> Create computationally heavy functions (loops, data
                  processing).
                </li>
                <li>
                  <strong>Console Logging:</strong> Add logs to track when components and functions execute.
                </li>
                <li>
                  <strong>State Management:</strong> Use useState to trigger re-renders and test optimization.
                </li>
                <li>
                  <strong>Prop Drilling:</strong> Pass data through multiple components to see memoization effects.
                </li>
                <li>
                  <strong>Performance Testing:</strong> Use React DevTools Profiler to measure render performance.
                </li>
                <li>
                  <strong>Compiler Limits:</strong> Test edge cases where manual optimization might still be needed.
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
              <p className="text-sm text-neutral-600 mb-3">Experiment with React Compiler optimization</p>
              <Link
                href="/tasks/5/work"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3"
              >
                Open Work File
              </Link>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-semibold mb-2">Solution</h3>
              <p className="text-sm text-neutral-600 mb-3">View optimized implementation</p>
              <Link
                href="/tasks/5/solution"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
              >
                View Solution
              </Link>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-semibold mb-2">React Compiler</h3>
              <p className="text-sm text-neutral-600 mb-3">Learn about React Compiler</p>
              <a
                href="https://react.dev/learn/react-compiler"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
              >
                React Docs ↗
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-lg border p-6 bg-amber-50">
          <h2 className="text-xl font-semibold mb-3">⚡ React Compiler Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Automatic Optimization:</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Memoizes expensive calculations automatically</li>
                <li>Optimizes component re-renders</li>
                <li>Reduces unnecessary function recreations</li>
                <li>Analyzes dependencies at build time</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Developer Experience:</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Less boilerplate code to write and maintain</li>
                <li>No need to manually wrap with React.memo</li>
                <li>Eliminates useMemo and useCallback in most cases</li>
                <li>Better performance by default</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <Link
            href="/tasks/4"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Previous Task: Optimistic UI
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
