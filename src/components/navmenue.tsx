import Link from "next/link";

function NavMenue() {
  return (
    <nav className="flex h-16 w-full items-center justify-between bg-gray-800 px-4 text-white">
      <Link href="/" className="text-lg font-bold hover:text-gray-300">
        ComptaCount
      </Link>
      <span className="text-sm text-gray-400">Phase 1 — Fondations</span>
    </nav>
  );
}

export default NavMenue;
