const express = require('express');
const router = express.Router();
const wishlist = require('../controllers/wishlists.controller');
const verifyAdminToken = require('../middlewares/VerifyAdminToken');
const verifyUserToken = require('../middlewares/VerifyUserToken');

router.post('/wishlist', verifyUserToken, wishlist.create);
router.get('/wishlist', verifyAdminToken, wishlist.getAll);
router.get('/wishlist/:id', verifyUserToken, wishlist.getOne);
// router.put('/wishlist/:id', verifyUserToken, wishlist.updateOne);

module.exports = router;