import Link from "next/link";
import { getPokemonTypes } from "@/services/pokemonAPI";

export default async function PokemonTypeList() {
  const types = await getPokemonTypes();

  return (
    <ul className="flex flex-col gap-1">
      {types.map(type => (
        <li key={type.id}>
          <Link
            href={`/pokemonTypes/${type.id}`}
            className="inline-block rounded px-3 py-1 hover:bg-gray-100 hover:underline"
          >
            {type.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
