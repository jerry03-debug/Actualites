const Categorie = require('../Models/domaine/categorie');
const ejs = require('ejs');

exports.getAllCategories = (req, res) => {
    Categorie.getAll((err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        ejs.renderFile('Vues/categories/index.ejs', { categories: results }, (err, html) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.send(html);
        });
    });
};

exports.getCategorieById = (req, res) => {
    const { id } = req.params;
    Categorie.getById(id, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (!result) {
            return res.status(404).send('Categorie not found');
        }
        ejs.renderFile('Vues/categories/show.ejs', { categorie: result }, (err, html) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.send(html);
        });
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
