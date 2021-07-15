const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 9090 });
const events = require('events');
const eventEmitter = new events.EventEmitter();

wss.on('connection', function connection(ws) {
  
  ws.on('message', function incoming(message) {
    console.log(`client: ${message}`);
    const obj = JSON.parse(message);
    
    switch ( obj.event ) {
      case 'list':
        eventEmitter.emit('list');
        break;
      case 'baudrate':
        eventEmitter.emit('baudrate', obj.data);
        break;
      case 'open':
        eventEmitter.emit('open', obj.data);
        break;
      case 'close':
        eventEmitter.emit('close');
        break;
    
      default:
        console.log("undefined event in socket")
        break;
    }

  });

  ws.on('error', function error(error) {
    console.log(error.message);
  });

  sendEvent(ws, 'socket open');

});

wss.on('listening', function listening() {
  console.log(`Listenning to websockets on port: 9090`);
});

//  BROADCAST
function broadcast( name , data) {
  wss.clients.forEach(function each(ws) {
    if (ws.readyState === WebSocket.OPEN) {
      var obj = {event: name};
      if (data) { obj.data = data; }
      obj = JSON.stringify( obj );
      ws.send( obj );
      console.log(`sever: ${obj}`);
    }
  });
}

//  SEND MESSAGE
function sendEvent( ws, name , data) {
  var obj = {event: name};
  if (data) { obj.data = data; }
  obj = JSON.stringify( obj );
  ws.send( obj );
  console.log(`sever: ${obj}`);
}

//  DATA EVENT EMITTER
module.exports = eventEmitter;
module.exports.broadcast = broadcast;