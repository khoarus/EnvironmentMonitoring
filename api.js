module.exports = (app, router) => {
    router.get("/", (req, res) => {
        res.json({ message: "Welcome to Environment Monitoring API", version: "1.0" });
    });

    router.use((req, res, next) => {
        next();
    });


    router.route('/users').post((req, res) => {
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;
    });

    app.use("/api/v1/", router);

}