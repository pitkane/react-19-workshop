import Link from "next/link";

export default function Task3Page() {
  return (
    <>
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Task 3: Form Submission with Server Actions</h1>
        <p className="text-lg">
          Use React Server Actions to handle form submissions without creating API routes, implementing a character
          rating system.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Objective</h2>
          <p>
            Create a form that allows users to rate Rick and Morty characters using Server Actions. The form submission
            will be handled entirely on the server without needing custom API routes.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Instructions</h2>
          <div className="space-y-4">
            <ol className="list-decimal pl-6 space-y-4">
              <li>
                <p>
                  Work in the file <code>app/tasks/3/work/page.tsx</code> - the character data fetching is already
                  implemented for you using the Rick and Morty API.
                </p>
              </li>
              <li>
                <p>
                  Create a Server Action function called <code>submitRating</code> using the <code>'use server'</code>{" "}
                  directive.
                </p>
              </li>
              <li>
                <p>
                  The Server Action should accept FormData and extract the character ID, rating (1-5 stars), and
                  optional comment.
                </p>
              </li>
              <li>
                <p>
                  Create a rating form component that uses the Server Action directly in the form's <code>action</code>{" "}
                  prop.
                </p>
              </li>
              <li>
                <p>
                  Display the submitted ratings below each character card, showing the average rating and recent
                  comments.
                </p>
              </li>
              <li>
                <p>
                  Test that form submission works without any client-side JavaScript and updates the UI automatically.
                </p>
              </li>
            </ol>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Key Concepts</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Server Actions run exclusively on the server and have access to server-side resources.</li>
              <li>They can be called directly from forms without creating API routes.</li>
              <li>Server Actions automatically handle form data serialization.</li>
              <li>They support progressive enhancement - forms work even without JavaScript.</li>
              <li>No need for manual fetch calls or API endpoint creation.</li>
              <li>Automatic revalidation of server components after action completion.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Implementation Tips</h2>
            <div className="rounded-lg border p-4 bg-neutral-50">
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>
                  <strong>Server Action:</strong> Use 'use server' at the top of your action function.
                </li>
                <li>
                  <strong>Form Data:</strong> Extract data using <code>formData.get('fieldName')</code>.
                </li>
                <li>
                  <strong>Validation:</strong> Add basic validation in the Server Action.
                </li>
                <li>
                  <strong>Storage:</strong> Use a simple in-memory store or local data structure for ratings.
                </li>
                <li>
                  <strong>Progressive Enhancement:</strong> Form should work without JavaScript enabled.
                </li>
                <li>
                  <strong>Revalidation:</strong> Server components automatically re-render after the action.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Workshop Files</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-semibold mb-2">Work Area</h3>
              <p className="text-sm text-neutral-600 mb-3">Implement your Server Action solution</p>
              <Link
                href="/tasks/3/work"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3"
              >
                Open Work File
              </Link>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-semibold mb-2">Solution</h3>
              <p className="text-sm text-neutral-600 mb-3">View the complete solution</p>
              <Link
                href="/tasks/3/solution"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
              >
                View Solution
              </Link>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-semibold mb-2">API Reference</h3>
              <p className="text-sm text-neutral-600 mb-3">React Server Actions docs</p>
              <a
                href="https://react.dev/reference/rsc/server-actions"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
              >
                React Docs ↗
              </a>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <Link
            href="/tasks/2"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Previous Task: Client Components
          </Link>
          <Link
            href="/tasks/4"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Next Task: Optimistic UI
          </Link>
        </div>
      </div>
    </>
  );
}
