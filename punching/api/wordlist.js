const express = require('express')
const app = express()

const query = require('../utils/query')

app.get('/test', function (req, res) {
    res.send("hello")
})

app.post('/', async function (req, res) {
    console.log("reqbody: ", req.body);
    const { wordListName } = req.body;

    let queryWordListName = null;
    if(wordListName == "Toefl Intelligent") queryWordListName = "toefl_intelligent";
    else if(wordListName == "Toefl Core") queryWordListName = "toefl_core";
    else {
        res.status(401).send('no such wordlist');
    }
    // do query
    let sql = `SELECT * FROM word WHERE source LIKE '%${queryWordListName}%'`;
    const resData = await query(sql,[]);
    res.status(200).json({
        words: resData
    });
})

module.exports = {
    path: '/api/wordlist',
    handler: app
}