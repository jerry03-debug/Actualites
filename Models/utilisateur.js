const db = require('../Config/database');
const bcrypt = require('bcryptjs');

class Utilisateur {
    static getAll(callback) {
        db.query('SELECT * FROM Utilisateur', callback);
    }

    static getById(id, callback) {
        db.query('SELECT * FROM Utilisateur WHERE id = ?', [id], callback);
    }

    static getByEmail(email, callback) {
        db.query('SELECT * FROM Utilisateur WHERE email = ?', [email], callback);
    }

    static create(data, callback) {
        const hashedPassword = bcrypt.hashSync(data.motDePasse, 8);
        db.query('INSERT INTO Utilisateur (nom, email, motDePasse, role) VALUES (?, ?, ?, ?)', 
            [data.nom, data.email, hashedPassword, data.role], callback);
    }

    static update(id, data, callback) {
        const hashedPassword = bcrypt.hashSync(data.motDePasse, 8);
        db.query('UPDATE Utilisateur SET nom = ?, email = ?, motDePasse = ?, role = ? WHERE id = ?', 
            [data.nom, data.email, hashedPassword, data.role, id], callback);
    }

    static delete(id, callback) {
        db.query('DELETE FROM Utilisateur WHERE id = ?', [id], callback);
    }
}

module.exports = Utilisateur;
