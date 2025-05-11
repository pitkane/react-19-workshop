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
import { CodeBlock } from "@/components/code-block";

const rscExampleCode = `// app/rsc-example/page.tsx (Server Component by default in Next.js App Router)
async function getGreeting(): Promise<string> {
  // Simulate async operation
  await new Promise(resolve => setTimeout(resolve, 50));
  return "Hello from the Server!";
}

export default async function ServerGreetingPage() {
  const greeting = await getGreeting();

  return (
    <div>
      <h1>{greeting}</h1>
      <p>This content was rendered on the server.</p>
    </div>
  );
}`;

const useClientCounterExampleCode = `// components/Counter.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button'; // Assuming you have this

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <Button onClick={() => setCount(count + 1)}>Increment</Button>
    </div>
  );
}`;

const useServerActionExampleCode = `// app/actions.ts
'use server';

export async function submitMessage(message: string) {
  console.log('Server received message:', message);
  // In a real app, you might save this to a database
  return { success: true, receivedMessage: message };
}`;

const serverActionFormExampleCode = `// app/contact-form/page.tsx
import { Button } from '@/components/ui/button';

async function handleContactSubmit(formData: FormData) {
  'use server';
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;
  console.log('Server Action: Contact Form Submitted', { email, message });
  // Process data (e.g., send email, save to DB)
  // Revalidate path or redirect as needed
  return { status: 'success', message: 'Message sent!' };
}

export default function ContactPage() {
  return (
    <form action={handleContactSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium">Email</label>
        <input type="email" id="email" name="email" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-background p-2" />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium">Message</label>
        <textarea id="message" name="message" rows={4} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-background p-2" />
      </div>
      <Button type="submit">Send Message</Button>
    </form>
  );
}`;

const useActionStateFeedbackFormExampleCode = `// components/FeedbackForm.tsx
'use client';

import { useActionState } from 'react';
import { Button } from '@/components/ui/button';

// Assume this server action is defined elsewhere, e.g., app/actions.ts
// For this example, we define a simplified version.
async function submitFeedbackAction(
  currentState: { message: string; error?: boolean } | null,
  formData: FormData
): Promise<{ message: string; error?: boolean }> {
  // 'use server'; // This directive would be in the actual action file if separate
  const feedback = formData.get('feedback') as string;
  
  // Simulate server-side validation/processing
  await new Promise(resolve => setTimeout(resolve, 500));

  if (!feedback || feedback.length < 5) {
    return { message: 'Feedback must be at least 5 characters.', error: true };
  }
  console.log('Server: Feedback received - ', feedback);
  return { message: 'Thank you for your feedback!' };
}

export function FeedbackForm() {
  const [state, formAction, isPending] = useActionState(submitFeedbackAction, null);

  return (
    <form action={formAction} className="space-y-3">
      <div>
        <label htmlFor="feedback" className="block text-sm font-medium">Your Feedback:</label>
        <textarea 
          id="feedback" 
          name="feedback" 
          rows={3} 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-background p-2" 
          disabled={isPending}
        />
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit Feedback'}
      </Button>
      {state?.message && (
        <p className={\`text-sm \${state.error ? 'text-red-500' : 'text-green-500'}\`}>
          {state.message}
        </p>
      )}
    </form>
  );
}`;

const useFormStatusButtonExampleCode = `// components/FormSubmitButton.tsx
'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';

export function FormSubmitButton({ children }: { children: React.ReactNode }) {
  const { pending, data, method, action } = useFormStatus();

  // You can inspect 'data', 'method', 'action' for more context if needed
  // For example, to show what data is being submitted:
  // if (pending && data) {
  //   const task = data.get('task') as string;
  //   return <Button disabled>Adding "{task}"...</Button>;
  // }

  return (
    <Button type="submit" disabled={pending} aria-disabled={pending}>
      {pending ? 'Processing...' : children}
    </Button>
  );
}

// Example Usage (in a form that uses a Server Action):
// <form action={someServerAction}>
//   <input name="username" />
//   <FormSubmitButton>Login</FormSubmitButton>
// </form>
`;

