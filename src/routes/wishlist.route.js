const express = require('express');
const router = express.Router();
const wishlist = require('../controllers/wishlists.controller');
const verifyUserToken = require('../middlewares/VerifyUserToken');

router.post('/wishlist', verifyUserToken, wishlist.create);
router.get('/wishlist', verifyUserToken, wishlist.getAll);
router.get('/wishlist/:id', verifyUserToken, wishlist.getOne);

module.exports = router;