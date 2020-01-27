const express = require('express')
const app = express()

const query = require('../utils/query')

app.get('/test', function (req, res) {
    res.send("hello")
})

app.post('/', async function (req, res) {
    console.log("reqbody: ", req.body);
    const { wordListName } = req.body;
    // TODO: 没有该wordlist的异常处理
    let queryWordListName = wordListName;
    // do query
    let sql = `SELECT * FROM word WHERE source LIKE '%${queryWordListName}%'`;
    const resData = await query(sql,[]);
    res.status(200).json({
        words: resData
    });
})

app.post('/summarize', async function(req, res) {
    console.log("reqbody: ", req.body);
    // const { wordListName } = req.body;

    let sql = `SELECT * FROM memory JOIN word ON memory.wordid=word.id`;
    const resData = await query(sql,[]);
    res.status(200).json({
        data: resData
    });
}) 

module.exports = {
    path: '/api/wordlist',
    handler: app
}