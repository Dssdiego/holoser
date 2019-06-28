const queries = require('./../sql/queries');

module.exports = {
    getVencimentoProdutosPage: (req, res) => {
        db.query(queries.getProdutoPorMarcaQuery, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('relatorios/produtos-por-marca.ejs', {
                title: "Holoser | Produtos x Marca"
                ,produtos: result
            });
        });
    },
    getClientePorLocalPage: (req, res) => {
        db.query(queries.getClientePorLocalQuery, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('relatorios/cliente-por-local.ejs', {
                title: "Holoser | Cliente x Local"
                ,clientes: result
            });
        });
    }
};