import { Suspense } from "react";
import { PokemonTypeListContent } from "@/components/pokemon-type-list";
import { PokemonTypeListSkeleton } from "@/components/pokemon-type-skeleton";

export default function PokemonTypeList() {
  return (
    <Suspense fallback={<PokemonTypeListSkeleton />}>
      <PokemonTypeListContent />
    </Suspense>
  );
}
