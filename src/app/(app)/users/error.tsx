"use client";

import { useEffect } from "react";

export default function UsersError({
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
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8 text-[var(--foreground)]">
      <span className="select-none text-7xl">👤</span>
      <h2 className="text-2xl font-bold">
        Erreur dans la section Utilisateurs
      </h2>
      <p className="max-w-md text-center text-gray-500">
        Impossible de charger les données utilisateurs. Vérifiez votre connexion
        ou réessayez dans quelques instants.
      </p>
      {error.message && (
        <pre className="max-w-lg overflow-auto rounded-lg bg-gray-900 px-4 py-2 text-xs text-red-400">
          {error.message}
        </pre>
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
