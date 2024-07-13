const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateurController');

router.post('/register', utilisateurController.register);
router.post('/login', utilisateurController.login);

module.exports = router;
