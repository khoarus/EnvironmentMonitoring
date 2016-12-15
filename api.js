module.exports = (app, router) => {
    router.get("/", (req, res) => {
        res.json({ message: "Welcome to Environment Monitoring API", version: "1.0" });
    });

    router.use((req, res, next) => {
        next();
    });


    router.route('/users/regiser').post((req, res) => {
        var users = require("./models/users");
        var username = req.body.username;
        var password = req.body.password;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var result = users.register(username, password, firstname, lastname);
        if (result > 0) {
            res.json({ status: 1, message: "Account was created successfully!" });
        } else {
            res.json({
                status: 0,
                message: "An error occured when create account!"
            });
        }
    });

    app.use("/api/v1/", router);

}