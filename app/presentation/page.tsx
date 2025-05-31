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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

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

const refAsPropCustomInputExampleCode = `// components/SimpleInput.tsx (React 19 style)
import React from 'react';

type SimpleInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  ref?: React.Ref<HTMLInputElement>;
};

// No forwardRef needed!
export function SimpleInput({ ref, ...props }: SimpleInputProps) {
  return <input ref={ref} {...props} />;
}

// Usage example:
import { useRef } from 'react';
import { SimpleInput } from './SimpleInput';

function FocusDemo() {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <SimpleInput ref={inputRef} placeholder="Type here..." />
      <button onClick={() => inputRef.current?.focus()}>Focus Input</button>
    </>
  );
}
`;

const useContextThemeExampleCode = `// components/ThemeExample.tsx
import React, { createContext, use } from 'react';

const ThemeContext = createContext('light');

export function ThemeProvider({ children, value }: { children: React.ReactNode; value: string }) {
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function ThemeDisplay() {
  const theme = use(ThemeContext);
  return <div>Theme: {theme}</div>;
}

// Usage:
// <ThemeProvider value="dark">
//   <ThemeDisplay />
// </ThemeProvider>
`;

const usePromiseUserProfileExampleCode = `// components/SimplePromise.tsx
import { use, Suspense } from 'react';

function getMessage() {
  return new Promise<string>(resolve => setTimeout(() => resolve('Hello from a Promise!'), 1000));
}

function Message() {
  const msg = use(getMessage());
  return <div>{msg}</div>;
}

export default function SimplePromiseDemo() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Message />
    </Suspense>
  );
}
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

// New comprehensive examples for critical sections
const rscDataFetchingExampleCode = `// app/products/page.tsx (Server Component with data fetching)
import { notFound } from 'next/navigation';

