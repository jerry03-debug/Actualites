const soap = require('soap');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./config/database');
const Utilisateur = require('../Models/domaine/utilisateur');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.raw({ type: () => true, limit: '5mb' }));

// Définir les fonctions du service SOAP
const service = {
    UtilisateurService: {
        UtilisateurServiceSoapPort: {
            listUtilisateurs: (args, callback) => {
                Utilisateur.getAll((err, results) => {
                    if (err) {
                        callback({ message: err.message });
                    } else {
                        callback({ utilisateurs: results });
                    }
                });
            },
            createUtilisateur: (args, callback) => {
                const data = args;
                Utilisateur.create(data, (err, results) => {
                    if (err) {
                        callback({ message: err.message });
                    } else {
                        callback({ id: results.insertId });
                    }
                });
            },
            deleteUtilisateur: (args, callback) => {
                const { id } = args;
                Utilisateur.delete(id, (err) => {
                    if (err) {
                        callback({ message: err.message });
                    } else {
                        callback({ message: 'Utilisateur supprimé' });
                    }
                });
            },
            updateUtilisateur: (args, callback) => {
                const { id, data } = args;
                Utilisateur.update(id, data, (err) => {
                    if (err) {
                        callback({ message: err.message });
                    } else {
                        callback({ message: 'Utilisateur mis à jour' });
                    }
                });
            },
            authenticateUtilisateur: (args, callback) => {
                const { email, motDePasse } = args;
                Utilisateur.getByEmail(email, (err, results) => {
                    if (err) {
                        callback({ message: err.message });
                    } else if (results.length === 0) {
                        callback({ message: 'Utilisateur non trouvé' });
                    } else {
                        const utilisateur = results[0];
                        const passwordIsValid = bcrypt.compareSync(motDePasse, utilisateur.motDePasse);
                        if (!passwordIsValid) {
                            callback({ message: 'Mot de passe incorrect' });
                        } else {
                            const token = jwt.sign({ id: utilisateur.id, role: utilisateur.role }, 'secret_key', { expiresIn: 86400 });
                            callback({ auth: true, token });
                        }
                    }
                });
            }
        }
    }
};

// Définir le WSDL du service
const xml = require('fs').readFileSync('service.wsdl', 'utf8');

app.listen(PORT, () => {
    soap.listen(app, '/wsdl', service, xml, () => {
        console.log(`SOAP server is running on port ${PORT}`);
    });
});
