const express = require('express')
const app = express()

const wordRouter = require('./routes/word');
const wordlistRouter = require('./routes/wordlist');
const authRouter = require('./routes/auth');

app.use("/word", wordRouter);
app.use("/wordlist", wordlistRouter); 
app.use("/auth", authRouter); 

module.exports = {
    path: '/api',
    handler: app
}