import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";

export default function TasksPage() {
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
                <BreadcrumbPage>Workshop Tasks</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <SidebarTrigger className="-mr-1 ml-auto rotate-180" />
        </header>
        <div className="flex flex-1 flex-col gap-8 p-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Workshop Tasks</h1>
            <p className="text-lg text-muted-foreground">
              Complete these hands-on exercises to learn React 19's new features.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/tasks/1">
              <Card className="h-full hover:border-foreground/50 transition-colors">
                <CardHeader>
                  <CardTitle>Task 1: Server Components</CardTitle>
                  <CardDescription>Data Fetching with React Server Components</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Learn how to fetch and render data directly on the server using React Server Components.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/tasks/2">
              <Card className="h-full hover:border-foreground/50 transition-colors">
                <CardHeader>
                  <CardTitle>Task 2: Client Components</CardTitle>
                  <CardDescription>Adding Interactivity with Client Components</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Integrate client-side interactivity within the server component structure.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/tasks/3">
              <Card className="h-full hover:border-foreground/50 transition-colors">
                <CardHeader>
                  <CardTitle>Task 3: Server Actions</CardTitle>
                  <CardDescription>Form Submission with Server Actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Handle form submissions directly on the server without creating API routes.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/tasks/4">
              <Card className="h-full hover:border-foreground/50 transition-colors">
                <CardHeader>
                  <CardTitle>Task 4: Optimistic UI</CardTitle>
                  <CardDescription>Enhancing UX with React 19's New Hooks</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Implement optimistic updates and loading states using React 19's new hooks.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/tasks/5">
              <Card className="h-full hover:border-foreground/50 transition-colors">
                <CardHeader>
                  <CardTitle>Task 5: React Compiler</CardTitle>
                  <CardDescription>Exploring Automatic Memoization</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    See how the React Compiler automatically optimizes your components without manual memoization.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>

          <div className="rounded-lg border p-6">
            <h2 className="text-2xl font-semibold tracking-tight mb-4">Workshop Instructions</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                This workshop is structured as a series of tasks in a Next.js 15 application. Each task focuses on a
                specific feature of React 19. Follow these steps to complete the workshop:
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Navigate through each task using the sidebar or the cards above.</li>
                <li>Read the instructions and implement the solution in your code editor.</li>
                <li>Use the sidebar to switch between the presentation slides and task instructions as needed.</li>
                <li>If you get stuck, refer to the hints provided or ask for assistance.</li>
              </ol>
            </div>
          </div>
        </div>
      </SidebarInset>
      <AppSidebar side="right" />
    </SidebarProvider>
  );
}
