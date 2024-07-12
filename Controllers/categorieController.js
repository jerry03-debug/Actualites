const Categorie = require('../Models/categorie');

exports.getAllCategories = (req, res) => {
    Categorie.getAll((err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
};

exports.getCategorieById = (req, res) => {
    const { id } = req.params;
    Categorie.getById(id, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length === 0) {
            return res.status(404).send('Categorie not found');
        }
        res.json(results[0]);
    });
};

exports.createCategorie = (req, res) => {
    const data = req.body;
    Categorie.create(data, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).json({ id: results.insertId });
    });
};

exports.updateCategorie = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    Categorie.update(id, data, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.sendStatus(204);
    });
};

exports.deleteCategorie = (req, res) => {
    const { id } = req.params;
    Categorie.delete(id, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.sendStatus(204);
    });
};
