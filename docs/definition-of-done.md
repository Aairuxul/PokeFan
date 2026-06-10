# Definition of Done — ComptaCount

Une tâche (user story / issue) n'est considérée comme **terminée** que si **tous** les critères ci-dessous sont remplis.

## Code

- [ ] La fonctionnalité répond à la user story et à ses critères d'acceptation.
- [ ] Le projet compile sans erreur (`pnpm build`).
- [ ] `pnpm lint` ne remonte aucune erreur.
- [ ] TypeScript en mode strict : pas de `any` implicite ni de `@ts-ignore` non justifié.
- [ ] Aucun secret commité — les variables sensibles passent par `.env.local`.

## App Router / Next.js

- [ ] Les données sont chargées côté serveur (RSC) lorsque c'est possible.
- [ ] Toute page qui récupère des données gère ses états `loading` et `error`.
- [ ] La stratégie de cache (`revalidate` / `tags`) est explicite et documentée.
- [ ] Les mutations passent par une Server Action avec validation serveur (Zod) et revalidation du cache.

## Qualité & UX

- [ ] Aucun lien mort dans la navigation.
- [ ] Feedback utilisateur clair en cas d'erreur de formulaire comme de succès.
- [ ] Interface responsive et lisible.

## Process

- [ ] Branche `feat/...` à jour avec `develop`.
- [ ] PR ouverte, relue et approuvée par au moins 1 autre membre de l'équipe.
- [ ] Messages de commit au format Conventional Commits.
- [ ] Aucune régression sur les fonctionnalités existantes.
