import { CodeBlock } from "@/components/code-block";
import Link from "next/link";

const characterPageCode = `import { Character } from '@/types'

async function getCharacters(): Promise<Character[]> {
  // Fetch characters from Rick and Morty API
  const response = await fetch('https://rickandmortyapi.com/api/character')
  
  if (!response.ok) {
    throw new Error('Failed to fetch characters')
  }
  
  const data = await response.json()
  return data.results
}

export default async function CharactersPage() {
  const characters = await getCharacters()
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Rick and Morty Characters</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {characters.map(character => (
          <div key={character.id} className="border rounded-lg p-4">
            <img 
              src={character.image} 
              alt={character.name}
              className="w-full h-48 object-cover rounded-md mb-3"
            />
            <h2 className="text-xl font-semibold">{character.name}</h2>
            <p className="text-neutral-600">Status: {character.status}</p>
            <p className="text-neutral-600">Species: {character.species}</p>
            <p className="text-neutral-600">Location: {character.location.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}`;

const characterTypeCode = `export interface Character {
  id: number
  name: string
  status: 'Alive' | 'Dead' | 'unknown'
  species: string
  type: string
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown'
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  image: string
  episode: string[]
  url: string
  created: string
}`;

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
                  Create a Server Component that fetches character data from the Rick and Morty API. Since it's a Server
                  Component, you can await directly in the component body:
                </p>
                <CodeBlock code={characterPageCode} language="tsx" filename="app/tasks/1/work/page.tsx" />
              </li>
              <li>
                <p>Create a types file to define the Character type (from the API documentation):</p>
                <CodeBlock code={characterTypeCode} language="typescript" filename="types.ts" />
              </li>
              <li>
                <p>
                  API Endpoint: <code>https://rickandmortyapi.com/api/character</code> - returns the first 20 characters
                  with pagination info.
                </p>
              </li>
              <li>
                <p>Display each character with their image, name, status, species, and current location.</p>
              </li>
              <li>
                <p>
                  After implementation, verify that the content appears on page load and view the page source to see
                  that data came with the initial HTML.
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
