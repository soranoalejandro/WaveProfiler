const url = require('url');
const fs = require('fs');
const dirpath = __dirname + '/ui'
let page, style, client;
fs.readFile('./ui/index.html', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  page = data.toString()
})
fs.readFile('./ui/styles.css', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  style = data.toString()
})
fs.readFile('./ui/client.js', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  client = data.toString()
})

function send404(response){
  response.writeHead(404, {'Content-Type': 'text/plain'});
  response.write('Error 404: Resource not found.');
  response.end();
}

//  HTTP SERVER
const http = require('http')
const server = http.createServer( ( req, res) => {
  res.writeHead(200)
  if ( req.method === 'GET' ) {
    if(req.url === '/'){
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(page);
      res.end();
    } else if (req.url === '/styles.css') {
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.write(style);
      res.end();
    } else if (req.url === '/client.js') {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(client);
      res.end();
    } else {
      send404(res)
    }
    
  } else {
    send404(res)
  }
} );
const PORT = 8080;

server.listen(PORT, () => console.log(`User interface on port: ${PORT}.`));
server.on('error', (e) => console.log(e) );

//  HTTP CONNECTION
