const express = require('express');
const router = express.Router();

const query = require('../../utils/query')

router.get('/test', function (req, res) {
    res.send("hello")
})

router.post('/', async function (req, res) {
    const { wordListName,uid } = req.body;
    // TODO: 没有该wordlist的异常处理
    let queryWordListName = wordListName;
    // do query
    let sql = `SELECT * FROM word \
    LEFT JOIN memory ON word.id=memory.wordid \
    WHERE source LIKE '%${queryWordListName}%' AND (uid=? OR uid is NULL) \
    ORDER BY id`;
    const resData = await query(sql,[uid]);
    res.status(200).json({
        words: resData
    });
})

router.post('/summarize', async function(req, res) {
    let sql = `SELECT * FROM memory JOIN word ON memory.wordid=word.id`;
    const resData = await query(sql,[]);
    res.status(200).json({
        data: resData
    });
}) 

module.exports = router;