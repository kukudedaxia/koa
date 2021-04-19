// 封装好的模版对象，里面有一些最基本的方法定义
// add,list,delete,update

const status = require('../utils/status')
const { success, failed } = status

// 通用模块处理sql conrtoller对应配置文件方法 文件名 
// 主要是封装对象不同方法 返回对象
module.exports = (config, file) => {
    const controller = require(`../controller/${file}`)
	return config.reduce((obj, key) => {
        obj[key] = async ctx => {
            let res;
            console.log(`执行conrtoller/${file}下的${key}方法`)
            const methods = require(`../apis/${file}`)[key]['method'];
            console.log('执行分方法是',methods,)
            try {
                const param = methods == 'get' ? ctx.query : ctx.request.body
                await controller[key](param).then(result => {
                    res = success(result)
                })
            } catch(err) {
                res = failed(err)
            }
            ctx.body = res;
        }
	    return obj
	}, {})
}