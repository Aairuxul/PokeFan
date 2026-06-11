import { Suspense } from "react";
import { PokemonTypeDetailContent } from "@/components/pokemon-type-detail";
import { PokemonTypeDetailSkeleton } from "@/components/pokemon-type-skeleton";

export default async function PokemonTypeDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { id } = await params;
  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page ?? "1", 10) || 1);

  return (
    <Suspense key={`${id}-${currentPage}`} fallback={<PokemonTypeDetailSkeleton />}>
      <PokemonTypeDetailContent id={id} page={currentPage} />
    </Suspense>
  );
}
