import type { CreateUserInput } from "./validation";

export type StoredUser = {
  id: number;
  username: string;
  email: string;
};

// Store en mémoire pour la démo (Phase 1). Il est réinitialisé à chaque
// redémarrage du serveur et n'est pas partagé entre plusieurs instances.
// En production il sera remplacé par PostgreSQL + Prisma (cf. README).
const users: StoredUser[] = [
  { id: 1, username: "alice", email: "alice@example.com" },
  { id: 2, username: "bob", email: "bob@example.com" },
];

export function getUsers(): StoredUser[] {
  return users;
}

export function addUser(
  input: Pick<CreateUserInput, "username" | "email">
): StoredUser {
  const user: StoredUser = {
    id: users.length + 1,
    username: input.username,
    email: input.email,
  };
  users.push(user);
  return user;
}
