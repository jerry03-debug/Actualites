const Categorie = require('../Models/domaine/CategorieDAO');

exports.getAllCategories = (req, res) => {
    Categorie.getAll((err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.render('categories/index', { categories: results });
    });
};

exports.getCategorieById = (req, res) => {
    const { id } = req.params;
    Categorie.getById(id, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (!results) {
            return res.status(404).send('Categorie not found');
        }
        res.render('categories/show', { categorie: results });
    });
};

exports.createCategorie = (req, res) => {
    const data = req.body;
    Categorie.create(data, (err, categorie) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/categories');
    });
};

exports.updateCategorie = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    Categorie.update(id, data, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect(`/categories/${id}`);
    });
};

exports.deleteCategorie = (req, res) => {
    const { id } = req.params;
    Categorie.delete(id, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/categories');
    });
};
