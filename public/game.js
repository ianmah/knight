//Aliases
let Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;
    type = "WebGL";
    Rectangle = PIXI.Rectangle;
    Container = PIXI.Container;
    TextureCache = PIXI.utils.TextureCache;
    HEIGHT = 176;
    WIDTH = 320;
    TILE = 16;
    SPEED = 1.5;
    GRAVITY = .55;
    MAXDY = 10;
    JUMP = 8;
    RESOLUTION = 2;

//Capture the keyboard arrow keys
let left = keyboard("ArrowLeft"),
    up = keyboard("ArrowUp"),
    right = keyboard("ArrowRight");
    l = keyboard("l");
    x = keyboard("x");

let user = null;

let level = [

  //1    2    3    4    5    6    7    8    9   10   11   12   13   14   15   16   17   18   19   20
  ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B',],
  ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O',],
  ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O',],
  ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O',],
  ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O',],
  ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O',],
  ['O', 'O', 'O', 'B', 'B', 'O', 'O', 'O', 'B', 'O', 'O', 'O', 'O', 'O', 'O', 'B', 'B', 'B', 'O', 'O',],
  ['O', 'O', 'O', 'B', 'B', 'O', 'O', 'O', 'B', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'B', 'O', 'O',],
  ['O', 'O', 'O', 'B', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'B', 'O', 'O',],
  ['B', 'O', 'O', 'B', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'B', 'O', 'O',],
  ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B',],
  ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O',],
  ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O',],
  ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O',],]


PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

if(!PIXI.utils.isWebGLSupported()){
  type = "canvas"
}

PIXI.utils.sayHello(type)

//Create a Pixi Application
let app = new PIXI.Application({
  width: WIDTH,
  height: HEIGHT,
  antialias: false,
  resolution: RESOLUTION,
  backgroundColor: 0x061639,
});

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

//load an image and run the `setup` function when it's done
loader
  .add("images/knight.png")
  .add("images/mon.png")
  .add("images/tiles.png")
  .load(setup);

let knight, state, mon;

let floor = new Container();

//This `setup` function will run when the image has loaded
function setup() {
  //Create the `tileset` sprite from the texture
  let texture = TextureCache["images/tiles.png"];
  //Create a rectangle object that defines the position and
  //size of the sub-image you want to extract from the texture
  //(`Rectangle` is an alias for `PIXI.Rectangle`)
  let rectangle = new Rectangle(96, 0, 16, 16);
  //Tell the texture to use that rectangular section
  texture.frame = rectangle;

  var x;
  var y;
  for (i = 0; i < level.length; i++){
    y = i*TILE;
    for (j = 0; j < level[i].length; j++){
      x = j*TILE;
      let tile = level[i][j];
      if (tile === 'B'){
          let brick = new Sprite(texture);
          brick.x = x;
          brick.y = y;
          floor.addChild(brick);
      }
    }
  }

  floor.position.set(0, -2)
  app.stage.addChild(floor);

  //Create the mon sprite
  mon = new Sprite(resources["images/mon.png"].texture);
  mon.x = WIDTH/2;
  mon.y = 100;
  app.stage.addChild(mon);

  //Render the stage
  app.renderer.render(app.stage);
  //Start the game loop
  gameLoop();

}

state = play;

function gameLoop(delta){
  requestAnimationFrame(gameLoop);

  // update current game state
  state(delta);
}

function play(delta) {

  //l
  l.press = () => {
    // knight.x = WIDTH/2;
    // knight.y = HEIGHT/2;
  };

  //X
  x.press = () => {
    // let player = new Player('test');
    // user = player;
    console.log(user.username);
  };

  if (user != null){
    //Left arrow key `press` method
    left.press = () => {
      user.moveLeft();
    };
    //Left arrow key `release` method
    left.release = () => {
      user.stopLeft();
    };

    //Up
    up.press = () => {
      user.moveJump();
    };

    //Right
    right.press = () => {
      user.moveRight();
    };
    right.release = () => {
      user.stopRight();
    };

    let char = user.getChar();
    if (!collisionX(char, level)){
      char.x = char.x + char.dx;
    } else {
      char.jumping = false;
    }
    char.y = char.y + char.dy;
    char.dy = Math.min(char.dy + char.ddy, MAXDY);
    char.ddy = GRAVITY;

    switch(collisionY(char, level)){
      case 0: // feet collision
        if (char.dy != 0){                              // if knight is "falling"
          char.dy = 0;                                  // stop vertical motion
          char.y = (tyc-1)*TILE-char.halfHeight;        // clamp to position
          char.jumping = false;
        }
        break;
      case 1: // head collision
        if (char.dy != 0){                              // if knight is "falling"
          char.dy = 0;                                  // stop vertical motion
          char.y = (tyc)*TILE-char.halfHeight;        // clamp to position
        }
        break;
    }

    socket.emit('playerUpdate', {
      user: user.username,
      x: char.x,
      y: char.y
    })
  }


}

var players = [];

socket.on('update', function(data){
  for (i = 0; i < data.length; i++){
    let player = data[i].player;
    if (players.indexOf(player) == -1){
      console.log('new player found');
      players.push(player);
    } else {

    }
  }
})

socket.on('newPlayer', function(data){
  if (data == username){
    console.log('play as new player');
    let player = new Player(username);
    user = player;
  } else {
    console.log('spectate new player');
  }
})

socket.on('playerAlreadyExist', function(data){
  alert('User already exists');
})

let id;

socket.on('id', function(data){
  console.log('recieved id: ' + data);
  id = data;
})

class Player {

  constructor(username) {
    let char;
    this.username = username;
    char = new Sprite(resources["images/knight.png"].texture);
    char.dx = 0;
    char.dy = 0;
    char.x = WIDTH/2;
    char.y = HEIGHT/2;
    char.halfHeight = char.height/2;
    char.halfWidth = char.width/2;
    char.ddy = GRAVITY;
    app.stage.addChild(char);
    this.char = char;
  }

  moveLeft(){
      this.char.dx = -SPEED;
  }

  stopLeft(){
    if (right.isDown){
      this.moveRight();
    } else {
      this.char.dx = 0;
    }
  }

  moveRight(){
      this.char.dx = SPEED;
  }

  stopRight(){
    if (left.isDown){
      this.moveLeft();
    } else {
      this.char.dx = 0;
    }
  }

  moveJump(){
    if (!this.char.jumping) {
      this.char.jumping = true;
      this.char.dy = - JUMP;
    }

  }

  getChar(){
    return this.char;
  }

}
