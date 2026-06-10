import Link from "next/link";
import { getUsers } from "@/lib/users-store";

export default function UsersPage() {
  const users = getUsers();

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Utilisateurs</h1>
      <ul className="flex max-w-md flex-col gap-2">
        {users.map(user => (
          <li key={user.id} className="rounded border px-4 py-2">
            <span className="font-medium">{user.username}</span>{" "}
            <span className="text-sm text-gray-500">{user.email}</span>
          </li>
        ))}
      </ul>
      <Link href="/register" className="mt-4 inline-block underline">
        + Ajouter un utilisateur
      </Link>
    </div>
  );
}
