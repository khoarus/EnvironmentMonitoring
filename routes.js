var users = require('./models/users');
module.exports = function(app) {
    app.get('/', (req, res) => {
        if (req.session && req.session.result) {
            users.getUserById(req.session.result.ID, (result) => {
                if (result) {
                    res.render('index', {
                        title: 'Dashboard',
                        //pageHeader: 'Dashboard'
                    });
                } else {
                    res.render('login');
                }
            });
        } else {
            res.render('login');
        }

    });

    app.get('/login', (req, res) => {
        if (req.session && req.session.result) {
            users.getUserById(req.session.result.ID, (result) => {
                if (result) {
                    res.redirect('index');
                } else {
                    res.render('login');
                }
            });
        } else {
            res.render("login");
        }
    });

    app.post('/login', (req, res) => {

        var username = req.body.username,
            password = req.body.password;
        if (!username || !password || (!username && !password)) {
            res.render("login", { error: 'Tên đăng nhập hoặc mật khẩu không được bỏ trống!' });
        } else {
            users.login(username, password, (result, status) => {
                if (result && status === true) {
                    req.session.result = result;
                    res.redirect('/index');
                } else {
                    res.redirect("/login", { error: "Sai tên đăng nhập hoặc mật khẩu" });
                }
            });
        }
    });

    app.get('/register', (req, res) => {
        if (req.session && req.session.user) {
            users.getUserById(req.session.result.ID, (result) => {
                if (result) {
                    res.redirect("/index");
                } else {
                    req.session.reset();
                    res.render('register', { title: 'Đăng ký' });
                }
            });
        } else {
            res.redirect('/register');
        }
    });

    app.post('/register', (req, res) => {
        var username = req.body.username;
        var password = req.body.password;
        var firstname = req.body.firstname;
        var lastname = req.body.lastnname;

        if (req.session && req.session.result) {
            users.getUserById(req.session.result.ID, (result) => {
                if (result) {
                    if (!username || !password || !firstname || !lastname) {
                        res.render('register', { title: "Đăng ký" });
                    } else {
                        users.register(username, password, firstname, lastname, (result) => {
                            if (result && result === true) {
                                res.redirect('/login');
                            } else {
                                res.render('register', { error: "Có lỗi xảy ra. Không thể đăng ký tài khoản!" });
                            }
                        });
                    }
                } else {
                    res.redirect('/index');
                }
            });
        } else {
            res.redirect('/redirect');
        }
    });

    app.get('/logout', (req, res) => {
        req.session.reset();
        res.redirect('/login');
    });

    app.get('/create', (req, res) => {
        res.render("create");
    });

    // User
    app.get('/account', (req, res) => {
        res.render('account', {
            title: 'User',
        });
    });

    app.get('/account/create', (req, res) => {
        if (req.session && req.session.result) {
            users.getUserById(req.session.result.ID, (result) => {
                if (result) {
                    res.render('accountCreate', {
                        title: 'Tạo tài khoản',
                    });
                } else {
                    res.redirect('/login');
                }
            });
        } else {
            res.redirect('/login');
        }

    });

    app.get('/account/detail/:id', (req, res) => {
        if (req.session && req.session.result) {
            var id = req.params.id;
            users.getUserById(req.session.result.ID, (result) => {
                if (result) {
                    if (!id) {
                        res.redirect('/account');
                    } else {
                        res.render('accountDetail', {
                            title: 'Thông tin chi tiết',
                        });
                    }
                } else {
                    res.redirect('/login');
                }
            });
        }
    });

    app.get('/account/edit', (req, res) => {
        if (req.session && req.session.result) {

        }
        res.render('accountEdit', {
            title: 'Chỉnh sửa tài khoản',
        });
    });

    // Device

    app.get('/device', (req, res) => {
        res.render('device', {
            title: 'Devices',
        });
    });

    app.get('/device/create', (req, res) => {
        res.render('deviceCreate', {
            title: 'Thêm thiết bị',
        });
    });

    app.get('/device/detail/:id', (req, res) => {
        res.render('deviceDetail', {
            title: 'Thông tin chi tiết',
        });
    });

    app.get('/device/edit/:id', (req, res) => {
        res.render('deviceEdit', {
            title: 'Chỉnh sửa thiết bị',
        });
    });

    // Endpoint

    app.get('/endpoint', (req, res) => {
        res.render('endpoint', {
            title: 'Endpoint',
        });
    });

    app.get('/endpoint/create', (req, res) => {
        res.render('endpointCreate', {
            title: 'Thêm thiết bị',
        });
    });

    app.get('/endpoint/detail', (req, res) => {
        res.render('endpointDetail', {
            title: 'Thông tin chi tiết',
        });
    });

    app.get('/endpoint/edit', (req, res) => {
        res.render('endpointEdit', {
            title: 'Chỉnh sửa thiết bị',
        });
    });

};