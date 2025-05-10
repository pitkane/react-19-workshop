"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

export function CodeBlock({ code, language = "typescript", filename, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("rounded-md overflow-hidden my-4", className)}>
      {filename && (
        <div className="bg-muted px-4 py-2 border-b text-sm text-muted-foreground font-mono">{filename}</div>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={copyToClipboard}
          className="absolute right-2 top-2 p-2 rounded-md bg-background/80 hover:bg-background/60 transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
        <SyntaxHighlighter
          language={language}
          style={oneLight}
          customStyle={{
            margin: 0,
            padding: "1.5rem",
            borderRadius: filename ? "0" : "0.375rem",
            fontSize: "0.875rem",
          }}
          wrapLongLines={true}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
