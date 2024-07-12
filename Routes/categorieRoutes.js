const express = require('express');
const router = express.Router();
const categorieController = require('../Controllers/categorieController');

router.get('/', categorieController.getAllCategories);
router.post('/', categorieController.createCategorie);
router.get('/:id', categorieController.getCategorieById);
router.put('/:id', categorieController.updateCategorie);
router.delete('/:id', categorieController.deleteCategorie);

module.exports = router;
