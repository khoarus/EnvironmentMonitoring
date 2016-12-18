module.exports = function(app) {

    app.get('/', (req, res) => {
        res.render('index', { title: 'Trang chủ'})
    });

    app.get

    app.get('/login', (req, res) => {
        res.render("login");
    });

    app.get('/register', (req, res) => {
        res.render("register");
    });

    app.get('/forgot', (req, res) => {
        res.render('forgot');
    });
    app.get('/account', (req, res) => {
        res.render('account');
    });
    app.get('/logout', (req, res) => {
        req.session.destroy();
        res.render('login');
    });
    app.get('/create', (req, res) => {
        res.render("create");
    });

    // Device

    app.get('/device', (req, res) => {
        res.render("device");
    });

    app.get('/createDevice', (req, res) => {
        res.render("createDevice");
    });
};