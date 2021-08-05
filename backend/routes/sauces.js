// Création du router qui contient les fonctions qui s'appliquent aux différentes routes pour les sauces

// Ajout de plugin externe nécessaire pour utiliser le router d'Express
const express = require('express');
// Appel du routeur avec la méthode mise à disposition par Express
const router = express.Router(); // La logique de routing et la logique métier est dans le controller sauce.js

// MIDDLEWARES
const auth = require('../middleware/auth'); // Importation du middleware auth pour sécuriser les routes : Récupère la configuration d'authentification JsonWebToken
const multer = require('../middleware/multer-config'); //On importe le middleware multer pour la gestion des images

// CONTROLLERS
const saucesCtrl = require('../controllers/sauces'); // On associe les fonctions aux différentes routes, on importe le controller

// ROUTERS
// Création des ROUTES de l'API (avec middlewares et controllers)
router.post('/', auth, multer, saucesCtrl.createSauce); // Route qui permet de créer "une sauce"
router.put('/:id', auth, multer, saucesCtrl.modifySauce); // Route qui permet de modifier "une sauce"
router.delete('/:id', auth, saucesCtrl.deleteSauce); // Route : supprimer "une sauce" avec l'ID fourni.
router.get('/:id', auth, saucesCtrl.getOneSauce); // Route : cliquer sur une des sauces précise avec l'ID fourni
router.get('/', auth, saucesCtrl.getAllSauce); // Route : récupérer toutes les sauces (via tableau de toutes les sauces de la BDD)
router.post('/:id/like', auth, saucesCtrl.likeDislike) // Route qui permet de gérer les likes des sauces

module.exports = router;
