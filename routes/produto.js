const moment = require('moment');
const queries = require('./../sql/queries');

module.exports = {
    getProdutosPage: (req, res) => {
        moment.locale('pt-br');

        db.query(queries.getProdutosQuery, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('produtos/produto.ejs', {
                title: "Holoser | Produtos"
                ,moment: moment
                ,produtos: result
            });
        });
    },
    addProdutoPage: (req, res) => {
        res.render('produtos/add-produto.ejs', {
            title: "Holoser | Adicionar Produto"
            , message: ''
        });
    },
    addProduto: (req, res) => {
        let attr = req.body;

        let produto = {
            nome: attr.nome,
            marca: attr.marca,
            preco: attr.preco,
            validade: attr.validade
        }

        values = [
            [produto.nome, produto.marca, produto.preco, produto.validade]
        ]

        db.query(queries.insertProdutoQuery, values, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            console.log("Produto Inserido no Banco de Dados!");
            res.redirect('/produtos');
        });
    },
    editProdutoPage: (req, res) => {
        values = [[req.params.id]]
        db.query(queries.getProdutoPorCodigo, values, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('produtos/edit-produto.ejs', {
                title: "Holoser | Editar Produto"
                , produto: result[0]
                , message: ''
            });
        });
    },
    editProduto: (req, res) => {
        let attr = req.body;

        let produto = {
            nome: attr.nome,
            marca: attr.marca,
            preco: attr.preco,
            validade: attr.validade
        }

        // let query = "UPDATE `players` SET `first_name` = '" + first_name + "', `last_name` = '" + last_name + "', `position` = '" + position + "', `number` = '" + number + "' WHERE `players`.`id` = '" + playerId + "'";
        values = [
            [produto.nome, produto.marca, produto.preco, produto.validade]
        ]
        db.query(queries.editProdutoQuery, values, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/produtos');
            console.log("Produto Editado com Sucesso");
        });
    },
    deleteProduto: (req, res) => {
        values = [[req.params.id]]
        db.query(queries.deleteProdutoQuery, values, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/produtos');
            console.log("Produto Excluído com Sucesso");
        });
    }
};