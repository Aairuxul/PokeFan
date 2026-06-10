"use client";

import { useEffect } from "react";

export default function PokemonTypesError({
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
    <div className="flex flex-col items-center gap-4 py-12 text-center">
      <span className="select-none text-5xl">🛑</span>
      <h2 className="text-xl font-bold">
        Impossible de charger les types Pokémon
      </h2>
      <p className="max-w-md text-sm text-gray-500">{error.message}</p>
      <button
        onClick={() => unstable_retry()}
        className="cursor-pointer rounded-lg bg-gray-800 px-5 py-2 font-medium text-white hover:bg-gray-700"
      >
        Réessayer
      </button>
    </div>
  );
}
