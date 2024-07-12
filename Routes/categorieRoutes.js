const express = require('express');
const router = express.Router();
const categorieController = require('../controllers/categorieController');

router.get('/categories', categorieController.getAllCategories);
router.get('/categories/:id', categorieController.getCategorieById);
router.post('/categories', categorieController.createCategorie);
router.put('/categories/:id', categorieController.updateCategorie);
router.delete('/categories/:id', categorieController.deleteCategorie);

module.exports = router;
