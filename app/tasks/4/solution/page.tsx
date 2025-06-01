"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, createContext, ReactNode, use } from "react";
import { Button } from "@/components/ui/button";
import { Character } from "@/types";
import { Monitor, Moon, Sparkles, Grid, List, Eye, EyeOff } from "lucide-react";

// Character fetching function
async function fetchCharacters(): Promise<Character[]> {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results.slice(0, 8);
  } catch (error) {
    console.error("Failed to fetch characters:", error);
    return [];
  }
}

// Helper function to get status color styling with theme support
function getStatusColor(status: Character["status"], theme: string) {
  const baseClasses = {
    Alive:
      theme === "dark"
        ? "text-green-400 bg-green-900/20"
        : theme === "cosmic"
          ? "text-green-300 bg-green-500/20"
          : "text-green-600 bg-green-100",
    Dead:
      theme === "dark"
        ? "text-red-400 bg-red-900/20"
        : theme === "cosmic"
          ? "text-red-300 bg-red-500/20"
          : "text-red-600 bg-red-100",
    unknown:
      theme === "dark"
        ? "text-gray-400 bg-gray-800/20"
        : theme === "cosmic"
          ? "text-purple-300 bg-purple-500/20"
          : "text-gray-600 bg-gray-100",
  };

  return baseClasses[status] || baseClasses["unknown"];
}

// Theme Context with React 19's improved patterns
interface ThemeContextType {
  theme: "light" | "dark" | "cosmic";
  displayMode: "grid" | "list";
  showDetails: boolean;
  setTheme: (theme: "light" | "dark" | "cosmic") => void;
  setDisplayMode: (mode: "grid" | "list") => void;
  setShowDetails: (show: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

// Theme Provider Component
function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark" | "cosmic">("light");
  const [displayMode, setDisplayMode] = useState<"grid" | "list">("grid");
  const [showDetails, setShowDetails] = useState(true);

  const contextValue: ThemeContextType = {
    theme,
    displayMode,
    showDetails,
    setTheme,
    setDisplayMode,
    setShowDetails,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <div className={getThemeClasses(theme)}>{children}</div>
    </ThemeContext.Provider>
  );
}

// Get theme classes for the root container
function getThemeClasses(theme: string) {
  switch (theme) {
    case "dark":
      return "bg-gray-900 text-white min-h-screen";
    case "cosmic":
      return "bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white min-h-screen";
    default:
      return "bg-white text-gray-900 min-h-screen";
  }
}

// Theme Controls Component using React 19's use() hook
function ThemeControls() {
  // React 19's new use() hook - simpler than useContext!
  const themeContext = use(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemeControls must be used within a ThemeProvider");
  }

  const { theme, displayMode, showDetails, setTheme, setDisplayMode, setShowDetails } = themeContext;

  return (
    <div
      className={`rounded-lg border p-4 ${
        theme === "dark"
          ? "bg-gray-800 border-gray-700"
          : theme === "cosmic"
            ? "bg-purple-800/30 border-purple-500/30"
            : "bg-gray-50 border-gray-200"
      }`}
    >
      <h2 className="text-xl font-semibold mb-4">Theme Controls</h2>

      <div className="space-y-4">
        {/* Theme Selection */}
        <div>
          <h3 className="text-sm font-medium mb-2">Theme</h3>
          <div className="flex gap-2">
            <Button size="sm" variant={theme === "light" ? "default" : "outline"} onClick={() => setTheme("light")}>
              <Monitor className="w-4 h-4 mr-1" />
              Light
            </Button>
            <Button size="sm" variant={theme === "dark" ? "default" : "outline"} onClick={() => setTheme("dark")}>
              <Moon className="w-4 h-4 mr-1" />
              Dark
            </Button>
            <Button size="sm" variant={theme === "cosmic" ? "default" : "outline"} onClick={() => setTheme("cosmic")}>
              <Sparkles className="w-4 h-4 mr-1" />
              Cosmic
            </Button>
          </div>
        </div>

        {/* Display Mode */}
        <div>
          <h3 className="text-sm font-medium mb-2">Display Mode</h3>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={displayMode === "grid" ? "default" : "outline"}
              onClick={() => setDisplayMode("grid")}
            >
              <Grid className="w-4 h-4 mr-1" />
              Grid
            </Button>
            <Button
              size="sm"
              variant={displayMode === "list" ? "default" : "outline"}
              onClick={() => setDisplayMode("list")}
            >
              <List className="w-4 h-4 mr-1" />
              List
            </Button>
          </div>
        </div>

        {/* Show Details Toggle */}
        <div>
          <h3 className="text-sm font-medium mb-2">Options</h3>
          <Button size="sm" variant={showDetails ? "default" : "outline"} onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? <Eye className="w-4 h-4 mr-1" /> : <EyeOff className="w-4 h-4 mr-1" />}
            {showDetails ? "Hide Details" : "Show Details"}
          </Button>
        </div>
      </div>
    </div>
  );
}

