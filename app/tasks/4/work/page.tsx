"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
// import { createContext } from "react"; // Uncomment when implementing context
import { Character } from "@/types";

// Character fetching function - already implemented for you
async function fetchCharacters(): Promise<Character[]> {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results.slice(0, 8); // Limit for better UX
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

// TODO: Create a Theme/Settings Context
// Example context structure you can implement:
/*
interface ThemeContextType {
  theme: "light" | "dark" | "cosmic";
  displayMode: "grid" | "list";
  showDetails: boolean;
  setTheme: (theme: "light" | "dark" | "cosmic") => void;
  setDisplayMode: (mode: "grid" | "list") => void;
  setShowDetails: (show: boolean) => void;
}
*/

// Create the context (implement this)
// const ThemeContext = createContext<ThemeContextType | null>(null);

// TODO: Create components that use the new use() hook
// Instead of useContext(ThemeContext), you'll use use(ThemeContext)
//
// Example component structure:
// function ThemedCharacterCard({ character }: { character: Character }) {
//   const theme = use(ThemeContext); // React 19's new use() hook
//
//   return (
//     <div className={theme.theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'}>
//       {/* Character card content */}
//     </div>
//   );
// }

export default function WorkPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  // Load characters on mount
  useEffect(() => {
    fetchCharacters().then((data) => {
      setCharacters(data);
      setLoading(false);
    });
  }, []);

  // TODO: Implement dynamic page title update
  // Use React 19's enhanced metadata handling to update the page title
  // when a character is selected. For example:
  useEffect(() => {
    if (selectedCharacter) {
      // Update page title with character name
      document.title = `${selectedCharacter.name} - Rick and Morty Character`;
    } else {
      document.title = "Character Explorer - React 19 Workshop";
    }

    // React 19 provides better APIs for this, but for compatibility we use document.title
    // In a real React 19 app, you might use the new metadata APIs
  }, [selectedCharacter]);

  if (loading) {
    return (
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Work Area: React 19 Improvements</h1>
        <div className="text-center py-12">
          <p>Loading characters...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Work Area: React 19 Improvements</h1>
        <p className="text-lg">Implement dynamic page titles and the new use() Context hook.</p>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border p-4 bg-blue-50">
          <h2 className="text-lg font-semibold mb-2">✅ Character Data Loaded</h2>
          <p className="text-sm text-blue-700">
            Rick and Morty character data is ready. Your task is to implement dynamic page titles and Context with the
            use() hook.
          </p>
        </div>

        <div className="rounded-lg border p-4 bg-yellow-50">
          <h2 className="text-lg font-semibold mb-2">🔧 Your Task</h2>
          <p className="text-sm text-yellow-700 mb-2">Implement React 19 improvements:</p>
          <ul className="list-disc pl-5 text-sm text-yellow-700 space-y-1">
            <li>Create a ThemeProvider that wraps the character interface</li>
            <li>Implement components that use use(ThemeContext) instead of useContext</li>
            <li>Add theme switching (light/dark/cosmic themes)</li>
            <li>Create dynamic page titles that update when selecting characters</li>
            <li>Test the page title changes in your browser tab</li>
          </ul>
        </div>

        {/* Character Selection */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Character Explorer</h2>
            <div className="text-sm text-gray-600">
              {selectedCharacter ? `Selected: ${selectedCharacter.name}` : "No character selected"}
            </div>
          </div>

          {/* Character Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {characters.map((character) => (
              <div
                key={character.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                  selectedCharacter?.id === character.id
                    ? "ring-2 ring-blue-500 bg-blue-50"
                    : "bg-white hover:bg-gray-50"
                }`}
                onClick={() => setSelectedCharacter(character)}
              >
                <Image
                  src={character.image}
                  alt={character.name}
                  width={200}
                  height={200}
                  className="w-full h-40 object-cover rounded-md mb-3"
                  loading="lazy"
                />
                <h3 className="font-semibold text-sm mb-2">{character.name}</h3>
                <div className="text-xs space-y-1">
                  <div className="flex items-center gap-1">
                    <span className="font-medium">Status:</span>
                    <span className={`px-1 py-0.5 rounded text-xs ${getStatusColor(character.status)}`}>
                      {character.status}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Species:</span> {character.species}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Character Details */}
        {selectedCharacter && (
          <div className="rounded-lg border p-6 bg-white">
            <h2 className="text-xl font-semibold mb-4">Character Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Image
                  src={selectedCharacter.image}
                  alt={selectedCharacter.name}
                  width={300}
                  height={300}
                  className="w-full h-64 object-cover rounded-md"
                />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold">{selectedCharacter.name}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Status:</span>
                    <span className={`px-2 py-1 rounded ${getStatusColor(selectedCharacter.status)}`}>
                      {selectedCharacter.status}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Species:</span> {selectedCharacter.species}
                  </div>
                  <div>
                    <span className="font-medium">Gender:</span> {selectedCharacter.gender}
                  </div>
                  <div>
                    <span className="font-medium">Origin:</span> {selectedCharacter.origin.name}
                  </div>
                  <div>
                    <span className="font-medium">Location:</span> {selectedCharacter.location.name}
                  </div>
                  <div>
                    <span className="font-medium">Episodes:</span> {selectedCharacter.episode.length} appearances
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TODO: Add theme controls here */}
        <div className="rounded-lg border p-4 bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">Theme Controls (TODO)</h2>
          <div className="p-4 bg-white rounded border-2 border-dashed border-gray-300 text-center text-gray-500">
            <p className="mb-2">Your theme context and controls go here</p>
            <p className="text-sm">Create theme provider and components that use the new use() hook</p>
          </div>
        </div>

        <div className="rounded-lg border p-4 bg-green-50">
          <h2 className="text-lg font-semibold mb-2">💡 React 19 Features</h2>
          <ul className="list-disc pl-5 text-sm text-green-700 space-y-1">
            <li>
              <strong>Dynamic Titles:</strong> Page title updates when you select different characters
            </li>
            <li>
              <strong>use() Hook:</strong> Simpler Context consumption than useContext
            </li>
            <li>
              <strong>Better TypeScript:</strong> Enhanced type inference with the new hook
            </li>
            <li>
              <strong>Cleaner Code:</strong> Less boilerplate for Context patterns
            </li>
            <li>
              <strong>Async Support:</strong> use() hook works with Promises and other async operations
            </li>
          </ul>
        </div>

        <div className="rounded-lg border p-4 bg-purple-50">
          <h2 className="text-lg font-semibold mb-2">🎯 Testing Instructions</h2>
          <ul className="list-disc pl-5 text-sm text-purple-700 space-y-1">
            <li>Click on different characters and watch the browser tab title change</li>
            <li>Implement the ThemeProvider with light/dark/cosmic themes</li>
            <li>Create components that use use(ThemeContext) instead of useContext</li>
            <li>Test theme switching to see visual changes</li>
            <li>Notice how the new use() hook simplifies Context consumption</li>
          </ul>
        </div>

        <div className="flex justify-between pt-6">
          <Link
            href="/tasks/4"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Back to Instructions
          </Link>
          <Link
            href="/tasks/4/solution"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            View Solution
          </Link>
        </div>
      </div>
    </>
  );
}
