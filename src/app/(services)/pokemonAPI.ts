export async function getPokemonTypes(){
    const res = await fetch('https://pokeapi.co/api/v2/type');
    
    if (!res.ok) {
        throw new Error('Failed to fetch Pokemon types');
    }

    const data = await res.json();
    return data;
}