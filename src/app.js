require('dotenv').config()
const app = require('./services/server.service');
const mongoose = require('./services/mongoose.service');

const verifyUserToken = require('./middlewares/VerifyUserToken');

mongoose.connectDb();
app.start();