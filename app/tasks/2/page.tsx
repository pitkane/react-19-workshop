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
import { CodeBlock } from "@/components/code-block";
import Link from "next/link";

const likeButtonCode = `'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'

export function LikeButton() {
  const [liked, setLiked] = useState(false)
  
  return (
    <Button
      variant={liked ? 'default' : 'outline'}
      size="sm"
      onClick={() => setLiked(!liked)}
      className="mt-2"
    >
      <Heart className={\`mr-2 h-4 w-4 \${liked ? 'fill-current' : ''}\`} />
      {liked ? 'Liked' : 'Like'}
    </Button>
  )
}`;

const productsPageCode = `import { Product } from '@/types'
import { LikeButton } from '../components/like-button'

async function getProducts(): Promise<Product[]> {
  // Same data fetching logic as Task 1
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return [
    { id: 1, name: 'Product 1', price: 19.99, description: 'This is product 1' },
    { id: 2, name: 'Product 2', price: 29.99, description: 'This is product 2' },
    { id: 3, name: 'Product 3', price: 39.99, description: 'This is product 3' },
  ]
}

export default async function ProductsPage() {
  const products = await getProducts()
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Products with Interactivity</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id} className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-muted-foreground">{product.description}</p>
            <p className="font-medium mt-2">\${product.price.toFixed(2)}</p>
            <LikeButton />
          </div>
        ))}
      </div>
    </div>
  )
}`;

export default function Task2Page() {
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
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/tasks">Workshop Tasks</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Task 2: Client Components</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <SidebarTrigger className="-mr-1 ml-auto rotate-180" />
        </header>
        <div className="flex flex-1 flex-col gap-8 p-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Task 2: Adding Interactivity with Client Components</h1>
            <p className="text-lg text-muted-foreground">
              Integrate a Client Component for interactivity within the RSC structure.
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Objective</h2>
              <p className="text-muted-foreground">
                Create a Client Component that adds interactivity to the server-rendered content from Task 1.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Instructions</h2>
              <div className="space-y-4 text-muted-foreground">
                <ol className="list-decimal pl-6 space-y-4">
                  <li>
                    <p>
                      Create a new file <code>app/tasks/2/components/like-button.tsx</code> for a Client Component.
                    </p>
                  </li>
                  <li>
                    <p>
                      Add the 'use client' directive at the top of the file to enable hooks and browser interactions:
                    </p>
                    <CodeBlock code={likeButtonCode} language="tsx" filename="app/tasks/2/components/like-button.tsx" />
                  </li>
                  <li>
                    <p>
                      Now, create a new page that combines the server-rendered product list with the client-side like
                      button:
                    </p>
                    <CodeBlock code={productsPageCode} language="tsx" filename="app/tasks/2/products/page.tsx" />
                  </li>
                  <li>
                    <p>
                      Verify that the products are rendered on the server, but the like button functionality works on
                      the client.
                    </p>
                  </li>
                </ol>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Key Concepts</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>The 'use client' directive marks a component as a Client Component.</li>
                <li>Client Components can use React hooks and browser APIs.</li>
                <li>Server Components can include Client Components as children.</li>
                <li>Only the interactive parts of the UI need to be Client Components.</li>
                <li>This approach minimizes the JavaScript sent to the client.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Example Implementation</h2>
              <div className="rounded-lg border p-6">
                <h3 className="text-xl font-semibold mb-4">Client Component Demo</h3>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    This is a placeholder for the Client Component demo. In a real workshop, you would implement this
                    feature and see the interactive like button working here.
                  </p>
                  <p className="text-muted-foreground">
                    Visit{" "}
                    <Link href="/tasks/2/products" className="text-primary hover:underline">
                      /tasks/2/products
                    </Link>{" "}
                    after implementing the solution.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <Link
                href="/tasks/1"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              >
                Previous Task: Server Components
              </Link>
              <Link
                href="/tasks/3"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                Next Task: Server Actions
              </Link>
            </div>
          </div>
        </div>
      </SidebarInset>
      <AppSidebar side="right" />
    </SidebarProvider>
  );
}
