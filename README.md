# PokéFan

Application web qui permet la liste des pokemons et de leur types.

- L'application nécéssite une connexion a GitHub pour profiter de toutes les fonctions proposées.
- Elle utilise l'API pokeAPI afin de récupérer les différentes informations liées a Pokémon.

> Projet du cours **Next.js Avancé · M2 Dev & DevIot**.

---

## Stack

- **Framework** : Next.js 16 (App Router)
- **Langage** : TypeScript (strict)
- **UI** : React 19, Tailwind CSS 4
- **Qualité** : ESLint, Prettier, Zod
- **Gestionnaire de paquets** : pnpm
- **Auth** : NextAuth

---

## Architecture

Notre architecture se base sur celle recommandée pour Next.js 16 et l’App Router.

### Structure principale

- `src/app/` : routes et pages de l’application.
- `src/app/api/` : API routes côté serveur.
- `src/components/` : composants UI réutilisables.
- `src/lib/` : logique métier et store interne.
- `src/services/` : intégration avec l’API PokéAPI.

### Flux de données

- `src/services/pokemonAPI.ts` interroge la PokéAPI et gère l’ISR.
- `src/lib/users-store.ts` stocke les utilisateurs en mémoire pour la phase 1.
- `src/lib/validation.ts` contient la validation Zod des formulaires.

### Routes clés

- `/` : page d’accueil avec navigation principale.
- `/pokemonTypes` : liste des types de Pokémon.
- `/pokemonTypes/[id]` : détail d’un type Pokémon.
- `/register` : formulaire d’inscription avec Server Action.
- `/users` : liste des utilisateurs revalidée après inscription.

### API backend

- `src/app/api/auth/[...nextauth]/route.ts` : authentification GitHub avec NextAuth.
- `src/app/api/pokemonType/route.ts` : route `GET`/`POST` pour les types Pokémon.

### Composants et layout

- `src/app/layout.tsx` : layout racine et imports de polices.
- `src/app/providers.tsx` : providers partagés.
- `src/components/` : listes, détails, skeletons, formulaire.

---
## Choix techniques
- Next car c'est le but du cours
- On a choisi d'utiliser les next/font, next/images, Suspens à des fins d'optimisations (demandé aussi)
- Système de cache qui stocke aussi les infos qui devraient être en backend. C'est un petit projet donc pas besoin de faire un backend. Rien n'est stocké si ce n'est les cookies de sessions et données utiles à l'utilisation du site.
- 
---

### Cache et revalidation

- ISR 24 h pour les types Pokémon (`revalidate: 86400`).
- tags de cache : `pokemon-types`, `pokemon-type-${id}`.
- revalidation on-demand après création d’un utilisateur.

---

## Installation

> Ce projet utilise **pnpm**. Avec [Corepack](https://nodejs.org/api/corepack.html) (`corepack enable`), la version déclarée dans `package.json` est utilisée automatiquement.

```bash
# Installer les dépendances
pnpm install

# Copier les variables d'environnement et remplir les variables
cp .env.example .env.local

# Lancer le serveur de dev
pnpm dev
```

L'application est accessible sur [http://localhost:3000](http://localhost:3000).

---

## Documentation

- [Livrable 1 — Cadrage du projet](./docs/livrable-1.md) — description, 6 contraintes, MVP, backlog, répartition initiale.
- [Definition of Done](./docs/definition-of-done.md) — critères de complétion d'une tâche.

---

## Stratégie de cache et revalidation

Le projet utilise le modèle de cache « classique » de Next.js 16 (sans le flag `cacheComponents`).

| Donnée                                  | Route                | Type de cache                         | Durée (`revalidate`) | Tags                                  | Justification                                                                                 |
| --------------------------------------- | -------------------- | ------------------------------------- | -------------------- | ------------------------------------- | --------------------------------------------------------------------------------------------- |
| Liste des types — `getPokemonTypes()`   | `/pokemonTypes`      | ISR (cache + revalidation temporelle) | `86400` s (24 h)     | `pokemon-types`                       | Les types Pokémon sont quasi immuables ; on sert le cache et on rafraîchit une fois par jour. |
| Détail d'un type — `getPokemonType(id)` | `/pokemonTypes/[id]` | ISR                                   | `86400` s (24 h)     | `pokemon-types`, `pokemon-type-${id}` | Même donnée stable ; un tag par `id` autorise une invalidation ciblée.                        |
| Liste des utilisateurs                  | `/users`             | Statique + revalidation on-demand     | —                    | —                                     | Rendue statiquement puis invalidée après chaque inscription.                                  |

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

## Score lighthouse

Ici vous pouvez visualiser le score lightHouse avant d'intégrer les images
![score lighthouse pré images](/preuves/lighthouse-preImages.png "score parfait")

Et maintenant le score apres ajout d'images :
![score lighthouse post images](/preuves/lighthouse-postImages.png "score parfait").

---

## Analyse du bundle

Le projet est compilé avec **Turbopack**. Pour inspecter la taille des bundles client et serveur, on utilise l'analyseur natif de Turbopack (disponible depuis Next.js 16.1) :

```bash
# Vue interactive : treemap par route + chaînes d'import (ouvre http://localhost:4000)
pnpm next experimental-analyze

# Export statique, pour partager ou comparer une optimisation avant/après
pnpm next experimental-analyze --output   # écrit dans .next/diagnostics/analyze
```

> Le plugin `@next/bundle-analyzer` (`ANALYZE=true pnpm build`) n'est pas compatible avec les builds Turbopack ; il faut forcer le mode webpack avec `next build --webpack` pour l'utiliser.

### Résultats

Relevés via `pnpm next experimental-analyze` (vue « All Route Modules », toutes routes confondues) :

| Bundle     | Compressé (estimé) | Non compressé | Modules |
| ---------- | ------------------ | ------------- | ------- |
| **Client** | 341 Ko             | 885 Ko        | 252     |
| **Server** | 301 Ko             | 753 Ko        | 374     |

### Captures

Vue **Client** (ce qui est téléchargé par le navigateur) :

![Analyse du bundle — Client](/preuves/bundle-analyzer-client.png "Bundle client — 341 Ko compressé estimé, 252 modules")

Vue **Server** (exécuté côté serveur, non envoyé au navigateur) :

![Analyse du bundle — Server](/preuves/bundle-analyzer-server.png "Bundle server — 301 Ko compressé estimé, 374 modules")
