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
    return data.results.slice(0, 8); // Limit to 8 characters for better UX
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

// TODO: Create a Server Action for rating submissions
// 1. Create a Server Action function with 'use server' directive
// 2. Extract characterId, rating, and comment from FormData
// 3. Validate the input data
// 4. Store the rating (use a simple in-memory store for this demo)
// 5. Return success/error response
//
// Example structure:
// 'use server'
//
// // Simple in-memory store for ratings
// const characterRatings: Record<number, { ratings: number[]; comments: string[] }> = {}
//
// export async function submitRating(formData: FormData) {
//   const characterId = parseInt(formData.get('characterId') as string)
//   const rating = parseInt(formData.get('rating') as string)
//   const comment = formData.get('comment') as string
//
//   // Your validation and storage logic here
// }

// TODO: Create a RatingForm component
// 1. Create a form that accepts characterId as a prop
// 2. Use the Server Action directly in the form's action prop
// 3. Include fields for rating (1-5) and optional comment
// 4. No 'use client' needed - this can be a Server Component!
//
// Example structure:
// interface RatingFormProps {
//   characterId: number
// }
//
// function RatingForm({ characterId }: RatingFormProps) {
//   return (
//     <form action={submitRating} className="space-y-3">
//       <input type="hidden" name="characterId" value={characterId} />
//       {/* Your form fields here */}
//     </form>
//   )
// }

export default async function WorkPage() {
  // Server-side data fetching - already implemented
  const characters = await getCharacters();

  return (
    <>
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Work Area: Server Actions</h1>
        <p className="text-lg">Add a character rating system using Server Actions.</p>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border p-4 bg-blue-50">
          <h2 className="text-lg font-semibold mb-2">✅ Character Data Fetching Complete</h2>
          <p className="text-sm text-blue-700">
            The Rick and Morty character data is already being fetched on the server. Your task is to add a Server
            Action for rating characters.
          </p>
        </div>

        <div className="rounded-lg border p-4 bg-yellow-50">
          <h2 className="text-lg font-semibold mb-2">🔧 Your Task</h2>
          <p className="text-sm text-yellow-700 mb-2">Create a Server Action and form to rate characters:</p>
          <ul className="list-disc pl-5 text-sm text-yellow-700 space-y-1">
            <li>Add a Server Action function with 'use server' directive</li>
            <li>Create a rating form that uses the Server Action</li>
            <li>Store ratings in a simple in-memory data structure</li>
            <li>Display submitted ratings below each character</li>
            <li>Test that it works without client-side JavaScript</li>
          </ul>
        </div>

        {characters.length === 0 ? (
          <div className="text-center py-12 bg-red-50 rounded-lg border border-red-200">
            <h3 className="text-xl font-semibold mb-2 text-red-700">Failed to load characters</h3>
            <p className="text-red-600">There was an error fetching data from the Rick and Morty API.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Rick and Morty Characters ({characters.length} showing)</h2>
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
                  </div>

                  {/* TODO: Add your RatingForm component here */}
                  {/* <RatingForm characterId={character.id} /> */}

                  <div className="mt-4 p-3 bg-gray-100 rounded text-center text-sm text-gray-600">
                    Add Rating Form here
                  </div>

                  {/* TODO: Display existing ratings here */}
                  <div className="mt-3 p-2 bg-gray-50 rounded text-xs text-gray-500">
                    Ratings will appear here after submission
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="rounded-lg border p-4 bg-green-50">
          <h2 className="text-lg font-semibold mb-2">💡 Server Actions Benefits</h2>
          <ul className="list-disc pl-5 text-sm text-green-700 space-y-1">
            <li>
              <strong>No API routes needed:</strong> Server Actions eliminate the need for separate API endpoints
            </li>
            <li>
              <strong>Progressive enhancement:</strong> Forms work even with JavaScript disabled
            </li>
            <li>
              <strong>Automatic revalidation:</strong> Server Components re-render automatically after actions
            </li>
            <li>
              <strong>Type safety:</strong> Full TypeScript support between client forms and server actions
            </li>
            <li>
              <strong>Simplified data flow:</strong> Direct form submission to server-side logic
            </li>
          </ul>
        </div>

        <div className="flex justify-between pt-6">
          <Link
            href="/tasks/3"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Back to Instructions
          </Link>
          <Link
            href="/tasks/3/solution"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            View Solution
          </Link>
        </div>
      </div>
    </>
  );
}
