const express = require('express');
const router = express.Router();
const user = require('../controllers/users.controller');
const verifyUserToken = require('../middlewares/VerifyUserToken');
const validationSchema = require('../middlewares/validators/users.validation');
const verifyAdminToken = require('../middlewares/VerifyAdminToken');

router.post('/users', validationSchema, user.create);
router.get('/users', verifyUserToken, user.getAll);
router.delete('/users/:id', verifyAdminToken, user.deleteOne);
router.get('/users/get-user', verifyUserToken, user.getOne);
router.get('/users/get-email/:email', user.getOneByEmail);
router.put('/users/:id', verifyUserToken, user.updateOne);
router.get('/verifytoken', verifyUserToken, user.verifyToken);
router.post('/login', user.login);

module.exports = router;