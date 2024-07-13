// models/Article.js
class Article {
    constructor(id, titre, contenu, categorie, auteurId, dateModification,dateCreation) {
        this.id = id;
        this.titre = titre;
        this.contenu = contenu;
        this.categorie = categorie;
        this.auteurId = auteurId;
        this.dateCreation = dateCreation || new Date();
        this.dateModification = dateModification;
    }
}

module.exports = Article;
