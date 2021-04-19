
 // 导入koa-router模块
 const Router = require('koa-router');
 // 创建koa-router的实例router
 const router = new Router();

 // 访问接口顺序 -> apis生成路由 -> apis匹配路由执行services相应文件 -> services执行controller层逻辑处理sql -> 调用mysql.js文件执行sql，返回封装的状态数据

// 遍历生成api路由配置
const routes = (config => {
	return config.reduce((arr, name) => {
        const obj = require(`./${name}`);
        const newArr = Object.keys(obj).reduce((total, each) => {
            let item = { 
                path: `/api/${name}/${each}`,  //匹配路径
                method: obj[each].method,  //方法
                action: each, //执行的服务下那种行为
                service: name //执行的服务
            }
            total.push(item)
            return total
        }, [])
        arr = arr.concat(newArr)
        return arr
	}, [])
})([
  'user',
  'active',
])


// 访问api路由执行services目录方法
routes.forEach(item => {
    const service = require(`../services/${item.service}`)
    console.log('开始触发路由执行get post')
    router[item.method](item.path, service[item.action])
})

module.exports = router