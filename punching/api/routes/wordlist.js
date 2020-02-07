const express = require('express');
const router = express.Router();

const query = require('../../utils/query')

router.get('/test', function (req, res) {
    res.send("hello")
})

router.post('/', async function (req, res) {
    const { wordListName } = req.body;
    const { uid } = req.user;
    // TODO: 没有该wordlist的异常处理
    let queryWordListName = wordListName;
    // do query
    let sql = `SELECT * FROM word \
    LEFT JOIN memory ON word.id=memory.wordid \
    WHERE source LIKE '%${queryWordListName}%' AND (uid=? OR uid is NULL) \
    ORDER BY id`;
    if(queryWordListName === 'mywords') {
        sql = `SELECT * FROM word \
        LEFT JOIN memory ON word.id=memory.wordid \
        WHERE source LIKE '%${queryWordListName}%' AND (uid=?) \
        ORDER BY id`;
    }
    const resData = await query(sql,[uid]);
    res.status(200).json({
        words: resData
    });
})

router.post('/summarize', async function(req, res) {
    const { uid } = req.user;
    let sql = `SELECT * FROM memory JOIN word ON memory.wordid=word.id WHERE memory.uid = ?`;
    const resData = await query(sql,[uid]);
    res.status(200).json({
        data: resData
    });
}) 

module.exports = router;