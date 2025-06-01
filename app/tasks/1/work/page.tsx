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

// TODO: Define the Character interface based on the Rick and Morty API
// Hint: Check the API documentation at https://rickandmortyapi.com/documentation/#rest
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Character {
  // Add your interface properties here
}

// TODO: Implement the async function to fetch characters from the Rick and Morty API
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getCharacters(): Promise<Character[]> {
  // Fetch from https://rickandmortyapi.com/api/character
  // Remember to handle errors and return the results array

  // Your implementation here...
  return [];
}

export default async function WorkPage() {
  // TODO: Call the getCharacters function and render the results

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
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/tasks/1">Task 1</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Work Area</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <SidebarTrigger className="-mr-1 ml-auto rotate-180" />
        </header>
        <div className="flex flex-1 flex-col gap-8 p-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Work Area: Server Components</h1>
            <p className="text-lg">Implement your solution here using the Rick and Morty API.</p>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border p-6 bg-yellow-50">
              <h2 className="text-xl font-semibold mb-3">📝 Your Task</h2>
              <ol className="list-decimal pl-5 space-y-2 text-sm">
                <li>Define the Character interface based on the API response</li>
                <li>Implement the getCharacters() function to fetch from the API</li>
                <li>Render the characters in a grid layout with images and details</li>
                <li>Handle loading and error states appropriately</li>
              </ol>
            </div>

            <div className="rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-4">🚀 Your Implementation</h2>

              {/* TODO: Replace this placeholder with your character grid */}
              <div className="text-center py-12 bg-neutral-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Ready to implement!</h3>
                <p className="text-neutral-600 mb-4">
                  Your Rick and Morty characters will appear here once you complete the implementation.
                </p>
                <div className="space-x-4">
                  <Link
                    href="/tasks/1"
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
                  >
                    View Instructions
                  </Link>
                  <Link
                    href="/tasks/1/solution"
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
                  >
                    Need Help? View Solution
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-6 bg-blue-50">
              <h2 className="text-xl font-semibold mb-3">💡 Helpful Hints</h2>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>
                  The API endpoint is: <code>https://rickandmortyapi.com/api/character</code>
                </li>
                <li>
                  The response contains a <code>results</code> array with character objects
                </li>
                <li>Each character has properties like: id, name, status, species, image, location, etc.</li>
                <li>Since this is a Server Component, you can use async/await directly in the component</li>
                <li>Don't forget to handle the case where the API call fails</li>
              </ul>
            </div>

            <div className="flex justify-between pt-6">
              <Link
                href="/tasks/1"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              >
                Back to Instructions
              </Link>
              <Link
                href="/tasks/1/solution"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                View Solution
              </Link>
            </div>
          </div>
        </div>
      </SidebarInset>
      <AppSidebar side="right" />
    </SidebarProvider>
  );
}
