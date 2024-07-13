const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const articleRoutes = require('./Routes/articleRoutes');
const categorieRoutes = require('./Routes/categorieRoutes');
const utilisateurRoutes = require('./Routes/utilisateurRoutes');
const db = require('./Config/database'); 
const session = require('express-session');

// app.use(session({
//     secret: 'votre_secret',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false } // Utilisez true en production avec HTTPS
// }));


app.set('view engine', 'ejs');
app.set('views', './Vues');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(articleRoutes);
app.use(categorieRoutes);
app.use(utilisateurRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
