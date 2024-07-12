const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const articleRoutes = require('./routes/articleRoutes');
const categorieRoutes = require('./routes/categorieRoutes');
const utilisateurRoutes = require('./routes/utilisateurRoutes');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(articleRoutes);
app.use(categorieRoutes);
app.use(utilisateurRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
