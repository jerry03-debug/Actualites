const express = require('express');
const router = express.Router();
const utilisateurController = require('../Controllers/utilisateurController');

router.post('/register', utilisateurController.register);
router.post('/login', utilisateurController.login);

module.exports = router;