// Themed Character Card using use() hook
interface ThemedCharacterCardProps {
  character: Character;
  isSelected: boolean;
  onClick: () => void;
}

function ThemedCharacterCard({ character, isSelected, onClick }: ThemedCharacterCardProps) {
  // Using React 19's new use() hook instead of useContext
  const themeContext = use(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemedCharacterCard must be used within a ThemeProvider");
  }

  const { theme, displayMode, showDetails } = themeContext;

  const getCardClasses = () => {
    const baseClasses = "border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md";
    const themeClasses = {
      light: "bg-white hover:bg-gray-50 border-gray-200",
      dark: "bg-gray-800 hover:bg-gray-700 border-gray-700",
      cosmic: "bg-purple-800/20 hover:bg-purple-700/30 border-purple-500/30",
    };

    const selectionClasses = isSelected
      ? "ring-2 ring-blue-500 " +
        (theme === "light" ? "bg-blue-50" : theme === "dark" ? "bg-blue-900/20" : "bg-blue-500/20")
      : "";

    return `${baseClasses} ${themeClasses[theme]} ${selectionClasses}`;
  };

  if (displayMode === "list") {
    return (
      <div className={getCardClasses()} onClick={onClick}>
        <div className="flex items-center gap-4">
          <Image
            src={character.image}
            alt={character.name}
            width={80}
            height={80}
            className="w-20 h-20 object-cover rounded-md"
            loading="lazy"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{character.name}</h3>
            {showDetails && (
              <div className="text-sm space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Status:</span>
                  <span className={`px-2 py-1 rounded text-xs ${getStatusColor(character.status, theme)}`}>
                    {character.status}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Species:</span> {character.species}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={getCardClasses()} onClick={onClick}>
      <Image
        src={character.image}
        alt={character.name}
        width={200}
        height={200}
        className="w-full h-40 object-cover rounded-md mb-3"
        loading="lazy"
      />
      <h3 className="font-semibold text-sm mb-2">{character.name}</h3>
      {showDetails && (
        <div className="text-xs space-y-1">
          <div className="flex items-center gap-1">
            <span className="font-medium">Status:</span>
            <span className={`px-1 py-0.5 rounded text-xs ${getStatusColor(character.status, theme)}`}>
              {character.status}
            </span>
          </div>
          <div>
            <span className="font-medium">Species:</span> {character.species}
          </div>
        </div>
      )}
    </div>
  );
}

// Character Details Component using use() hook
function CharacterDetails({ character }: { character: Character }) {
  const themeContext = use(ThemeContext);

  if (!themeContext) {
    throw new Error("CharacterDetails must be used within a ThemeProvider");
  }

  const { theme } = themeContext;

  const detailsClasses = `rounded-lg border p-6 ${
    theme === "dark"
      ? "bg-gray-800 border-gray-700"
      : theme === "cosmic"
        ? "bg-purple-800/20 border-purple-500/30"
        : "bg-white border-gray-200"
  }`;

  return (
    <div className={detailsClasses}>
      <h2 className="text-xl font-semibold mb-4">Character Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Image
            src={character.image}
            alt={character.name}
            width={300}
            height={300}
            className="w-full h-64 object-cover rounded-md"
          />
        </div>
        <div className="space-y-3">
          <h3 className="text-2xl font-bold">{character.name}</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-medium">Status:</span>
              <span className={`px-2 py-1 rounded ${getStatusColor(character.status, theme)}`}>{character.status}</span>
            </div>
            <div>
              <span className="font-medium">Species:</span> {character.species}
            </div>
            <div>
              <span className="font-medium">Gender:</span> {character.gender}
            </div>
            <div>
              <span className="font-medium">Origin:</span> {character.origin.name}
            </div>
            <div>
              <span className="font-medium">Location:</span> {character.location.name}
            </div>
            <div>
              <span className="font-medium">Episodes:</span> {character.episode.length} appearances
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Component
function CharacterExplorerContent() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  // Using use() hook to get theme context
  const themeContext = use(ThemeContext);

  if (!themeContext) {
    throw new Error("CharacterExplorerContent must be used within a ThemeProvider");
  }

  const { theme, displayMode } = themeContext;

  // Load characters on mount
  useEffect(() => {
    fetchCharacters().then((data) => {
      setCharacters(data);
      setLoading(false);
    });
  }, []);

  // Dynamic page title update - React 19 improvement
  useEffect(() => {
    if (selectedCharacter) {
      document.title = `${selectedCharacter.name} - Rick and Morty Character`;
    } else {
      document.title = "Character Explorer - React 19 Workshop";
    }

    // In React 19, you could also use the new metadata APIs for better SEO
    // This is a simplified example using document.title for compatibility
  }, [selectedCharacter]);

  if (loading) {
    return (
      <div className="space-y-4 p-8">
        <h1 className="text-4xl font-bold">Solution: React 19 Improvements</h1>
        <div className="text-center py-12">
          <p>Loading characters...</p>
        </div>
      </div>
    );
  }

  const gridClasses = displayMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" : "space-y-4";

  return (
    <div className="space-y-6 p-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Solution: React 19 Improvements</h1>
        <p className="text-lg">Complete implementation with dynamic page titles and the new use() Context hook.</p>
      </div>

      <div
        className={`rounded-lg border p-6 ${
          theme === "light"
            ? "bg-green-50 border-green-200"
            : theme === "dark"
              ? "bg-green-900/20 border-green-500/30"
              : "bg-green-500/20 border-green-400/30"
        }`}
      >
        <h2 className="text-xl font-semibold mb-3">✅ Implementation Complete</h2>
        <p className={`text-sm mb-2 ${theme === "light" ? "text-green-700" : "text-green-300"}`}>
          This solution demonstrates React 19's improvements:
        </p>
        <ul className={`list-disc pl-5 text-sm space-y-1 ${theme === "light" ? "text-green-700" : "text-green-300"}`}>
          <li>Dynamic page titles that update based on selected character</li>
          <li>Context consumption with the new use() hook instead of useContext</li>
          <li>Theme system with light, dark, and cosmic modes</li>
          <li>Simplified Context patterns with better TypeScript support</li>
          <li>Enhanced component architecture with less boilerplate</li>
        </ul>
      </div>

      {/* Theme Controls */}
      <ThemeControls />

      {/* Character Selection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Character Explorer</h2>
          <div className="text-sm opacity-75">
            {selectedCharacter ? `Selected: ${selectedCharacter.name}` : "No character selected"}
          </div>
        </div>

        {/* Character Grid/List */}
        <div className={gridClasses}>
          {characters.map((character) => (
            <ThemedCharacterCard
              key={character.id}
              character={character}
              isSelected={selectedCharacter?.id === character.id}
              onClick={() => setSelectedCharacter(character)}
            />
          ))}
        </div>
      </div>

      {/* Selected Character Details */}
      {selectedCharacter && <CharacterDetails character={selectedCharacter} />}

      <div
        className={`rounded-lg border p-6 ${
          theme === "light"
            ? "bg-blue-50 border-blue-200"
            : theme === "dark"
              ? "bg-blue-900/20 border-blue-500/30"
              : "bg-blue-500/20 border-blue-400/30"
        }`}
      >
        <h2 className="text-xl font-semibold mb-3">🔍 Key Implementation Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">React 19 use() Hook:</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Replaced useContext with use(ThemeContext)</li>
              <li>Simpler syntax and better TypeScript inference</li>
              <li>Works with Promises and async operations</li>
              <li>More intuitive error handling</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Dynamic Metadata:</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Page title updates automatically</li>
              <li>Based on selected character state</li>
              <li>Better SEO and user experience</li>
              <li>React 19's enhanced metadata APIs</li>
            </ul>
          </div>
        </div>
      </div>

      <div
        className={`rounded-lg border p-6 ${
          theme === "light"
            ? "bg-purple-50 border-purple-200"
            : theme === "dark"
              ? "bg-purple-900/20 border-purple-500/30"
              : "bg-purple-500/20 border-purple-400/30"
        }`}
      >
        <h2 className="text-xl font-semibold mb-3">🎯 Try It Out</h2>
        <p className="text-sm mb-2">Test the React 19 improvements:</p>
        <ul className="list-disc pl-5 text-sm space-y-1">
          <li>Click different characters and watch the browser tab title change</li>
          <li>Switch between light, dark, and cosmic themes</li>
          <li>Toggle between grid and list display modes</li>
          <li>Show/hide character details</li>
          <li>Notice the clean use() hook syntax in the code</li>
        </ul>
      </div>

      <div className="flex justify-between pt-6">
        <Link
          href="/tasks/4/work"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          Back to Work Area
        </Link>
        <Link
          href="/tasks/5"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Next Task: React Compiler
        </Link>
      </div>
    </div>
  );
}

// Root Component with Theme Provider
export default function SolutionPage() {
  return (
    <ThemeProvider>
      <CharacterExplorerContent />
    </ThemeProvider>
  );
}