const useOptimisticCommentsExampleCode = `// components/CommentsSection.tsx
'use client';

import { useOptimistic, useState, useRef, useTransition } from 'react';
import { Button } from '@/components/ui/button';
// Assuming FormSubmitButton from previous example or a simple Button
// import { FormSubmitButton } from './FormSubmitButton';


type Comment = { 
  id: string | number; // Allow string for temporary optimistic IDs
  text: string; 
  isSending?: boolean 
};

// Dummy server action
async function postCommentAction(text: string): Promise<Comment> {
  // 'use server'; // In actual action file
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
  console.log('Server: Comment posted -', text);
  if (text.includes('fail')) throw new Error("Failed to post comment!");
  return { id: Date.now(), text }; // Return the "saved" comment
}

export function CommentsSection({ initialComments }: { initialComments: Comment[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  // useTransition can be used with useOptimistic for pending states of the whole action
  const [isPending, startTransition] = useTransition(); 

  const [optimisticComments, addOptimisticComment] = useOptimistic<Comment[], Comment>(
    initialComments,
    (currentComments, newOptimisticComment) => [ // Reducer function
      ...currentComments,
      newOptimisticComment
    ]
  );

  const handleSubmitComment = async (formData: FormData) => {
    const text = formData.get('commentText') as string;
    if (!text) return;

    formRef.current?.reset(); // Reset form immediately

    const newCommentOptimistic: Comment = {
      id: \`optimistic-\${Date.now()}\`, // Temporary ID
      text: text,
      isSending: true,
    };
    
    startTransition(async () => {
      addOptimisticComment(newCommentOptimistic);
      try {
        const savedComment = await postCommentAction(text);
        // Replace optimistic update with actual server response
        // This typically involves updating the source state that useOptimistic reads from
        // For this example, we'll assume initialComments is a state variable that gets updated
        // setActualComments(prev => [...prev.filter(c => c.id !== newCommentOptimistic.id), savedComment]);
        // For simplicity here, we'll just log. A real app would update a state like 'actualComments'.
         console.log("Server comment received:", savedComment);
      } catch (error) {
        console.error("Failed to post comment:", error);
        // Revert optimistic update: remove the comment or mark as failed
        // setActualComments(prev => prev.filter(c => c.id !== newCommentOptimistic.id));
      }
    });
  };

  return (
    <div className="space-y-4">
      <form action={handleSubmitComment} ref={formRef} className="flex gap-2">
        <input 
          type="text" 
          name="commentText" 
          placeholder="Add a comment..." 
          className="flex-grow rounded-md border-gray-300 shadow-sm bg-background p-2" 
          disabled={isPending}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Posting...' : 'Post'}
        </Button>
      </form>
      <ul className="space-y-2">
        {optimisticComments.map(comment => (
          <li 
            key={comment.id} 
            className={\`p-2 rounded \${comment.isSending ? 'opacity-60 bg-muted/50' : 'bg-card'}\`}
          >
            {comment.text} {comment.isSending && <em className="text-xs ml-1">(Sending...)</em>}
          </li>
        ))}
      </ul>
    </div>
  );
}`;

const compilerOldWayMemoizationExampleCode = `// components/OldWayComponent.tsx
import React, { useState, useMemo, useCallback } from 'react';

function OldWayComponent({ items }: { items: { id: number, name: string }[] }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Manually memoized calculation
  const filteredItems = useMemo(() => {
    console.log('Filtering (old way, with useMemo)...');
    return items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [items, searchTerm]);

  // Manually memoized event handler
  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }, []); // Empty dependency array if setSearchTerm is stable

  return (
    <div>
      <input 
        type="text" 
        value={searchTerm} 
        onChange={handleSearchChange} 
        placeholder="Search items (manual memo)..." 
        className="rounded-md border-gray-300 shadow-sm bg-background p-2"
      />
      {/* Render filteredItems list here */}
    </div>
  );
}`;

