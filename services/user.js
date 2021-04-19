

// 可以认为这里是接口处理方法
const model = require('./model')
const m  = model([
  'list',
  'add',
  'update',
  'del'
], 'user')

module.exports = {
  ...m,
  // 可以在这里扩展接口执行的方法
}