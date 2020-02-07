const express = require('express')
const router = express.Router();
const jwt = require("jsonwebtoken");
const myconfig = require("../config");

const query = require('../../utils/query')

router.post('/login', async function (req, res) {
    const {username, password} = req.body;
    const sql = `SELECT password FROM user WHERE uname=?`;
    const passwordQuery = await query(sql, [username]);
    // console.log(passwordQuery);
    if(passwordQuery.length!==0 && passwordQuery[0].password === password) {
        console.log("login success");
        
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
    }
    console.log("login fail");
    res.status(401).json({
        msg: 'login fail'
    });
})

router.post('/logout', async function (req, res) {
    console.log("user logged out");
    res.json({ status: 'OK' })
})

router.get('/user', async function (req, res) {
    console.log("fetch user");
    res.json({ user: req.user })
})

module.exports = router;