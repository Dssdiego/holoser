const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const { getHomePage } = require('./routes/index');
const { getClientePage, addClientePage, addCliente, deleteCliente, editCliente, editClientePage } = require('./routes/cliente');
const { getProdutosPage, addProdutoPage, addProduto, deleteProduto, editProdutoPage, editProduto } = require('./routes/produto');
const { getAgendamentosPage } = require('./routes/agendamento');
const { getAtendimentosPage } = require('./routes/atendimento');
const { getHistoricoPage, getClientePorLocalPage, getVencimentoProdutosPage } = require('./routes/relatorios');
const port = 3000;

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

// Agendamentos
app.get('/agendamentos', getAgendamentosPage); // Consulta de Agendamentos

// Atendimentos
app.get('/atendimentos', getAtendimentosPage); // Consulta de Atendimentos

// Clientes
app.get('/clientes', getClientePage); // Consulta de Clientes
app.get('/addCliente', addClientePage); // Adicionar Cliente
app.get('/editCliente/:id', editClientePage); // Editar Cliente
app.get('/deleteCliente/:id', deleteCliente); // Deletar Cliente

app.post('/addCliente', addCliente);
app.post('/editCliente/:id', editCliente);

// Produtos
app.get('/produtos', getProdutosPage); // Consulta de Produtos
app.get('/addProduto', addProdutoPage); // Adicionar Produto
app.get('/editProduto/:id', editProdutoPage); // Editar Cliente
app.get('/deleteProduto/:id', deleteProduto); // Deletar Produto

app.post('/addProduto', addProduto);
app.post('/editProduto/:id', editProduto);

// Relatórios
app.get('/historico', getHistoricoPage); // Agendamentos
app.get('/cliente-por-local', getClientePorLocalPage); // Cliente x Local
app.get('/produtos-por-marca', getVencimentoProdutosPage); // Produtos x Marca

// Listener do Servidor Local
app.listen(process.env.PORT || port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});