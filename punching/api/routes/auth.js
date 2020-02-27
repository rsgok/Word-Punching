const express = require('express')
const router = express.Router();
const jwt = require("jsonwebtoken");
const myconfig = require("../config");

const query = require('../../utils/query')

router.post('/login', async function (req, res) {
    const {username, password} = req.body;
    const sql = `SELECT password, uid FROM user WHERE uname=?`;
    const passwordQuery = await query(sql, [username]);
    // console.log(passwordQuery);
    if(passwordQuery.length!==0 && passwordQuery[0].password === password) {
        console.log("login success");
        
        const accessToken = jwt.sign(
            {
                uname: username,
                uid: passwordQuery[0].uid
            },
            myconfig.jwtSecret,
            {
                // 授权时效3day
                expiresIn: 60 * 60 * 24 * 3
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

router.post('/register', async function (req, res) {
    console.log("register user");
    const {username, password, inviteCode} = req.body;
    if(inviteCode !== myconfig.inviteCode) {
        res.status(200).json({
            code: 401,
            msg: "Invite Code Wrong"
        })
    }
    else if(username.length<6) {
        res.status(200).json({
            code: 403,
            msg: "Username Length Should >6"
        })
    }
    else if(password.length<6) {
        res.status(200).json({
            code: 403,
            msg: "Password Length Should >6"
        })
    } else {
        let sql = `SELECT uname FROM user WHERE uname=?`;
        const queryUser = await query(sql, [username]);
        if(queryUser.length !== 0) {
            res.status(200).json({
                code: 402,
                msg: "Duplicate User"
            })
        } else {
            sql = `INSERT INTO user (uname, password) VALUES (?,?)`;
            await query(sql, [username, password]);
            res.status(200).json({
                code: 200,
                msg: "Register Successfully"
            })
        }
    }
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