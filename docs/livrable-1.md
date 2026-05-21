# Livrable 1 — ComptaCount

---

## 1. Nom & description

**ComptaCount** — une application web qui permet à un groupe d'amis ou de colocs de **suivre et équilibrer leurs dépenses partagées** (voyages, colocs, événements) et de proposer automatiquement le minimum de remboursements à effectuer pour solder le groupe.

**Pour qui ?** Étudiants en voyage, colocataires, organisateurs d'événements — toute personne fatiguée des "qui doit quoi à qui" sur WhatsApp.

---

## 2. Les 6 contraintes principales de l'application

| # | Contrainte | Comment ComptaCount la couvre |
|---|---|---|
| **01** | Suivi des dépenses | Affichage de suivi des dépenses par personnes et des endetement de chacun envers les autres |
| **02** | Difficulté de suivi des remboursement | Facilitation de la visualisation des remboursements ( savoir qui doit combien à qui ) |
| **03** | Difficulté à tracer les raisons des dépenses | Catégorisation des types de dépenses |
| **04** | Ne pas avoir d'information sur le montant total des dépenses | Afficher le montant total des dépenses |
| **05** | Ne pas l'information sur le montant personnel débourssé | Afficher le montant personnel des dépenses |
| **06** | Difficulté a regrouper toutes les informations sur un voyage | Permettre de regrouper tous les participants, les remboursements nécessaires et leur dépenses dans un seul et même endroit |

---

## 3. MVP

**Fonctionnalités incluses dans le MVP :**

1. Authentification (sign in / sign out via GitHub)
2. Créer un groupe (nom, devise, description)
3. Inviter un membre via lien partageable
4. Rejoindre un groupe via le lien d'invitation
5. Ajouter une dépense (montant, payeur, participants, libellé)
6. Consulter la liste des dépenses d'un groupe
7. Voir les soldes (« qui doit combien à qui ») et la suggestion de remboursements minimaux
8. Page de profil utilisateur (nom, devise par défaut)
9. Landing page publique + `loading.tsx` + `not-found.tsx` + `error.tsx`

---

## 4. Backlog initial (priorisé)

| ID | Priorité | User story |
|---|---|---|
| US-01 | P0 | En tant que **visiteur**, je veux **m'inscrire avec GitHub**, afin d'accéder à mon espace personnel. |
| US-02 | P0 | En tant qu'**utilisateur connecté**, je veux **créer un groupe** (nom, devise), afin d'y suivre des dépenses partagées. |
| US-03 | P0 | En tant que **propriétaire d'un groupe**, je veux **générer un lien d'invitation**, afin que mes amis puissent rejoindre le groupe. |
| US-04 | P0 | En tant qu'**invité**, je veux **rejoindre un groupe via un lien**, afin de participer aux dépenses. |
| US-05 | P0 | En tant que **membre d'un groupe**, je veux **ajouter une dépense** (montant, payeur, participants), afin qu'elle soit prise en compte dans les soldes. |
| US-06 | P0 | En tant que **membre d'un groupe**, je veux **voir la liste des dépenses**, afin de vérifier l'historique. |
| US-07 | P0 | En tant que **membre d'un groupe**, je veux **voir les soldes et les remboursements suggérés**, afin de savoir qui doit payer qui. |
| US-08 | P1 | En tant que **membre**, je veux **supprimer ou éditer une dépense que j'ai créée**, afin de corriger une erreur. |
| US-9 | P2 | En tant qu'**utilisateur**, je veux **personnaliser mon profil** (avatar, devise par défaut), afin que mes préférences soient mémorisées. |
| US-10 | P2 | En tant que **visiteur**, je veux **voir une landing page claire**, afin de comprendre l'intérêt de ComptaCount avant de m'inscrire. |

---

## 5. Répartition de l'équipe

| Rôle | Personne | Responsabilités semaine 1 |
|---|---|---|
| **Lead Tech / Infra** | Matteo | Setup repo (déjà fait), CI lint, schéma Prisma initial, base PostgreSQL locale, structure `(marketing)` / `(app)`. |
| **Auth & Backend** | Enzo | NextAuth (GitHub provider), middleware de protection, modèles `User` / `Group` / `Membership` / `Expense`, Server Action `createGroup`. |
| **UI & Features** | Tommy et Valentin | Layout racine + sidebar `(app)`, page `/groups`, page `/groups/[id]`, formulaire d'ajout de dépense (Server Action `createExpense`), `loading.tsx` et `error.tsx`. |

**Conventions transverses :**
- Toutes les PR sont review par au moins 1 autre membre avant merge.
- Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`...).
- Merge feature → `develop`, puis `develop` → `main` en fin de sprint.

---

## 6. Repo GitHub

- **URL** : https://github.com/Aairuxul/compta-count
- **Branches** : `main` (production) + `develop` (intégration)
- **Stack** : Next.js 16, React 19, TypeScript strict, Tailwind CSS, ESLint, Prettier

### Structure cible

```
compta-count/
├── docs/
│   └── livrable-1.md
├── public/
├── src/
│   └── app/
│       ├── layout.tsx
│       ├── page.tsx
│       ├── error.tsx
│       ├── not-found.tsx
│       └── ...
├── .env.example
├── .gitignore
├── .prettierrc
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── README.md
└── tsconfig.json
```
