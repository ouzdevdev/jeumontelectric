# Titre du Projet

Application web d'automatisation pour les tâches de support chez Technav.

# DESCRIPTION DU PROJET

L'objectif est de numériser le service support 24/7 avec la mise à disposition d'une base de données structurée, d'une API2 et la création d’une application de type On-premises3.  
Cet outil doit permettre de gérer la charge du support, d'améliorer la relation avec les clients dans la traçabilité des demandes et permettre de faire évoluer la structure numérique de Technnav.

## Technologies

- [Node.js Docs](https://nodejs.org/en/docs/)
- [Express.js Docs](https://expressjs.com/en/starter/installing.html)
- [Sequelize ORM Docs](https://sequelize.org/docs/v6/getting-started/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)

## Installation

### Git code

```bash
git clone git-link
```

### Installation des packages

```bash
npm i 
```

## Configuration

Ajoutez le fichier .env avec les variables suivantes :
- DATABASE_USERNAME=utilisateur    
- DATABASE_PASSWORD=motdepasse
- DATABASE_NAME=nomdelabase
- DATABASE_HOST=hôte
- DATABASE_PORT=5432
- DATABASE_DIALECT=postgres

### Création d'une base de données PostgreSQL avec Docker

Utilisez la commande suivante pour créer un conteneur Docker avec PostgreSQL :
```bash
docker run --name postgres-dev -e POSTGRES_PASSWORD=admin -d -p 5432:5432 postgres:alpine
```
### Utiliser la base de données chez Jeumont OVH
Pour utiliser la base de données chez Jeumont OVH, suivez ces étapes :

1 - Connectez-vous à distance à l'adresse IP avec SSH :
```bash
ssh mail@ip
```
2 - Entrez le mot de passe
3 - Démarrez le service PostgreSQL 
```bash
sudo service postgresql start
```

## Structure du backend
- Models
- Controllers
- Routes
- Config
- Enumerations
- Authentication

## Authentication
- [Jwt](https://jwt.io/)
- [Passpost.js Docs](https://www.passportjs.org/docs/)