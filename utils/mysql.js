
const mysql = require('mysql');
const config = require('../config/mysql')
// 创建连接池

const pool  = mysql.createPool({
  host     : config.database.HOST,
  user     : config.database.USERNAME,
  password : config.database.PASSWORD,
  database : config.database.DATABASE
});

/**
 * 
 * @param sql 接收的sql语句 
 * @param values 接受的参数： 为数组
 * return 返回查询数据 
 */
const query = function( sql, values ) {
  console.log(sql, 'sql')
  return new Promise(( resolve, reject ) => {
    
    pool.getConnection(function(err, connection) {
      if (err) {
        console.log('连接数据库失败')
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {
          console.log(rows, 'rows')
          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })
}
module.exports = {
  query,
}