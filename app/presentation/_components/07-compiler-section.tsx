import { CodeBlock } from "@/components/code-block";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  compilerOldWayMemoizationExampleCode,
  compilerNewWaySimplifiedExampleCode,
  compilerPerformanceExampleCode,
} from "./code-examples";

export default function CompilerSection() {
  return (
    <section id="compiler" className="space-y-4">
      <h2 className="text-3xl font-bold">07. The React Compiler</h2>
      <div className="space-y-4">
        <p>
          The React Compiler (formerly "React Forget") is a build-time optimization tool that automatically memoizes
          your React code, eliminating the need for manual performance optimizations. It's currently powering Instagram
          in production and represents a fundamental shift in how React handles re-renders.
        </p>

        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-foreground">How the React Compiler Works</h3>
            <p className="mb-4">
              The compiler operates as a Babel plugin that analyzes your React components at build time, understanding
              component structure, dependencies, and data flow to automatically insert memoization.
            </p>

            <div className="rounded-lg border p-4 bg-muted/50 mb-4">
              <h4 className="text-lg font-semibold text-foreground mb-2">Compiler Analysis Process:</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>
                  <strong>Static Analysis:</strong> Examines component code to understand data dependencies and prop
                  flow
                </li>
                <li>
                  <strong>Dependency Tracking:</strong> Maps relationships between state, props, and derived values
                </li>
                <li>
                  <strong>Memoization Insertion:</strong> Automatically wraps functions, values, and components with
                  equivalent memoization
                </li>
                <li>
                  <strong>Safe Bailout:</strong> Skips optimization when it detects Rules of React violations
                </li>
                <li>
                  <strong>Fine-grained Reactivity:</strong> Creates targeted updates that only re-render when semantic
                  values change
                </li>
              </ul>
            </div>

            <p className="mb-4">
              The compiler transforms your code so that everything behaves as if it's wrapped in <code>useMemo</code>,
              <code>useCallback</code>, and <code>React.memo</code> - but without you having to write that code
              manually.
            </p>

            <Tabs defaultValue="manual" className="w-full">
              <TabsList>
                <TabsTrigger value="manual">Manual Memoization</TabsTrigger>
                <TabsTrigger value="compiler">React Compiler</TabsTrigger>
                <TabsTrigger value="performance">Performance Example</TabsTrigger>
              </TabsList>
              <TabsContent value="manual">
                <CodeBlock
                  code={compilerOldWayMemoizationExampleCode}
                  language="tsx"
                  filename="components/OldWayComponent.tsx"
                />
              </TabsContent>
              <TabsContent value="compiler">
                <CodeBlock
                  code={compilerNewWaySimplifiedExampleCode}
                  language="tsx"
                  filename="components/NewWayComponent.tsx"
                />
              </TabsContent>
              <TabsContent value="performance">
                <CodeBlock
                  code={compilerPerformanceExampleCode}
                  language="tsx"
                  filename="components/ExpensiveCalculation.tsx"
                />
              </TabsContent>
            </Tabs>
          </div>

          <div className="rounded-lg border p-4 bg-blue-50">
            <h3 className="text-xl font-semibold text-foreground mb-2">Technical Deep Dive: What Gets Memoized</h3>
            <div className="space-y-3 text-sm">
              <div>
                <h4 className="font-semibold">1. Component Re-renders</h4>
                <p>
                  Components automatically skip re-rendering when props haven't semantically changed, similar to
                  wrapping every component in <code>React.memo</code>.
                </p>
              </div>
              <div>
                <h4 className="font-semibold">2. Function References</h4>
                <p>
                  Event handlers and callbacks are automatically memoized based on their dependencies, equivalent to
                  manual <code>useCallback</code> usage.
                </p>
              </div>
              <div>
                <h4 className="font-semibold">3. Computed Values</h4>
                <p>
                  Expensive calculations and derived state are cached, similar to <code>useMemo</code> with proper
                  dependency arrays.
                </p>
              </div>
              <div>
                <h4 className="font-semibold">4. JSX Elements</h4>
                <p>
                  Even JSX elements are memoized when their props haven't changed, preventing unnecessary virtual DOM
                  creation.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-4 bg-muted/50">
            <h3 className="text-xl font-semibold text-foreground mb-2">Key Paradigm Shifts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-1">Before Compiler:</h4>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Parent re-render → All children re-render</li>
                  <li>Manual memoization required for performance</li>
                  <li>Object identity changes trigger re-renders</li>
                  <li>Complex dependency tracking needed</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-1">With Compiler:</h4>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Components re-render only on semantic changes</li>
                  <li>Automatic optimization without code changes</li>
                  <li>Value-based change detection</li>
                  <li>Zero-cost abstractions at runtime</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-4 bg-yellow-50">
            <h3 className="text-xl font-semibold text-foreground mb-2">Current Status & Adoption</h3>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>
                <strong>Production Ready:</strong> Already powering Instagram and other Meta applications
              </li>
              <li>
                <strong>Release Status:</strong> Currently in Release Candidate (RC) phase, stable release expected soon
              </li>
              <li>
                <strong>Compatibility:</strong> Works with React 17+, optimized for React 19
              </li>
              <li>
                <strong>Integration:</strong> Available as Babel plugin, supports Next.js, Vite, and other build tools
              </li>
              <li>
                <strong>Safety:</strong> Automatically detects and skips components that violate React rules
              </li>
              <li>
                <strong>Migration:</strong> Zero code changes required - just install and enable the compiler
              </li>
            </ul>
          </div>

          <div className="rounded-lg border p-4 bg-muted/50">
            <h3 className="text-xl font-semibold text-foreground mb-2">Developer Impact of React 19 Compiler</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cleaner code with fewer optimization hooks</li>
              <li>Reduced chance of optimization mistakes (over/under-memoization)</li>
              <li>Build-time optimizations with zero runtime cost</li>
              <li>ESLint integration for optimization warnings and suggestions</li>
              <li>Eliminates composition patterns used purely for performance</li>
              <li>Makes React's "re-render when semantic value changes" mental model reality</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
