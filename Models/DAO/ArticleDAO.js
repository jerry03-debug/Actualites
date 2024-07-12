// dao/ArticleDAO.js
const db = require('../Config/database');
const Article = require('../models/Article');

class ArticleDAO {
    static getAll(callback) {
        db.query('SELECT * FROM Article', (err, results) => {
            if (err) return callback(err);
            const articles = results.map(row => new Article(row.id, row.titre, row.contenu, row.categorieId, row.auteurId, row.dateModification));
            callback(null, articles);
        });
    }

    static getById(id, callback) {
        db.query('SELECT * FROM Article WHERE id = ?', [id], (err, results) => {
            if (err) return callback(err);
            if (results.length === 0) return callback(null, null);
            const row = results[0];
            const article = new Article(row.id, row.titre, row.contenu, row.categorieId, row.auteurId, row.dateModification);
            callback(null, article);
        });
    }

    static create(data, callback) {
        db.query('INSERT INTO Article (titre, contenu, categorieId, auteurId) VALUES (?, ?, ?, ?)', 
            [data.titre, data.contenu, data.categorieId, data.auteurId], (err, results) => {
                if (err) return callback(err);
                data.id = results.insertId;
                const article = new Article(data.id, data.titre, data.contenu, data.categorieId, data.auteurId);
                callback(null, article);
            });
    }

    static update(id, data, callback) {
        db.query('UPDATE Article SET titre = ?, contenu = ?, categorieId = ?, auteurId = ?, dateModification = NOW() WHERE id = ?', 
            [data.titre, data.contenu, data.categorieId, data.auteurId, id], (err) => {
                if (err) return callback(err);
                const article = new Article(id, data.titre, data.contenu, data.categorieId, data.auteurId, new Date());
                callback(null, article);
            });
    }

    static delete(id, callback) {
        db.query('DELETE FROM Article WHERE id = ?', [id], callback);
    }
}

module.exports = ArticleDAO;
