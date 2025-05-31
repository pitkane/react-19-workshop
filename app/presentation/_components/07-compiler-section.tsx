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
          One of the headline features of React 19 is the new React Compiler (experimental, often referred to as "React
          Forget"). It's an optimizing compiler that runs at build time to automatically make React code more efficient.
        </p>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-foreground">Automatic Memoization in React 19</h3>
            <p>
              The React 19 Compiler automatically handles optimizations that previously required manual use of
              <code>useMemo</code>, <code>useCallback</code>, or <code>React.memo</code>. It analyzes components to
              understand dependencies and prevents unnecessary re-renders.
            </p>
            <Tabs defaultValue="manual" className="w-full mt-4">
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
          <div className="rounded-lg border p-4 bg-muted/50">
            <h3 className="text-xl font-semibold text-foreground mb-2">Developer Impact of React 19 Compiler</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cleaner code with fewer optimization hooks</li>
              <li>Reduced chance of optimization mistakes (over/under-memoization)</li>
              <li>Build-time optimizations with zero or minimal runtime cost</li>
              <li>ESLint integration for optimization warnings and suggestions</li>
              <li>Still experimental, but opt-in available in some frameworks (like Next.js).</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
