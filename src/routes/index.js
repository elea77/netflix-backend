const express = require('express');
const router = express.Router();

const userRouter = require('./user.route');
const movieRouter = require('./movie.route');
const categoryRouter = require('./category.route');
const wishlistRouter = require('./wishlist.route');
const checkoutRouter = require('./checkout.route');
const webHooksRouter = require('./webhook.route');

router.use(userRouter);
router.use(movieRouter);
router.use(categoryRouter);
router.use(wishlistRouter);
router.use(checkoutRouter);
router.use(webHooksRouter);


module.exports = router;