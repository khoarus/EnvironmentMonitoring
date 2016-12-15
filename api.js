module.exports = (app, router) => {
    router.get("/", (req, res) => {
        res.json({ message: "Welcome to Environment Monitoring API", version: "1.0" });
    });

    router.route('/users').post((req, res) => {

    });

    app.use("/api/v1/", router);

}