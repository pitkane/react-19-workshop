import { CodeBlock } from "@/components/code-block";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { rscExampleCode, rscDataFetchingExampleCode, rscNestedComponentsExampleCode } from "./code-examples";

export default function RSCSection() {
  return (
    <section id="rsc" className="space-y-4">
      <h2 className="text-3xl font-bold">03. React Server Components (RSC)</h2>
      <div className="space-y-4">
        <p>
          React Server Components (RSC) are now stable in React 19, marking a fundamental change in how React can render
          content. They allow React to render components on the server and send prepared HTML/UI to the client.
        </p>
        <h3 className="text-xl font-semibold text-foreground">Key Benefits:</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Faster initial page loads by reducing client-side JavaScript</li>
          <li>Smaller client bundles by keeping server-only code on the server</li>
          <li>Better SEO with server-rendered content</li>
          <li>Improved developer productivity with direct server-side data access</li>
        </ul>

        <Tabs defaultValue="basic" className="w-full mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic RSC</TabsTrigger>
            <TabsTrigger value="data">Data Fetching</TabsTrigger>
            <TabsTrigger value="composition">Component Composition</TabsTrigger>
          </TabsList>
          <TabsContent value="basic">
            <CodeBlock code={rscExampleCode} language="tsx" filename="app/rsc-example/page.tsx" />
          </TabsContent>
          <TabsContent value="data">
            <CodeBlock code={rscDataFetchingExampleCode} language="tsx" filename="app/products/page.tsx" />
          </TabsContent>
          <TabsContent value="composition">
            <CodeBlock code={rscNestedComponentsExampleCode} language="tsx" filename="app/dashboard/page.tsx" />
          </TabsContent>
        </Tabs>

        <div className="rounded-lg border p-4 bg-muted/50">
          <h3 className="text-xl font-semibold text-foreground mb-2">Evolution Context</h3>
          <p>
            We've evolved from Client-Side Rendering (CSR) to Server-Side Rendering (SSR) to Static Site Generation
            (SSG)/Incremental Static Regeneration (ISR), and now with React 19, RSC combines the best of all approaches.
            With RSC in React 19, React can fetch data before rendering the UI, eliminating the "empty shell then second
            render for data" pattern.
          </p>
        </div>
        <div className="rounded-lg border p-4 bg-muted/50">
          <h3 className="text-xl font-semibold text-foreground mb-2">Next.js App Router Integration</h3>
          <p>
            In Next.js 15 (which we're using), all components in the app/ directory are Server Components by default.
            Developers add interactivity via Client Components when needed, with no manual setup required.
          </p>
        </div>
      </div>
    </section>
  );
}
