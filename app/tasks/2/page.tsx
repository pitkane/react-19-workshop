import Link from "next/link";

export default function Task2Page() {
  return (
    <>
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Task 2: Adding Interactivity with Client Components</h1>
        <p className="text-lg">
          Integrate Client Components for interactivity within the Server Component structure using the Rick and Morty
          API.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Objective</h2>
          <p>
            Add client-side interactivity to server-rendered character data by creating a "favorite" button that works
            with local state, demonstrating the hybrid server/client component architecture.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Instructions</h2>
          <div className="space-y-4">
            <ol className="list-decimal pl-6 space-y-4">
              <li>
                <p>
                  Work in the file <code>app/tasks/2/work/page.tsx</code> - the server-side data fetching is already
                  implemented for you using the Rick and Morty API.
                </p>
              </li>
              <li>
                <p>
                  Create a Client Component called <code>FavoriteButton</code> that accepts a character ID as a prop.
                </p>
              </li>
              <li>
                <p>
                  The component should use <code>useState</code> to track whether a character is favorited or not.
                </p>
              </li>
              <li>
                <p>
                  Add the <code>'use client'</code> directive at the top of your Client Component file.
                </p>
              </li>
              <li>
                <p>
                  Include the <code>FavoriteButton</code> component in each character card in the server-rendered list.
                </p>
              </li>
              <li>
                <p>
                  Style the button to show different states (favorited vs not favorited) using a heart icon or similar.
                </p>
              </li>
              <li>
                <p>
                  Test that the button state changes on click and that each character's favorite state is independent.
                </p>
              </li>
            </ol>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Key Concepts</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Server Components render on the server and cannot use browser APIs or React hooks.</li>
              <li>Client Components run in the browser and can use useState, useEffect, and event handlers.</li>
              <li>Use the 'use client' directive to mark a component as a Client Component.</li>
              <li>Server Components can pass data to Client Components as props.</li>
              <li>Only the interactive parts need to be Client Components - keep the data fetching on the server.</li>
              <li>This hybrid approach minimizes JavaScript bundle size while maintaining interactivity.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Implementation Tips</h2>
            <div className="rounded-lg border p-4 bg-neutral-50">
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>
                  <strong>Component Structure:</strong> Keep the data fetching and character list rendering in the
                  Server Component.
                </li>
                <li>
                  <strong>Client Component:</strong> Only the favorite button needs the 'use client' directive.
                </li>
                <li>
                  <strong>Props:</strong> Pass the character ID to the FavoriteButton component.
                </li>
                <li>
                  <strong>State:</strong> Use useState to track the favorited state locally.
                </li>
                <li>
                  <strong>Icons:</strong> Use Lucide React icons (Heart, HeartOff) for visual feedback.
                </li>
                <li>
                  <strong>Styling:</strong> Use conditional classes to show different button states.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Workshop Files</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-semibold mb-2">Work Area</h3>
              <p className="text-sm text-neutral-600 mb-3">Implement your client component solution</p>
              <Link
                href="/tasks/2/work"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3"
              >
                Open Work File
              </Link>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-semibold mb-2">Solution</h3>
              <p className="text-sm text-neutral-600 mb-3">View the complete solution</p>
              <Link
                href="/tasks/2/solution"
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
            href="/tasks/1"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Previous Task: Server Components
          </Link>
          <Link
            href="/tasks/3"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Next Task: Server Actions
          </Link>
        </div>
      </div>
    </>
  );
}
