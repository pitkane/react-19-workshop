"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Character } from "@/types";

// This function fetches characters - already implemented for you
async function fetchCharacters(): Promise<Character[]> {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results.slice(0, 12); // Limit for performance testing
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

// TODO: Create an expensive computation function
// This function simulates expensive character analysis
// Without React Compiler, this would need useMemo for optimization
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function analyzeCharacters(characters: Character[]) {
  console.log("🔄 Running expensive character analysis...");

  // Simulate expensive computation with nested loops
  const analysis = characters.map((character) => {
    let complexity = 0;

    // Expensive calculation 1: Name complexity
    for (let i = 0; i < character.name.length; i++) {
      for (let j = 0; j < 1000; j++) {
        complexity += character.name.charCodeAt(i % character.name.length);
      }
    }

    // Expensive calculation 2: Episode analysis
    const episodeScore = character.episode.reduce((score, episode) => {
      for (let k = 0; k < 100; k++) {
        score += episode.length;
      }
      return score;
    }, 0);

    return {
      id: character.id,
      name: character.name,
      complexity: complexity % 10000,
      episodeScore: episodeScore % 1000,
      powerLevel: (complexity + episodeScore) % 500,
      status: character.status,
    };
  });

  console.log("✅ Character analysis complete");
  return analysis;
}

// TODO: Create components to test React Compiler optimization
// 1. Create a component that shows character analysis results
// 2. Add buttons that trigger different types of re-renders
// 3. Test with console logs to see when expensive functions run
// 4. Compare behavior with/without manual memoization

// Example component structure (implement this):
// interface CharacterAnalysisProps {
//   characters: Character[]
// }
//
// function CharacterAnalysis({ characters }: CharacterAnalysisProps) {
//   // The React Compiler should automatically memoize this expensive computation
//   const analysis = analyzeCharacters(characters)
//
//   return (
//     <div>
//       {analysis.map(result => (
//         <div key={result.id}>
//           {result.name}: Power Level {result.powerLevel}
//         </div>
//       ))}
//     </div>
//   )
// }

export default function WorkPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const [filter, setFilter] = useState<"all" | "alive" | "dead">("all");

  // Load characters on mount
  useEffect(() => {
    fetchCharacters().then((data) => {
      setCharacters(data);
      setLoading(false);
    });
  }, []);

  // Filter characters based on status
  const filteredCharacters = characters.filter((character) => {
    if (filter === "all") return true;
    return character.status.toLowerCase() === filter;
  });

  if (loading) {
    return (
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Work Area: React Compiler</h1>
        <div className="text-center py-12">
          <p>Loading characters...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Work Area: React Compiler Optimization</h1>
        <p className="text-lg">
          Experiment with expensive computations and see React Compiler optimizations in action.
        </p>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border p-4 bg-blue-50">
          <h2 className="text-lg font-semibold mb-2">✅ Character Data Loaded</h2>
          <p className="text-sm text-blue-700">
            Rick and Morty character data is ready. Your task is to create expensive computations and observe how the
            React Compiler automatically optimizes them.
          </p>
        </div>

        <div className="rounded-lg border p-4 bg-yellow-50">
          <h2 className="text-lg font-semibold mb-2">🔧 Your Task</h2>
          <p className="text-sm text-yellow-700 mb-2">Implement and test React Compiler optimizations:</p>
          <ul className="list-disc pl-5 text-sm text-yellow-700 space-y-1">
            <li>Create a CharacterAnalysis component that uses the analyzeCharacters function</li>
            <li>Add console logs to track when expensive computations run</li>
            <li>Test with the counter and filter buttons below</li>
            <li>Notice how the compiler automatically memoizes expensive operations</li>
            <li>Open browser console to see optimization in action</li>
          </ul>
        </div>

        {/* Control Panel */}
        <div className="rounded-lg border p-4 bg-white">
          <h2 className="text-xl font-semibold mb-4">Performance Testing Controls</h2>
          <div className="flex flex-wrap gap-3 mb-4">
            <Button onClick={() => setCounter(counter + 1)} variant="outline">
              Increment Counter: {counter}
            </Button>

            <Button onClick={() => setFilter("all")} variant={filter === "all" ? "default" : "outline"}>
              All Characters ({characters.length})
            </Button>

            <Button onClick={() => setFilter("alive")} variant={filter === "alive" ? "default" : "outline"}>
              Alive ({characters.filter((c) => c.status === "Alive").length})
            </Button>

            <Button onClick={() => setFilter("dead")} variant={filter === "dead" ? "default" : "outline"}>
              Dead ({characters.filter((c) => c.status === "Dead").length})
            </Button>
          </div>

          <div className="text-sm text-gray-600">
            <p>
              <strong>Counter button:</strong> Updates state without changing character data (should not trigger
              expensive computation)
            </p>
            <p>
              <strong>Filter buttons:</strong> Change character data passed to analysis (should trigger recomputation)
            </p>
          </div>
        </div>

        {/* TODO: Add your CharacterAnalysis component here */}
        <div className="rounded-lg border p-4 bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">Character Analysis Results</h2>
          <div className="p-4 bg-white rounded border-2 border-dashed border-gray-300 text-center text-gray-500">
            <p className="mb-2">Your CharacterAnalysis component goes here</p>
            <p className="text-sm">
              Create a component that calls analyzeCharacters({filteredCharacters.length} characters) and displays the
              results
            </p>
          </div>
        </div>

        {/* Character Grid for Reference */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Character Data ({filteredCharacters.length} showing)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredCharacters.map((character) => (
              <div key={character.id} className="border rounded-lg p-3 bg-white shadow-sm">
                <Image
                  src={character.image}
                  alt={character.name}
                  width={200}
                  height={200}
                  className="w-full h-32 object-cover rounded-md mb-2"
                  loading="lazy"
                />
                <h3 className="font-semibold text-sm mb-1">{character.name}</h3>
                <div className="text-xs space-y-1">
                  <div className="flex items-center gap-1">
                    <span className="font-medium">Status:</span>
                    <span className={`px-1 py-0.5 rounded text-xs ${getStatusColor(character.status)}`}>
                      {character.status}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Episodes:</span> {character.episode.length}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border p-4 bg-green-50">
          <h2 className="text-lg font-semibold mb-2">💡 React Compiler Benefits</h2>
          <ul className="list-disc pl-5 text-sm text-green-700 space-y-1">
            <li>
              <strong>Automatic memoization:</strong> Expensive calculations are cached automatically
            </li>
            <li>
              <strong>Smart dependency tracking:</strong> Only re-runs when actual dependencies change
            </li>
            <li>
              <strong>No manual optimization:</strong> No need for useMemo, useCallback, or React.memo
            </li>
            <li>
              <strong>Build-time analysis:</strong> Optimizations happen during compilation, not runtime
            </li>
            <li>
              <strong>Better performance:</strong> Fewer unnecessary re-computations and re-renders
            </li>
          </ul>
        </div>

        <div className="flex justify-between pt-6">
          <Link
            href="/tasks/5"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Back to Instructions
          </Link>
          <Link
            href="/tasks/5/solution"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            View Solution
          </Link>
        </div>
      </div>
    </>
  );
}
