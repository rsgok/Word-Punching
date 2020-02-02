const express = require('express')
const router = express.Router();
const jwt = require("jsonwebtoken");
const myconfig = require("../config");

const query = require('../../utils/query')

router.post('/login', async function (req, res) {
    const {username} = req.body;
    const accessToken = jwt.sign(
        {username},
        myconfig.jwtSecret,
        {
            // 授权时效1day
            expiresIn: 60 * 60 * 24
        }
    );
    res.status(200).json({
        token: accessToken
    });
})

router.post('/logout', async function (req, res) {
    res.json({ status: 'OK' })
})

router.get('/user', async function (req, res) {
    res.json({ user: req.user })
})

module.exports = router;