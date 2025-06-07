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
                      <li>Experience with React, TypeScript. Next.js experience helps.</li>
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

          <div className="rounded-lg border p-6 bg-gradient-to-br from-purple-50 to-blue-50">
            <h2 className="text-2xl font-semibold tracking-tight mb-4">👨‍💻 About the Author</h2>
            <div className="space-y-4">
              <div>
                <p className="text-lg font-semibold text-purple-900">Mikko Kohtala</p>
                <p className="text-sm text-gray-700">Senior Software Developer at Knowit</p>
              </div>

              <p className="text-gray-700">
                Enjoys sharing knowledge and helping developers stay up-to-date with the latest technologies and best
                practices.
              </p>

              <div className="flex items-center gap-4">
                <a
                  href="https://www.linkedin.com/in/mikko-kohtala/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  Connect on LinkedIn
                </a>
              </div>

              <div className="bg-white/70 rounded-lg p-4 border border-purple-100">
                <h3 className="font-semibold text-purple-900 mb-2">🚀 About Knowit Javascript Guild</h3>
                <p className="text-sm text-gray-700 mb-3">
                  This workshop was created as part of the Knowit Javascript Guild - a community of passionate
                  JavaScript developers sharing knowledge, best practices, and exploring the latest trends in web
                  development.
                </p>
                <a
                  href="https://github.com/knowit-finland-javascript-guild"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-purple-700 hover:text-purple-900 font-medium text-sm transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  Visit Knowit Javascript Guild on GitHub
                </a>
              </div>

              <div className="text-xs text-gray-600 pt-2 border-t border-purple-100">
                <p>
                  💡 <strong>Tip:</strong> Found this workshop helpful? Star the repository and share it with your team!
                </p>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
      <AppSidebar side="right" />
    </SidebarProvider>
  );
}
