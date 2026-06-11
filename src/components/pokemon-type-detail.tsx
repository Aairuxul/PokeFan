import Link from "next/link";
import { notFound } from "next/navigation";
import { getPokemonType } from "@/services/pokemonAPI";

export async function PokemonTypeDetailContent({
  id,
}: {
  id: string;
}) {
  const type = await getPokemonType(id);

  if (!type) {
    notFound();
  }

  return (
    <article className="flex flex-col gap-4">
      <Link
        href="/pokemonTypes"
        className="text-sm text-gray-500 hover:underline"
      >
        ← Retour à la liste
      </Link>
      <h2 className="text-xl font-semibold">
        {type.name} <span className="text-gray-400">#{type.id}</span>
      </h2>
      <p className="text-sm text-gray-500">
        {type.pokemons.length} Pokémon de ce type
      </p>
      <ul className="grid grid-cols-2 gap-1 sm:grid-cols-3">
        {type.pokemons.slice(0, 30).map(name => (
          <li
            key={name}
            className="rounded bg-gray-100 px-2 py-1 text-sm capitalize text-black"
          >
            {name}
          </li>
        ))}
      </ul>
    </article>
  );
}
