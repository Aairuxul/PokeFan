# ComptaCount

Application web qui permet à un groupe d'amis ou de colocs de **suivre et équilibrer leurs dépenses partagées** (voyages, colocs, événements), avec proposition automatique du minimum de remboursements à effectuer.

> Projet fil rouge du cours **Next.js Avancé · M2 Dev & DevIot**.

---

## Stack

- **Framework** : Next.js 16 (App Router)
- **Langage** : TypeScript (strict)
- **UI** : React 19, Tailwind CSS 4
- **Qualité** : ESLint, Prettier
- **Auth (prévu)** : NextAuth
- **DB (prévu)** : PostgreSQL + Prisma

---

## Getting started

```bash
# Installer les dépendances
npm install

# Copier les variables d'environnement
cp .env.example .env.local

# Lancer le serveur de dev
npm run dev
```

L'application est accessible sur [http://localhost:3000](http://localhost:3000).

---

## Documentation

- [Livrable 1 — Cadrage du projet](./docs/livrable-1.md) — description, 6 contraintes, MVP, backlog, répartition.

---

## Workflow Git

- `main` : branche de production.
- `develop` : branche d'intégration.
- Toute nouvelle feature passe par une branche `feat/...` puis une PR vers `develop`.
- Conventions de commit : [Conventional Commits](https://www.conventionalcommits.org/).
