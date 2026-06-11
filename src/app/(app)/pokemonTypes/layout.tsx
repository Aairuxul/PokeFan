export default function PokemonTypesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="p-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Types Pokémon</h1>
        <p className="text-sm text-gray-400">
          Données chargées côté serveur (RSC) depuis la PokéAPI, avec cache ISR.
        </p>
      </header>
      {children}
    </section>
  );
}
