import { getPokemonTypes } from "../(services)/pokemonAPI";
export default async function PokemonTypeList() {
    const data = await getPokemonTypes();
    return (
    <ul>
        {data.results.map((type: any) => (
            <li key={type.name}>{type.name}</li>
        ))}
    </ul>
    )
}