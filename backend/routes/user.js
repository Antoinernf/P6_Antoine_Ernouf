// Contient les fonctions qui s'appliquent aux différentes routes pour les utilisateurs

const express = require('express'); // Importation de Express
const router = express.Router(); // Création d'un router avec la méthode d' Express


const userCtrl = require('../controllers/user'); // Association des fonctions aux différentes routes, Importation du controlleur

const verifyPassword = require('../middleware/verifyPassword'); // Vérification du middleware password pour la connexion utilisateur

// Création des routes Inscription et Connexion de l'API avec les middlewares et les controllers d'authentification et de sécurité qui leur sont appliquées

// Chiffrage du mot de passe et ajoute l'utilisateur à la BDD
router.post('/signup', verifyPassword, userCtrl.signup); // Crée un nouvel utilisateur
router.post('/login', userCtrl.login); // Connecte un utilisateur

module.exports = router;
