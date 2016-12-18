module.exports = function(app) {

    app.get('/', (req, res) => {
<<<<<<< HEAD
        var sess = req.session;
        if (sess.id) {
            res.render('index', { title: 'Trang chủ' });
        } else {
            res.render('login');
        }
=======
        res.render('index', { 
            title: 'Trang chủ',
            pageHeader: 'Dashboard'
        })
>>>>>>> d11e51e7faf7839aa0b3e1a4eb757ec7628e15cd
    });

    app.get('/login', (req, res) => {
        res.render("login", { title: 'Đăng nhập' });
    });

    app.get('/register', (req, res) => {
        res.render("register", { title: 'Đăng ký' });
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