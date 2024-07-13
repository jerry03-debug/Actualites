const ArticleDAO = require('../Models/DAO/ArticleDAO');
const CategorieDAO = require('../Models/DAO/CategorieDAO');
const ejs = require('ejs');

const ITEMS_PER_PAGE = 2;

exports.getAllArticles = (req, res) => {
    const page = parseInt(req.query.page) || 1; // Récupérer le numéro de page à partir de la requête, par défaut 1

    ArticleDAO.getAll((err, results) => {
        if (err) {
            return res.status(500).send(err);
        }

        CategorieDAO.getAll((err, categories) => {
            if (err) {
                return res.status(500).send(err);
            }

            // Pagination logic
            const totalItems = results.length;
            const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
            const startIndex = (page - 1) * ITEMS_PER_PAGE;
            const endIndex = startIndex + ITEMS_PER_PAGE;
            const articles = results.slice(startIndex, endIndex);
           
             // Utiliser res.render pour rendre la vue
             res.render('articles/index', {
                articles: articles,
                categories: categories,
                currentPage: page,
                totalPages: totalPages
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
            res.render('articles/index.ejs', { articles: results, categories: categories,currentPage:1,totalPages:3});
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

        CategorieDAO.getAll((err, categories) => {
            if (err) {
                return res.status(500).send(err);
            }
            ejs.renderFile('Vues/articles/show.ejs', { article: result, categories: categories }, (err, html) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.send(html);
            });
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


exports.getPreviousArticle = (req, res) => {
    const { id } = req.params;
    ArticleDAO.getPreviousArticle(id, (err, article) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (!article) {
            return res.redirect(`/articles/${id}`);
        }
        res.redirect(`/articles/${article.id}`);
    });
};

exports.getNextArticle = (req, res) => {
    const { id } = req.params;
    ArticleDAO.getNextArticle(id, (err, article) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (!article) {
            return res.redirect(`/articles/${id}`);
        }
        res.redirect(`/articles/${article.id}`);
    });
};
