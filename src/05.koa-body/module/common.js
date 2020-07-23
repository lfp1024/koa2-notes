// nodejs 原生获取请求数据的方式
function getData(ctx) {
  return new Promise((resolve, reject) => {
    try {
      let str = ''
      // 监听可读流的事件
      ctx.req.on('data', (chunk) => {
        str += chunk
      })
      // 监听可读流的事件
      ctx.req.on('end', (chunk) => {
        resolve(str)
      })
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  getData
}
