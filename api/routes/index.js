exports.setRoutes = app => {
    app.use('/users',require('./user.route'))
}