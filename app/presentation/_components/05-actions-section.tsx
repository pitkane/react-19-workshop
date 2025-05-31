import { CodeBlock } from "@/components/code-block";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  serverActionFormExampleCode,
  serverActionAdvancedExampleCode,
  serverActionFileUploadExampleCode,
} from "./code-examples";

export default function ActionsSection() {
  return (
    <section id="actions" className="space-y-4">
      <h2 className="text-3xl font-bold">05. Server Actions and Form Handling</h2>
      <div className="space-y-4">
        <p>
          React 19 introduces Actions, a new way to handle user input events that can seamlessly involve server-side
          logic. They integrate with React's concurrent rendering features for smooth UI updates. Actions can be passed
          to <code>&lt;form action="myActionPlaceholder"&gt;</code>,{" "}
          <code>&lt;button formAction="myActionPlaceholder"&gt;</code>, or even invoked directly.
        </p>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-foreground">Types of Actions in React 19</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Client Actions:</strong> Functions defined in Client Components that handle form submissions or
                button clicks. They run on the client.
              </li>
              <li>
                <strong>Server Actions:</strong> Functions marked with <code>'use server'</code> that run on the server,
                allowing direct server function calls from client components or forms.
              </li>
            </ul>
          </div>

          <Tabs defaultValue="basic" className="w-full mt-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Form</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Validation</TabsTrigger>
              <TabsTrigger value="upload">File Upload</TabsTrigger>
            </TabsList>
            <TabsContent value="basic">
              <div className="mb-2">
                <h4 className="text-lg font-semibold text-foreground">Simple Contact Form</h4>
              </div>
              <CodeBlock code={serverActionFormExampleCode} language="tsx" filename="app/contact-form/page.tsx" />
            </TabsContent>
            <TabsContent value="advanced">
              <div className="mb-2">
                <h4 className="text-lg font-semibold text-foreground">
                  Advanced Server Actions with Validation & Revalidation
                </h4>
              </div>
              <CodeBlock code={serverActionAdvancedExampleCode} language="tsx" filename="app/actions/user-actions.ts" />
            </TabsContent>
            <TabsContent value="upload">
              <div className="mb-2">
                <h4 className="text-lg font-semibold text-foreground">File Upload with Server Action</h4>
              </div>
              <CodeBlock code={serverActionFileUploadExampleCode} language="tsx" filename="app/upload/page.tsx" />
            </TabsContent>
          </Tabs>

          <div className="rounded-lg border p-4 bg-muted/50">
            <h3 className="text-xl font-semibold text-foreground mb-2">Benefits of React 19's Actions</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>No need for manual API routes for many form submissions</li>
              <li>Automatic form data serialization (FormData object)</li>
              <li>Built-in revalidation of data (e.g., revalidatePath, revalidateTag in Next.js)</li>
              <li>Progressive enhancement: forms work even if JavaScript is disabled/loading</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