const compilerNewWaySimplifiedExampleCode = `// components/NewWayComponent.tsx (with React Compiler)
import React, { useState } from 'react'; // React Compiler works with standard React

function NewWayComponent({ items }: { items: { id: number, name: string }[] }) {
  const [searchTerm, setSearchTerm] = useState('');

  // React Compiler automatically memoizes this calculation if beneficial
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // The compiler might log or indicate its optimizations during build
  // console.log('Filtering (new way, compiler optimizes)...'); 

  // React Compiler automatically memoizes this handler if beneficial
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <input 
        type="text" 
        value={searchTerm} 
        onChange={handleSearchChange} 
        placeholder="Search items (auto memo by Compiler)..." 
        className="rounded-md border-gray-300 shadow-sm bg-background p-2"
      />
      {/* Render filteredItems list here */}
    </div>
  );
}`;

const assetLoadingExampleCode = `// components/MyImageComponent.tsx (Server Component)
// import { preload } from 'react-dom'; // For imperative preloading

export default function MyImageComponent() {
  // Declarative preloading with JSX (React 19 feature)
  // These tags will be hoisted to the <head> of the document.
  return (
    <>
      <link rel="preload" href="/images/important-banner.jpg" as="image" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" />
      <script async src="/path/to/analytics.js" />
      
      <img src="/images/important-banner.jpg" alt="Important Banner" width="600" />
      <p style={{ fontFamily: 'Roboto, sans-serif' }}>Content related to the banner, using preloaded font.</p>
    </>
  );
}`;

const refAsPropCustomInputExampleCode = `// components/MyCustomInput.tsx (React 19 style)
import React from 'react'; // No forwardRef needed

// The 'ref' prop is now a standard prop, no special handling like forwardRef needed.
export function MyCustomInput({ 
  label, 
  type = "text", 
  inputClassName, 
  ...props 
}: { 
  label?: string, 
  type?: string, 
  inputClassName?: string 
} & React.InputHTMLAttributes<HTMLInputElement>, ref: React.Ref<HTMLInputElement>) {
  return (
    <div>
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      <input 
        type={type} 
        ref={ref} 
        className={\`mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-background p-2 \${inputClassName || ''}\`}
        {...props}
      />
    </div>
  );
}

// Parent component using it:
// import { useRef } from 'react';
// import { MyCustomInput } from './MyCustomInput';
// import { Button } from '@/components/ui/button';
//
// function UserForm() {
//   const nameInputRef = useRef<HTMLInputElement>(null);
//   const focusNameInput = () => nameInputRef.current?.focus();
//
//   return (
//     <form onSubmit={(e) => e.preventDefault()}>
//       <MyCustomInput label="Your Name:" ref={nameInputRef} name="username" />
//       <Button type="button" onClick={focusNameInput} className="mt-2">
//         Focus Name Input
//       </Button>
//     </form>
//   );
// }
`;

const useContextThemeExampleCode = `// components/ThemeComponents.tsx
import { createContext, use } from 'react'; // React.createContext, React.use

// 1. Create a Context
const CurrentThemeContext = createContext<string | null>(null);
// It's good practice to provide a default value that makes sense.
// Or check for null if no provider is above in the tree.

// 2. Create a Provider component
export function ThemeProvider({ children, theme }: { children: React.ReactNode, theme: string }) {
  return <CurrentThemeContext.Provider value={theme}>{children}</CurrentThemeContext.Provider>;
}

// 3. Consume the context using use(Context)
export function ThemeDisplay() {
  // use(Context) can only be called from Server Components or Client Components.
  // If ThemeDisplay is a Server Component, it works.
  // If it's a Client Component ('use client'), it also works.
  const currentTheme = use(CurrentThemeContext);

  if (currentTheme === null) {
    // This case handles when ThemeDisplay is used without a ThemeProvider ancestor.
    return <p>No theme provider found.</p>;
  }

  return <p className="p-2 rounded-md" style={{ background: currentTheme === 'dark' ? '#333' : '#EEE', color: currentTheme === 'dark' ? '#FFF' : '#333'}}>The current theme is: {currentTheme}</p>;
}

// Example Usage:
// <ThemeProvider theme="dark">
//   <ThemeDisplay />
// </ThemeProvider>
// <ThemeProvider theme="light">
//   <ThemeDisplay />
// </ThemeProvider>
`;