// This runs on the server - direct database/API access
async function getProducts() {
  const res = await fetch('https://api.example.com/products', {
    headers: { 'Authorization': \`Bearer \${process.env.API_TOKEN}\` }
  });
  
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();
  
  if (!products?.length) {
    notFound();
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((product: any) => (
        <div key={product.id} className="border rounded-lg p-4">
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-muted-foreground">\${product.price}</p>
          <p className="text-sm mt-2">{product.description}</p>
        </div>
      ))}
    </div>
  );
}`;

const rscNestedComponentsExampleCode = `// app/dashboard/page.tsx (Server Component composition)
import { UserProfile } from './components/UserProfile';
import { RecentActivity } from './components/RecentActivity';
import { Notifications } from './components/Notifications';

async function getCurrentUser() {
  // Server-side user authentication/data fetching
  const user = await fetch(\`\${process.env.API_URL}/user\`, {
    headers: { cookie: cookies().toString() }
  }).then(res => res.json());
  return user;
}

export default async function DashboardPage() {
  const user = await getCurrentUser();
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <UserProfile user={user} />
        <RecentActivity userId={user.id} />
      </div>
      <div>
        <Notifications userId={user.id} />
      </div>
    </div>
  );
}

// app/dashboard/components/UserProfile.tsx (Server Component)
export async function UserProfile({ user }: { user: any }) {
  return (
    <div className="bg-card rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Welcome back, {user.name}!</h2>
      <p className="text-muted-foreground">Last login: {user.lastLogin}</p>
    </div>
  );
}`;

const serverActionAdvancedExampleCode = `// app/actions/user-actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updateUserProfile(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  
  // Validation
  if (!name || name.length < 2) {
    return { error: 'Name must be at least 2 characters' };
  }
  
  if (!email || !email.includes('@')) {
    return { error: 'Please enter a valid email' };
  }
  
  try {
    // Database update
    await updateUser({ name, email });
    
    // Revalidate the profile page to show updated data
    revalidatePath('/profile');
    
    return { success: 'Profile updated successfully!' };
  } catch (error) {
    return { error: 'Failed to update profile' };
  }
}

export async function deletePost(postId: string) {
  try {
    await deletePostFromDB(postId);
    
    // Revalidate multiple paths
    revalidatePath('/posts');
    revalidatePath('/dashboard');
    
    // Redirect after successful deletion
    redirect('/posts');
  } catch (error) {
    return { error: 'Failed to delete post' };
  }
}`;

const serverActionFileUploadExampleCode = `// app/upload/page.tsx (File upload with Server Action)
async function uploadFile(formData: FormData) {
  'use server';
  
  const file = formData.get('file') as File;
  
  if (!file) {
    return { error: 'No file selected' };
  }
  
  // Validate file type
  if (!file.type.startsWith('image/')) {
    return { error: 'Only image files are allowed' };
  }
  
  // Validate file size (5MB max)
  if (file.size > 5 * 1024 * 1024) {
    return { error: 'File size must be less than 5MB' };
  }
  
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Save to storage (could be local, S3, etc.)
    const filename = \`\${Date.now()}-\${file.name}\`;
    await saveFileToStorage(filename, buffer);
    
    return { success: \`File uploaded: \${filename}\` };
  } catch (error) {
    return { error: 'Upload failed' };
  }
}

export default function UploadPage() {
  return (
    <form action={uploadFile} className="space-y-4">
      <div>
        <label htmlFor="file" className="block text-sm font-medium mb-2">
          Choose file to upload
        </label>
        <input
          type="file"
          id="file"
          name="file"
          accept="image/*"
          required
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
        />
      </div>
      <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
        Upload File
      </button>
    </form>
  );
}`;

const useActionStateShoppingCartExampleCode = `// components/AddToCartForm.tsx (Advanced useActionState)
'use client';

import { useActionState } from 'react';
import { Button } from '@/components/ui/button';

type CartState = {
  message: string;
  success?: boolean;
  error?: boolean;
  itemCount?: number;
};

async function addToCartAction(
  currentState: CartState | null,
  formData: FormData
): Promise<CartState> {
  const productId = formData.get('productId') as string;
  const quantity = parseInt(formData.get('quantity') as string);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (quantity < 1 || quantity > 10) {
    return { 
      message: 'Quantity must be between 1 and 10',
      error: true 
    };
  }
  
  try {
    // Add to cart logic
    const updatedCart = await addItemToCart(productId, quantity);
    
    return {
      message: \`Added \${quantity} item(s) to cart!\`,
      success: true,
      itemCount: updatedCart.totalItems
    };
  } catch (error) {
    return {
      message: 'Failed to add item to cart',
      error: true
    };
  }
}

export function AddToCartForm({ productId }: { productId: string }) {
  const [state, formAction, isPending] = useActionState(addToCartAction, null);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="productId" value={productId} />
      
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium mb-1">
          Quantity
        </label>
        <select 
          name="quantity" 
          id="quantity"
          disabled={isPending}
          className="block w-20 rounded-md border-gray-300 shadow-sm bg-background p-2"
        >
          {[1,2,3,4,5].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>
      
      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? 'Adding to Cart...' : 'Add to Cart'}
      </Button>
      
      {state?.message && (
        <div className={\`p-3 rounded-md \${
          state.success ? 'bg-green-50 text-green-700 border border-green-200' 
                        : 'bg-red-50 text-red-700 border border-red-200'
        }\`}>
          {state.message}
          {state.itemCount && (
            <div className="text-xs mt-1">Cart total: {state.itemCount} items</div>
          )}
        </div>
      )}
    </form>
  );
}`;

const useOptimisticTodoListExampleCode = `// components/TodoList.tsx (Real-world useOptimistic)
'use client';

import { useOptimistic, useTransition, useState } from 'react';
import { Button } from '@/components/ui/button';

type Todo = {
  id: string;
  text: string;
  completed: boolean;
  isOptimistic?: boolean;
};

async function addTodoAction(text: string): Promise<Todo> {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (text.toLowerCase().includes('error')) {
    throw new Error('Cannot add todos containing "error"');
  }
  
  return {
    id: \`todo-\${Date.now()}\`,
    text,
    completed: false
  };
}

async function toggleTodoAction(id: string): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log(\`Toggled todo \${id}\`);
}

export function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const [isPending, startTransition] = useTransition();
  const [newTodoText, setNewTodoText] = useState('');
  
  const [optimisticTodos, updateOptimisticTodos] = useOptimistic<Todo[], { type: 'add' | 'toggle'; todo?: Todo; id?: string }>(
    initialTodos,
    (currentTodos, action) => {
      if (action.type === 'add' && action.todo) {
        return [...currentTodos, { ...action.todo, isOptimistic: true }];
      }
      if (action.type === 'toggle' && action.id) {
        return currentTodos.map(todo =>
          todo.id === action.id 
            ? { ...todo, completed: !todo.completed, isOptimistic: true }
            : todo
        );
      }
      return currentTodos;
    }
  );

  const handleAddTodo = async () => {
    if (!newTodoText.trim()) return;
    
    const optimisticTodo: Todo = {
      id: \`temp-\${Date.now()}\`,
      text: newTodoText,
      completed: false,
      isOptimistic: true
    };
    
    setNewTodoText('');
    
    startTransition(async () => {
      updateOptimisticTodos({ type: 'add', todo: optimisticTodo });
      
      try {
        const savedTodo = await addTodoAction(newTodoText);
        // In a real app, you'd update your state/refetch data here
        console.log('Todo saved:', savedTodo);
      } catch (error) {
        console.error('Failed to add todo:', error);
        // Remove the optimistic todo on error
      }
    });
  };

  const handleToggleTodo = (id: string) => {
    startTransition(async () => {
      updateOptimisticTodos({ type: 'toggle', id });
      
      try {
        await toggleTodoAction(id);
        console.log('Todo toggled:', id);
      } catch (error) {
        console.error('Failed to toggle todo:', error);
        // Revert the optimistic update
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 rounded-md border-gray-300 shadow-sm bg-background p-2"
          disabled={isPending}
        />
        <Button onClick={handleAddTodo} disabled={isPending || !newTodoText.trim()}>
          {isPending ? 'Adding...' : 'Add Todo'}
        </Button>
      </div>
      
      <ul className="space-y-2">
        {optimisticTodos.map(todo => (
          <li 
            key={todo.id}
            className={\`flex items-center gap-3 p-3 rounded-lg border \${
              todo.isOptimistic ? 'opacity-70 bg-muted/50' : 'bg-card'
            }\`}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
              disabled={todo.isOptimistic}
              className="rounded"
            />
            <span className={\`flex-1 \${todo.completed ? 'line-through text-muted-foreground' : ''}\`}>
              {todo.text}
            </span>
            {todo.isOptimistic && (
              <span className="text-xs text-muted-foreground">Saving...</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}`;

const compilerPerformanceExampleCode = `// components/ExpensiveCalculation.tsx (React Compiler benefits)
'use client';

import { useState } from 'react';

// Without React Compiler, you'd need useMemo here
function ExpensiveComponent({ data }: { data: number[] }) {
  const [filter, setFilter] = useState('');
  const [threshold, setThreshold] = useState(50);
  
  // React Compiler automatically memoizes this expensive calculation
  const processedData = data
    .filter(item => item > threshold)
    .map(item => ({
      value: item,
      squared: item * item,
      isPrime: isPrime(item),
      formatted: formatNumber(item)
    }))
    .filter(item => item.formatted.includes(filter));
  
  // React Compiler also optimizes this event handler
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };
  
  // And this one too
  const handleThresholdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThreshold(Number(e.target.value));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Filter results..."
          value={filter}
          onChange={handleFilterChange}
          className="rounded-md border-gray-300 shadow-sm bg-background p-2"
        />
        <input
          type="number"
          placeholder="Threshold"
          value={threshold}
          onChange={handleThresholdChange}
          className="rounded-md border-gray-300 shadow-sm bg-background p-2 w-24"
        />
      </div>
      <div className="text-sm text-muted-foreground">
        Found {processedData.length} items
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {processedData.slice(0, 20).map((item, index) => (
          <div key={index} className="p-2 border rounded text-sm">
            <div>Value: {item.value}</div>
            <div>Squared: {item.squared}</div>
            <div>Prime: {item.isPrime ? 'Yes' : 'No'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper functions (expensive operations)
function isPrime(num: number): boolean {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD' 
  }).format(num);
}`;

const assetLoadingAdvancedExampleCode = `// app/blog/[slug]/page.tsx (Advanced asset preloading)
import { notFound } from 'next/navigation';

async function getBlogPost(slug: string) {
  // Fetch blog post data
  const post = await fetch(\`\${process.env.API_URL}/posts/\${slug}\`).then(r => r.json());
  return post;
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    notFound();
  }

  return (
    <>
      {/* Preload critical resources */}
      <link rel="preload" href={post.heroImage} as="image" />
      <link rel="preload" href="/fonts/blog-heading.woff2" as="font" type="font/woff2" crossOrigin="" />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://analytics.example.com" />
      <link rel="preconnect" href="https://comments-api.example.com" />
      
      {/* Prefetch related content */}
      {post.relatedPosts?.map((relatedPost: any) => (
        <link key={relatedPost.id} rel="prefetch" href={relatedPost.thumbnail} as="image" />
      ))}
      
      {/* Load analytics script with priority */}
      <script 
        src="https://analytics.example.com/script.js"
        async
        data-domain="myblog.com"
      />
      
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'BlogHeading, serif' }}>
            {post.title}
          </h1>
          <img 
            src={post.heroImage} 
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg"
            loading="eager" // Critical image
          />
        </header>
        
        <div className="prose prose-lg" dangerouslySetInnerHTML={{ __html: post.content }} />
        
        {/* Lazy load non-critical images */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          {post.gallery?.map((image: any, index: number) => (
            <img
              key={index}
              src={image.url}
              alt={image.alt}
              loading="lazy" // Non-critical images
              className="rounded-lg"
            />
          ))}
        </div>
      </article>
    </>
  );
}`;

const metadataAdvancedExampleCode = `// app/products/[id]/page.tsx (Dynamic metadata with React 19)
import { notFound } from 'next/navigation';

// Next.js App Router approach (recommended)
export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  
  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.'
    };
  }
  
  return {
    title: \`\${product.name} | Your Store\`,
    description: product.description,
    keywords: product.tags.join(', '),
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.images[0]?.url || '/default-product.jpg',
          width: 1200,
          height: 630,
          alt: product.name,
        }
      ],
      type: 'product',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [product.images[0]?.url],
    },
    robots: {
      index: product.isPublished,
      follow: true,
    }
  };
}

async function getProduct(id: string) {
  const res = await fetch(\`\${process.env.API_URL}/products/\${id}\`);
  if (!res.ok) return null;
  return res.json();
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  
  if (!product) {
    notFound();
  }

  return (
    <>
      {/* React 19 native metadata (complementary) */}
      <meta name="product:price" content={product.price} />
      <meta name="product:currency" content={product.currency} />
      <meta name="product:availability" content={product.inStock ? 'in stock' : 'out of stock'} />
      
      {/* Structured data for SEO */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": product.name,
            "description": product.description,
            "image": product.images.map((img: any) => img.url),
            "offers": {
              "@type": "Offer",
              "price": product.price,
              "priceCurrency": product.currency,
              "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
            }
          })
        }}
      />
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img 
            src={product.images[0]?.url} 
            alt={product.name}
            className="w-full rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold mb-4">{product.currency}{product.price}</p>
          <p className="text-muted-foreground mb-6">{product.description}</p>
          
          {product.inStock ? (
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg">
              Add to Cart
            </button>
          ) : (
            <button disabled className="bg-muted text-muted-foreground px-6 py-3 rounded-lg">
              Out of Stock
            </button>
          )}
        </div>
      </div>
    </>
  );
}`;

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
            <div className="space-y-4">
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
            <div className="space-y-4">
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
            <div className="space-y-4">
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
            <div className="space-y-4">
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
            <div className="space-y-4">
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
                    <CodeBlock
                      code={serverActionAdvancedExampleCode}
                      language="tsx"
                      filename="app/actions/user-actions.ts"
                    />
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

          <section id="hooks" className="space-y-4">
            <h2 className="text-3xl font-bold">React 19's New Hooks for Actions and Transitions</h2>
            <div className="space-y-4">
              <p>React 19 introduces three new hooks to complement Actions and improve UX for interactions:</p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">useActionState</h3>
                  <p>
                    New in React 19, this hook simplifies managing form state and submission outcomes. It takes an
                    action function and an initial state, returning the current state, a wrapped action to pass to the
                    form, and a pending status.
                  </p>

                  <Tabs defaultValue="basic" className="w-full mt-4">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="basic">Basic Feedback Form</TabsTrigger>
                      <TabsTrigger value="advanced">Shopping Cart</TabsTrigger>
                    </TabsList>
                    <TabsContent value="basic">
                      <CodeBlock
                        code={useActionStateFeedbackFormExampleCode}
                        language="tsx"
                        filename="components/FeedbackForm.tsx"
                      />
                    </TabsContent>
                    <TabsContent value="advanced">
                      <CodeBlock
                        code={useActionStateShoppingCartExampleCode}
                        language="tsx"
                        filename="components/AddToCartForm.tsx"
                      />
                    </TabsContent>
                  </Tabs>
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

                  <Tabs defaultValue="basic" className="w-full mt-4">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="basic">Basic Comments</TabsTrigger>
                      <TabsTrigger value="advanced">Todo List</TabsTrigger>
                    </TabsList>
                    <TabsContent value="basic">
                      <CodeBlock
                        code={useOptimisticCommentsExampleCode}
                        language="tsx"
                        filename="components/CommentsSection.tsx"
                      />
                    </TabsContent>
                    <TabsContent value="advanced">
                      <CodeBlock
                        code={useOptimisticTodoListExampleCode}
                        language="tsx"
                        filename="components/TodoList.tsx"
                      />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </section>

          <section id="compiler" className="space-y-4">
            <h2 className="text-3xl font-bold">The React 19 Compiler</h2>
            <div className="space-y-4">
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

          <section id="features" className="space-y-4">
            <h2 className="text-3xl font-bold">Other Notable Improvements in React 19</h2>
            <div className="space-y-6">
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

                <Tabs defaultValue="basic" className="w-full mt-4">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="basic">Basic Asset Loading</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced Blog Example</TabsTrigger>
                  </TabsList>
                  <TabsContent value="basic">
                    <CodeBlock
                      code={assetLoadingExampleCode}
                      language="tsx"
                      filename="components/MyImageComponent.tsx"
                    />
                  </TabsContent>
                  <TabsContent value="advanced">
                    <CodeBlock
                      code={assetLoadingAdvancedExampleCode}
                      language="tsx"
                      filename="app/blog/[slug]/page.tsx"
                    />
                  </TabsContent>
                </Tabs>
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
                    <CodeBlock
                      code={metadataAdvancedExampleCode}
                      language="tsx"
                      filename="app/products/[id]/page.tsx"
                    />
                  </TabsContent>
                </Tabs>
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
                    filename="components/SimpleInput.tsx"
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
                  <CodeBlock code={useContextThemeExampleCode} language="tsx" filename="components/ThemeExample.tsx" />
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
                    filename="components/SimplePromise.tsx"
                  />
                </div>
              </div>
            </div>
          </section>

          <section id="summary" className="space-y-4">
            <h2 className="text-3xl font-bold">Summary and Next Steps</h2>
            <div className="space-y-4">
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
