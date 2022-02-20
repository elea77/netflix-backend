const express = require('express');
const router = express.Router();
const movie = require('../controllers/movies.controller');
const verifyAdminToken = require('../middlewares/VerifyAdminToken');

router.post('/movies', verifyAdminToken, movie.create);
router.get('/movies', movie.getAll);
router.get('/movies/category/:id', movie.getAllByCategory);
router.get('/movies/:id', movie.getOne);
router.put('/movies/:id', verifyAdminToken, movie.updateOne);
router.delete('/movies/:id', verifyAdminToken, movie.deleteOne);

module.exports = router;