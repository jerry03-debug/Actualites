const soap = require('soap');
const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../Config/database');  // Chemin corrigé
const UtilisateurDAO = require('../Models/DAO/UtilisateurDAO');  // Chemin corrigé

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.raw({ type: () => true, limit: '5mb' }));

// Définir les fonctions du service SOAP
const service = {
    UtilisateurService: {
        UtilisateurServiceSoapPort: {
            listUtilisateurs: (args, callback) => {
                UtilisateurDAO.getAll((err, results) => {
                    if (err) {
                        callback({ message: err.message });
                    } else {
                        callback(null, { utilisateurs: results });
                    }
                });
            },
            createUtilisateur: (args, callback) => {
                const data = args;
                UtilisateurDAO.create(data, (err, results) => {
                    if (err) {
                        callback({ message: err.message });
                    } else {
                        callback(null, { id: results.id });
                    }
                });
            },
            deleteUtilisateur: (args, callback) => {
                const { id } = args;
                UtilisateurDAO.delete(id, (err) => {
                    if (err) {
                        callback({ message: err.message });
                    } else {
                        callback(null, { message: 'Utilisateur supprimé' });
                    }
                });
            },
            updateUtilisateur: (args, callback) => {
                const { id, nom, email, motDePasse, role } = args;
                const data = { nom, email, motDePasse, role };
                UtilisateurDAO.update(id, data, (err) => {
                    if (err) {
                        callback({ message: err.message });
                    } else {
                        callback(null, { message: 'Utilisateur mis à jour' });
                    }
                });
            },
            authenticateUtilisateur: (args, callback) => {
                const { email, motDePasse } = args;
                UtilisateurDAO.getByEmail(email, (err, utilisateur) => {
                    if (err) {
                        callback({ message: err.message });
                    } else if (!utilisateur) {
                        callback({ message: 'Utilisateur non trouvé' });
                    } else {
                        const passwordIsValid = bcrypt.compareSync(motDePasse, utilisateur.motDePasse);
                        if (!passwordIsValid) {
                            callback({ message: 'Mot de passe incorrect' });
                        } else {
                            const token = jwt.sign({ id: utilisateur.id, role: utilisateur.role }, 'secret_key', { expiresIn: 86400 });
                            callback(null, { auth: true, token });
                        }
                    }
                });
            }
        }
    }
};

// Définir le WSDL du service
const xml = fs.readFileSync(path.join(__dirname, 'service.wsdl'), 'utf8');

app.listen(PORT, () => {
    soap.listen(app, '/wsdl', service, xml, () => {
        console.log(`SOAP server is running on port ${PORT}`);
    });
});
