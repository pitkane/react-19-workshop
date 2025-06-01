import Link from "next/link";

export default function Task1Page() {
  return (
    <>
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Task 1: Data Fetching with Server Components</h1>
        <p className="text-lg">
          Leverage React Server Components to fetch and render data from the Rick and Morty API.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Objective</h2>
          <p>
            Create a Server Component that fetches character data from the Rick and Morty REST API and renders it on the
            server.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Instructions</h2>
          <div className="space-y-4">
            <ol className="list-decimal pl-6 space-y-4">
              <li>
                <p>
                  Work in the file <code>app/tasks/1/work/page.tsx</code> - this is your workspace for implementing the
                  solution.
                </p>
              </li>
              <li>
                <p>
                  Import the <code>Character</code> type from <code>@/types</code> - this is already defined for you.
                </p>
              </li>
              <li>
                <p>
                  Create an async function called <code>getCharacters()</code> that fetches data from the Rick and Morty
                  API. The function should return a Promise of Character arrays.
                </p>
              </li>
              <li>
                <p>
                  Use the API endpoint: <code>https://rickandmortyapi.com/api/character</code> - this returns the first
                  20 characters with pagination info.
                </p>
              </li>
              <li>
                <p>
                  In your Server Component, call the <code>getCharacters()</code> function using await (since Server
                  Components can use async/await directly).
                </p>
              </li>
              <li>
                <p>
                  Display each character in a grid layout showing their image, name, status, species, and current
                  location.
                </p>
              </li>
              <li>
                <p>
                  After implementation, verify that the content appears on page load and view the page source to see
                  that data came with the initial HTML (this proves it's server-rendered).
                </p>
              </li>
            </ol>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Key Concepts</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>React Server Components run exclusively on the server.</li>
              <li>No useEffect or client-side state is needed for data fetching.</li>
              <li>Data is fetched before the response is sent to the client.</li>
              <li>The first render the user sees already includes the content.</li>
              <li>This reduces client-side JavaScript and improves performance.</li>
              <li>External API calls happen on the server, not in the browser.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Rick and Morty API</h2>
            <div className="rounded-lg border p-4 bg-neutral-50">
              <p className="mb-2">
                <strong>Base URL:</strong> <code>https://rickandmortyapi.com/api</code>
              </p>
              <p className="mb-2">
                <strong>Characters Endpoint:</strong> <code>/character</code>
              </p>
              <p className="mb-2">
                <strong>Documentation:</strong>{" "}
                <a
                  href="https://rickandmortyapi.com/documentation/#rest"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  rickandmortyapi.com
                </a>
              </p>
              <p className="text-sm text-neutral-600">
                The API returns 20 characters per page with info about pagination and character details including
                images.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Workshop Files</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-semibold mb-2">Work Area</h3>
              <p className="text-sm text-neutral-600 mb-3">Implement your solution here</p>
              <Link
                href="/tasks/1/work"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3"
              >
                Open Work File
              </Link>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-semibold mb-2">Solution</h3>
              <p className="text-sm text-neutral-600 mb-3">View the complete solution</p>
              <Link
                href="/tasks/1/solution"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
              >
                View Solution
              </Link>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-semibold mb-2">API Reference</h3>
              <p className="text-sm text-neutral-600 mb-3">Rick and Morty API docs</p>
              <a
                href="https://rickandmortyapi.com/documentation/#rest"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
              >
                API Docs ↗
              </a>
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
    </>
  );
}
