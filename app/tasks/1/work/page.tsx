import Link from "next/link";

// you can import types from the types.ts file
// import { Character } from "@/types";

// Create your getCharacters function here

export default async function WorkPage() {
  // Fetch characters here. Note that this component is a Server Component, so you can await directly in the component body.

  return (
    <>
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Work Area: Server Components</h1>
        <p className="text-lg">Implement your solution here.</p>
      </div>

      <div className="space-y-6">
        {/* Render your characters here */}

        <div className="flex justify-between pt-6">
          <Link
            href="/tasks/1"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Back to Instructions
          </Link>
          <Link
            href="/tasks/1/solution"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            View Solution
          </Link>
        </div>
      </div>
    </>
  );
}
