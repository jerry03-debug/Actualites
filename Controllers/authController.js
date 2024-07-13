const soap = require('soap');

exports.getLoginPage = (req, res) => {
    res.render('login');
};

exports.postLogin = (req, res) => {
    const { email, motDePasse,role} = req.body;
    console.log(email)
     // Rendre la vue en fonction du rôle de l'utilisateur
     ejs.renderFile('Vues/articles/index.ejs', { role: utilisateur.role }, (err, html) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(html);
    });


    const url = 'http://localhost:4000/wsdl?wsdl';

    soap.createClient(url, (err, client) => {
        if (err) {
            return res.status(500).send(err);
        }

        const args = { email, motDePasse };

        client.authenticateUtilisateur(args, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            if (!result.auth) {
                //Naviguer
                
                return res.status(401).send('Email ou mot de passe incorrect');
            }

            const user = {
                email: email,
                token: result.token
            };

            req.session.user = user;
            res.redirect('/');
        });
    });
};
