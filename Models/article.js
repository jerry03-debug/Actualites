const db = require('../Config/database');

class Article {
    static getAll(callback) {
        db.query('SELECT * FROM Article', callback);
    }

    static getById(id, callback) {
        db.query('SELECT * FROM Article WHERE id = ?', [id], callback);
    }

    static create(data, callback) {
        db.query('INSERT INTO Article (titre, contenu, categorieId, auteurId) VALUES (?, ?, ?, ?)', 
            [data.titre, data.contenu, data.categorieId, data.auteurId], callback);
    }

    static update(id, data, callback) {
        db.query('UPDATE Article SET titre = ?, contenu = ?, categorieId = ?, auteurId = ?, dateModification = NOW() WHERE id = ?', 
            [data.titre, data.contenu, data.categorieId, data.auteurId, id], callback);
    }

    static delete(id, callback) {
        db.query('DELETE FROM Article WHERE id = ?', [id], callback);
    }
}

module.exports = Article;
