
// controller层逻辑 接收参数 -> 编写sql -> 调用数据连接池 -> 返回结果
const pool = require('../utils/mysql')

// 查询
const list = (param) => {
    let sql = `select count(*) as count from ActiveUser`
   
    console.log(param, 'param')
    if(param.account) {
       sql += ` where refs='${param.account}'`
    }
    return pool.query(sql)
}
// 新添
const add = (data) => {

	 const sql = `INSERT INTO ActiveUser VALUES (null,'${data.email}','${data.twitterName}','${data.telegramName}','${data.twitterLink}','${data.retweet}',${data.follow},${data.joinTelegramGroup},${data.joinTelegramChannel},'${data.address}','${data.ref}')`
	return pool.query(sql)	
}

// 更改
const update = (val) => {

}

// 删除
const del = val => {

}

module.exports = {
  list,
  add,
  update,
  del,
}
  
