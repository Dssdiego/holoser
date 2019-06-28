const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const moment = require('moment');
const app = express();

const { getHomePage } = require('./routes/index');
const { getClientePage, addClientePage, addCliente, deletePlayer, editPlayer, editPlayerPage } = require('./routes/cliente');
const { getProdutosPage } = require('./routes/produto');
const { getAtendimentosPage } = require('./routes/atendimento');
const port = 2000;

// Cria Conexão com o BD
const db = mysql.createConnection({
    host: '200.18.128.51',
    user: 'diego',
    password: 'diego',
    database: 'diego',
    port: 3306
});

// Conecta no BD
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conectado ao Banco de Dados!');
});
global.db = db;

// Configura a Base do App
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// Rotas do App
app.get('/', getHomePage); // Página Inicial

// Atendimentos
app.get('/atendimentos', getAtendimentosPage); // Consulta de Atendimentos

// Clientes
app.get('/clientes', getClientePage); // Consulta de Clientes
app.get('/addCliente', addClientePage); // Adicionar Cliente
app.get('/edit/:id', editPlayerPage);
app.get('/delete/:id', deletePlayer);
app.post('/addCliente', addCliente);
app.post('/edit/:id', editPlayer);

// Produtos
app.get('/produtos', getProdutosPage); // Consulta de Produtos

// Listener do Servidor Local
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});