const express = require('express')
const router = express.Router();

const query = require('../../utils/query')

router.post('/login', async function(req, res){
    console.log("reqbody: ", req.body);
    // const { uid, word } = req.body;
    // sql = `UPDATE memory SET is_master=0 WHERE uid=? and wordid=?`;
    // const unmasterRes = await query(sql, [uid,word.id]);
    res.status(200).json({
        token: "fdjsalk"
    });
})

module.exports = router;