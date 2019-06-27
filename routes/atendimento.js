module.exports = {
    getAtendimentosPage: (req, res) => {
        res.render('index.ejs', {
            title: "Holoser"
        });
    },
};