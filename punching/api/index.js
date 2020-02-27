const express = require('express')
const app = express()
const expressJWT = require("express-jwt");

const wordRouter = require('./routes/word');
const wordlistRouter = require('./routes/wordlist');
const authRouter = require('./routes/auth');
const statisticsRouter = require('./routes/statistics')

const myconfig = require("./config");

// jwt auth
app.use(
    expressJWT({
        secret: myconfig.jwtSecret
    }).unless({
        path: [
            "/api/auth/login",
            "/api/auth/register",
        ] //除了这些地址，其他的URL都需要验证
    })
);
// log debug
app.use((req, res, next) => {
    console.log("----------------log debug----------------");
    console.log("requser:", req.user);
    console.log("reqbody:", req.body);
    console.log("reqparam:", req.query);
    console.log("-----------------------------------------");
    next();
});

app.use("/word", wordRouter);
app.use("/wordlist", wordlistRouter);
app.use("/auth", authRouter);
app.use("/statistics", statisticsRouter);

module.exports = {
    path: '/api',
    handler: app
}