const ArticleDAO = require('../Models/DAO/ArticleDAO');
const CategorieDAO = require('../Models/DAO/CategorieDAO');
const ejs = require('ejs');

exports.getAllArticles = (req, res) => {
    ArticleDAO.getAll((err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        CategorieDAO.getAll((err, categories) => {
            if (err) {
                return res.status(500).send(err);
            }
            ejs.renderFile('Vues/articles/index.ejs', { articles: results, categories: categories }, (err, html) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.send(html);
            });
        });
    });
};


exports.getArticlesByCategory = (req, res) => {
    const { id } = req.params; // Récupère l'ID de la catégorie depuis les paramètres d'URL
    ArticleDAO.getByCategory(id, (err, results) => { 
        if (err) {
            return res.status(500).send(err);
        }
        CategorieDAO.getAll((err, categories) => { // Récupère toutes les catégories pour le menu de navigation
            if (err) {
                return res.status(500).send(err);
            }
            ejs.renderFile('Vues/articles/index.ejs', { articles: results, categories: categories }, (err, html) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.send(html);
            });
        });
    });
};

exports.getArticleById = (req, res) => {
    const { id } = req.params;
    ArticleDAO.getById(id, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (!result) {
            return res.status(404).send('Article not found');
        }
        ejs.renderFile('Vues/articles/show.ejs', { article: result }, (err, html) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.send(html);
        });
    });
};

exports.createArticle = (req, res) => {
    const data = req.body;
    ArticleDAO.create(data, (err, article) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/articles');
    });
};

exports.updateArticle = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    ArticleDAO.update(id, data, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect(`/articles/${id}`);
    });
};

exports.deleteArticle = (req, res) => {
    const { id } = req.params;
    ArticleDAO.delete(id, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/articles');
    });
};
