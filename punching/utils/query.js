const mysql = require("mysql");
const pool = mysql.createPool({
  host: "www.joyinn.top",
  user: "root",
  password: "wangjk00",
  database: "word_punching"
});

const query = function(sql, values) {
  console.log("【query】", sql,values);

  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            // console.log("【query result】", rows);
            resolve(rows);
          }
          connection.release();
        });
      }
    });
  });
};

module.exports = query;
