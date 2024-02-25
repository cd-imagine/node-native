const http = require('http')
const fs = require('fs')
const qs = require('querystring')

const server = http.createServer(onRequest)
let port = 3000

server.listen(port, () => {
  console.log(`open server :: localhost:${port}`)
})

function onRequest(request, response) {
  fs.readFile('index.html', (error, content) => {

    if (request.url == '/') {

      response.setHeader('Content-type', 'text/html')
      response.write(content)
      response.end()

    } else if (request.url == '/users') {

      if (request.method == 'GET') {
        response.setHeader('Content-type', 'text/html')
        response.write('<h1>Listado Usuarios</h1>')
        response.end()
      }
      if (request.method == 'POST') {
        let datos = ''

        request.on('data', (d) => { datos += d })
        request.on('end', () => {
          console.log(datos)
          let post = qs.parse(datos)
          response.end('Datos Recibidos: ' + post.nombre)
        })

      }
      if (request.method == 'PUT') {

      }
      if (request.method == 'DELETE') {

      }
    }
  })
}