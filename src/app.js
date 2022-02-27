require('dotenv').config()
const app = require('./services/server.service');
const mongoose = require('./services/mongoose.service');

mongoose.connectDb();
app.start();