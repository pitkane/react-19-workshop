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

          <div className="rounded-lg border p-6 bg-green-50">
            <h2 className="text-2xl font-semibold tracking-tight mb-4">🚀 Getting Started</h2>
            <div className="space-y-4">
              <p>
                Ready to dive in? You can either use the hosted version or run the workshop locally on your machine.
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-white rounded p-4 border">
                  <h3 className="text-lg font-semibold text-foreground mb-2">🌐 Use Hosted Version</h3>
                  <p className="text-sm mb-3">Access the workshop immediately without any setup:</p>
                  <a
                    href="https://react-19-workshop.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline font-mono text-sm"
                  >
                    react-19-workshop.vercel.app
                  </a>
                </div>

                <div className="bg-white rounded p-4 border">
                  <h3 className="text-lg font-semibold text-foreground mb-2">💻 Run Locally</h3>
                  <p className="text-sm mb-3">Clone and run on your machine for full development experience.</p>
                  <a
                    href="https://github.com/pitkane/react-19-workshop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline font-mono text-sm"
                  >
                    github.com/pitkane/react-19-workshop
                  </a>
                </div>
              </div>

              <div className="bg-white rounded p-4 border">
                <h3 className="text-lg font-semibold text-foreground mb-3">Local Setup Instructions</h3>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-2">Prerequisites:</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Node.js 18+ and npm</li>
                      <li>Experience with React, TypeScript, and Next.js</li>
                      <li>Basic understanding of server-side rendering concepts</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Installation:</h4>
                    <div className="bg-gray-50 rounded p-3 font-mono text-sm space-y-1">
                      <div># Clone the repository</div>
                      <div>git clone git@github.com:pitkane/react-19-workshop.git</div>
                      <div>cd react-19-workshop</div>
                      <div></div>
                      <div># Install dependencies</div>
                      <div>npm install</div>
                      <div></div>
                      <div># Start the development server</div>
                      <div>npm run dev</div>
                    </div>
                    <p className="text-sm mt-2 text-neutral-600">
                      Open <code className="bg-gray-100 px-1 rounded">http://localhost:3000</code> to access the
                      workshop.
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
                <li>React 19's enhanced metadata handling and simplified Context API</li>
                <li>The new React Compiler and its optimizations</li>
              </ul>
            </div>
          </div>

          <div className="rounded-lg border p-6 bg-blue-50">
            <h2 className="text-2xl font-semibold tracking-tight mb-4">About Next.js & App Router</h2>
            <div className="space-y-4">
              <p>
                This workshop is built with <strong>Next.js 15</strong> using the App Router, which provides a powerful
                folder-based routing system. Each folder in the <code>app/</code> directory represents a URL segment,
                making navigation intuitive and organized.
              </p>
              <h3 className="text-lg font-semibold text-foreground">Folder Structure:</h3>
              <div className="bg-white rounded p-4 border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 font-semibold">File Path</th>
                      <th className="text-left py-2 font-semibold">URL Route</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono">
                    <tr>
                      <td className="py-1">
                        <code>app/page.tsx</code>
                      </td>
                      <td className="py-1">
                        <code>/</code> <span className="text-neutral-600 font-sans">(this page)</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1">
                        <code>app/tasks/page.tsx</code>
                      </td>
                      <td className="py-1">
                        <code>/tasks</code>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1">
                        <code>app/tasks/1/page.tsx</code>
                      </td>
                      <td className="py-1">
                        <code>/tasks/1</code>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1">
                        <code>app/tasks/1/work/page.tsx</code>
                      </td>
                      <td className="py-1">
                        <code>/tasks/1/work</code>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1">
                        <code>app/tasks/layout.tsx</code>
                      </td>
                      <td className="py-1">
                        <span className="text-neutral-600 font-sans">
                          shared layout for all <code>/tasks/*</code> routes
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-neutral-600">
                This structure enables React 19's Server Components to work seamlessly with Next.js, allowing
                server-side rendering and client-side interactivity where needed.
              </p>
            </div>
          </div>
        </div>
      </SidebarInset>
      <AppSidebar side="right" />
    </SidebarProvider>
  );
}
