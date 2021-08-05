// Importation de mongoose
const mongoose = require('mongoose');
const sanitizerPlugin = require('mongoose-sanitizer-plugin');
// Appel le middleware de validation des champs du model de la sauce
const sauceValidation = require('../middleware/sauceValidation');

// Création d'un schema mangoose pour que les données de la base MongoDB ne puissent pas différer de celui précisé dans le schema Model des sauces. L'id est généré automatiquement par MongoDB
const sauceSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  mainPepper: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true
  },
  heat: {
    type: Number,
    required: true
  },
  likes: {
    type: Number
  },
  dislikes: {
    type: Number
  },
  usersLiked: {
    type: [String]
  },
  usersDisliked: {
    type: [String]
  },
})

sauceSchema.plugin(sanitizerPlugin); // Plugin pour Mongoose qui purifie les champs du model avant de les enregistrer dans la base MongoDB.

// Exportation du shéma de données
module.exports = mongoose.model('Sauce', sauceSchema);