const fs = require('fs');
const queries = require('./../sql/queries');

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
            dataNascimento: attr.dataNasc,
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
        // let playerId = req.params.id;
        // let query = "SELECT * FROM `players` WHERE id = '" + playerId + "' ";

        values = [[req.params.id]]
        db.query(queries.getClientePorCodigo, values, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('clientes/edit-cliente.ejs', {
                title: "Holoser | Editar Cliente"
                , cliente: result[0]
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
            // dataNascimento: attr.dataNasc,
            dataNascimento: '2019-01-01',
            rua: attr.rua,
            numero: parseInt(attr.numero),
            bairro: attr.bairro,
            cidade: attr.cidade,
            estado: attr.estado
        }

        // let query = "UPDATE `players` SET `first_name` = '" + first_name + "', `last_name` = '" + last_name + "', `position` = '" + position + "', `number` = '" + number + "' WHERE `players`.`id` = '" + playerId + "'";
        db.query(queries.editClienteQuery, (err, result) => {
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

formatSexo = function (sexo) {
    switch (sexo) {
        case "M":
            return "Masculino";
        case "F":
            return "Feminino";
    }
}

formatEstado = function (estado) {
    switch (estado) {
        case "AC": return "Acre"
        case "AL": return "Alagoas"
        case "AP": return "Amapá"
        case "AM": return "Amazonas"
        case "BA": return "Bahia"
        case "CE": return "Ceará"
        case "DF": return "Distrito Federal"
        case "ES": return "Espírito Santo"
        case "GO": return "Goiás"
        case "MA": return "Maranhão"
        case "MT": return "Mato Grosso"
        case "MS": return "Mato Grosso do Sul"
        case "MG": return "Minas Gerais"
        case "PA": return "Pará"
        case "PB": return "Paraíba"
        case "PR": return "Paraná"
        case "PE": return "Pernambuco"
        case "PI": return "Piauí"
        case "RJ": return "Rio de Janeiro"
        case "RN": return "Rio Grande do Norte"
        case "RS": return "Rio Grande do Sul"
        case "RO": return "Rondônia"
        case "RR": return "Roraima"
        case "SC": return "Santa Catarina"
        case "SP": return "São Paulo"
        case "SE": return "Sergipe"
        case "TO": return "Tocantins"
    }
}