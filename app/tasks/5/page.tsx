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

const expensiveComponentCode = `'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface ExpensiveComponentProps {
  data: number[]
}

export function ExpensiveComponent({ data }: ExpensiveComponentProps) {
  const [count, setCount] = useState(0)
  
  // This expensive calculation is automatically memoized by the compiler
  const processedData = data.map(item => {
    // Simulate expensive computation
    let result = 0
    for (let i = 0; i < 10000; i++) {
      result += item
    }
    return { original: item, result }
  })
  
  // This function is automatically memoized by the compiler
  const handleClick = () => {
    setCount(count + 1)
    console.log('Button clicked')
  }
  
  console.log('ExpensiveComponent rendered')
  
  return (
    <div className="space-y-4 border rounded-lg p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Expensive Component</h2>
        <div className="text-sm text-muted-foreground">Render count: {count}</div>
      </div>
      
      <div>
        <Button onClick={handleClick}>Increment Counter</Button>
        <p className="mt-2 text-sm text-muted-foreground">
          Click this button to update state. Notice that the expensive calculation doesn't run again.
        </p>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Processed Data:</h3>
        <ul className="space-y-1">
          {processedData.map((item, index) => (
            <li key={index} className="text-sm">
              Original: {item.original}, Result: {item.result}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}`;

const parentComponentCode = `'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ExpensiveComponent } from './expensive-component'

export function ParentComponent() {
  const [parentCount, setParentCount] = useState(0)
  const [data, setData] = useState([1, 2, 3, 4, 5])
  
  const handleParentClick = () => {
    setParentCount(parentCount + 1)
    console.log('Parent button clicked')
  }
  
  const handleDataChange = () => {
    setData([...data, Math.floor(Math.random() * 100) + 1])
    console.log('Data changed')
  }
  
  console.log('ParentComponent rendered')
  
  return (
    <div className="space-y-6">
      <div className="space-y-4 border rounded-lg p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Parent Component</h2>
          <div className="text-sm text-muted-foreground">Render count: {parentCount}</div>
        </div>
        
        <div className="space-y-2">
          <Button onClick={handleParentClick} className="mr-2">
            Update Parent State
          </Button>
          <Button onClick={handleDataChange} variant="outline">
            Add Random Number
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground">
          The "Update Parent State" button updates state in the parent component, but doesn't affect the child's props.
          <br />
          The "Add Random Number" button changes the data prop passed to the child component.
        </p>
      </div>
      
      <ExpensiveComponent data={data} />
    </div>
  )
}`;

const compilerPageCode = `import { ParentComponent } from '../components/parent-component'

export default function CompilerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">React Compiler Demo</h1>
        <p className="text-muted-foreground">
          This demo shows how the React Compiler automatically optimizes components without manual memoization.
          Open your browser's console to see when components render.
        </p>
      </div>
      
      <ParentComponent />
      
      <div className="space-y-4 border rounded-lg p-6">
        <h2 className="text-xl font-semibold">How It Works</h2>
        <div className="space-y-2 text-muted-foreground">
          <p>
            The React Compiler automatically memoizes components, functions, and calculations at build time.
            In this example:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              The expensive calculation in the child component is automatically memoized.
            </li>
            <li>
              When you click "Update Parent State", only the parent component re-renders.
            </li>
            <li>
              When you click "Add Random Number", both components re-render because the props changed.
            </li>
            <li>
              Without the React Compiler, you would need to manually use useMemo and useCallback.
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}`;

export default function Task5Page() {
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
                <BreadcrumbPage>Task 5: React Compiler</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <SidebarTrigger className="-mr-1 ml-auto rotate-180" />
        </header>
        <div className="flex flex-1 flex-col gap-8 p-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Task 5: Exploring the React Compiler</h1>
            <p className="text-lg text-muted-foreground">
              See how the React Compiler automatically optimizes your components without manual memoization.
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Objective</h2>
              <p className="text-muted-foreground">
                Understand how the React 19 Compiler automatically optimizes your components and when to rely on its
                optimizations.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Instructions</h2>
              <div className="space-y-4 text-muted-foreground">
                <ol className="list-decimal pl-6 space-y-4">
                  <li>
                    <p>Create a component that would traditionally require manual optimization:</p>
                    <CodeBlock
                      code={expensiveComponentCode}
                      language="tsx"
                      filename="app/tasks/5/components/expensive-component.tsx"
                    />
                  </li>
                  <li>
                    <p>Create a parent component that renders the ExpensiveComponent:</p>
                    <CodeBlock
                      code={parentComponentCode}
                      language="tsx"
                      filename="app/tasks/5/components/parent-component.tsx"
                    />
                  </li>
                  <li>
                    <p>Create a page that demonstrates the React Compiler's optimizations:</p>
                    <CodeBlock code={compilerPageCode} language="tsx" filename="app/tasks/5/compiler/page.tsx" />
                  </li>
                  <li>
                    <p>
                      Test the component by clicking the buttons and observing the console logs to see when components
                      render.
                    </p>
                  </li>
                </ol>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Key Concepts</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>The React 19 Compiler automatically memoizes components, functions, and calculations.</li>
                <li>It analyzes your code at build time to determine what needs to be memoized.</li>
                <li>It reduces the need for manual optimization with useMemo, useCallback, and React.memo.</li>
                <li>It helps prevent unnecessary re-renders without adding complexity to your code.</li>
                <li>The compiler optimizations are applied automatically, with no runtime cost.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Example Implementation</h2>
              <div className="rounded-lg border p-6">
                <h3 className="text-xl font-semibold mb-4">React Compiler Demo</h3>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    This is a placeholder for the React Compiler demo. In a real workshop, you would implement
                    components that demonstrate the compiler's automatic optimizations.
                  </p>
                  <p className="text-muted-foreground">
                    Visit{" "}
                    <Link href="/tasks/5/compiler" className="text-primary hover:underline">
                      /tasks/5/compiler
                    </Link>{" "}
                    after implementing the solution.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <Link
                href="/tasks/4"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              >
                Previous Task: Optimistic UI
              </Link>
              <Link
                href="/tasks"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                Back to Tasks
              </Link>
            </div>
          </div>
        </div>
      </SidebarInset>
      <AppSidebar side="right" />
    </SidebarProvider>
  );
}
