// models/Utilisateur.js
class Utilisateur {
    constructor(id, nom, email, motDePasse, role) {
        this.id = id;
        this.nom = nom;
        this.email = email;
        this.motDePasse = motDePasse;
        this.role = role;
    }
}

module.exports = Utilisateur;
