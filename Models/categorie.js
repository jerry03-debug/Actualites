const db = require('../config/database');

class Categorie {
    static getAll(callback) {
        db.query('SELECT * FROM Categorie', callback);
    }

    static getById(id, callback) {
        db.query('SELECT * FROM Categorie WHERE id = ?', [id], callback);
    }

    static create(data, callback) {
        db.query('INSERT INTO Categorie (libelle) VALUES (?)', [data.libelle], callback);
    }

    static update(id, data, callback) {
        db.query('UPDATE Categorie SET libelle = ? WHERE id = ?', [data.libelle, id], callback);
    }

    static delete(id, callback) {
        db.query('DELETE FROM Categorie WHERE id = ?', [id], callback);
    }
}

module.exports = Categorie;