const usePromiseUserProfileExampleCode = `// components/UserProfile.tsx
import { use, Suspense } from 'react'; // React.use, React.Suspense

// Simulate an API call that returns a Promise
async function fetchUserData(userId: string): Promise<{ id: string, name: string, email: string }> {
  console.log(\`Fetching data for user: \${userId}\`);
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
  if (userId === '1') {
    return { id: '1', name: 'Alice Wonderland', email: 'alice@example.com' };
  } else if (userId === '2') {
    return { id: '2', name: 'Bob The Builder', email: 'bob@example.com' };
  }
  throw new Error('User not found');
}

// This component uses use(Promise) and thus must be wrapped in <Suspense>
function UserDetails({ userId }: { userId: string }) {
  // fetchUserData returns a Promise. use() will suspend while the promise is pending.
  // If the promise rejects, use() will throw the error, caught by an ErrorBoundary.
  const user = use(fetchUserData(userId)); 

  return (
    <div className="border p-4 rounded-md bg-card">
      <h3 className="text-lg font-semibold">{user.name}</h3>
      <p>ID: {user.id}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}

// Parent component that provides the Suspense boundary
export default function UserProfileLoader({ userId }: { userId: string }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-3">User Profile (via use(Promise))</h2>
      <Suspense fallback={<p className="text-blue-500 p-4 border rounded-md bg-muted">Loading user details for ID: {userId}...</p>}>
        <UserDetails userId={userId} />
      </Suspense>
    </div>
  );
}

// Example Usage:
// <UserProfileLoader userId="1" />
// <UserProfileLoader userId="2" />
`;

