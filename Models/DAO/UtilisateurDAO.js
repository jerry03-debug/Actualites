// dao/UtilisateurDAO.js
const db = require('../../Config/database');
const Utilisateur = require('../domaine/utilisateur');
const bcrypt = require('bcryptjs');

class UtilisateurDAO {
    static getAll(callback) {
        db.query('SELECT * FROM Utilisateur', (err, results) => {
            if (err) return callback(err);
            const utilisateurs = results.map(row => new Utilisateur(row.id, row.nom, row.email, row.motDePasse, row.role));
            callback(null, utilisateurs);
        });
    }

    static getById(id, callback) {
        db.query('SELECT * FROM Utilisateur WHERE id = ?', [id], (err, results) => {
            if (err) return callback(err);
            if (results.length === 0) return callback(null, null);
            const row = results[0];
            const utilisateur = new Utilisateur(row.id, row.nom, row.email, row.motDePasse, row.role);
            callback(null, utilisateur);
        });
    }

    static getByEmail(email, callback) {
        db.query('SELECT * FROM Utilisateur WHERE email = ?', [email], (err, results) => {
            if (err) return callback(err);
            if (results.length === 0) return callback(null, null);
            const row = results[0];
            const utilisateur = new Utilisateur(row.id, row.nom, row.email, row.motDePasse, row.role);
            callback(null, utilisateur);
        });
    }

    static create(data, callback) {
        const hashedPassword = bcrypt.hashSync(data.motDePasse, 8);
        db.query('INSERT INTO Utilisateur (nom, email, motDePasse, role) VALUES (?, ?, ?, ?)', 
            [data.nom, data.email, hashedPassword, data.role], (err, results) => {
                if (err) return callback(err);
                data.id = results.insertId;
                const utilisateur = new Utilisateur(data.id, data.nom, data.email, hashedPassword, data.role);
                callback(null, utilisateur);
            });
    }

    static update(id, data, callback) {
        const hashedPassword = bcrypt.hashSync(data.motDePasse, 8);
        db.query('UPDATE Utilisateur SET nom = ?, email = ?, motDePasse = ?, role = ? WHERE id = ?', 
            [data.nom, data.email, hashedPassword, data.role, id], (err) => {
                if (err) return callback(err);
                const utilisateur = new Utilisateur(id, data.nom, data.email, hashedPassword, data.role);
                callback(null, utilisateur);
            });
    }

    static delete(id, callback) {
        db.query('DELETE FROM Utilisateur WHERE id = ?', [id], callback);
    }
}

module.exports = UtilisateurDAO;
