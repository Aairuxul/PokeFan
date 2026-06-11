"use client";

import { useEffect } from "react";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
      <span className="select-none text-7xl">⚠️</span>
      <h1 className="text-3xl font-bold">Une erreur est survenue</h1>
      <p className="max-w-md text-gray-400">
        Une erreur inattendue s&apos;est produite. Vous pouvez réessayer ou
        contacter le support si le problème persiste.
      </p>
      {error.message && (
        <p className="font-mono text-xs text-red-600">
          Message : {error.message}
        </p>
      )}
      <button
        onClick={() => unstable_retry()}
        className="mt-2 cursor-pointer rounded-lg bg-gray-800 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-700"
      >
        Réessayer
      </button>
    </div>
  );
}
