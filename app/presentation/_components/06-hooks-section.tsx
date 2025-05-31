import { CodeBlock } from "@/components/code-block";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  useActionStateFeedbackFormExampleCode,
  useActionStateShoppingCartExampleCode,
  useFormStatusButtonExampleCode,
  useOptimisticCommentsExampleCode,
  useOptimisticTodoListExampleCode,
} from "./code-examples";

export default function HooksSection() {
  return (
    <section id="hooks" className="space-y-4">
      <h2 className="text-3xl font-bold">06. New Hooks for Actions and Transitions</h2>
      <div className="space-y-4">
        <p>React 19 introduces three new hooks to complement Actions and improve UX for interactions:</p>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-foreground">useActionState</h3>
            <p>
              New in React 19, this hook simplifies managing form state and submission outcomes. It takes an action
              function and an initial state, returning the current state, a wrapped action to pass to the form, and a
              pending status.
            </p>

            <Tabs defaultValue="basic" className="w-full mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="basic">Basic Feedback Form</TabsTrigger>
                <TabsTrigger value="advanced">Shopping Cart</TabsTrigger>
              </TabsList>
              <TabsContent value="basic">
                <CodeBlock
                  code={useActionStateFeedbackFormExampleCode}
                  language="tsx"
                  filename="components/FeedbackForm.tsx"
                />
              </TabsContent>
              <TabsContent value="advanced">
                <CodeBlock
                  code={useActionStateShoppingCartExampleCode}
                  language="tsx"
                  filename="components/AddToCartForm.tsx"
                />
              </TabsContent>
            </Tabs>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground">useFormStatus</h3>
            <p>
              New in React 19, this hook provides the status (pending, data, method, action) of the parent{" "}
              <code>&lt;form&gt;</code> submission. It must be used within a component that is a descendant of a{" "}
              <code>&lt;form&gt;</code>. Useful for showing loading states on submit buttons or displaying submitted
              data.
            </p>
            <div className="my-4">
              <CodeBlock
                code={useFormStatusButtonExampleCode}
                language="tsx"
                filename="components/FormSubmitButton.tsx"
              />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground">useOptimistic</h3>
            <p>
              New in React 19, this hook enables optimistic UI updates. It allows you to update the UI immediately as if
              an async action (like a Server Action) has succeeded, then reconciles with the actual result when it
              returns.
            </p>

            <Tabs defaultValue="basic" className="w-full mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="basic">Basic Comments</TabsTrigger>
                <TabsTrigger value="advanced">Todo List</TabsTrigger>
              </TabsList>
              <TabsContent value="basic">
                <CodeBlock
                  code={useOptimisticCommentsExampleCode}
                  language="tsx"
                  filename="components/CommentsSection.tsx"
                />
              </TabsContent>
              <TabsContent value="advanced">
                <CodeBlock code={useOptimisticTodoListExampleCode} language="tsx" filename="components/TodoList.tsx" />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}
