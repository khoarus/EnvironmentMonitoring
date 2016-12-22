var users = require('./models/users');
module.exports = function(app) {

    app.get('/', (req, res) => {
        var idlogged = null;
        if (req.session && req.session.result) {
            req.session.result.forEach(function(element) {
                var temp = JSON.stringify(element);
                var logdata = JSON.parse(temp);
                idlogged = logdata.ID;
            }, this);

            users.getUserById(idlogged, (result) => {
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
                    res.redirect('/');
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
        if (!username || !password) {
            res.render("login", { error: 'Tên đăng nhập hoặc mật khẩu không được bỏ trống!' });
        } else {
            users.login(username, password, (result, status) => {
                console.log("Logged successfully for: \n" + JSON.stringify(result));
                if (result && status === true) {
                    req.session.result = result;
                    res.redirect('/');
                } else {
                    res.render("login", { error: "Sai tên đăng nhập hoặc mật khẩu" });
                }
            });
        }
    });

    app.get('/register', (req, res) => {
        var idlogged;
        if (req.session && req.session.user) {
            req.session.result.forEach(function(element) {
                var temp = JSON.stringify(element);
                var logdata = JSON.parse(temp);
                idlogged = logdata.ID;
            }, this);

            users.getUserById(idlogged, (result) => {
                if (result) {
                    res.redirect("/");
                } else {
                    req.session.reset();
                    res.render('register', { title: 'Đăng ký' });
                }
            });
        } else {
            res.render('register');
        }
    });

    app.post('/register', (req, res) => {
        var username = req.body.username;
        var password = req.body.password;
        var firstname = req.body.firstname;
        var lastname = req.body.lastnname;
        var idlogged;
        if (req.session && req.session.result) {
            req.session.result.forEach(function(element) {
                var temp = JSON.stringify(element);
                var logdata = JSON.parse(temp);
                idlogged = logdata.ID;
            }, this);

            users.getUserById(idlogged, (result) => {
                if (!result) {
                    if (!username || !password || !firstname || !lastname) {
                        res.render('register', { title: "Đăng ký" });
                    } else {
                        users.register(username, password, firstname, lastname, (result) => {
                            if (result && result === true) {
                                console.log('Welcome ' + username + ' has been registered successfully!\n');
                                res.redirect('/login');
                            } else {
                                res.render('register', { error: "Có lỗi xảy ra. Không thể đăng ký tài khoản!" });
                            }
                        });
                    }
                } else {
                    res.redirect('/');
                }
            });
        } else {
            res.redirect('/register');
        }
    });

    app.get('/logout', (req, res) => {
        req.session.destroy();
        console.log("Someone logged out");
        res.redirect('/login');
    });

    // User
    app.get('/account', (req, res) => {
        var idlogged;
        if (req.session && req.session.result) {
            req.session.result.forEach(function(element) {
                var temp = JSON.stringify(element);
                var logdata = JSON.parse(temp);
                idlogged = logdata.ID;
            }, this);

            users.getUserById(idlogged, (result) => {
                if (result) {
                    res.render('account', {
                        title: 'User',
                    });
                } else {
                    res.redirect('/login');
                }
            });
        } else {
            res.redirect('/login');
        }
    });

    app.get('/account/create', (req, res) => {
        var idlogged;
        if (req.session && req.session.result) {
            req.session.result.forEach(function(element) {
                var temp = JSON.stringify(element);
                var logdata = JSON.parse(temp);
                idlogged = logdata.ID;
            }, this);

            users.getUserById(idlogged, (result) => {
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
        var idlogged;
        if (req.session && req.session.result) {
            var id = req.params.id;
            req.session.result.forEach(function(element) {
                var temp = JSON.stringify(element);
                var logdata = JSON.parse(temp);
                idlogged = logdata.ID;
            }, this);

            users.getUserById(idlogged, (result) => {
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
        } else {
            res.redirect('/login');
        }
    });

    app.get('/account/edit', (req, res) => {
        var idlogged;
        if (req.session && req.session.result) {
            req.session.result.forEach(function(element) {
                var temp = JSON.stringify(element);
                var logdata = JSON.parse(temp);
                idlogged = logdata.ID;
            }, this);

            users.getUserById(idlogged, (result) => {
                if (result) {
                    res.render('accountEdit', {
                        title: 'Chỉnh sửa tài khoản',
                    });
                } else {
                    res.redirect('/login');
                }
            });
        } else {
            res.redirect('/login');
        }
    });

    // Device

    app.get('/device', (req, res) => {
        var idlogged;
        if (req.session && req.session.result) {
            req.session.result.forEach(function(element) {
                var temp = JSON.stringify(element);
                var logdata = JSON.parse(temp);
                idlogged = logdata.ID;
            }, this);

            users.getUserById(idlogged, (result) => {
                if (result) {
                    res.render('device', {
                        title: 'Devices',
                    });
                } else {
                    res.redirect('/login');
                }
            });
        } else {
            res.redirect('/login');
        }
    });

    app.get('/device/create', (req, res) => {
        var idlogged;
        if (req.session && req.session.result) {
            req.session.result.forEach(function(element) {
                var temp = JSON.stringify(element);
                var logdata = JSON.parse(temp);
                idlogged = logdata.ID;
            }, this);

            users.getUserById(idlogged, (result) => {
                if (result) {
                    res.render('deviceCreate', {
                        title: 'Thêm thiết bị',
                    });
                } else {
                    res.redirect('/login');
                }
            });
        } else {
            res.redirect('/login');
        }
    });

    app.get('/device/detail/:id', (req, res) => {
        var idlogged;
        if (req.session && req.session.result) {
            req.session.result.forEach(function(element) {
                var temp = JSON.stringify(element);
                var logdata = JSON.parse(temp);
                idlogged = logdata.ID;
            }, this);

            users.getUserById(idlogged, (result) => {
                if (result) {
                    res.render('deviceDetail', {
                        title: 'Thông tin chi tiết',
                    });
                } else {
                    res.redirect('/login');
                }
            });
        } else {
            res.redirect('/login');
        }
    });

    app.get('/device/edit/:id', (req, res) => {
        var idlogged;
        if (req.session && req.session.result) {
            req.session.result.forEach(function(element) {
                var temp = JSON.stringify(element);
                var logdata = JSON.parse(temp);
                idlogged = logdata.ID;
            }, this);

            users.getUserById(idlogged, (result) => {
                if (result) {
                    res.render('deviceEdit', {
                        title: 'Chỉnh sửa thiết bị',
                    });
                } else {
                    res.redirect('/login');
                }
            });
        } else {
            res.redirect('/login');
        }
    });

    // Endpoint

    app.get('/endpoint', (req, res) => {
        var idlogged;
        if (req.session && req.session.result) {
            req.session.result.forEach(function(element) {
                var temp = JSON.stringify(element);
                var logdata = JSON.parse(temp);
                idlogged = logdata.ID;
            }, this);

            users.getUserById(idlogged, (result) => {
                if (result) {
                    res.render('endpoint', {
                        title: 'Endpoint',
                    });
                } else {
                    res.redirect('/login');
                }
            });
        } else {
            res.redirect('/login');
        }
    });

    app.get('/endpoint/create', (req, res) => {
        var idlogged;
        if (req.session && req.session.result) {
            req.session.result.forEach(function(element) {
                var temp = JSON.stringify(element);
                var logdata = JSON.parse(temp);
                idlogged = logdata.ID;
            }, this);

            users.getUserById(idlogged, (result) => {
                if (result) {
                    res.render('endpointCreate', {
                        title: 'Thêm thiết bị',
                    });
                } else {
                    res.redirect('/login');
                }
            });
        } else {
            res.redirect('/login');
        }
    });

    app.get('/endpoint/detail', (req, res) => {
        var idlogged;
        if (req.session && req.session.result) {
            req.session.result.forEach(function(element) {
                var temp = JSON.stringify(element);
                var logdata = JSON.parse(temp);
                idlogged = logdata.ID;
            }, this);

            users.getUserById(idlogged, (result) => {
                if (result) {
                    res.render('endpointDetail', {
                        title: 'Thông tin chi tiết',
                    });
                } else {
                    res.redirect('/login');
                }
            });
        } else {
            res.redirect('/login');
        }
    });

    app.get('/endpoint/edit', (req, res) => {
        var idlogged;
        if (req.session && req.session.result) {
            req.session.result.forEach(function(element) {
                var temp = JSON.stringify(element);
                var logdata = JSON.parse(temp);
                idlogged = logdata.ID;
            }, this);

            users.getUserById(idlogged, (result) => {
                if (result) {
                    res.render('endpointEdit', {
                        title: 'Chỉnh sửa thiết bị',
                    });
                } else {
                    res.redirect('/login');
                }
            });
        } else {
            res.redirect('/login');
        }
    });
};