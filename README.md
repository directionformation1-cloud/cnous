# Caisse d'épargne — démonstration universitaire

Cette application utilise uniquement des données fictives. Le formulaire public :

- vérifie atomiquement si la combinaison identifiant/numéro de compte existe déjà ;
- enregistre les nouvelles combinaisons dans la collection Firestore `demoAccountSubmissions` ;
- affiche les dossiers en temps réel sur `/admin` ;
- masque le numéro de compte dans le tableau d'administration.

## Configuration Firestore

Le projet Firebase est configuré dans `src/firebase.js`. Créez une base Cloud Firestore, puis déployez les règles de démonstration contenues dans `firestore.rules`. Ces règles sont volontairement destinées à une présentation pédagogique avec des données synthétiques et ne doivent pas être utilisées en production.

```bash
firebase deploy --only firestore:rules
```

## Développement

```bash
npm install
npm run dev
```

Le site public est disponible à la racine et le panneau d'administration sur `/admin`.

## Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
"# cnous" 
