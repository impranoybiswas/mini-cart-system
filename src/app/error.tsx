"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-dvh flex items-center justify-center p-4 bg-background">
      <div className="max-w-md w-full flex flex-col items-center text-center p-8 bg-foreground/2 border border-foreground/10 rounded-3xl shadow-xl shadow-black/5 backdrop-blur-xl">
        <div className="w-16 h-16 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mb-6">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-foreground mb-3">
          Something went wrong!
        </h2>

        <p className="text-foreground/60 mb-8 max-w-[280px]">
          We encountered an unexpected error while processing your request.
          Please try again.
        </p>

        <button
          onClick={() => reset()}
          className="w-full btn bg-primary text-white h-12 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="font-semibold">Try again</span>
        </button>
      </div>
    </div>
  );
}
