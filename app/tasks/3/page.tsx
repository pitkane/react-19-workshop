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

const actionsCode = `'use server'

import { Product } from '@/types'

// This would typically be a database or external API
let products: Product[] = [
  { id: 1, name: 'Product 1', price: 19.99, description: 'This is product 1' },
  { id: 2, name: 'Product 2', price: 29.99, description: 'This is product 2' },
  { id: 3, name: 'Product 3', price: 39.99, description: 'This is product 3' },
]

export async function addProduct(formData: FormData) {
  // Simulate server latency
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const name = formData.get('name') as string
  const price = parseFloat(formData.get('price') as string)
  const description = formData.get('description') as string
  
  // Validate input
  if (!name || !price || !description) {
    return { success: false, message: 'All fields are required' }
  }
  
  // Create new product
  const newProduct: Product = {
    id: products.length + 1,
    name,
    price,
    description,
  }
  
  // Add to products array
  products.push(newProduct)
  
  return { success: true, product: newProduct }
}

export async function getProducts(): Promise<Product[]> {
  // Simulate server latency
  await new Promise(resolve => setTimeout(resolve, 500))
  return [...products]
}`;

const productFormCode = `'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { addProduct } from '../actions'

export function ProductForm() {
  const [message, setMessage] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null)
  
  async function handleSubmit(formData: FormData) {
    const result = await addProduct(formData)
    setIsSuccess(result.success)
    setMessage(result.success ? 'Product added successfully!' : result.message)
  }
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Add New Product</h2>
      <form action={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name</Label>
          <Input id="name" name="name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input id="price" name="price" type="number" step="0.01" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" required />
        </div>
        <Button type="submit">Add Product</Button>
      </form>
      
      {message && (
        <div className={isSuccess ? 'text-green-600' : 'text-red-600'}>
          {message}
        </div>
      )}
    </div>
  )
}`;

const productsPageCode = `import { ProductForm } from '../components/product-form'
import { getProducts } from '../actions'

export default async function ProductsPage() {
  const products = await getProducts()
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map(product => (
            <div key={product.id} className="border rounded-lg p-4">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-muted-foreground">{product.description}</p>
              <p className="font-medium mt-2">\${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="border rounded-lg p-6">
        <ProductForm />
      </div>
    </div>
  )
}`;

export default function Task3Page() {
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
                <BreadcrumbPage>Task 3: Server Actions</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <SidebarTrigger className="-mr-1 ml-auto rotate-180" />
        </header>
        <div className="flex flex-1 flex-col gap-8 p-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Task 3: Form Submission with Server Actions</h1>
            <p className="text-lg text-muted-foreground">
              Use React Actions to handle form submissions on the server side, removing the need for an API route.
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Objective</h2>
              <p className="text-muted-foreground">
                Implement a form that uses a Server Action to process submissions without creating an API route.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Instructions</h2>
              <div className="space-y-4 text-muted-foreground">
                <ol className="list-decimal pl-6 space-y-4">
                  <li>
                    <p>Create a Server Action file to handle form submissions:</p>
                    <CodeBlock code={actionsCode} language="tsx" filename="app/tasks/3/actions.ts" />
                  </li>
                  <li>
                    <p>Create a form component that uses the Server Action:</p>
                    <CodeBlock
                      code={productFormCode}
                      language="tsx"
                      filename="app/tasks/3/components/product-form.tsx"
                    />
                  </li>
                  <li>
                    <p>Create a page that displays the products and the form:</p>
                    <CodeBlock code={productsPageCode} language="tsx" filename="app/tasks/3/products/page.tsx" />
                  </li>
                  <li>
                    <p>Test the form by adding new products and verifying that they appear in the list.</p>
                  </li>
                </ol>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Key Concepts</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Server Actions run exclusively on the server.</li>
                <li>They can be called directly from Client Components without creating API routes.</li>
                <li>They automatically handle form data serialization and validation.</li>
                <li>They support progressive enhancement for forms that work without JavaScript.</li>
                <li>Server Actions simplify the code flow by removing the need for explicit fetch calls.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Example Implementation</h2>
              <div className="rounded-lg border p-6">
                <h3 className="text-xl font-semibold mb-4">Server Action Demo</h3>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    This is a placeholder for the Server Action demo. In a real workshop, you would implement this
                    feature and see the form submission results here.
                  </p>
                  <p className="text-muted-foreground">
                    Visit{" "}
                    <Link href="/tasks/3/products" className="text-primary hover:underline">
                      /tasks/3/products
                    </Link>{" "}
                    after implementing the solution.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <Link
                href="/tasks/2"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              >
                Previous Task: Client Components
              </Link>
              <Link
                href="/tasks/4"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                Next Task: Optimistic UI
              </Link>
            </div>
          </div>
        </div>
      </SidebarInset>
      <AppSidebar side="right" />
    </SidebarProvider>
  );
}
