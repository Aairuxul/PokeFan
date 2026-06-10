import { createPokemonType, getPokemonTypes } from "@/services/pokemonAPI";
import { NextResponse } from "next/server";

export async function GET() {
    const pokemonType = await getPokemonTypes();
    
    if (!pokemonType) {
        return NextResponse.json(
            { error: 'Pokemon non trouvé.' },
            { status: 404 }
        )
    }

    return NextResponse.json(pokemonType);
}

export async function POST(request: Request) {
    const body = await request.json();

    if (!body || !body.name) {
        return NextResponse.json(
            { error: 'Le nom du type de Pokémon est requis.' },
            { status: 400 }
        )
    }

    const typePokemon = await createPokemonType(body.name.toString());
    return NextResponse.json(typePokemon, { status: 201 });
}
