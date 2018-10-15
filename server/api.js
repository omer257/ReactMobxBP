const express = require('express');
const router = express.Router()

let DummyData = [{ name: 'Burger' }, { name: 'Pizza' }, { name: 'Sushi' },]
router.get('/foodApi', (req, res) => res.json(DummyData))


module.exports = router
