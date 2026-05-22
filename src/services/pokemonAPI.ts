export async function getPokemonTypes() {
  const res = await fetch("https://pokeapi.co/api/v2/type", {
    next: { tags: ["pokemon-types"]},
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Pokemon types");
  }

  const data = await res.json();

  const types = [];

  for (const type of data.results) {
    const typeResponse = await fetch(type.url);

    if (!typeResponse.ok) continue;

    const typeData = await typeResponse.json();

    const frenchName = typeData.names.find(
      (name: {
        language: { name: string };
        name: string;
      }) => name.language.name === "fr"
    );

    types.push({
      id: typeData.id,
      name: frenchName?.name || typeData.name,
    });
  }

  return types.filter(
    (type) => type.name !== "Unknown" && type.name !== "Shadow"
  );
}