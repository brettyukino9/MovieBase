const express = require ('express');

const app = express();
const PORT = process.env.PORT

app.use(express.static(__dirname));
app.use(express.urlencoded({extended: true}));

const routes = require ('./routes');
app.use(routes);

app.listen(PORT, () => console.log(`Server listiening on port: ${PORT}`));