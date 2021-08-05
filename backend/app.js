// APP.JS : Permet de faire appel aux fonctions implémentées dans l'API (Accès aux images, aux routes Users, aux route Sauce)

// Importation 
const express = require('express'); // modules NPM avec Express : Framework Node.js
const mongoose = require('mongoose'); // Importation Plugin Mongoose pour connexion à la BDD MongoDB

// Chemin vers notre système de fichier
const path = require('path'); // Plugin qui permet l'upload des images et permet de travailler avec les répertoires et chemin de fichier

const helmet = require('helmet'); // Module de sécurisation Helmet
const session = require('express-session'); // Module de gestion des sessions
const nocache = require('nocache'); // Module du gestion du cache naviguateur

// Déclaration des routes
const saucesRoutes = require('./routes/sauces'); // Importation de la route dédiée aux sauces
const userRoutes = require('./routes/user'); // Importation de la route dédiée aux utilisateurs

require('dotenv').config(); // Module Dotenv : masquer les informations de connexion à la BDD

// Connection à la base de données MongoDB
mongoose.connect('mongodb+srv://antoinernf:opantoine@antoinecluster.rdhhe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express(); // Création d'une application express

// Middleware Header pour contourner les erreurs en débloquant certains systèmes de sécurité CORS, afin que tout le monde puisse faire des requetes depuis son navigateur
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');   // Les ressources peuvent être partagées depuis n'importe quelle origine
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');   // Les entêtes  seront utilisées après la pré-vérification cross-origin afin de donner l'autorisation
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');   // Les méthodes autorisées pour les requêtes HTTP
  res.setHeader('Content-Security-Policy', "default-src 'self'");   // Autorisation du serveur à fournir des scripts pour la page visitée
  next();
});


// Transforme les données arrivant de la requête POST en un objet JSON facilement exploitable : Utilisation de Express à la place de Bodyparser car déprécié
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Sécuriser Express en définissant divers en-têtes HTTP 
app.use(helmet()); // Protection X-XSS
app.use(nocache()); // Désactive la mise en cache du navigateur

// Gestion des images
app.use('/images', express.static(path.join(__dirname, 'images'))); // Midleware qui permet de charger les fichiers qui sont dans le repertoire images

// Routes pour l'API
// Middleware qui va transmettre les requêtes vers ces url vers les routes correspondantes
app.use('/api/sauces', saucesRoutes); // Routes dédiées aux sauces
app.use('/api/auth', userRoutes); // Routes dédiées aux utilisateurs

// Export de l'application express pour déclaration dans server.js
module.exports = app;