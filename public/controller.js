

var connectBtn = document.getElementById('connect');
var handle = document.getElementById('handle');
connectBtn.addEventListener('click', connect);

function connect(){
  username = handle.value
  if (username){
    socket.emit('newPlayer', username);
  } else {
    alert('enter a username');
  }
}

class Controller {

  constructor(){
    //Capture the keyboard arrow keys
    this.left = keyboard("ArrowLeft"),
    this.up = keyboard("ArrowUp"),
    this.right = keyboard("ArrowRight");
    this.l = keyboard("l");
    this.x = keyboard("x");
    this.z = keyboard("z");
  }

}

function keyboard(value) {
  let key = {};
  key.value = value;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = event => {
    if (event.key === key.value) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
      event.preventDefault();
    }
  };

  //The `upHandler`
  key.upHandler = event => {
    if (event.key === key.value) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
      event.preventDefault();
    }
  };

  //Attach event listeners
  const downListener = key.downHandler.bind(key);
  const upListener = key.upHandler.bind(key);

  window.addEventListener(
    "keydown", downListener, false
  );
  window.addEventListener(
    "keyup", upListener, false
  );

  // Detach event listeners
  key.unsubscribe = () => {
    window.removeEventListener("keydown", downListener);
    window.removeEventListener("keyup", upListener);
  };

  return key;
}

let controller = new Controller();
