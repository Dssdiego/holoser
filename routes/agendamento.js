const moment = require('moment');
const queries = require('./../sql/queries');

module.exports = {
    getAgendamentosPage: (req, res) => {
        moment.locale('pt-br');
    
        db.query(queries.getAgendamentosQuery, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('agendamentos.ejs', {
                title: "Holoser | Agendamentos"
                ,moment: moment
                ,agendamentos: result
            });
        });
    }
};