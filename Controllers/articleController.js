const Article = require('../Models/article');

exports.getAllArticles = (req, res) => {
    Article.getAll((err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
};

exports.getArticleById = (req, res) => {
    const { id } = req.params;
    Article.getById(id, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length === 0) {
            return res.status(404).send('Article not found');
        }
        res.json(results[0]);
    });
};

exports.createArticle = (req, res) => {
    const data = req.body;
    Article.create(data, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).json({ id: results.insertId });
    });
};

exports.updateArticle = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    Article.update(id, data, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.sendStatus(204);
    });
};

exports.deleteArticle = (req, res) => {
    const { id } = req.params;
    Article.delete(id, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.sendStatus(204);
    });
};
