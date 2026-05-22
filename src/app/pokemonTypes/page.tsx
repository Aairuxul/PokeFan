export default async function getPokemonTypes() {
    const res = await fetch('https://pokeapi.co/api/v2/type');
    const data = await res.json();

    return (
    <ul>
        {data.results.map((type: any) => (
            <li key={type.name}>{type.name}</li>
        ))}
    </ul>
    )
}