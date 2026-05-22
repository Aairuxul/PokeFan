"use client";

import { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-950 text-white gap-6 p-8 font-sans">
        <span className="text-8xl select-none">⚠️</span>
        <h1 className="text-3xl font-bold">Une erreur est survenue</h1>
        <p className="text-gray-400 text-center max-w-md">
          Une erreur inattendue s&apos;est produite. Veuillez réessayer ou
          contacter le support si le problème persiste.
        </p>
        {error.message && (
          <p className="text-xs text-red-600 font-mono">
          Message : {error.message}
          </p>
        )}
      </div>
  );
}
