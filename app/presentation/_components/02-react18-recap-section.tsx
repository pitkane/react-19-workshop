export default function React18RecapSection() {
  return (
    <section id="react18" className="space-y-4">
      <h2 className="text-3xl font-bold">02. React 18 Recap</h2>
      <div className="space-y-4">
        <p>React 18 introduced several groundbreaking features that set the stage for React 19:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Concurrent rendering capabilities</li>
          <li>Improved Suspense features</li>
          <li>Automatic batching of state updates</li>
          <li>New hooks like useTransition and useDeferredValue</li>
        </ul>
        <p>
          React 18 also introduced experimental Server Components, but they weren&apos;t widely adopted. This sets the
          stage for why React 19&apos;s updates are so important - they make these features stable and production-ready.
        </p>
      </div>
    </section>
  );
}
