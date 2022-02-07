const express = require('express');
const router = express.Router();
const category = require('../controllers/categories.controller');
const verifyAdminToken = require('../middlewares/VerifyAdminToken');

router.post('/categories', verifyAdminToken, category.create);
router.get('/categories', category.getAll);
router.get('/categories/:id', category.getOne);
router.put('/categories/:id', verifyAdminToken, category.updateOne);

module.exports = router;