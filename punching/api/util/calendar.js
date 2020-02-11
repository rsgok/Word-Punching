const query = require('../../utils/query')

const punchCalendar = async (uid, text, type = 'punch') => {
    // search if exist today
    let sql = `SELECT punch_words, master_words FROM calendar \
    WHERE uid=${uid} AND to_days(rtime) = to_days(now())`
    const existRes = await query(sql, []);
    if (existRes.length === 0) {
        // not exist then insert
        if (type === 'punch') {
            sql = `INSERT INTO calendar (uid, punch_words, master_words, times) \
            VALUES (${uid}, "${text}", "", 1)`
        } else if (type === 'master') {
            sql = `INSERT INTO calendar (uid, punch_words, master_words, times) \
            VALUES (${uid}, "", "${text}", 1)`
        }
        await query(sql, []);
        // update user info
        sql = `SELECT count(*) as count FROM calendar WHERE uid=${uid} AND TO_DAYS(NOW()) - TO_DAYS(rtime) = 1`
        const yesterdayRes = await query(sql, [])
        if (yesterdayRes[0].count === 0) {
            sql = `UPDATE user \
            SET punching_days=punching_days+1, continous_punching_days=1 \
            WHERE uid=${uid}`
        } else {
            sql = `UPDATE user \
            SET punching_days=punching_days+1, continous_punching_days=continous_punching_days+1\
            WHERE uid=${uid}`
        }
        await query(sql, [])
    } else {
        // exist then update d
        if (type === 'master') {
            let master_words = existRes[0].master_words;
            if (master_words === "") {
                master_words = `${text}`
            } else {
                master_words = master_words + `,${text}`
            }
            sql = `UPDATE calendar SET master_words='${master_words}', times=times+1, rtime=now() \
            WHERE uid=${uid} AND to_days(rtime) = to_days(now())`
        } else if (type === 'punch') {
            let punch_words = existRes[0].punch_words;
            if (punch_words === "") {
                punch_words = `${text}`
            } else {
                punch_words = punch_words + `,${text}`
            }
            sql = `UPDATE calendar SET punch_words='${punch_words}', times=times+1, rtime=now() \
            WHERE uid=${uid} AND to_days(rtime) = to_days(now())`
        }
        await query(sql, []);
    }
}

module.exports = punchCalendar;