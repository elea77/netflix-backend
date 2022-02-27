const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkout.controller');
const verifyUserToken = require('../middlewares/VerifyUserToken');

router.post('/checkout', verifyUserToken, checkoutController.createSession);

module.exports = router;