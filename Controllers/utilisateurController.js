const Utilisateur = require('../Models/domaine/UtilisateurDAO');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = (req, res) => {
    const data = req.body;
    Utilisateur.create(data, (err, utilisateur) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/utilisateurs/login');
    });
};

exports.login = (req, res) => {
    const { email, motDePasse } = req.body;
    Utilisateur.getByEmail(email, (err, utilisateur) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (!utilisateur) {
            return res.status(404).send('Utilisateur non trouvé');
        }
        const passwordIsValid = bcrypt.compareSync(motDePasse, utilisateur.motDePasse);
        if (!passwordIsValid) {
            return res.status(401).send('Mot de passe incorrect');
        }
        const token = jwt.sign({ id: utilisateur.id, role: utilisateur.role }, 'secret_key', { expiresIn: 86400 });
        res.status(200).render('utilisateurs/profile', { auth: true, token });
    });
};

exports.verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send('Aucun token fourni');
    }
    jwt.verify(token, 'secret_key', (err, decoded) => {
        if (err) {
            return res.status(500).send('Echec de l\'authentification du token');
        }
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
};
