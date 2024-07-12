// models/Article.js
class Article {
    constructor(id, titre, contenu, categorieId, auteurId, dateModification) {
        this.id = id;
        this.titre = titre;
        this.contenu = contenu;
        this.categorieId = categorieId;
        this.auteurId = auteurId;
        this.dateModification = dateModification;
    }
}

module.exports = Article;
