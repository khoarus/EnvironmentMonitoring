module.exports = (app, router) => {

    var users = require("./models/users");

    router.get("/", (req, res) => {
        res.json({ message: "Welcome to Environment Monitoring API", version: "1.0", statusCode: res.statusCode });
    });
    router.route('/test/post').post((req, res) => {
        res.json({ message: "Hello! This is test!", statusCode: res.statusCode });
    });


    router.route('/users/regiser').post((req, res) => {
        var username = req.body.username;
        var password = req.body.password;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var result = users.register(username, password, firstname, lastname);
        if (result) {
            res.json({
                status: '1',
                message: "Account was created successfully!"
            });
        } else {
            res.json({
                status: '0',
                message: "An error occured when create an account!"
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

    router.route('/users/:id').get((req, res) => {
        var id = req.params.id;
        var result = users.getUserById(id);
        if (!result) {
            var data = JSON.stringify(result);
            res.json(data);
        } else {
            res.json({
                Error: "Unable to get user information! Data is null!",
                ErrorCode: 0
            });
        }

    });
    router.use((req, res, next) => {
        next(new Error("Not implemented"));
    });
    app.use("/api/v1/", router);

}