const Article = require('../Models/domaine/ArticleDAO');

exports.getAllArticles = (req, res) => {
    Article.getAll((err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.render('articles/index', { articles: results });
    });
};

exports.getArticleById = (req, res) => {
    const { id } = req.params;
    Article.getById(id, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (!results) {
            return res.status(404).send('Article not found');
        }
        res.render('articles/show', { article: results });
    });
};

exports.createArticle = (req, res) => {
    const data = req.body;
    Article.create(data, (err, article) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/articles');
    });
};

exports.updateArticle = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    Article.update(id, data, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect(`/articles/${id}`);
    });
};

exports.deleteArticle = (req, res) => {
    const { id } = req.params;
    Article.delete(id, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/articles');
    });
};
