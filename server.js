const express = require('express')
const app = express()
const port = 5000


let DummyData = [{name:'Burger'},{name:'Pizza'},{name:'Sushi'},]

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    next()
})

app.get('/foodApi', (req, res) => res.json(DummyData))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))