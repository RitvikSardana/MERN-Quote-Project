const express = require('express')
const router = express.Router();

const apiController = require('../controllers/apiController')

router.post('/register',apiController.api_register_post)

router.post('/login',apiController.api_login_post)

router.post('/quote',apiController.api_quote_post)

router.get('/quote',apiController.api_quote_get)

module.exports = router;