import Link from "next/link";
import Image from "next/image";
import { Character } from "@/types";
import { Star } from "lucide-react";
import { revalidatePath } from "next/cache";
import { SubmitButton } from "./_components/submit-button";

// Simple in-memory store for ratings (in a real app, this would be a database)
const characterRatings: Record<
  number,
  { ratings: number[]; comments: { rating: number; comment: string; timestamp: string }[] }
> = {};

// Server Action for submitting ratings
async function submitRating(formData: FormData) {
  "use server";

  const characterId = parseInt(formData.get("characterId") as string);
  const rating = parseInt(formData.get("rating") as string);
  const comment = (formData.get("comment") as string).trim();

  // Validate input
  if (!characterId || isNaN(characterId)) {
    throw new Error("Invalid character ID");
  }

  if (!rating || rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5 stars");
  }

  // Initialize ratings for character if not exists
  if (!characterRatings[characterId]) {
    characterRatings[characterId] = { ratings: [], comments: [] };
  }

  // Add rating
  characterRatings[characterId].ratings.push(rating);

  // Add comment if provided
  if (comment) {
    characterRatings[characterId].comments.push({
      rating,
      comment,
      timestamp: new Date().toLocaleTimeString(),
    });
  }

  // Simulate network delay for demo purposes
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Revalidate the current page to show updated ratings immediately
  revalidatePath("/tasks/3/solution");
}

// Get character ratings
function getCharacterRatings(characterId: number) {
  const data = characterRatings[characterId];
  if (!data || data.ratings.length === 0) {
    return { averageRating: 0, totalRatings: 0, comments: [] };
  }

  const average = data.ratings.reduce((sum, rating) => sum + rating, 0) / data.ratings.length;
  return {
    averageRating: Math.round(average * 10) / 10,
    totalRatings: data.ratings.length,
    comments: data.comments.slice(-3), // Show last 3 comments
  };
}

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

// Rating form component (Client Component for loading states)
interface RatingFormProps {
  characterId: number;
}

function RatingForm({ characterId }: RatingFormProps) {
  return (
    <form action={submitRating} className="space-y-3 p-3 bg-slate-50 rounded-lg">
      <h4 className="font-medium text-sm">Rate this character:</h4>
      <input type="hidden" name="characterId" value={characterId} />

      <div className="space-y-2">
        <label htmlFor={`rating-${characterId}`} className="text-sm font-medium">
          Rating (1-5 stars):
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <label key={star} className="cursor-pointer">
              <input type="radio" name="rating" value={star} required className="sr-only peer" />
              <Star className="w-5 h-5 text-gray-300 hover:text-yellow-400 peer-checked:text-yellow-400 peer-checked:fill-current" />
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor={`comment-${characterId}`} className="text-sm font-medium">
          Comment (optional):
        </label>
        <textarea
          id={`comment-${characterId}`}
          name="comment"
          placeholder="Share your thoughts about this character..."
          className="w-full min-h-[60px] text-sm p-2 border border-gray-300 rounded-md resize-none"
          rows={3}
        />
      </div>

      <SubmitButton />
    </form>
  );
}

// Rating display component
interface RatingDisplayProps {
  characterId: number;
}

function RatingDisplay({ characterId }: RatingDisplayProps) {
  const { averageRating, totalRatings, comments } = getCharacterRatings(characterId);

  if (totalRatings === 0) {
    return <div className="p-2 bg-gray-50 rounded text-xs text-gray-500">No ratings yet. Be the first to rate!</div>;
  }

  return (
    <div className="p-3 bg-yellow-50 rounded-lg space-y-2">
      <div className="flex items-center gap-2">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${star <= averageRating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
            />
          ))}
        </div>
        <span className="text-sm font-medium">{averageRating}</span>
        <span className="text-xs text-gray-600">
          ({totalRatings} rating{totalRatings !== 1 ? "s" : ""})
        </span>
      </div>

      {comments.length > 0 && (
        <div className="space-y-1">
          <h5 className="text-xs font-medium text-gray-700">Recent comments:</h5>
          {comments.map((comment, index) => (
            <div key={index} className="text-xs bg-white p-2 rounded border">
              <div className="flex items-center gap-1 mb-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-3 h-3 ${star <= comment.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-gray-500">• {comment.timestamp}</span>
              </div>
              <p className="text-gray-700">{comment.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default async function SolutionPage() {
  // Server-side data fetching
  const characters = await getCharacters();

  return (
    <>
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Solution: Server Actions with Character Ratings</h1>
        <p className="text-lg">Complete implementation of Server Actions for form submission without API routes.</p>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border p-6 bg-green-50">
          <h2 className="text-xl font-semibold mb-3">✅ Implementation Complete</h2>
          <p className="text-sm text-green-700 mb-2">
            This solution demonstrates Server Actions for handling form submissions:
          </p>
          <ul className="list-disc pl-5 text-sm text-green-700 space-y-1">
            <li>Server Action with 'use server' directive for rating submission</li>
            <li>Form components that work as Server Components (no client-side JavaScript)</li>
            <li>Progressive enhancement - forms work without JavaScript enabled</li>
            <li>Automatic revalidation after form submission via revalidatePath()</li>
            <li>In-memory storage for ratings (would be database in real app)</li>
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

                  {/* Server Action Form */}
                  <div className="mt-4">
                    <RatingForm characterId={character.id} />
                  </div>

                  {/* Display ratings */}
                  <div className="mt-3">
                    <RatingDisplay characterId={character.id} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="rounded-lg border p-6 bg-blue-50">
          <h2 className="text-xl font-semibold mb-3">🔍 Key Implementation Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Server Action Features:</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>'use server' directive for server-side execution</li>
                <li>FormData extraction and validation</li>
                <li>In-memory storage (could be database)</li>
                <li>Error handling and validation</li>
                <li>revalidatePath() for immediate UI updates</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Architecture Benefits:</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>No API routes needed for form handling</li>
                <li>Progressive enhancement out of the box</li>
                <li>Type-safe communication between client and server</li>
                <li>Simplified data flow and state management</li>
                <li>Automatic server component revalidation</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-lg border p-6 bg-purple-50">
          <h2 className="text-xl font-semibold mb-3">🎯 Try It Out</h2>
          <p className="text-sm text-purple-700 mb-2">Test the Server Action functionality:</p>
          <ul className="list-disc pl-5 text-sm text-purple-700 space-y-1">
            <li>Rate any character above using the star rating</li>
            <li>Add an optional comment and submit</li>
            <li>Notice how the page updates automatically to show your rating immediately</li>
            <li>Try disabling JavaScript - the form still works!</li>
            <li>Refresh the page - your ratings persist (in memory)</li>
          </ul>
        </div>

        <div className="flex justify-between pt-6">
          <Link
            href="/tasks/3/work"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Back to Work Area
          </Link>
          <Link
            href="/tasks/4"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Next Task: React 19 Improvements
          </Link>
        </div>
      </div>
    </>
  );
}
