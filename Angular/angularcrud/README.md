# TP CRUD Angular

Ce projet est un exemple d'application CRUD (Créer, Lire, Mettre à jour, Supprimer) développée avec Angular et Bootstrap. Il utilise également un serveur JSON pour simuler une API REST.

`## Prérequis

Assurez-vous d'avoir installé les outils suivants sur votre machine :

- **Node.js** (version 12 ou supérieure) et **npm** (Node Package Manager)
- **Angular CLI** (Interface de ligne de commande Angular)
- **JSON Server** (Pour simuler une API REST)

### Vérifiez les prérequis

Pour vérifier si vous avez Node.js et npm installés, exécutez les commandes suivantes dans votre terminal :

```bash
node -v
npm -v 
```

Si ces commandes ne renvoient pas de version, vous devrez installer Node.js et npm depuis le site officiel : [Node.js](https://nodejs.org/).

### Installer Angular CLI et JSON Server

Si vous n'avez pas Angular CLI ou JSON Server installés globalement, vous pouvez les installer avec npm :

```bash
npm install -g @angular/cli
npm install -g json-server
```

## Installation du projet

1. **Clonez le projet depuis le dépôt GitHub :**

   ```bash
   git clone https://github.com/ramyozi/js-ts-angular/tree/tp-angular-crud
   git checkout tp-angular-crud
   cd Angular/angularcrud
    ```
2. **Installez les dépendances :**
   exécutez la commande
    ```bash
    npm install
      ```
Lancer l'application
--------------------

Ce projet comporte deux parties principales :

1.  **Application Angular** - L'interface utilisateur développée en Angular.
2.  **JSON Server** - Un serveur JSON qui simule une API REST pour gérer les données des produits.

### Lancer l'application Angular

Pour démarrer l'application Angular en mode développement, exécutez :

`npm start`

Cela lancera le serveur de développement Angular à `http://localhost:4200`.

### Lancer le serveur JSON

Le serveur JSON est utilisé pour simuler une API REST. Pour le lancer, exécutez :

`npm run json-server`

Cela démarrera le serveur JSON à `http://localhost:3000` et utilisera `src/assets/data.json` comme fichier de données.

Utilisation de l'application
----------------------------

L'application Angular vous permet d'ajouter, de modifier, de supprimer et de visualiser des produits. Voici les principales fonctionnalités disponibles :

-   **Ajouter un produit** : Utilisez le formulaire sous l'onglet "Ajouter un produit".
-   **Voir les produits** : La liste des produits est affichée sous l'onglet "Voir les produits".
-   **Modifier un produit** : Cliquez sur le bouton "Modifier" pour mettre à jour un produit.
-   **Supprimer un produit** : Cliquez sur le bouton "Supprimer" pour supprimer un produit.
-   **Ajouter un produit aléatoire (Ajouter random)** : Un bouton "Ajouter random" est fourni pour ajouter rapidement un produit avec des données aléatoires. Cette fonctionnalité est conçue uniquement à des fins de test rapide et ne fait pas partie de la fonctionnalité principale de l'application.

Explications des parties techniques avancées
--------------------------------------------

### 1\. **Utilisation de `Bootstrap` pour le Style et les Composants**

Bootstrap est utilisé pour créer une interface utilisateur réactive et attrayante. Les composants Bootstrap tels que les modals, les boutons et les cartes sont intégrés dans le projet Angular :

-   Les fichiers CSS et JS de Bootstrap sont inclus dans le projet via `angular.json`.
-   Exemple : Le composant modal est utilisé pour afficher des formulaires de modification de produit et des confirmations de suppression.

### 2\. **Service HTTP Angular pour la Gestion des Produits**

L'application utilise le service `ProductsService` pour communiquer avec l'API REST simulée par le JSON Server. Ce service utilise `HttpClient` pour effectuer des opérations HTTP (GET, POST, PATCH, DELETE).

Voici les principales méthodes du service :

-   `loadProducts()` : Récupère tous les produits.
-   `loadOneProduct(id: string)` : Récupère un produit spécifique par ID.
-   `addProduct(product: NewProductInterface)` : Ajoute un nouveau produit.
-   `patchProduct(id: string, partialProduct: PatchProductInterface)` : Modifie un produit existant.
-   `deleteProduct(id: string)` : Supprime un produit.

### 3\. **Validation de Formulaire avec `Reactive Forms` d'Angular**

Le projet utilise les `Reactive Forms` d'Angular pour la gestion des formulaires. Les validations de formulaire sont effectuées côté client pour garantir l'intégrité des données :

-   Les champs du formulaire, tels que `Nom` et `Prix`, utilisent des validations intégrées comme `Validators.required` et `Validators.min`.
-   Le bouton de soumission du formulaire est désactivé si les données du formulaire sont invalides ou n'ont pas été modifiées.

### 4\. **Gestion des Erreurs de Navigation avec le Composant "Not Found"**

L'application inclut un composant personnalisé `NotFoundComponent` pour gérer les erreurs de navigation. Ce composant s'affiche lorsque l'utilisateur tente d'accéder à une route qui n'existe pas. Voici les caractéristiques de ce composant :

-   **Affichage d'un Message Clair** : Lorsqu'un utilisateur accède à une page qui n'existe pas, le composant affiche un message d'erreur "404 - Page Not Found" pour indiquer que la ressource recherchée est introuvable.

-   **Bouton de Redirection** : Le composant comprend un bouton qui permet à l'utilisateur de retourner rapidement à la liste des produits, améliorant ainsi l'expérience utilisateur en fournissant une navigation facile vers une section valide de l'application.
