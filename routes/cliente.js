const fs = require('fs');
const queries = require('./../sql/queries');

module.exports = {
    getClientePage: (req, res) => {
        db.query(queries.getClientesQuery, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('cliente.ejs', {
                title: "Holoser | Clientes"
                ,clientes: result
            });
        });
    },
    addClientePage: (req, res) => {
        res.render('add-cliente.ejs', {
            title: "Holoser | Adicionar Cliente"
            ,message: ''
        });
    },
    addCliente: (req, res) => {
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

        // TODO: Colocar FAB de Adição Flutuando no Canto Direito da Página
        // TODO: Converter data inserida para formato do sql
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
    editPlayerPage: (req, res) => {
        let playerId = req.params.id;
        let query = "SELECT * FROM `players` WHERE id = '" + playerId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-cliente.ejs', {
                title: "Edit  Player"
                ,player: result[0]
                ,message: ''
            });
        });
    },
    editPlayer: (req, res) => {
        let playerId = req.params.id;
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let position = req.body.position;
        let number = req.body.number;

        let query = "UPDATE `players` SET `first_name` = '" + first_name + "', `last_name` = '" + last_name + "', `position` = '" + position + "', `number` = '" + number + "' WHERE `players`.`id` = '" + playerId + "'";
        // db.query(query, (err, result) => {
        //     if (err) {
        //         return res.status(500).send(err);
        //     }
        //     res.redirect('/');
        // });
    },
    deletePlayer: (req, res) => {
        let playerId = req.params.id;
        let getImageQuery = 'SELECT image from `players` WHERE id = "' + playerId + '"';
        let deleteUserQuery = 'DELETE FROM players WHERE id = "' + playerId + '"';

        db.query(getImageQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            let image = result[0].image;

            fs.unlink(`public/assets/img/${image}`, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
            });
        });
    },


    // openAddClientePage() {
    //     console.log("Hello World");
    //     window.location = '/addCliente';
    // }
};
