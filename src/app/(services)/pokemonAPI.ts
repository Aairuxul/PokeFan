export async function getPokemonTypes(){
    const res = await fetch('https://pokeapi.co/api/v2/type');
    
    if (!res.ok) {
        throw new Error('Failed to fetch Pokemon types');
    }

    const data = await res.json();
    return data;
}

export async function getPicturePokemon(id: number){
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    return res.ok ? await res.json() : null;
}