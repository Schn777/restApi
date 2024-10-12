<a name="hautPage"></a>

<h1 align="center"><i> TP01: Développement d'une API RESTful pour la gestion d'inventaire </i></h1>
<h2 align="center">Remis par Schneider Emile 2268126</h2>
<h2 align="center">Collecte et Interpretation de données 420-514-MV Cégep Marie-Victorin</h2>

---

## :label: Table des matières

- [Contexte du travail](#contexte-du-travail)
- [Fonctionnalites](#fonctionnalites)
- [Installation de l'application](#installation-de-lapplication)
- [API online FakeStore](#api-online-fakestore)
- [Documentation Swagger](#documentation-swagger)
- [Documentation Postman](#documentation-postman)
- [Fichier .env](#fichier-env)

---

## Contexte du travail
:mortar_board:Ce projet vise à développer une API RESTful avec Node.js pour gérer l'inventaire d'une entreprise de distribution. L'API permet aux gestionnaires de créer, modifier et supprimer des produits, tandis que les employés peuvent consulter la liste des produits. Elle est sécurisée grâce à l'authentification JWT, avec une gestion des rôles pour restreindre l'accès à certaines fonctionnalités.

---

## Fonctionnalites

### 1. **Gestion des produits**
:necktie:
- **GET /api/v1/products** : Récupérer la liste des produits avec possibilité de filtrer par prix et quantité.
- **POST /api/v1/admin/filter-price** : Filtrer la liste des produits par prix.
- **POST /api/v1/admin/filter-stock** : Filtrer la liste des produits par quantité.
- **POST /api/v1/admin/create-products** : Créer un nouveau produit (seulement accessible aux gestionnaires).
- **PUT /api/v1/admin/products/:id** : Modifier un produit existant (gestionnaire uniquement).
- **DELETE /api/v1/admin/delete-products/:id** : Supprimer un produit de l'inventaire (gestionnaire uniquement).

### 2. **Gestion des utilisateurs et sécurité**
:policeman:
- **POST /api/v1/login** : Authentification des utilisateurs avec email et mot de passe, et génération d'un token JWT.
- **Rôles** :
  - **Gestionnaire** : Accès complet (ajout, modification, suppression).
  - **Employé** : Consultation uniquement.
- **Sécurisation** : Toutes les requêtes doivent être envoyées via HTTPS.

### 3. **Autres fonctionnalités**
:computer:
- **Validation des données** : Validation stricte des entrées utilisateurs (nom, prix, quantité, etc.).
- **Versioning** : L'API est versionnée avec le préfixe `/v1/`.
- **Documentation Swagger** : Documentation interactive via Swagger pour tester et comprendre l'API.
- **Persistance des données** : Les produits sont initialement peuplés à partir de l'[API Fake Store](https://fakestoreapi.com/).
- **Journalisation** : Les opérations importantes sont loguées avec un timestamp pour la gestion des erreurs et des audits.

---

## Installation de l'application
:floppy_disk: npm install

1. **Cloner le dépôt :**

   ```bash
   git clone https://github.com/Schn777/restApi.git
   git checkout tp1
   
---

## API online FakeStore
:minidisc:  <br>
Consulter l'API : <https://fakestoreapi.com/><br>
![image](https://github.com/user-attachments/assets/7ffa0e39-c3e9-4223-b2b8-840ea99dd69b)

---

## Documentation Swagger
:abacus:<br>
![image](https://github.com/user-attachments/assets/c519c950-0273-4412-87ec-e9ee969a0249)

Ouvrez un terminal et démarrez l'API avec la requête 'npm run start'.  
Dans votre browser, allez à : <https://localhost:3000/v1/api-docs/>


---

## Documentation Postman
:envelope: <br>
 Postman : <https://www.postman.com/downloads/> <br>
 ![image](https://github.com/user-attachments/assets/9c57d2bb-1fb6-432b-b605-46dd0fdc3c27)


:octocat: Importez la collection Postman du projet GitHub
Test-rest-api-user-products.postman_collection.json

*Postman joue un rôle essentiel pour tester et valider les différentes fonctionnalités de l'API. Voici ce que Postman permet de faire dans ce contexte*


### 1. Tester les Endpoints de l'API
*Postman permet de simuler des requêtes HTTP (GET, POST, PUT, DELETE) vers les différents endpoints de ton API. Cela permet de vérifier si les routes définies fonctionnent comme prévu :*

Envoyer des requêtes pour consulter la liste des produits (GET /api/v1/products).
Ajouter un nouveau produit (POST /api/v1/admin/products).
Modifier un produit existant (PUT /api/v1/admin/products/:id).
Supprimer un produit (DELETE /api/v1/admin/delete-products/:id).

### 2. Valider les Réponses
*Postman permet d'observer les réponses renvoyées par ton API, notamment :*

Le code de statut HTTP (200, 201, 400, 401, 404, etc.).
Le format des données renvoyées (JSON).
Les messages d'erreurs en cas de validation échouée.

### 3. Tester l'Authentification
*Postman permet également de tester le système d'authentification via JWT :*

Envoyer des requêtes de connexion (POST /api/v1/login) avec un email et un mot de passe.
Ajouter le token JWT dans l'en-tête des requêtes pour tester les routes protégées (par exemple, ajouter ou supprimer des produits).
Cela permet de vérifier si les gestionnaires et les employés ont accès aux bonnes fonctionnalités selon leurs rôles (après la création d'un gestionnaire, il doit se connecter à nouveau pour valider ses autorisations).

### 4. Automatiser les Tests
*Postman permet de créer des collections de requêtes et d'automatiser leur exécution :*

---

## Fichier .env
:lock:
Le fichier .env est inclus dans le projet.  Cependant, les données sensibles ont été retirées par mesure préventive.

🔝: [Retour en haut](#hautPage)
