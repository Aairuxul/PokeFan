"use client";

import Link from "next/link";
import NavMenu from "@/components/navmenu";
import { useSession } from "next-auth/react";

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/users", label: "Utilisateurs" },
  { href: "/register", label: "Inscription" },
  { href: "/pokemonTypes", label: "Types Pokémon" },
  { href: "/test", label: "Test routing" }
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-900 p-4 text-white">
        <h2 className="mb-4 text-2xl font-bold">PokéFan</h2>
        <nav>
          <ul>
            {navItems.map(item => (
              <li key={item.href} className="mb-2">
                <Link
                  href={item.href}
                  className="block rounded px-4 py-2 hover:bg-gray-700"
                >
                  {item.label}
                </Link>
              </li>
            ))}

            {!session ? (
              <li>
                <Link
                  href="/api/auth/signin"
                  className="block rounded px-4 py-2 hover:bg-gray-700"
                >
                  Connexion
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  href="/api/auth/signout"
                  className="block rounded px-4 py-2 hover:bg-gray-700"
                >
                  Déconnexion
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </aside>
      <main className="flex flex-1 flex-col bg-[var(--background)] text-[var(--foreground)]">
        <NavMenu />
        {children}
      </main>
    </div>
  );
}