const documentMetadataExampleCode = `// For Next.js App Router (Server Component):
// app/my-dynamic-page/page.tsx
export async function generateMetadata({ params }: { params: { id: string } }) {
  // const product = await fetchProductDetails(params.id); // Fetch dynamic data
  // For example:
  const title = params.id === 'special' ? 'Special Page Title' : 'Generic Page Title';
  return {
    title: \`\${title} | My Site\`,
    description: 'This page has metadata generated on the server using generateMetadata.',
    openGraph: {
      title: title,
      description: 'Dynamic OpenGraph description.',
    },
  };
}

export default function MyDynamicPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Content for page ID: {params.id}</h1>
      <p>The title and description for this page are set via generateMetadata.</p>
    </div>
  );
}

// --- OR ---

// React 19's native way (can be used in Client or Server Components):
// components/PageSpecificHead.tsx
// No 'use client' or 'use server' needed if just rendering tags.
// These tags are automatically hoisted to the document <head>.
export function PageSpecificHead({ pageTitle }: { pageTitle: string }) {
  return (
    <>
      <title>{pageTitle} - React 19 Native</title>
      <meta name="description" content="Description set using React 19 native tags." />
      <meta property="og:title" content={pageTitle} />
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="canonical" href="https://example.com/current-page" />
    </>
  );
}

// Usage in a page component (Server or Client):
// import { PageSpecificHead } from './PageSpecificHead';
//
// export default function SomePage() {
//   return (
//     <>
//       <PageSpecificHead pageTitle="My Awesome Page" />
//       <div>
//         <h2>Page Content Goes Here</h2>
//         <p>This page uses native React 19 tags for its metadata.</p>
//       </div>
//     </>
//   )
// }
`;

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
                  <li>React 19's "use client" and "use server" Directives</li>
                  <li>React 19's Server Actions and Form Handling</li>
                  <li>React 19's New Hooks for Actions and Transitions</li>
                  <li>The React 19 Compiler</li>
                  <li>Other Notable Improvements in React 19 (Asset Loading, Metadata, Refs, Context, Promises)</li>
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
              <div className="my-4">
                <CodeBlock code={rscExampleCode} language="tsx" filename="app/rsc-example/page.tsx" />
              </div>
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

          <section id="actions" className="space-y-4">
            <h2 className="text-3xl font-bold">React 19's Server Actions and Form Handling</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                React 19 introduces Actions, a new way to handle user input events that can seamlessly involve
                server-side logic. They integrate with React's concurrent rendering features for smooth UI updates.
                Actions can be passed to <code>&lt;form action="myActionPlaceholder"&gt;</code>,{" "}
                <code>&lt;button formAction="myActionPlaceholder"&gt;</code>, or even invoked directly.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Types of Actions in React 19</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Client Actions:</strong> Functions defined in Client Components that handle form
                      submissions or button clicks. They run on the client.
                    </li>
                    <li>
                      <strong>Server Actions:</strong> Functions marked with <code>'use server'</code> that run on the
                      server, allowing direct server function calls from client components or forms.
                    </li>
                  </ul>
                </div>
                <div className="my-4">
                  <h4 className="text-lg font-semibold text-foreground mb-2">Example: Form with a Server Action</h4>
                  <CodeBlock code={serverActionFormExampleCode} language="tsx" filename="app/contact-form/page.tsx" />
                </div>
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

          <section id="hooks" className="space-y-4">
            <h2 className="text-3xl font-bold">React 19's New Hooks for Actions and Transitions</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>React 19 introduces three new hooks to complement Actions and improve UX for interactions:</p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">useActionState</h3>
                  <p>
                    New in React 19, this hook simplifies managing form state and submission outcomes. It takes an
                    action function and an initial state, returning the current state, a wrapped action to pass to the
                    form, and a pending status.
                  </p>
                  <div className="my-4">
                    <CodeBlock
                      code={useActionStateFeedbackFormExampleCode}
                      language="tsx"
                      filename="components/FeedbackForm.tsx"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">useFormStatus</h3>
                  <p>
                    New in React 19, this hook provides the status (pending, data, method, action) of the parent{" "}
                    <code>&lt;form&gt;</code> submission. It must be used within a component that is a descendant of a{" "}
                    <code>&lt;form&gt;</code>. Useful for showing loading states on submit buttons or displaying
                    submitted data.
                  </p>
                  <div className="my-4">
                    <CodeBlock
                      code={useFormStatusButtonExampleCode}
                      language="tsx"
                      filename="components/FormSubmitButton.tsx"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">useOptimistic</h3>
                  <p>
                    New in React 19, this hook enables optimistic UI updates. It allows you to update the UI immediately
                    as if an async action (like a Server Action) has succeeded, then reconciles with the actual result
                    when it returns.
                  </p>
                  <div className="my-4">
                    <CodeBlock
                      code={useOptimisticCommentsExampleCode}
                      language="tsx"
                      filename="components/CommentsSection.tsx"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="compiler" className="space-y-4">
            <h2 className="text-3xl font-bold">The React 19 Compiler</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                One of the headline features of React 19 is the new React Compiler (experimental, often referred to as
                "React Forget"). It's an optimizing compiler that runs at build time to automatically make React code
                more efficient.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Automatic Memoization in React 19</h3>
                  <p>
                    The React 19 Compiler automatically handles optimizations that previously required manual use of
                    <code>useMemo</code>, <code>useCallback</code>, or <code>React.memo</code>. It analyzes components
                    to understand dependencies and prevents unnecessary re-renders.
                  </p>
                  <h4 className="text-md font-semibold text-foreground mt-3 mb-1">Before (Manual Memoization):</h4>
                  <div className="my-4">
                    <CodeBlock
                      code={compilerOldWayMemoizationExampleCode}
                      language="tsx"
                      filename="components/OldWayComponent.tsx"
                    />
                  </div>
                  <h4 className="text-md font-semibold text-foreground mt-3 mb-1">After (React Compiler Optimizes):</h4>
                  <p>
                    With the React Compiler enabled, you can often remove manual memoization hooks, and the compiler
                    will optimize the component automatically.
                  </p>
                  <div className="my-4">
                    <CodeBlock
                      code={compilerNewWaySimplifiedExampleCode}
                      language="tsx"
                      filename="components/NewWayComponent.tsx"
                    />
                  </div>
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

          <section id="features" className="space-y-4">
            <h2 className="text-3xl font-bold">Other Notable Improvements in React 19</h2>
            <div className="space-y-6 text-muted-foreground">
              {" "}
              {/* Changed from ul to div and adjusted spacing */}
              <div>
                <h3 className="text-xl font-semibold text-foreground">Resource and Asset Loading</h3>
                <p>
                  React 19 introduces new APIs and conventions for preloading and prioritizing assets (scripts,
                  stylesheets, fonts, images). You can now use <code>&lt;link&gt;</code> and <code>&lt;script&gt;</code>{" "}
                  tags directly in your components, and React will manage hoisting them to the document{" "}
                  <code>&lt;head&gt;</code> and optimizing their loading.
                </p>
                <div className="my-4">
                  <CodeBlock code={assetLoadingExampleCode} language="tsx" filename="components/MyImageComponent.tsx" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">Built-in Metadata Handling</h3>
                <p>
                  React 19 provides native support for managing document head metadata (<code>&lt;title&gt;</code>,{" "}
                  <code>&lt;meta&gt;</code>, <code>&lt;link&gt;</code>) directly within your components. These tags are
                  automatically hoisted to the <code>&lt;head&gt;</code>. In Next.js, the <code>generateMetadata</code>{" "}
                  export remains the primary way for server-side metadata generation in the App Router, but native React
                  19 capabilities can complement this.
                </p>
                <div className="my-4">
                  <CodeBlock
                    code={documentMetadataExampleCode}
                    language="tsx"
                    filename="app/my-dynamic-page/page.tsx & components/PageSpecificHead.tsx"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  Simpler API for Refs: <code>ref</code> as a Prop
                </h3>
                <p>
                  Forwarding refs is simpler in React 19. The <code>ref</code> prop can now be passed to function
                  components directly without needing <code>React.forwardRef</code>. Class components continue to work
                  as before.
                </p>
                <div className="my-4">
                  <CodeBlock
                    code={refAsPropCustomInputExampleCode}
                    language="tsx"
                    filename="components/MyCustomInput.tsx"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  Simpler API for Context: <code>use(Context)</code>
                </h3>
                <p>
                  React 19 introduces <code>use(Context)</code> as a more versatile way to read context. It can be
                  called conditionally and inside loops, unlike the traditional <code>useContext</code> hook. It works
                  in both Server and Client Components.
                </p>
                <div className="my-4">
                  <CodeBlock
                    code={useContextThemeExampleCode}
                    language="tsx"
                    filename="components/ThemeComponents.tsx"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  Reading Promises with <code>use(Promise)</code>
                </h3>
                <p>
                  The <code>use()</code> hook can also be used to read the value of a promise. This integrates with
                  Suspense, allowing components to suspend rendering while data is being fetched. This is particularly
                  useful in Server Components for data fetching or in Client Components within a Suspense boundary.
                </p>
                <div className="my-4">
                  <CodeBlock
                    code={usePromiseUserProfileExampleCode}
                    language="tsx"
                    filename="components/UserProfile.tsx"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">Web Components Support</h3>
                <p>
                  Improved integration with Web Components (Custom Elements) in React 19. React now fully supports
                  passing props and handling events for custom elements, making it easier to use them within a React
                  application.
                </p>
                {/* No code example for brevity, as it's more about interop */}
              </div>
            </div>
          </section>

          <section id="summary" className="space-y-4">
            <h2 className="text-3xl font-bold">Summary and Next Steps</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                React 19's major features work together to improve developer experience and app performance. Server
                Components and Actions simplify data fetching and mutations, new hooks enhance form handling and
                optimistic updates, while the Compiler provides automatic optimizations. Enhanced asset loading,
                metadata handling, and simpler APIs for refs and context further refine the development workflow.
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
