---
theme: default
title: PokéFan - Next.js Avancé
info: |
  ## PokéFan
  Application web pour explorer les types Pokémon avec authentification GitHub
  Master 2 Dev & DevIoT - Next.js Avancé - Phase 3
layout: cover
---

# PokéFan

**Next.js Avancé · Master 2 Dev & DevIoT — Phase 3**

Application web pour explorer les types Pokémon et gérer les utilisateurs (fourre tout de test pour nextJS)

Valentin, Tommy, Enzo et Matteo
---

## Introduction
<br>

### Le projet
- **Framework** : Next.js 16 (App Router)
- **Langage** : TypeScript strict
- **UI** : React 19 + Tailwind CSS 4
- **API** : PokéAPI
- **Auth** : NextAuth (GitHub)

<br>

### Fonctionnalités
- Liste et détail des types Pokémon
- Système d'inscription utilisateurs
- Authentification GitHub
- Optimisations de performance

---
layout: two-cols
---

## Architecture (1/2)

### Structure du projet
```
src/
├── app/
│   ├── layout.tsx (root layout)
│   ├── (app)/
│   │   ├── page.tsx (dashboard)
│   │   ├── pokemonTypes/
│   │   ├── register/
│   │   └── users/
│   ├── api/
│   │   ├── auth/[...nextauth]
│   │   └── pokemonType/
│   └── providers.tsx
├── components/
├── lib/
├── services/
└── middleware.ts
```

::right::

### Server vs Client Components
- **Server Components** : routes par défaut
  - `getPokemonTypes()`, `getPokemonType(id)`
  - Accès direct à l'API
  - Moins de JS côté client
  
- **Client Components** : formulaires, interactions
  - `register-form.tsx`
  - `pokemon-type-list.tsx`
  - Navigation interactive

---

## Architecture (2/2)

### Layouts imbriqués
```
layout.tsx (root)
 └── Providers (NextAuth, Tailwind)
      └── (app)/layout.tsx (groupe de routes)
           ├── pokemonTypes/layout.tsx
           ├── register/page.tsx
           └── users/page.tsx
```

### Choix clés
- App Router pour l'ISR et revalidation  
- Colocation des données et logique  
- Middleware global pour sessions  
- Validation Zod côté serveur

---

## Data & Cache (1/2)

### Stratégie de cache

| Donnée | Route | Type | Durée | Tags |
|--------|-------|------|-------|------|
| Types Pokémon | `/pokemonTypes` | ISR | 24 h | `pokemon-types` |
| Détail type | `/pokemonTypes/[id]` | ISR | 24 h | `pokemon-type-${id}` |
| Utilisateurs | `/users` | On-demand | — | — |

### Implémentation
```typescript
// src/services/pokemonAPI.ts
const res = await fetch(`${POKEAPI_BASE}/type`, {
  next: { 
    revalidate: 86400,
    tags: ["pokemon-types"]
  },
});
```

---

## Data & Cache (2/2)

### Revalidation on-demand
Après une inscription :
```typescript
// src/actions/register.ts
await revalidatePath('/users')
```

La liste des utilisateurs se met à jour immédiatement

<br>

### Mutation server-side
- Store utilisateur en mémoire
- Validation Zod des entrées

<br>

### Performance réseau
- Fetches parallélisés pour les détails de types
- Caching côté client automatique
- Compression gzip des réponses

---

## Auth (1/2)

### Flux d'authentification GitHub

1. **Page d'accueil** (`/`)
   - Lien vers `/api/auth/signin`

2. **NextAuth route handler**
   - `src/app/api/auth/[...nextauth]/route.ts`
   - Stratégie GitHub OAuth

3. **Redirect après login**
   - Session créée dans `next-auth.js.cookie`

---

## Auth (2/2)

### Protection des features
```typescript
// Accessible après authentification
<Link href="/register">
  Créer un compte
</Link>

// Vérification de session
import { auth } from "next-auth"
const session = await auth()
```
<br>

### Données utilisateur
- Stockées en mémoire dans `src/lib/users-store.ts`
- Créées via Server Action lors de `/register`
- Affichées dans `/users` (revalidée on-demand)

---

## Formulaire utilisateur

<br>

### Caractéristiques
- Page `/register` avec un formulaire React simple
- Champs : `username` et `email`
- Validation Zod côté serveur pour garantir la saisie
- Soumission via Server Action `registerUser`
- Revalidation immédiate de `/users` après création

<br>

### Avantages
- UX fluide et sécurisée
- Pas de logique client lourde
- Données validées avant mutation

---

## Conclusion
<br/>

### Ce qui fonctionne bien
- Architecture claire et scalable
- ISR et caching efficace
- Auth GitHub intégrée
- Performance optimale

<br/>

### Limites et améliorations
- Store en mémoire (phase provisoire)
- Migrer vers PostgreSQL + Prisma
- Ajouter rôles/permissions
- Tester mobile en profondeur (ne pas regarder le lightHouse)
- Design systeme plus complet
