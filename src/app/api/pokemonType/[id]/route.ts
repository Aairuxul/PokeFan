import { getPokemonType } from "@/services/pokemonAPI";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    console.log("ID reçu dans l'API:", id);

    if (!id) {
        return NextResponse.json(
            { error: 'ID de Pokémon requis.' },
            { status: 400 }
        )
    }

    const foundType = await getPokemonType(id);

    if (!foundType) {
        return NextResponse.json(
            { error: 'Type de Pokémon non trouvé.' },
            { status: 404 }
        )
    }

    return NextResponse.json(foundType);
}
