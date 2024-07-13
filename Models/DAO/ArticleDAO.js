// dao/ArticleDAO.js
const db = require('../../Config/database'); 
const Article = require('../domaine/article');

class ArticleDAO {
    static getAll(callback) {
        db.query('SELECT * FROM Article', (err, results) => {
            function formatDate(dateString) {
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
                const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
                return formattedDate;
            }
            if (err) return callback(err);
            const articles = results.map(row => new Article(row.id, row.titre, row.contenu, row.categorie, row.auteurId, row.dateModification.toString().split("G")[0],row.dateCreation.toString().split("G")[0]));
            callback(null, articles);
        });
    }

    static getById(id, callback) {
        db.query('SELECT * FROM Article WHERE id = ?', [id], (err, results) => {
            if (err) return callback(err);
            if (results.length === 0) return callback(null, null);
            const row = results[0];
            const article = new Article(row.id, row.titre, row.contenu, row.categorie, row.auteurId, row.dateModification,row.dateCreation);
            callback(null, article);
        });
    }

    static getByCategory(categoryId, callback) {
        db.query('SELECT * FROM Article WHERE categorie = ?', [categoryId], (err, results) => {
            if (err) return callback(err);
            const articles = results.map(row => new Article(row.id, row.titre, row.contenu, row.categorie, row.auteurId));
            callback(null, articles);
        });
    }


    static create(data, callback) {
        db.query('INSERT INTO Article (titre, contenu, categorie, auteurId) VALUES (?, ?, ?, ?)', 
            [data.titre, data.contenu, data.categorie, data.auteurId], (err, results) => {
                if (err) return callback(err);
                data.id = results.insertId;
                const article = new Article(data.id, data.titre, data.contenu, data.categorie, data.auteurId);
                callback(null, article);
            });
    }

    static update(id, data, callback) {
        db.query('UPDATE Article SET titre = ?, contenu = ?, categorie = ?, auteurId = ?, dateModification,row.dateCreation = NOW() WHERE id = ?', 
            [data.titre, data.contenu, data.categorie, data.auteurId, id], (err) => {
                if (err) return callback(err);
                const article = new Article(id, data.titre, data.contenu, data.categorie, data.auteurId, new Date());
                callback(null, article);
            });
    }

    static delete(id, callback) {
        db.query('DELETE FROM Article WHERE id = ?', [id], callback);
    }
}

module.exports = ArticleDAO;
