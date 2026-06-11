export function PokemonTypeListSkeleton() {
  return (
    <ul className="flex flex-col gap-2" aria-label="Chargement des types">
      {Array.from({ length: 8 }).map((_, i) => (
        <li key={i} className="h-7 w-44 animate-pulse rounded bg-gray-200" />
      ))}
    </ul>
  );
}

export function PokemonTypeDetailSkeleton() {
  return (
    <article className="flex flex-col gap-4">
      <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
      <div className="h-6 w-48 animate-pulse rounded bg-gray-300" />
      <div className="h-4 w-64 animate-pulse rounded bg-gray-200" />
      <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="h-8 animate-pulse rounded bg-gray-200"
          />
        ))}
      </div>
    </article>
  );
}
