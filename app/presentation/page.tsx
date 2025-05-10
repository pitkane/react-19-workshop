import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";

export default function PresentationPage() {
  return (
    <SidebarProvider>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">React 19 Workshop</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Presentation</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <SidebarTrigger className="-mr-1 ml-auto rotate-180" />
        </header>
        <div className="flex flex-1 flex-col gap-8 p-8">
          <section id="introduction" className="space-y-4">
            <h1 className="text-4xl font-bold">What's New in React 19</h1>
            <div className="space-y-4 text-muted-foreground">
              <p className="text-lg">
                Welcome to our React 19 workshop! This session is designed for experienced React & TypeScript developers
                working with Next.js 15 and the App Router. We'll explore the latest features and improvements in React
                19, followed by hands-on coding exercises.
              </p>
              <div className="rounded-lg border p-4 bg-muted/50">
                <h3 className="text-xl font-semibold text-foreground mb-2">Agenda</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>React 19 Recap and Context</li>
                  <li>React 19's Server Components (RSC)</li>
                  <li>React 19's Server Actions and Form Handling</li>
                  <li>React 19's New Hooks for Actions and Transitions</li>
                  <li>The React 19 Compiler</li>
                  <li>Other Notable Improvements in React 19</li>
                  <li>Hands-on Workshop Tasks</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="react18" className="space-y-4">
            <h2 className="text-3xl font-bold">React 19 Recap</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>React 19 introduced several groundbreaking features that set the stage for React 19:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Concurrent rendering capabilities</li>
                <li>Improved Suspense features</li>
                <li>Automatic batching of state updates</li>
                <li>New hooks like useTransition and useDeferredValue</li>
              </ul>
              <p>
                React 19 also introduced experimental Server Components, but they weren't widely adopted. This sets the
                stage for why React 19's updates are so important - they make these features stable and
                production-ready.
              </p>
            </div>
          </section>

          <section id="rsc" className="space-y-4">
            <h2 className="text-3xl font-bold">React 19's Server Components</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                React Server Components (RSC) are now stable in React 19, marking a fundamental change in how React can
                render content. They allow React to render components on the server and send prepared HTML/UI to the
                client.
              </p>
              <h3 className="text-xl font-semibold text-foreground">Key Benefits:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Faster initial page loads by reducing client-side JavaScript</li>
                <li>Smaller client bundles by keeping server-only code on the server</li>
                <li>Better SEO with server-rendered content</li>
                <li>Improved developer productivity with direct server-side data access</li>
              </ul>
              <div className="rounded-lg border p-4 bg-muted/50">
                <h3 className="text-xl font-semibold text-foreground mb-2">Evolution Context</h3>
                <p>
                  We've evolved from Client-Side Rendering (CSR) to Server-Side Rendering (SSR) to Static Site
                  Generation (SSG)/Incremental Static Regeneration (ISR), and now with React 19, RSC combines the best
                  of all approaches. With RSC in React 19, React can fetch data before rendering the UI, eliminating the
                  "empty shell then second render for data" pattern.
                </p>
              </div>
              <div className="rounded-lg border p-4 bg-muted/50">
                <h3 className="text-xl font-semibold text-foreground mb-2">Next.js App Router Integration</h3>
                <p>
                  In Next.js 15 (which we're using), all components in the app/ directory are Server Components by
                  default. Developers add interactivity via Client Components when needed, with no manual setup
                  required.
                </p>
              </div>
            </div>
          </section>

          <section id="directives" className="space-y-4">
            <h2 className="text-3xl font-bold">React 19's "use client" and "use server" Directives</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                With React 19's Server Components, React needed a way to distinguish between client and server code.
                This led to the introduction of two key directives:
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
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">'use server'</h3>
                  <p>Marks a function as a Server Action in React 19. Use this for:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Server-side data mutations</li>
                    <li>Form handling</li>
                    <li>Database operations</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section id="actions" className="space-y-4">
            <h2 className="text-3xl font-bold">React 19's Server Actions and Form Handling</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                React 19 introduces Actions, a new way to handle user input events that can seamlessly involve
                server-side logic. They integrate with React's concurrent rendering features for smooth UI updates.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Types of Actions in React 19</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Client Actions:</strong> Run on the client, replacing traditional event handlers
                    </li>
                    <li>
                      <strong>Server Actions:</strong> Run on the server, allowing direct server function calls from
                      client components
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg border p-4 bg-muted/50">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Benefits of React 19's Actions</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>No need for manual API routes</li>
                    <li>Automatic form data serialization</li>
                    <li>Built-in revalidation</li>
                    <li>Progressive enhancement</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section id="hooks" className="space-y-4">
            <h2 className="text-3xl font-bold">React 19's New Hooks for Actions and Transitions</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>React 19 introduces three new hooks to complement Actions and improve UX for interactions:</p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">useActionState</h3>
                  <p>
                    New in React 19, this hook simplifies managing form state and submission outcomes, handling form
                    input data, validations, and errors automatically.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">useFormStatus</h3>
                  <p>
                    New in React 19, this hook provides the status of the last form submission within a component,
                    useful for showing loading states and disabling UI during submission.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">useOptimistic</h3>
                  <p>
                    New in React 19, this hook enables optimistic UI updates, allowing you to update the UI immediately
                    before a Server Action completes, then reconciling with the actual result when it returns.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="compiler" className="space-y-4">
            <h2 className="text-3xl font-bold">The React 19 Compiler</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                One of the headline features of React 19 is the new React Compiler. It's an optimizing compiler that
                runs at build time to automatically make React code more efficient.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Automatic Memoization in React 19</h3>
                  <p>
                    The React 19 Compiler automatically handles optimizations that previously required manual use of
                    useMemo, useCallback, or React.memo. It analyzes components to understand dependencies and prevents
                    unnecessary re-renders.
                  </p>
                </div>
                <div className="rounded-lg border p-4 bg-muted/50">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Developer Impact of React 19 Compiler</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Cleaner code with fewer optimization hooks</li>
                    <li>Reduced chance of optimization mistakes</li>
                    <li>Build-time optimizations with zero runtime cost</li>
                    <li>ESLint integration for optimization warnings</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section id="features" className="space-y-4">
            <h2 className="text-3xl font-bold">Other Notable Improvements in React 19</h2>
            <div className="space-y-4 text-muted-foreground">
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Resource and Asset Loading:</strong> New APIs in React 19 for preloading and prioritizing
                  assets
                </li>
                <li>
                  <strong>Web Components Support:</strong> Improved integration with custom elements in React 19
                </li>
                <li>
                  <strong>Built-in Metadata Handling:</strong> Native support for document head metadata in React 19
                </li>
                <li>
                  <strong>Simpler API for Refs and Context:</strong> More ergonomic syntax for common patterns in React
                  19
                </li>
              </ul>
            </div>
          </section>

          <section id="summary" className="space-y-4">
            <h2 className="text-3xl font-bold">Summary and Next Steps</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                React 19's major features work together to improve developer experience and app performance. Server
                Components and Actions simplify data fetching and mutations, while the Compiler provides automatic
                optimizations.
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
        </div>
      </SidebarInset>
      <AppSidebar side="right" />
    </SidebarProvider>
  );
}
