console.clear();  console.log("Wave Profiler APP");

const serial = require('./serial.js')
const ui = require('./ui/ui.js')
const socket = require('./socket.js')

//  LIST SERIAL PORTS AND UPDATE THE DROPDOWN OPTIONS
socket.on('list', function listPorts() {
  serial.list().then( list => {
    socket.broadcast('list', list);
  } ).catch( e => console.log(e))
})
socket.on('port', function setBaudrate(data) {
  
})
socket.on('baudrate', function setBaudrate(data) {
  
})
socket.on('open', function setBaudrate(data) {
  serial.selectPort(data.port, data.baud);
})
socket.on('close', () => {
  serial.close();
})

serial.on('open', function() {
  socket.broadcast('open');
});
serial.on('close', function() {
  socket.broadcast('closed');
});
serial.on('error', () => {
  socket.broadcast('error');
});