const routes = require('express').Router();

let DummyData = [{name:'Burger'},{name:'Pizza'},{name:'Sushi'},]

routes.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    next()
})

routes.get('/foodApi', (req, res) => res.json(DummyData))

module.exports = routes;

