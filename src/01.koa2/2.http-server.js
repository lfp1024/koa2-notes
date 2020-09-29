const http = require('http')

// 使用原生 http 模块实现服务器

// 要传入一个 requestListener 请求监听器，收到请求的时候执行该回调函数
const server = http.createServer((request, response) => {
  console.log(request.url)
  response.writeHead(200)
  response.write('this is response body')
  // 每个响应都要使用 end 方法
  response.end()
})

server.listen(3000, () => { console.log('listening on port 3000') })
