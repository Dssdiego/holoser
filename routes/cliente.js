const fs = require('fs');
const queries = require('./../sql/queries');
const moment = require('moment');

module.exports = {
    getClientePage: (req, res) => {
        db.query(queries.getClientesQuery, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('clientes/cliente.ejs', {
                title: "Holoser | Clientes"
                , clientes: result
            });
        });
    },
    addClientePage: (req, res) => {
        res.render('clientes/add-cliente.ejs', {
            title: "Holoser | Adicionar Cliente"
            , message: ''
        });
    },
    addCliente: (req, res) => {
        let attr = req.body;

        let cliente = {
            nome: attr.nome,
            cpf: attr.cpf,
            telefone: attr.telefone,
            sexo: attr.sexo,
            dataNascimento: moment(convertDate(attr.dataNasc)).format('YYYY-MM-DD'),
            rua: attr.rua,
            numero: parseInt(attr.numero),
            bairro: attr.bairro,
            cidade: attr.cidade,
            estado: attr.estado
        }

        // TODO: Após escolher o estado, preencher automaticamente as cidades com um json

        values = [
            [cliente.nome, cliente.cpf, cliente.telefone, cliente.dataNascimento, cliente.sexo, cliente.rua, cliente.numero, cliente.bairro, cliente.cidade, cliente.estado]
        ]

        db.query(queries.insertClienteQuery, values, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            console.log("Cliente Inserido no Banco de Dados!");
            res.redirect('/clientes');
        });
    },
    editClientePage: (req, res) => {
        moment.locale('pt-br');

        values = [[req.params.id]]
        db.query(queries.getClientePorCodigo, values, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('clientes/edit-cliente.ejs', {
                title: "Holoser | Editar Cliente"
                , cliente: result[0]
                , moment: moment
                , message: ''
            });
        });
    },
    editCliente: (req, res) => {
        let attr = req.body;

        let cliente = {
            nome: attr.nome,
            cpf: attr.cpf,
            telefone: attr.telefone,
            sexo: attr.sexo,
            dataNascimento: moment(convertDate(attr.dataNasc)).format('YYYY-MM-DD'),
            rua: attr.rua,
            numero: parseInt(attr.numero),
            bairro: attr.bairro,
            cidade: attr.cidade,
            estado: attr.estado
        }

        values = [
            [cliente.nome], 
            [cliente.cpf], 
            [cliente.telefone], 
            [cliente.dataNascimento], 
            [cliente.sexo], 
            [cliente.rua], 
            [cliente.numero], 
            [cliente.bairro], 
            [cliente.cidade], 
            [cliente.estado],
            [req.params.id]
        ] 
        db.query(queries.editClienteQuery, values, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/clientes');
            console.log("Cliente Editado com Sucesso");
        });
    },
    deleteCliente: (req, res) => {
        values = [[req.params.id]]
        db.query(queries.deleteClienteQuery, values, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/clientes');
            console.log("Cliente Excluído com Sucesso");
        });
    }
};

convertDate = function (dateString) {
    var dateParts = dateString.split("/");
    return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
}

formatSexo = function (sexo) {
    switch (sexo) {
        case "M":
            return "Masculino";
        case "F":
            return "Feminino";
    }
}