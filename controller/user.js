
// controller层逻辑 接收参数 -> 编写sql -> 调用数据连接池 -> 返回结果
const pool = require('../utils/mysql')

// 查询用户
const list = (params) => {
    // const sql = 'select * from user where id > ?'
    const sql = `select * from user where id > ${params.val}`
    return pool.query(sql)
}
// 新添用户
const add = (val) => {
}

// 更改用户
const update = (val) => {

}

// 删除用户
const del = val => {

}

module.exports = {
  list
}
  