const ws = new WebSocket('ws://localhost:9090');
ws.onopen = function open() {
  sendEvent( 'list' );
}
//  RECEIVE MESSAGE
ws.onmessage = function incoming(message) {
  console.log(`server: ${message.data}`);
  var obj = JSON.parse(message.data);
  switch ( obj.event ) {
    case 'list':
      if( obj.data ) setSelectOptions('port', obj.data);
      break;
    case 'open':
      setOpenStatus(true);
      break;
    case 'closed':
      setOpenStatus(false);
      break;
    case 'socket open':
      break;
  
    default:
      console.log("undefined event in socket")
      break;
  }
}
ws.onerror = function error(error) {
  console.log(error.message);
}
//  SEND MESSAGE
function sendEvent( name , data) {
  var obj = {event: name};
  if (data) { obj.data = data; }
  obj = JSON.stringify( obj );
  ws.send( obj );
  console.log(`client: ${obj}`);
}

function clearSelectOptions(id) {
  let select = document.getElementById(id);
  while (select.options.length > 0) {
    select.remove(0);
  }
}

function setSelectOptions(id, arr) {
  clearSelectOptions(id);
  let select = document.getElementById(id);
  for (var i = 0; i < arr.length; i++) {
    var opt = arr[i];
    var el = document.createElement("option");
    el.text = opt;
    el.value = opt;
    select.appendChild(el);
  }
}

function setOpenStatus(bit) {
  let open = document.getElementById("open");
  let status = document.getElementById("status");
  //&#9744
  if (bit) {
    open.innerText = "close";
    open.setAttribute("onclick", "javascript: sendEvent('close');");
    status.innerHTML = "&#9745";
    status.title = "connected";
  } else {
    open.innerText = "open";
    open.setAttribute("onclick", "javascript: sendEvent('open', {port: port.value, baud: baud.value});");
    status.innerHTML = "&#9744";
    status.title = "disconnected";
  }
}