const express = require('express')
const router = express.Router();

const query = require('../../utils/query')
const punchCalendar = require("../util/calendar")


router.post('/punch', async function (req, res) {
    const { word } = req.body;
    const { uid } = req.user;

    // query whether exist
    let sql = `SELECT id FROM word WHERE text=?`;
    const ifExistQuery = await query(sql, [word]);
    const ifExist = ifExistQuery.length === 0 ? false : true;

    // if not exist, then insert into word table
    let insertWordQuery;
    if (!ifExist) {
        sql = `INSERT INTO word (text,source) VALUES (?,?)`;
        insertWordQuery = await query(sql, [word, "mywords"]);
    }

    // punch memory add
    const wordid = ifExist ? ifExistQuery[0].id : insertWordQuery.insertId;
    sql = `INSERT INTO memory 
    (uid, wordid, lastmem_time) VALUES (?,?,now()) \
    on duplicate key update times=times+1`;
    await query(sql, [uid, wordid]);

    // calendar relevant
    await punchCalendar(uid, word, 'punch')

    // get detail info
    sql = `SELECT word.id, word.text FROM memory \
    JOIN user ON memory.uid=user.uid \
    JOIN word ON memory.wordid=word.id \
    WHERE wordid = ?`
    const detailInfo = await query(sql, [wordid]);

    // TODO 错误操作的handle
    res.status(200).json({
        ifExist,
        detail: detailInfo[0]
    });
})

router.post('/delete', async function (req, res) {
    const { wordid } = req.body;
    const { uid } = req.user;
    const sql = `DELETE FROM memory WHERE uid=? and wordid=?`
    await query(sql, [uid, wordid])
    res.status(200).json({
        msg: "success"
    });
})

router.post('/master', async function (req, res) {
    const { wordid, text } = req.body;
    const { uid } = req.user;
    const sql = `INSERT INTO memory 
    (uid, wordid, is_master, lastmem_time) VALUES (?,?,?,now()) \
    on duplicate key update is_master=1`;
    await query(sql, [uid, wordid, 1]);
    await punchCalendar(uid, text, 'master')
    res.status(200).json({
        msg: "success"
    });
})
router.post('/unmaster', async function (req, res) {
    const { wordid } = req.body;
    const { uid } = req.user;
    const sql = `UPDATE memory SET is_master=0 WHERE uid=? and wordid=?`;
    await query(sql, [uid, wordid]);
    res.status(200).json({
        msg: "success"
    });
})

module.exports = router;