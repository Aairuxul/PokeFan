import Link from "next/link";

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="mb-2 text-3xl font-bold">Tableau de bord</h1>
      <p className="mb-6 text-gray-400">
        PokéFan — Les infos des pokémons pour les PROS.
      </p>
      <ul className="flex flex-col gap-2">
        <li>
          <Link className="underline" href="/pokemonTypes">
            Liste des types Pokémon (pages data-driven, list/detail)
          </Link>
        </li>
        <li>
          <Link className="underline" href="/register">
            Créer un compte (Server Action + validation Zod)
          </Link>
        </li>
        <li>
          <Link className="underline" href="/users">
            Voir les utilisateurs (revalidé après mutation)
          </Link>
        </li>
      </ul>
    </div>
  );
}
