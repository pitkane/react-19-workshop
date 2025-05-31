import { CodeBlock } from "@/components/code-block";
import { useClientCounterExampleCode, useServerActionExampleCode } from "./code-examples";

export default function DirectivesSection() {
  return (
    <section id="directives" className="space-y-4">
      <h2 className="text-3xl font-bold">04. "use client" and "use server" Directives</h2>
      <div className="space-y-4">
        <p>
          With React 19's Server Components, React needed a way to distinguish between client and server code. This led
          to the introduction of two key directives:
        </p>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-foreground">'use client'</h3>
            <p>Marks a component as a Client Component in React 19. Use this when you need:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>State management (useState, useReducer)</li>
              <li>Effects (useEffect)</li>
              <li>Browser APIs</li>
              <li>Event listeners</li>
            </ul>
            <div className="my-4">
              <CodeBlock code={useClientCounterExampleCode} language="tsx" filename="components/Counter.tsx" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground">'use server'</h3>
            <p>Marks a function (or a whole module) as containing Server Actions in React 19. Use this for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Server-side data mutations</li>
              <li>Form handling that requires server logic</li>
              <li>Database operations directly callable from the client</li>
            </ul>
            <div className="my-4">
              <CodeBlock code={useServerActionExampleCode} language="typescript" filename="app/actions.ts" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
