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
    }
};