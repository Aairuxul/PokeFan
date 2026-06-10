# ComptaCount

Application web qui permet à un groupe d'amis ou de colocs de **suivre et équilibrer leurs dépenses partagées** (voyages, colocs, événements), avec proposition automatique du minimum de remboursements à effectuer.

> Projet fil rouge du cours **Next.js Avancé · M2 Dev & DevIot**.

---

## Stack

- **Framework** : Next.js 16 (App Router)
- **Langage** : TypeScript (strict)
- **UI** : React 19, Tailwind CSS 4
- **Qualité** : ESLint, Prettier
- **Gestionnaire de paquets** : pnpm
- **Auth (prévu)** : NextAuth
- **DB (prévu)** : PostgreSQL + Prisma

---

## Getting started

> Ce projet utilise **pnpm**. Avec [Corepack](https://nodejs.org/api/corepack.html) (`corepack enable`), la version déclarée dans `package.json` est utilisée automatiquement.

```bash
# Installer les dépendances
pnpm install

# Copier les variables d'environnement
cp .env.example .env.local

# Lancer le serveur de dev
pnpm dev
```

L'application est accessible sur [http://localhost:3000](http://localhost:3000).

---

## Documentation

- [Livrable 1 — Cadrage du projet](./docs/livrable-1.md) — description, 6 contraintes, MVP, backlog, répartition.
- [Definition of Done](./docs/definition-of-done.md) — critères de complétion d'une tâche.

---

## Stratégie de cache et revalidation

Le projet utilise le modèle de cache « classique » de Next.js 16 (sans le flag `cacheComponents`). Rappel : depuis Next.js 15, `fetch` n'est **pas** mis en cache par défaut — chaque appel choisit explicitement sa stratégie via `next: { revalidate, tags }`.

| Donnée | Route | Type de cache | Durée (`revalidate`) | Tags | Justification |
|---|---|---|---|---|---|
| Liste des types — `getPokemonTypes()` | `/pokemonTypes` | ISR (cache + revalidation temporelle) | `86400` s (24 h) | `pokemon-types` | Les types Pokémon sont quasi immuables ; on sert le cache et on rafraîchit une fois par jour. |
| Détail d'un type — `getPokemonType(id)` | `/pokemonTypes/[id]` | ISR | `86400` s (24 h) | `pokemon-types`, `pokemon-type-${id}` | Même donnée stable ; un tag par `id` autorise une invalidation ciblée. |
| Liste des utilisateurs | `/users` | Statique + revalidation on-demand | — | — | Rendue statiquement puis invalidée après chaque inscription. |

### Revalidation

- **Temporelle** : option `next: { revalidate: 86400 }` sur les `fetch` PokéAPI (ISR).
- **On-demand** : la Server Action `registerUser` appelle `revalidatePath('/users')` après une création réussie, afin que la liste reflète immédiatement la mutation. Les tags `pokemon-types` permettent un `revalidateTag('pokemon-types')` si la source de données venait à changer.

> Le store des utilisateurs est en mémoire pour la Phase 1 (réinitialisé au redémarrage du serveur). Il sera remplacé par PostgreSQL + Prisma en Phase 2.

---

## Workflow Git

- `main` : branche de production.
- `develop` : branche d'intégration.
- Toute nouvelle feature passe par une branche `feat/...` puis une PR vers `develop`.
- Conventions de commit : [Conventional Commits](https://www.conventionalcommits.org/).
