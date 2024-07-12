const express = require('express');
const bodyParser = require('body-parser');
const articleRoutes = require('./Routes/articleRoutes');
const categorieRoutes = require('./Routes/categorieRoutes');
const utilisateurRoutes = require('./Routes/utilisateurRoutes');

const app = express();
const PORT =  3000;

app.use(bodyParser.json());
app.use('/articles', articleRoutes);
app.use('/categories', categorieRoutes);
app.use('/utilisateurs', utilisateurRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
