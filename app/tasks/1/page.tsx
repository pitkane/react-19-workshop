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

const productPageCode = `import { Product } from '@/types'

async function getProducts(): Promise<Product[]> {
  // In a real app, this would be a fetch to an external API
  // For this workshop, we'll simulate a delay and return mock data
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
      <h1 className="text-2xl font-bold">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id} className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-neutral-800">{product.description}</p>
            <p className="font-medium mt-2">\${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}`;

const productTypeCode = `export interface Product {
  id: number
  name: string
  price: number
  description: string
}`;

export default function Task1Page() {
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
                <BreadcrumbPage>Task 1: Server Components</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <SidebarTrigger className="-mr-1 ml-auto rotate-180" />
        </header>
        <div className="flex flex-1 flex-col gap-8 p-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Task 1: Data Fetching with Server Components</h1>
            <p className="text-lg">Leverage React Server Components to fetch and render data on the server.</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Objective</h2>
              <p>
                Create a Server Component that fetches data from an API or local data source and renders it on the
                server.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Instructions</h2>
              <div className="space-y-4">
                <ol className="list-decimal pl-6 space-y-4">
                  <li>
                    <p>
                      Locate the file <code>app/tasks/1/products/page.tsx</code> (you may need to create this file).
                    </p>
                  </li>
                  <li>
                    <p>
                      Inside this component, perform an async data fetch. Since it's a Server Component, you can await
                      directly in the component body:
                    </p>
                    <CodeBlock code={productPageCode} language="tsx" filename="app/tasks/1/products/page.tsx" />
                  </li>
                  <li>
                    <p>Create a types file to define the Product type:</p>
                    <CodeBlock code={productTypeCode} language="typescript" filename="types.ts" />
                  </li>
                  <li>
                    <p>
                      After implementation, verify that the content appears on page load and view the page source to see
                      that data came with the initial HTML.
                    </p>
                  </li>
                </ol>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Key Concepts</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>React Server Components run exclusively on the server.</li>
                <li>No useEffect or client-side state is needed for data fetching.</li>
                <li>Data is fetched before the response is sent to the client.</li>
                <li>The first render the user sees already includes the content.</li>
                <li>This reduces client-side JavaScript and improves performance.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Example Implementation</h2>
              <div className="rounded-lg border p-6">
                <h3 className="text-xl font-semibold mb-4">Server Component Demo</h3>
                <div className="space-y-4">
                  <p>
                    This is a placeholder for the Server Component demo. In a real workshop, you would implement this
                    feature and see the products rendered here.
                  </p>
                  <p>
                    Visit{" "}
                    <Link href="/tasks/1/products" className="text-primary hover:underline">
                      /tasks/1/products
                    </Link>{" "}
                    after implementing the solution.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <Link
                href="/tasks"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              >
                Back to Tasks
              </Link>
              <Link
                href="/tasks/2"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                Next Task: Client Components
              </Link>
            </div>
          </div>
        </div>
      </SidebarInset>
      <AppSidebar side="right" />
    </SidebarProvider>
  );
}
