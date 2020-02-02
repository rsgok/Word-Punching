const express = require('express')
const router = express.Router();

const query = require('../../utils/query')


router.post('/punch', async function (req, res) {
    const { uid, word } = req.body;

    // query whether exist
    let sql = `SELECT * FROM word WHERE text=?`;
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
    const insertMemoryQuery = await query(sql, [uid, wordid]);

    // TODO 连续打卡的逻辑, 考虑使用日历的形式
    // update user info
    sql = `UPDATE user \
    SET punching_days=punching_days+1, continous_punching_days=continous_punching_days+1 \
    WHERE uid=?`;
    const updateUserInfo = await query(sql, [uid]);

    // get detail info
    // TODO 返回数据精确化, 比如password不应该返回
    sql = `SELECT * FROM memory \
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

// router.post('/delete', async function(req, res){
//     
//     const { word } = req.body;
// })

router.post('/master', async function(req, res){
    const { uid, word } = req.body;
    sql = `INSERT INTO memory 
    (uid, wordid, times, is_master, lastmem_time) VALUES (?,?,?,?,now()) \
    on duplicate key update is_master=1`;
    const masterRes = await query(sql, [uid,word.id,1,1]);
    res.status(200).json({
        msg: "success"
    });
})
router.post('/unmaster', async function(req, res){  
    const { uid, word } = req.body;
    sql = `UPDATE memory SET is_master=0 WHERE uid=? and wordid=?`;
    const unmasterRes = await query(sql, [uid,word.id]);
    res.status(200).json({
        msg: "success"
    });
})

module.exports = router;