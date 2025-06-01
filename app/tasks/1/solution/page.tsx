import Link from "next/link";

// Character interface based on the Rick and Morty API
interface Character {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: "Female" | "Male" | "Genderless" | "unknown";
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

// API response interface
interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

// Fetch characters from the Rick and Morty API
async function getCharacters(): Promise<Character[]> {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character", {
      // Add caching for better performance in production
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    return data.results;
  } catch (error) {
    console.error("Failed to fetch characters:", error);
    // In a real app, you might want to throw the error or return a fallback
    return [];
  }
}

// Function to get status color for styling
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
  // Fetch characters on the server
  const characters = await getCharacters();

  return (
    <>
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Solution: Rick and Morty Characters</h1>
        <p className="text-lg">Server Components fetching data from the Rick and Morty API.</p>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border p-6 bg-green-50">
          <h2 className="text-xl font-semibold mb-3">✅ Implementation Complete</h2>
          <p className="text-sm text-green-700">
            This page demonstrates a fully working Server Component that fetches character data from the Rick and Morty
            API and renders it on the server. The data is fetched during the server-side render and included in the
            initial HTML.
          </p>
        </div>

        {characters.length === 0 ? (
          <div className="text-center py-12 bg-red-50 rounded-lg border border-red-200">
            <h3 className="text-xl font-semibold mb-2 text-red-700">Failed to load characters</h3>
            <p className="text-red-600">
              There was an error fetching data from the Rick and Morty API. Please check your internet connection and
              try again.
            </p>
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
                  <img
                    src={character.image}
                    alt={character.name}
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

                    {character.type && (
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Type:</span>
                        <span className="text-neutral-600">{character.type}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <span className="font-medium">Gender:</span>
                      <span className="text-neutral-600">{character.gender}</span>
                    </div>

                    <div className="pt-2 border-t">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">Origin:</span>
                        <span className="text-neutral-600 text-xs">{character.origin.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Location:</span>
                        <span className="text-neutral-600 text-xs">{character.location.name}</span>
                      </div>
                    </div>

                    <div className="pt-2 text-xs text-neutral-500">Episodes: {character.episode.length}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="rounded-lg border p-6 bg-blue-50">
          <h2 className="text-xl font-semibold mb-3">🔍 Key Implementation Details</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>
              <strong>Server Component:</strong> This component runs on the server and can use async/await directly
            </li>
            <li>
              <strong>API Integration:</strong> Fetches data from the Rick and Morty REST API at build/request time
            </li>
            <li>
              <strong>Error Handling:</strong> Gracefully handles API failures with try/catch
            </li>
            <li>
              <strong>TypeScript:</strong> Fully typed interfaces for API responses and character data
            </li>
            <li>
              <strong>Performance:</strong> Images use lazy loading, and API responses can be cached
            </li>
            <li>
              <strong>UI/UX:</strong> Responsive grid layout with hover effects and status indicators
            </li>
          </ul>
        </div>

        <div className="flex justify-between pt-6">
          <Link
            href="/tasks/1/work"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Back to Work Area
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
