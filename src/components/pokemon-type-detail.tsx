import Link from "next/link";
import { notFound } from "next/navigation";
import { getPokemonType } from "@/services/pokemonAPI";

const PAGE_SIZE = 12;

export async function PokemonTypeDetailContent({
  id,
  page = 1,
}: {
  id: string;
  page?: number;
}) {
  const type = await getPokemonType(id);

  if (!type) {
    notFound();
  }

  const totalPages = Math.ceil(type.pokemons.length / PAGE_SIZE);
  const safePage = Math.min(Math.max(1, page), totalPages || 1);
  const paginated = type.pokemons.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  return (
    <article className="flex flex-col gap-4">
      <Link
        href="/pokemonTypes"
        className="text-sm text-gray-400 hover:underline"
      >
        ← Retour à la liste
      </Link>
      <h2 className="text-xl font-semibold">
        {type.name} <span className="text-gray-400">#{type.id}</span>
      </h2>
      <p className="text-sm text-gray-400">
        {type.pokemons.length} Pokémon de ce type
      </p>
      <ul className="grid grid-cols-2 gap-1 sm:grid-cols-3">
        {paginated.map(name => (
          <li
            key={name}
            className="rounded bg-gray-100 px-2 py-1 text-sm capitalize text-black"
          >
            {name}
          </li>
        ))}
      </ul>
      {totalPages > 1 && (
        <nav className="flex items-center justify-between gap-2 pt-2" aria-label="Pagination">
          {safePage > 1 ? (
            <Link
              href={`/pokemonTypes/${id}?page=${safePage - 1}`}
              className="rounded border px-3 py-1 text-sm hover:bg-gray-100"
            >
              ← Précédent
            </Link>
          ) : (
            <span className="rounded border px-3 py-1 text-sm text-gray-300 cursor-not-allowed">
              ← Précédent
            </span>
          )}
          <span className="text-sm text-gray-400">
            Page {safePage} / {totalPages}
          </span>
          {safePage < totalPages ? (
            <Link
              href={`/pokemonTypes/${id}?page=${safePage + 1}`}
              className="rounded border px-3 py-1 text-sm hover:bg-gray-100"
            >
              Suivant →
            </Link>
          ) : (
            <span className="rounded border px-3 py-1 text-sm text-gray-300 cursor-not-allowed">
              Suivant →
            </span>
          )}
        </nav>
      )}
    </article>
  );
}
