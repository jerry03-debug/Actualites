const express = require('express');
const router = express.Router();
const articleController = require('../Controllers/articleController');
const authController = require('../Controllers/authController');

router.get('/login', authController.getLoginPage);
router.post('/login', authController.postLogin);

router.get('/', articleController.getAllArticles);

router.get('/articles', articleController.getAllArticles);
router.get('/articles/:id', articleController.getArticleById);
router.get('/articles/categoryId/:id', articleController.getArticlesByCategory);
router.post('/articles', articleController.createArticle);
router.put('/articles/:id', articleController.updateArticle);
router.delete('/articles/:id', articleController.deleteArticle);
router.get('/articles/:id/previous', articleController.getPreviousArticle);
router.get('/articles/:id/next', articleController.getNextArticle);

module.exports = router;
