module.exports = function(app) {
    app.get('/', (req, res) => {
        res.render("index");
    });
    app.get('/login', (req, res) => {
        res.render("login");
    });
    app.post("/login", (req, res) => {

    });

};