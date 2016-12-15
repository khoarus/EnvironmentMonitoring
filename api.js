module.exports = (app, router) => {
    var users = require("./models/users");
    router.get("/", (req, res) => {
        res.json({ message: "Welcome to Environment Monitoring API", version: "1.0" });
    });

    router.use((req, res, next) => {
        next();
    });


    router.route('/users/regiser').post((req, res) => {
        var username = req.body.username;
        var password = req.body.password;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var result = users.register(username, password, firstname, lastname);
        if (result > 0) {
            res.json({
                status: 1,
                message: "Account was created successfully!"
            });
        } else {
            res.json({
                status: 0,
                message: "An error occured when creat an account!"
            });
        }
    });

    router.route('/users/login').post((req, res) => {
        var username = req.body.username,
            password = req.body.password;
        var result = users.login(username, password);
        if (result) {
            res.json({
                status: 1,
                message: "Login Successfully!"
            });
        }
    });
    app.use("/api/v1/", router);

}