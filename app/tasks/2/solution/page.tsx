import Link from "next/link";
import Image from "next/image";
import { Character } from "@/types";
import { FavoriteButton } from "./favorite-button";

// Server-side data fetching function
async function getCharacters(): Promise<Character[]> {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character", {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Failed to fetch characters:", error);
    return [];
  }
}

// Helper function to get status color styling
function getStatusColor(status: Character["status"]) {
  switch (status) {
    case "Alive":
      return "text-green-600 bg-green-100";
    case "Dead":
      return "text-red-600 bg-red-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
}

export default async function SolutionPage() {
  // Server-side data fetching
  const characters = await getCharacters();

  return (
    <>
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Solution: Client Components with Rick and Morty</h1>
        <p className="text-lg">Complete implementation showing Server/Client Component integration.</p>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border p-6 bg-green-50">
          <h2 className="text-xl font-semibold mb-3">✅ Implementation Complete</h2>
          <p className="text-sm text-green-700 mb-2">
            This solution demonstrates the optimal Server/Client Component architecture:
          </p>
          <ul className="list-disc pl-5 text-sm text-green-700 space-y-1">
            <li>Data fetching happens on the server in the Server Component</li>
            <li>FavoriteButton is a separate Client Component with 'use client' directive</li>
            <li>Each button maintains independent state using useState</li>
            <li>Favorites are persisted to localStorage for better UX</li>
            <li>Only the interactive parts require client-side JavaScript</li>
          </ul>
        </div>

        {characters.length === 0 ? (
          <div className="text-center py-12 bg-red-50 rounded-lg border border-red-200">
            <h3 className="text-xl font-semibold mb-2 text-red-700">Failed to load characters</h3>
            <p className="text-red-600">There was an error fetching data from the Rick and Morty API.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Rick and Morty Characters ({characters.length} total)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {characters.map((character) => (
                <div
                  key={character.id}
                  className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <Image
                    src={character.image}
                    alt={character.name}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover rounded-md mb-3"
                    loading="lazy"
                  />
                  <h3 className="text-xl font-semibold mb-2">{character.name}</h3>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Status:</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(character.status)}`}
                      >
                        {character.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-medium">Species:</span>
                      <span className="text-neutral-600">{character.species}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-medium">Location:</span>
                      <span className="text-neutral-600 text-xs">{character.location.name}</span>
                    </div>

                    <div className="pt-2 text-xs text-neutral-500">Episodes: {character.episode.length}</div>
                  </div>

                  {/* Client Component for interactivity */}
                  <FavoriteButton characterId={character.id} />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="rounded-lg border p-6 bg-blue-50">
          <h2 className="text-xl font-semibold mb-3">🔍 Key Implementation Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Server Component (this page):</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Async function for server-side data fetching</li>
                <li>No 'use client' directive needed</li>
                <li>Renders character data from API</li>
                <li>Includes Client Component as children</li>
                <li>SEO-friendly with server-rendered content</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Client Component (FavoriteButton):</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>'use client' directive at the top</li>
                <li>useState for local state management</li>
                <li>useEffect for localStorage integration</li>
                <li>Event handlers for user interactions</li>
                <li>Minimal JavaScript bundle size</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-lg border p-6 bg-purple-50">
          <h2 className="text-xl font-semibold mb-3">📁 File Structure</h2>
          <div className="space-y-2 text-sm font-mono">
            <div>
              📄 <code>app/tasks/2/solution/page.tsx</code> - Server Component (this file)
            </div>
            <div>
              📄 <code>app/tasks/2/solution/favorite-button.tsx</code> - Client Component
            </div>
          </div>
          <p className="text-sm text-purple-700 mt-2">
            This separation allows for optimal performance: server-rendered content with client-side interactivity only
            where needed.
          </p>
        </div>

        <div className="flex justify-between pt-6">
          <Link
            href="/tasks/2/work"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Back to Work Area
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
