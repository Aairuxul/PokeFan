import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <span className="select-none text-8xl font-extrabold text-gray-300">
        404
      </span>
      <h1 className="text-3xl font-bold">Page introuvable</h1>
      <p className="max-w-md text-center text-gray-400">
        La page que vous cherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-lg bg-gray-800 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-700"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
