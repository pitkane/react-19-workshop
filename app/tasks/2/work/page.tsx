import Link from "next/link";
import Image from "next/image";
import { Character } from "@/types";

// This function is already implemented for you - it fetches characters from the Rick and Morty API
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

// TODO: Create a FavoriteButton Client Component
// 1. Create a new component that accepts characterId as a prop
// 2. Add 'use client' directive at the top
// 3. Use useState to track favorite state
// 4. Render a button with heart icon that toggles on click
// 5. Style the button to show different states (favorited vs not)
//
// Example structure:
// 'use client'
// import { useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { Heart } from 'lucide-react'
//
// interface FavoriteButtonProps {
//   characterId: number
// }
//
// export function FavoriteButton({ characterId }: FavoriteButtonProps) {
//   // Your implementation here
// }

export default async function WorkPage() {
  // Server-side data fetching - already implemented
  const characters = await getCharacters();

  return (
    <>
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Work Area: Client Components</h1>
        <p className="text-lg">Add client-side interactivity to the server-rendered character data.</p>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border p-4 bg-blue-50">
          <h2 className="text-lg font-semibold mb-2">✅ Server-Side Fetching Complete</h2>
          <p className="text-sm text-blue-700">
            The Rick and Morty character data is already being fetched on the server. Your task is to add a
            FavoriteButton Client Component to each character card.
          </p>
        </div>

        <div className="rounded-lg border p-4 bg-yellow-50">
          <h2 className="text-lg font-semibold mb-2">🔧 Your Task</h2>
          <p className="text-sm text-yellow-700 mb-2">
            Create a FavoriteButton component and add it to each character card below:
          </p>
          <ul className="list-disc pl-5 text-sm text-yellow-700 space-y-1">
            <li>Add 'use client' directive to make it a Client Component</li>
            <li>Use useState to track favorite state for each character</li>
            <li>Include the button in each character card</li>
            <li>Style it to show favorited/not favorited states</li>
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

                  {/* TODO: Add your FavoriteButton component here */}
                  {/* <FavoriteButton characterId={character.id} /> */}

                  <div className="mt-3 p-2 bg-gray-100 rounded text-center text-sm text-gray-600">
                    Add FavoriteButton here
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between pt-6">
          <Link
            href="/tasks/2"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Back to Instructions
          </Link>
          <Link
            href="/tasks/2/solution"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            View Solution
          </Link>
        </div>
      </div>
    </>
  );
}
