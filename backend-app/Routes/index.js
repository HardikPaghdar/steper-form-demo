module.exports = app => {
    try {
        app.get('/', (req, res) => {
            res.send("Welcome to " + process.env.PROJECT_NAME)
        });

        app.use("/api", require('./api'));

    } catch (error) {
        console.log('error: ',error);
    }
}
