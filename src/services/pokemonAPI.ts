// Durée de revalidation ISR : les types Pokémon changent très rarement,
// on peut donc servir la donnée en cache pendant 24 h. Voir README (stratégie de cache).
const REVALIDATE_SECONDS = 60 * 60 * 24; // 24 heures
const POKEAPI_BASE = "https://pokeapi.co/api/v2";

type PokeApiName = { language: { name: string }; name: string };
type PokeApiResource = { name: string; url: string };

export type PokemonType = {
  id: number;
  name: string;
};

export type PokemonTypeDetail = PokemonType & {
  pokemons: string[];
};

function frenchName(names: PokeApiName[], fallback: string): string {
  return names.find(n => n.language.name === "fr")?.name ?? fallback;
}

export async function getPokemonTypes(): Promise<PokemonType[]> {
  try {
    const res = await fetch(`${POKEAPI_BASE}/type`, {
      next: { revalidate: REVALIDATE_SECONDS, tags: ["pokemon-types"] },
    });

    if (!res.ok) {
      console.error("getPokemonTypes: non-ok response", res.status);
      return [];
    }

    const data: { results: PokeApiResource[] } = await res.json();

    // Les détails de chaque type sont récupérés en parallèle.
    const types = await Promise.all(
      data.results.map(async type => {
        try {
          const typeRes = await fetch(type.url, {
            next: { revalidate: REVALIDATE_SECONDS, tags: ["pokemon-types"] },
          });
          if (!typeRes.ok) return null;
          const typeData: { id: number; name: string; names: PokeApiName[] } =
            await typeRes.json();
          return {
            id: typeData.id,
            name: frenchName(typeData.names, typeData.name),
          };
        } catch (err) {
          console.error("getPokemonTypes: failed to fetch type detail", err);
          return null;
        }
      })
    );

    return types
      .filter((t): t is PokemonType => t !== null)
      .filter(t => t.name !== "Unknown" && t.name !== "Shadow");
  } catch (err) {
    console.error("getPokemonTypes: fetch error", err);
    return [];
  }
}

export async function getPokemonType(
  id: string
): Promise<PokemonTypeDetail | null> {
  try {
    const res = await fetch(`${POKEAPI_BASE}/type/${id}`, {
      next: {
        revalidate: REVALIDATE_SECONDS,
        tags: ["pokemon-types", `pokemon-type-${id}`],
      },
    });

    if (res.status === 404) return null;
    if (!res.ok) {
      console.error(`getPokemonType: non-ok response for ${id}`, res.status);
      return null;
    }

    const data: {
      id: number;
      name: string;
      names: PokeApiName[];
      pokemon: { pokemon: PokeApiResource }[];
    } = await res.json();

    return {
      id: data.id,
      name: frenchName(data.names, data.name),
      pokemons: data.pokemon.map(p => p.pokemon.name),
    };
  } catch (err) {
    console.error(`getPokemonType: fetch error for ${id}`, err);
    return null;
  }
}

export async function createPokemonType(name: string): Promise<PokemonType> {
  const types = await getPokemonTypes();

  if (!name) {
    throw new Error('Le nom du type de Pokémon est requis.');
  }

  const newType: PokemonType = {
    id: types.length + 1,
    name,
  };

  return newType;
}