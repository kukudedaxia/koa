// 封装通用状态

const success = (result) => {
  return {
    status: 200,
    data: result
  }
}
const failed = (error) => {
  console.log(error)
  return {
    status: 500,
    data: error.message || '服务器异常'
  }
}

/**
 * 
 * @param {*} params  参数对象
 * @param {*} sql sql语句
 * @description 根据参数对象去改变sql语句，最后返回对应的sql语句
 * @return 返回处理后的sql语句
 */

const update = (params, sql) =>  {
    let keys = Object.keys(params)
    let arr = []
    keys.forEach((key) => {
      if (key) {
        sql = sql + `${key} = ? ,`
        arr.push(params[key])
      }
    })
    sql = sql.substring(0, sql.length - 1)
    return {
      args: arr,
      sql,
    }
  }

module.exports = {
  success,
  failed,
  update
}