module.exports = function(app) {
    app.get('/', (req, res) => {
        /*var sess = req.session;
        if (sess.id) {
            res.render('index', { title: 'Trang chủ' });
        } else {
            res.render('login');
        }*/
        res.render('index', {
            title: 'Dashboard',
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
        })
    });

    app.get('/account/create', (req, res) => {
        res.render('accountCreate', {
            title: 'Tạo tài khoản',
        })
    });

    app.get('/account/detail', (req, res) => {
        res.render('accountDetail', {
            title: 'Thông tin chi tiết',
        })
    });

    app.get('/account/edit', (req, res) => {
        res.render('accountEdit', {
            title: 'Chỉnh sửa tài khoản',
        })
    });

    // Device

    app.get('/device', (req, res) => {
        res.render('device', {
            title: 'Devices',
        })
    });

    app.get('/device/create', (req, res) => {
        res.render('deviceCreate', {
            title: 'Thêm thiết bị',
        })
    });

    app.get('/device/detail', (req, res) => {
        res.render('deviceDetail', {
            title: 'Thông tin chi tiết',
        })
    });

    app.get('/device/edit', (req, res) => {
        res.render('deviceEdit', {
            title: 'Chỉnh sửa thiết bị',
        })
    });

    // Endpoint

    app.get('/endpoint', (req, res) => {
        res.render('endpoint', {
            title: 'Endpoint',
        })
    });

    app.get('/endpoint/create', (req, res) => {
        res.render('endpointCreate', {
            title: 'Thêm thiết bị',
        })
    });

    app.get('/endpoint/detail', (req, res) => {
        res.render('endpointDetail', {
            title: 'Thông tin chi tiết',
        })
    });

    app.get('/endpoint/edit', (req, res) => {
        res.render('endpointEdit', {
            title: 'Chỉnh sửa thiết bị',
        })
    });
};