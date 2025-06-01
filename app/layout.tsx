import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "React 19 Workshop",
  description:
    "Interactive workshop exploring React 19's new features including Server Components, Actions, and the React Compiler",
  generator: "Next.js 15",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
