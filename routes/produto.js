module.exports = {
    getProdutosPage: (req, res) => {
        res.render('index.ejs', {
            title: "Holoser"
        });
    },
};