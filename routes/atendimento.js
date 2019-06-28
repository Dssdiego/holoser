const moment = require('moment');
const queries = require('./../sql/queries');

module.exports = {
    getAtendimentosPage: (req, res) => {
        moment.locale('pt-br');

        db.query(queries.getAtendimentosQuery, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('atendimentos/atendimento.ejs', {
                title: "Holoser | Atendimentos"
                ,moment: moment
                ,atendimentos: result
            });
        });
    }
};