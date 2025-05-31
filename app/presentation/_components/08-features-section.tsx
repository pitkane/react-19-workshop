import { CodeBlock } from "@/components/code-block";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  assetLoadingExampleCode,
  assetLoadingAdvancedExampleCode,
  documentMetadataExampleCode,
  metadataAdvancedExampleCode,
  refAsPropCustomInputExampleCode,
  useContextThemeExampleCode,
  usePromiseUserProfileExampleCode,
} from "./code-examples";

export default function FeaturesSection() {
  return (
    <section id="features" className="space-y-4">
      <h2 className="text-3xl font-bold">08. Other Notable Improvements</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-foreground">Resource and Asset Loading</h3>
          <p>
            React 19 introduces new APIs and conventions for preloading and prioritizing assets (scripts, stylesheets,
            fonts, images). You can now use <code>&lt;link&gt;</code> and <code>&lt;script&gt;</code> tags directly in
            your components, and React will manage hoisting them to the document <code>&lt;head&gt;</code> and
            optimizing their loading.
          </p>

          <Tabs defaultValue="basic" className="w-full mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic">Basic Asset Loading</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Blog Example</TabsTrigger>
            </TabsList>
            <TabsContent value="basic">
              <CodeBlock code={assetLoadingExampleCode} language="tsx" filename="components/MyImageComponent.tsx" />
            </TabsContent>
            <TabsContent value="advanced">
              <CodeBlock code={assetLoadingAdvancedExampleCode} language="tsx" filename="app/blog/[slug]/page.tsx" />
            </TabsContent>
          </Tabs>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground">Built-in Metadata Handling</h3>
          <p>
            React 19 provides native support for managing document head metadata (<code>&lt;title&gt;</code>,{" "}
            <code>&lt;meta&gt;</code>, <code>&lt;link&gt;</code>) directly within your components. These tags are
            automatically hoisted to the <code>&lt;head&gt;</code>. In Next.js, the <code>generateMetadata</code> export
            remains the primary way for server-side metadata generation in the App Router, but native React 19
            capabilities can complement this.
          </p>

          <Tabs defaultValue="basic" className="w-full mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic">Basic Metadata</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Product Page</TabsTrigger>
            </TabsList>
            <TabsContent value="basic">
              <CodeBlock
                code={documentMetadataExampleCode}
                language="tsx"
                filename="app/my-dynamic-page/page.tsx & components/PageSpecificHead.tsx"
              />
            </TabsContent>
            <TabsContent value="advanced">
              <CodeBlock code={metadataAdvancedExampleCode} language="tsx" filename="app/products/[id]/page.tsx" />
            </TabsContent>
          </Tabs>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground">
            Simpler API for Refs: <code>ref</code> as a Prop
          </h3>
          <p>
            Forwarding refs is simpler in React 19. The <code>ref</code> prop can now be passed to function components
            directly without needing <code>React.forwardRef</code>. Class components continue to work as before.
          </p>
          <div className="my-4">
            <CodeBlock code={refAsPropCustomInputExampleCode} language="tsx" filename="components/SimpleInput.tsx" />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground">
            Simpler API for Context: <code>use(Context)</code>
          </h3>
          <p>
            React 19 introduces <code>use(Context)</code> as a more versatile way to read context. It can be called
            conditionally and inside loops, unlike the traditional <code>useContext</code> hook. It works in both Server
            and Client Components.
          </p>
          <div className="my-4">
            <CodeBlock code={useContextThemeExampleCode} language="tsx" filename="components/ThemeExample.tsx" />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground">
            Reading Promises with <code>use(Promise)</code>
          </h3>
          <p>
            The <code>use()</code> hook can also be used to read the value of a promise. This integrates with Suspense,
            allowing components to suspend rendering while data is being fetched. This is particularly useful in Server
            Components for data fetching or in Client Components within a Suspense boundary.
          </p>
          <div className="my-4">
            <CodeBlock code={usePromiseUserProfileExampleCode} language="tsx" filename="components/SimplePromise.tsx" />
          </div>
        </div>
      </div>
    </section>
  );
}
