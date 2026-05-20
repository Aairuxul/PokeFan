# Livrable 1 — ComptaCount

> Cadrage du projet fil rouge pour le cours Next.js Avancé (M2 Dev & DevIot).

---

## 1. Nom & description

**ComptaCount** — une application web qui permet à un groupe d'amis ou de colocs de **suivre et équilibrer leurs dépenses partagées** (voyages, colocs, événements) et de proposer automatiquement le minimum de remboursements à effectuer pour solder le groupe.

**Pour qui ?** Étudiants en voyage, colocataires, organisateurs d'événements — toute personne fatiguée des "qui doit quoi à qui" sur WhatsApp.

---

## 2. Les 6 contraintes cochées

| # | Contrainte | Comment ComptaCount la couvre |
|---|---|---|
| **01** | **Layouts imbriqués** (public + privé) | Route group `(marketing)/` → landing publique + page d'invitation. Route group `(app)/` → dashboard, sidebar persistante entre navigations, settings. Layout racine + 2 layouts imbriqués distincts. |
| **02** | **Data fetching serveur** | Liste des groupes, détail d'un groupe, soldes calculés, historique des dépenses → tout fetché côté serveur dans des Server Components (Prisma + Postgres). Aucun `useEffect` pour la donnée principale. |
| **03** | **Server Action** | Formulaire « Ajouter une dépense » (montant, payeur, participants, libellé) → Server Action `createExpense()` avec validation Zod + `revalidatePath('/groups/[id]')`. Idem pour créer un groupe et inviter un membre. |
| **04** | **Route Handler** | `GET /api/groups/[id]/export` — exporte les dépenses d'un groupe au format CSV, accessible via un token d'invitation. Permet aussi un endpoint de santé `GET /api/health` pour monitoring. |
| **05** | **Auth NextAuth** | NextAuth avec provider GitHub + Credentials. Toutes les routes sous `(app)/` sont protégées par middleware. Feature user-specific : profil personnel (avatar, devise par défaut), liste des groupes auxquels j'appartiens. |
| **06** | **Optimisations mesurables** | `next/image` pour avatars et justificatifs, `next/font` pour la police principale, `loading.tsx` + `<Suspense>` pour streamer la liste des dépenses pendant que les soldes se calculent côté serveur. Objectif Lighthouse ≥ 90. |

---

## 3. MVP (et rien de plus)

**Fonctionnalités incluses dans le MVP :**

1. Authentification (sign in / sign out via GitHub)
2. Créer un groupe (nom, devise, description)
3. Inviter un membre via lien partageable
4. Rejoindre un groupe via le lien d'invitation
5. Ajouter une dépense (montant, payeur, participants, libellé)
6. Consulter la liste des dépenses d'un groupe
7. Voir les soldes (« qui doit combien à qui ») et la suggestion de remboursements minimaux
8. Exporter les dépenses d'un groupe en CSV (via Route Handler)
9. Page de profil utilisateur (nom, devise par défaut)
10. Landing page publique + `loading.tsx` + `not-found.tsx` + `error.tsx`

**Hors MVP** (réservés à une V2) :
- OCR sur photos de tickets
- Notifications email (rappels de remboursement)
- Multi-devises avec conversion automatique
- Dépenses récurrentes (loyer, abonnements)
- Dark mode
- Statistiques graphiques par catégorie
- PWA mobile

---

## 4. Backlog initial (priorisé)

> Format standard : **En tant que** [rôle], **je veux** [action], **afin de** [bénéfice].

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
| US-09 | P1 | En tant que **membre**, je veux **exporter mon groupe en CSV**, afin de garder une trace hors ligne. |
| US-10 | P2 | En tant qu'**utilisateur**, je veux **personnaliser mon profil** (avatar, devise par défaut), afin que mes préférences soient mémorisées. |
| US-11 | P2 | En tant que **visiteur**, je veux **voir une landing page claire**, afin de comprendre l'intérêt de ComptaCount avant de m'inscrire. |

---

## 5. Répartition de l'équipe

> *À ajuster selon le nombre de membres effectifs. Hypothèse de départ : 2 ou 3 personnes.*

| Rôle | Personne | Responsabilités semaine 1 |
|---|---|---|
| **Lead Tech / Infra** | _Membre 1_ | Setup repo (déjà fait), CI lint, schéma Prisma initial, base PostgreSQL locale, structure `(marketing)` / `(app)`. |
| **Auth & Backend** | _Membre 2_ | NextAuth (GitHub provider), middleware de protection, modèles `User` / `Group` / `Membership` / `Expense`, Server Action `createGroup`. |
| **UI & Features** | _Membre 3_ | Layout racine + sidebar `(app)`, page `/groups`, page `/groups/[id]`, formulaire d'ajout de dépense (Server Action `createExpense`), `loading.tsx` et `error.tsx`. |

**Conventions transverses :**
- Toutes les PR sont review par au moins 1 autre membre avant merge.
- Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`...).
- Merge feature → `develop`, puis `develop` → `main` en fin de sprint.

---

## 6. Repo GitHub

- **URL** : https://github.com/Aairuxul/compta-count
- **Branches** : `main` (production) + `develop` (intégration)
- **Stack** : Next.js 16, React 19, TypeScript strict, Tailwind CSS, ESLint, Prettier

### Structure cible (fin du livrable 1)

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

---

## Checklist de validation

- [x] Nom et description du projet rédigés
- [x] 6 contraintes explicitement cochées et mappées
- [x] MVP listé (10 features, rien de plus)
- [x] Backlog initial de 11 user stories priorisées
- [x] Répartition par rôle définie
- [x] Repo GitHub créé avec branches `main` et `develop`
- [x] Projet Next.js poussé
