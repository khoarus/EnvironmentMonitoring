module.exports = function(app) {
    app.get('/', (req, res) => {
        /*var sess = req.session;
        if (sess.id) {
            res.render('index', { title: 'Trang chủ' });
        } else {
            res.render('login');
        }*/
        res.render('index', {
            title: 'Trang chủ',
            //pageHeader: 'Dashboard'
        })
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

    app.get('/logout', (req, res) => {
        req.session.destroy();
        res.render('login');
    });
    app.get('/create', (req, res) => {
        res.render("create");
    });
    // User

    app.get('/account', (req, res) => {
        res.render('account', {
            title: 'User',
            //pageHeader: 'Dashboard'
        })
    });

    app.get('/account/edit', (req, res) => {
        res.render('accountEdit', {
            title: 'Chỉnh sửa tài khoản',
            //pageHeader: 'Dashboard'
        })
    });

    // Device

    app.get('/device', (req, res) => {
        res.render('device', {
            title: 'Devices',
        })
    });

    app.get('/createDevice', (req, res) => {
        res.render("createDevice");
    });
};