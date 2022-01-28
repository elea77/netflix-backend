const express = require('express');
const router = express.Router();

const userRouter = require('./user.route');
const movieRouter = require('./movie.route');
const categoryRouter = require('./category.route');

router.use(userRouter);
router.use(movieRouter);
router.use(categoryRouter);

module.exports = router;