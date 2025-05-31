import { AppSidebar } from "@/components/app-sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";

export default function Page() {
  return (
    <SidebarProvider>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>React 19 Workshop</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <SidebarTrigger className="-mr-1 ml-auto rotate-180" />
        </header>
        <div className="flex flex-1 flex-col gap-8 p-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Welcome to React 19 Workshop</h1>
            <p className="text-lg">Learn about the latest features in React 19 through this interactive workshop.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Link
              href="/presentation"
              className="group relative rounded-lg border p-6 hover:border-foreground/50 transition-colors"
            >
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Presentation</h2>
                <p>
                  Learn about React 19's new features, including Server Components, Actions, and the React Compiler.
                </p>
              </div>
            </Link>

            <Link
              href="/tasks"
              className="group relative rounded-lg border p-6 hover:border-foreground/50 transition-colors"
            >
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Workshop Tasks</h2>
                <p>Get hands-on experience with React 19's features through practical coding exercises.</p>
              </div>
            </Link>
          </div>

          <div className="rounded-lg border p-6">
            <h2 className="text-2xl font-semibold tracking-tight mb-4">Workshop Overview</h2>
            <div className="space-y-4">
              <p>
                This workshop is designed to help you understand and implement React 19's new features. The presentation
                provides an overview of the key concepts, while the tasks give you hands-on experience with implementing
                these features.
              </p>
              <h3 className="text-xl font-semibold text-foreground">What You'll Learn:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>React Server Components and their benefits</li>
                <li>Server Actions for handling form submissions and data mutations</li>
                <li>Client Components and when to use them</li>
                <li>Optimistic UI updates and loading states</li>
                <li>The new React Compiler and its optimizations</li>
              </ul>
            </div>
          </div>
        </div>
      </SidebarInset>
      <AppSidebar side="right" />
    </SidebarProvider>
  );
}
