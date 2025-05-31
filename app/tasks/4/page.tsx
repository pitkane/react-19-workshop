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
  // Simulate server latency (longer delay to demonstrate optimistic UI)
  await new Promise(resolve => setTimeout(resolve, 2000))
  
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

const submitButtonCode = `'use client'

import { useFormStatus } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

export function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Adding...
        </>
      ) : (
        'Add Product'
      )}
    </Button>
  )
}`;

const productFormCode = `'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { SubmitButton } from './submit-button'
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
        <SubmitButton />
      </form>
      
      {message && (
        <div className={isSuccess ? 'text-green-600' : 'text-red-600'}>
          {message}
        </div>
      )}
    </div>
  )
}`;

const productListCode = `'use client'

import { useOptimistic } from 'react'
import { Product } from '@/types'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { addProduct } from '../actions'

interface ProductListProps {
  initialProducts: Product[]
}

export function ProductList({ initialProducts }: ProductListProps) {
  // Set up optimistic state
  const [optimisticProducts, addOptimisticProduct] = useOptimistic(
    initialProducts,
    (state, newProduct: Product) => [...state, { ...newProduct, id: Math.random(), _optimistic: true }]
  )
  
  async function handleSubmit(formData: FormData) {
    // Create optimistic product
    const name = formData.get('name') as string
    const price = parseFloat(formData.get('price') as string)
    const description = formData.get('description') as string
    
    // Add optimistic product to the list
    addOptimisticProduct({ id: 0, name, price, description })
    
    // Submit the form data to the server
    await addProduct(formData)
    
    // Reset the form
    const form = document.getElementById('product-form') as HTMLFormElement
    form.reset()
  }
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-4">Products (Optimistic UI)</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {optimisticProducts.map(product => (
            <div 
              key={product.id} 
              className={\`border rounded-lg p-4 \${product._optimistic ? 'opacity-70 border-dashed' : ''}\`}
            >
              <h2 className="text-xl font-semibold flex items-center">
                {product.name}
                {product._optimistic && (
                  <Loader2 className="ml-2 h-4 w-4 animate-spin text-muted-foreground" />
                )}
              </h2>
              <p>{product.description}</p>
              <p className="font-medium mt-2">\${product.price.toFixed(2)}</p>
              {product._optimistic && (
                <p className="text-xs mt-2 italic">Adding to database...</p>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Add New Product (Optimistic)</h2>
        <form id="product-form" action={handleSubmit} className="space-y-4">
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
          <Button type="submit">Add Product (Optimistic)</Button>
        </form>
      </div>
    </div>
  )
}`;

const productsPageCode = `import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProductForm } from '../components/product-form'
import { ProductList } from '../components/product-list'
import { getProducts } from '../actions'
import { Product } from '@/types'

export default async function ProductsPage() {
  const products = await getProducts()
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Optimistic UI and Loading States</h1>
      
      <Tabs defaultValue="loading">
        <TabsList>
          <TabsTrigger value="loading">Loading States</TabsTrigger>
          <TabsTrigger value="optimistic">Optimistic Updates</TabsTrigger>
        </TabsList>
        <TabsContent value="loading" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(product => (
              <div key={product.id} className="border rounded-lg p-4">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p>{product.description}</p>
                <p className="font-medium mt-2">\${product.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
          
          <div className="border rounded-lg p-6">
            <ProductForm />
          </div>
        </TabsContent>
        <TabsContent value="optimistic" className="mt-6">
          <ProductList initialProducts={products} />
        </TabsContent>
      </Tabs>
    </div>
  )
}`;

export default function Task4Page() {
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
                <BreadcrumbPage>Task 4: Optimistic UI</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <SidebarTrigger className="-mr-1 ml-auto rotate-180" />
        </header>
        <div className="flex flex-1 flex-col gap-8 p-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Task 4: Optimistic UI and Transition States</h1>
            <p className="text-lg">
              Enhance user experience with optimistic updates and loading states using React 19's new hooks.
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Objective</h2>
              <p>
                Implement optimistic UI updates and loading states to improve the user experience during asynchronous
                operations.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Instructions</h2>
              <div className="space-y-4">
                <ol className="list-decimal pl-6 space-y-4">
                  <li>
                    <p>Create a Server Action file similar to Task 3:</p>
                    <CodeBlock code={actionsCode} language="tsx" filename="app/tasks/4/actions.ts" />
                  </li>
                  <li>
                    <p>Create a form component that uses useFormStatus for loading states:</p>
                    <CodeBlock
                      code={submitButtonCode}
                      language="tsx"
                      filename="app/tasks/4/components/submit-button.tsx"
                    />
                  </li>
                  <li>
                    <p>Create a product form component that uses the SubmitButton:</p>
                    <CodeBlock
                      code={productFormCode}
                      language="tsx"
                      filename="app/tasks/4/components/product-form.tsx"
                    />
                  </li>
                  <li>
                    <p>Create a product list component with optimistic updates using useOptimistic:</p>
                    <CodeBlock
                      code={productListCode}
                      language="tsx"
                      filename="app/tasks/4/components/product-list.tsx"
                    />
                  </li>
                  <li>
                    <p>Create a page that demonstrates both approaches:</p>
                    <CodeBlock code={productsPageCode} language="tsx" filename="app/tasks/4/products/page.tsx" />
                  </li>
                  <li>
                    <p>Test both approaches and observe the differences in user experience.</p>
                  </li>
                </ol>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Key Concepts</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>useFormStatus provides the status of the current form submission.</li>
                <li>useOptimistic allows for immediate UI updates before server operations complete.</li>
                <li>These hooks work together to create a responsive and user-friendly experience.</li>
                <li>Optimistic updates improve perceived performance by showing changes immediately.</li>
                <li>Loading states provide feedback during asynchronous operations.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Example Implementation</h2>
              <div className="rounded-lg border p-6">
                <h3 className="text-xl font-semibold mb-4">Optimistic UI Demo</h3>
                <div className="space-y-4">
                  <p>
                    This is a placeholder for the Optimistic UI demo. In a real workshop, you would implement these
                    features and see the optimistic updates and loading states in action.
                  </p>
                  <p>
                    Visit{" "}
                    <Link href="/tasks/4/products" className="text-primary hover:underline">
                      /tasks/4/products
                    </Link>{" "}
                    after implementing the solution.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <Link
                href="/tasks/3"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              >
                Previous Task: Server Actions
              </Link>
              <Link
                href="/tasks/5"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                Next Task: React Compiler
              </Link>
            </div>
          </div>
        </div>
      </SidebarInset>
      <AppSidebar side="right" />
    </SidebarProvider>
  );
}
