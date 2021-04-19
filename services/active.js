

// 可以认为这里是接口处理方法
const model = require('./model')
const controller = require(`../controller/active`)

const m  = model([
  'list',
  'update',
  'del'
], 'active')

const add = async ctx => {
    let res;
    const key = 'add';
    const methods = require(`../apis/active`)[key]['method'];
    try {
        const param = methods == 'get' ? ctx.query : ctx.request.body
        await controller[key](param).then(result => {
            res = {
                status: '200',
                data: 'Fill in successfully',
                msg: 'success'
            }
        })
    } catch(err) {
        res = {
            status: '500',
            data: 'system error',
            msg: 'error'
        }
        if(err.sqlState = 23000) {
            res = {
                status: '500',
                data: 'The wallet address has been uploaded, please make sure your input is correct',
                msg: 'error'
            }
        } 
    
    }
    ctx.body = res;
}
module.exports = {
  ...m,
  // 可以在这里扩展接口执行的方法
  add
}
