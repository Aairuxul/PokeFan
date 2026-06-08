export default function Loading() {
  return (
    <ul className="flex flex-col gap-2" aria-label="Chargement des types">
      {Array.from({ length: 8 }).map((_, i) => (
        <li key={i} className="h-7 w-44 animate-pulse rounded bg-gray-200" />
      ))}
    </ul>
  );
}
