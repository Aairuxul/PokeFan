import { Suspense } from "react";
import { PokemonTypeDetailContent } from "@/components/pokemon-type-detail";
import { PokemonTypeDetailSkeleton } from "@/components/pokemon-type-skeleton";

export default async function PokemonTypeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<PokemonTypeDetailSkeleton />}>
      <PokemonTypeDetailContent id={id} />
    </Suspense>
  );
}
