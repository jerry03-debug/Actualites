const express = require('express');
const router = express.Router();
const articleController = require('../Controllers/articleController');

router.get('/articles', articleController.getAllArticles);
router.get('/articles/:id', articleController.getArticleById);
router.post('/articles', articleController.createArticle);
router.put('/articles/:id', articleController.updateArticle);
router.delete('/articles/:id', articleController.deleteArticle);

module.exports = router;
