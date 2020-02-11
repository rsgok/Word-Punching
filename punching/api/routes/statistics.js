const express = require('express')
const router = express.Router();

const query = require('../../utils/query')

router.post('/', async function(req, res){
    const {uid} = req.user;
    let sql = `SELECT lasttime_login,current_wordlist,\
    finished_wordlist,ongoing_wordlist,punching_days,continous_punching_days \
    FROM user WHERE uid=${uid}`
    const userInfo = await query(sql, []);
    sql = `SELECT id, rtime, times, punch_words, master_words FROM calendar WHERE uid=${uid}`
    const calendarInfo = await query(sql, [])
    res.status(200).json({
        userInfo: userInfo[0],
        calendarInfo
    })
})

module.exports = router;