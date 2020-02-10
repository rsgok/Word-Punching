const express = require('express');
const router = express.Router();

const query = require('../../utils/query')

router.get('/test', function (req, res) {
    res.send("hello")
})

router.post('/', async function (req, res) {
    const { wordListName, startIndex, limit } = req.body;
    const { uid } = req.user;
    // TODO: 没有该wordlist的异常处理
    const queryWordListName = wordListName;
    // do query
    let sql = `SELECT word.id, word.text, word.source, word.meaning, \
    memory.times, memory.is_master FROM word \
    LEFT JOIN memory ON word.id=memory.wordid \
    WHERE source LIKE '%${queryWordListName}%' AND (uid=${uid} OR uid is NULL) \
    ORDER BY id LIMIT ${limit} OFFSET ${startIndex}`;
    if(queryWordListName === 'mywords') {
        sql = `SELECT word.id, word.text, word.source, word.meaning, \
        memory.times, memory.is_master FROM word \
        LEFT JOIN memory ON word.id=memory.wordid \
        WHERE source LIKE '%${queryWordListName}%' AND (uid=${uid}) \
        ORDER BY id LIMIT ${limit} OFFSET ${startIndex}`;
    }
    const resData = await query(sql,[]);
    res.status(200).json({
        words: resData
    });
})

router.post('/number', async function(req, res){
    const { wordListName } = req.body;
    const { uid } = req.user;
    const queryWordListName = wordListName;
    let sql = `SELECT COUNT(word.id) as count FROM word \
    LEFT JOIN memory ON word.id=memory.wordid \
    WHERE source LIKE '%${queryWordListName}%' AND (uid=? OR uid is NULL) \
    ORDER BY id`;
    if(queryWordListName === 'mywords') {
        sql = `SELECT COUNT(word.id) as count FROM word \
        LEFT JOIN memory ON word.id=memory.wordid \
        WHERE source LIKE '%${queryWordListName}%' AND (uid=?) \
        ORDER BY id`;
    }
    const resData = await query(sql,[uid]);
    res.status(200).json({
        number: resData[0].count
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