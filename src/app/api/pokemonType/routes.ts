import { getPokemonTypes } from "@/services/pokemonAPI";
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