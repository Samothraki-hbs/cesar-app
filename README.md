Projet CésarApp

CésarApp est une application de pari non monétaire entre amis, sur les Césars du cinéma.

Stack utilisée : React Native (TypeScript), Expo, Expo Router, Supabase, TanStackQuery

Fonctionnalités :

- Authentification de l'utilisateur gérée par Supabase
- Base de données distante gérée par Supabase
- Frontend géré par React Native

Installation :

Dans l'invite de commandes, écrire "npm start" ou "npx expo start"

Détails :

L’application comprend des utilisateurs.
Chaque utilisateur a un pseudo, un email, un mot de passe, et une photo de profil qu’il choisit depuis une proposition de photos préétablies
L’application comprend trois pages :

- Une page « choix »
- Une page « classement »
- Une page « profil »

Page choix
Sur la page Choix, l’utilisateur a accès à l’ensemble des choix pour les catégories des César.
Les catégories correspondent aux catégories proposées par l’académie des César.
Chaque catégorie comprend cinq choix. Chaque catégorie possède des points. Les points sont validés si l’utilisateur fait le bon choix.
Chaque choix comprend une photo, le nom du film, le nom de l’acteur et ou de la personne en lice pour la catégorie si pertinent.
Quand l’utilisateur clique sur une catégorie, on ouvre une page modale avec les cinq choix de la catégorie. Dès que l’utilisateur sélectionne un choix, le modal se replie et est affiché en lieu et place de l’encart de la catégorie le choix effectué.

Page classement
Tous les utilisateurs sont affichés sur la page classement.
L’utilisateur connecté peut cliquer sur le profil d’un autre utilisateur et accéder à la page de profil de l’autre utilisateur
Implémentation d’un classement où je peux voir une FlatList des différents utilisateurs

Page profil
Sur la page profil, on retrouve le nom de profil de l’utilisateur, sa photo de profil et ses points.
Utilisation au début de « dummy data »
Etapes de développement

1 / Création de l’UI globale
a. Page choix
b. Modal du choix
c. Page classement
d. Page profil
e. Profil d’un autre utilisateur
f. Page paramètres

2/ Backend
a. Création de la base de données Supabase
b. Import des types depuis la base de données
c. Création des Query et implémentation
3/ Mise en production

Structure du projet :

-src
| types.ts #des types préecris, à supprimer plus tard et à remplacer par les types automatiquement importés depuis Supabase
|
+---api # C'est le dossier dans lequel je vais inscrire l'ensemble de mes queries. Je sépare les queries par sous-dossier en fonction de la table que j'appelle
| +---categories # Le dossier où je vais écrire les queries en lien avec les catégories
| | index.ts
| |
| +---choices # Le dossier où je vais écrire les queries en lien avec les choix
| | index.ts
| |
| \---classement # Le dossier où je vais écrire les queries en lien avec le classement
| index.ts
|
+---app # Le code de mon application.
| | +html.tsx # Fourni avec le code de base de l'application
| | +not-found.tsx
| | index.tsx
| | \_layout.tsx
| |
| +---(admin) # ne sera plus pertinent pour la suite de l'application
| | | index.tsx
| | | three.tsx
| | | \_layout.tsx
| | |
| | +---categories # ne sera plus pertinent pour la suite de l'application
| | | | create-category.tsx
| | | | index.tsx
| | | | \_layout.tsx
| | | |
| | | \---[id] # ne sera plus pertinent pour la suite de l'application
| | | create-talent.tsx
| | | index.tsx
| | | \_layout.tsx
| | |
| | \---ligues # ne sera plus pertinent pour la suite de l'application
| | index.tsx
| | ligues-perso.tsx
| | \_layout.tsx
| |
| +---(auth) # groupe qui gère l'authentification
| | sign-in.tsx
| | sign-up.tsx
| | \_layout.tsx
| |
| \---(user) # groupe de l'utilisateur, pertinent pour la suite de l'application
| | index.tsx
| | \_layout.tsx
| |
| +---categories # page catégories, où l'utilisateur peut voir toutes les catégories proposées
| | | index.tsx
| | | \_layout.tsx
| | |
| | \---[id]
| | index.tsx
| | \_layout.tsx
| |
| +---classement # page classement, où l'utilisateur peut voir le classement de l'application
| | | index.tsx
| | | \_layout.tsx
| | |
| | \---[id]
| | index.tsx
| | \_layout.tsx
| |
| \---profile # page profil, où l'utilisateur peut consulter son profil
| index.tsx
| \_layout.tsx
|
+---components
| | Button.tsx
| | EditScreenInfo.tsx
| | ExternalLink.tsx
| | PossibleChoiceItem.tsx
| | StyledText.tsx
| | Themed.tsx
| | useClientOnlyValue.ts
| | useClientOnlyValue.web.ts
| | useColorScheme.ts
| | useColorScheme.web.ts
| | UserClassementItem.tsx
| |
| \---**tests**
| StyledText-test.js
|
+---constants
| Colors.ts
|
+---lib
| supabase.ts
|
\---providers # Les providers sont des composants spéciaux qui diffusent des données où des fonctions à l'ensemble de l'application sans avoir à passer les "props" manuellement à chaque étage
AuthProvider.tsx
QueryProvider.tsx
