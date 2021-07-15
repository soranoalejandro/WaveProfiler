const Serial = require("serialport")
const events = require('events');
const eventEmitter = new events.EventEmitter();
let selectedPort
let selectedBaudrate
let port

//  LIST AVAILABLE SERIAL PORTS
async function list() {
  let names = []
  try {
    const obj = await Serial.list()
    const names = []
    obj.forEach(element => {
      names.push(element.path)
    })
    return names
  } catch (error) {
    return names
  }
}

//  CLOSE
async function close() {
  if (port.isOpen) {
    port.close();
  }
}

//  SELECT PORT
async function selectPort( name, baud ) {
  try {
    let obj = new Serial( name, { autoOpen: false, baudRate: Number.parseInt(baud) } );
    port = obj;
    selectedPort = name;
    selectedBaudrate = baud
    port.open();

    port.on('open', () => eventEmitter.emit('open') );
    port.on('close', () => eventEmitter.emit('close') );
    port.on('error', () => eventEmitter.emit('error') );

  } catch (error) {
    console.log(error.message);
    selectedPort = null;  selectedBaudrate = null;  port = null;
    eventEmitter.emit('error');
  }
  return;
}


module.exports = eventEmitter;
module.exports.close = close;
module.exports.selectPort = selectPort;
module.exports.list = list;