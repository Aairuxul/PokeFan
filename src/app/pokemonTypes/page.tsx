import { getPokemonTypes } from "../../services/pokemonAPI";
export default async function PokemonTypeList() {
    const types = await getPokemonTypes();
    return (
    <ul>
        {types.map((type: any) => (
            <li key={type.name}>{type.name}</li>
        ))}
    </ul>
    )
}