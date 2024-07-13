// dao/CategorieDAO.js
const db = require('../../Config/database'); 
const Categorie = require('../domaine/categorie');

class CategorieDAO {
    static getAll(callback) {
        db.query('SELECT * FROM Categorie', (err, results) => {
            if (err) return callback(err);
            const categories = results.map(row => new Categorie(row.id, row.libelle));
            callback(null, categories);
        });
    }

    static getById(id, callback) {
        db.query('SELECT * FROM Categorie WHERE id = ?', [id], (err, results) => {
            if (err) return callback(err);
            if (results.length === 0) return callback(null, null);
            const row = results[0];
            const categorie = new Categorie(row.id, row.libelle);
            callback(null, categorie);
        });
    }

    static create(data, callback) {
        db.query('INSERT INTO Categorie (libelle) VALUES (?)', [data.libelle], (err, results) => {
            if (err) return callback(err);
            data.id = results.insertId;
            const categorie = new Categorie(data.id, data.libelle);
            callback(null, categorie);
        });
    }

    static update(id, data, callback) {
        db.query('UPDATE Categorie SET libelle = ? WHERE id = ?', [data.libelle, id], (err) => {
            if (err) return callback(err);
            const categorie = new Categorie(id, data.libelle);
            callback(null, categorie);
        });
    }

    static delete(id, callback) {
        db.query('DELETE FROM Categorie WHERE id = ?', [id], callback);
    }
}

module.exports = CategorieDAO;
