// Gestion utilisateur avec mangoose :
const mongoose = require('mongoose');
require('mongoose-type-email');

// Création d'un validateur comme plugin
const uniqueValidator = require('mongoose-unique-validator'); // package qui valide l'unicité de l'email
const sanitizerPlugin = require('mongoose-sanitizer-plugin');

// Création du schéma de données dédié à l'utilisateur
const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,  // L'email doit être unique
    required: [true, "Veuillez entrer votre adresse email"],
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Veuillez entrer une adresse email correcte"]
  },
  password: {
    type: String,
    required: [true, "Veuillez choisir un mot de passe"]
  }
});

userSchema.plugin(uniqueValidator); // Plugin pour garantir un email unique
userSchema.plugin(sanitizerPlugin); // Plugin pour Mongoose qui purifie les champs du model avant de les enregistrer dans la base MongoDB. On utilise le HTML Sanitizer de Google Caja pour effectuer cette désinfection.


// Exportation du schéma sous forme de modèle : le modèle s'appellera user et on lui passe le shéma de données
module.exports = mongoose.model('User', userSchema);