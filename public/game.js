//Aliases
let Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;
    type = "WebGL";
    //Rectangle = PIXI.Rectangle;
    Container = PIXI.Container;
    TextureCache = PIXI.utils.TextureCache;
    HEIGHT = 256;
    WIDTH = 480;
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
    z = keyboard("z");
    l = keyboard("l");
    x = keyboard("x");

let user = null,
    username = null;

let level = [
  ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
  ['T', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'T', 'T'],
  ['T', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'T', 'T'],
  ['T', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'T', 'T'],
  ['T', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'T', 'T'],
  ['T', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'T', 'T'],
  ['T', 'O', 'O', 'T', 'T', 'T', 'T', 'T', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'T', 'T', 'O', 'O', 'O', 'O', 'T', 'T'],
  ['T', 'O', 'O', 'T', 'T', 'T', 'T', 'T', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'T', 'T', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'T', 'T', 'O', 'O', 'O', 'O', 'T', 'T'],
  ['T', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'O', 'O', 'O', 'O', 'O', 'T', 'T', 'T', 'T', 'T', 'O', 'O', 'O', 'T', 'T'],
  ['T', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'O', 'O', 'O', 'O', 'T', 'T', 'T', 'T', 'T', 'O', 'O', 'O', 'T', 'T'],
  ['T', 'T', 'T', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'T', 'T', 'T', 'T', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'T', 'T'],
  ['T', 'T', 'T', 'T', 'T', 'T', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'T', 'T', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'T', 'T'],
  ['T', 'T', 'T', 'T', 'T', 'T', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'T', 'T', 'T', 'T', 'T', 'O', 'O', 'O', 'O', 'O', 'O', 'T', 'T'],
  ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'O', 'O', 'O', 'T', 'T', 'T', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'O', 'O', 'O', 'O', 'T', 'T'],
  ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'O', 'O', 'O', 'T', 'T', 'T', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'T', 'T', 'T', 'T', 'T', 'O', 'O', 'O', 'O', 'T', 'T'],
  ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'O', 'O', 'O', 'O', 'T', 'T', 'O', 'O', 'O', 'T', 'T', 'T', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'T', 'T'],
  ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'O', 'O', 'O', 'O', 'T', 'T', 'O', 'O', 'O', 'T', 'T', 'T', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'T', 'T', 'T', 'T', 'T'],
  ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
  ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
  ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O']]

$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "assets/platform22.txt",
        dataType: "text",
        success: function(data) {loadLevel(data);}
     });
});

function loadLevel(allText) {
  level = [];
  var rows = allText.split(/\n/);
  for (i = 0; i < rows.length; i++){
    var columns = rows[i].split(/\t/);
    if (columns.length > 1){
      level.push(columns);
    }
  }
  transformLevel(level);
  //console.log(level);
}
//transformLevel(level);


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
app.stage.position.x -= 2*TILE;
app.stage.position.y -= 2*TILE;

//load an image and run the `setup` function when it's done
loader
  .add("images/knight.png")
  .add("images/arrow.png")
  //.add("images/mon.png")
  .add("images/tiles.png")
  .add("images/tileset.png")
  .load(setup);

let knight, state, mon;

let floor = new Container();

//This `setup` function will run when the image has loaded
function setup() {
  //Create the `tileset` sprite from the texture
  let base        = TextureCache["images/tileset.png"];

  function rectangle(x, y, h, w){
    let rectangle = new PIXI.Rectangle(x*TILE, y*TILE, h*TILE, w*TILE);
    return rectangle;
  }

  let topS         = new PIXI.Texture(base.baseTexture, rectangle(1, 0, 1, 1));
  let bottomS      = new PIXI.Texture(base.baseTexture, rectangle(1, 2, 1, 1));
  let middleS      = new PIXI.Texture(base.baseTexture, rectangle(1, 1, 1, 1));
  let topleftS     = new PIXI.Texture(base.baseTexture, rectangle(0, 0, 1, 1));
  let toprightS    = new PIXI.Texture(base.baseTexture, rectangle(2, 0, 1, 1));
  let bottomleftS  = new PIXI.Texture(base.baseTexture, rectangle(0, 2, 1, 1));
  let bottomrightS = new PIXI.Texture(base.baseTexture, rectangle(2, 2, 1, 1));
  let lS   = new PIXI.Texture(base.baseTexture, rectangle(0, 1, 1, 1));
  let rS   = new PIXI.Texture(base.baseTexture, rectangle(2, 1, 1, 1));
  let tlcS = new PIXI.Texture(base.baseTexture, rectangle(6, 0, 1, 1));
  let trcS = new PIXI.Texture(base.baseTexture, rectangle(4, 1, 1, 1));
  let blcS = new PIXI.Texture(base.baseTexture, rectangle(5, 0, 1, 1));
  let brcS = new PIXI.Texture(base.baseTexture, rectangle(4, 0, 1, 1));

  var x;
  var y;
  for (i = 0; i < level.length; i++){
    y = i*TILE;
    for (j = 0; j < level[i].length; j++){
      x = j*TILE;
      let tile = level[i][j];
      if (tile === 'E'){
        place(new Sprite(topS));
      } else if (tile === 'T'){
        place(new Sprite(bottomS));
      } else if (tile === 'M'){
        place(new Sprite(middleS));
      } else if (tile === 'L'){
        place(new Sprite(topleftS));
      } else if (tile === 'R'){
        place(new Sprite(toprightS));
      } else if (tile === 'Y'){
        place(new Sprite(bottomrightS));
      } else if (tile === 'Z'){
        place(new Sprite(bottomleftS));
      } else if (tile === 'a'){
        place(new Sprite(lS));
      } else if (tile === 'd'){
        place(new Sprite(rS));
      } else if (tile === 'c'){
        place(new Sprite(tlcS));
      } else if (tile === 'v'){
          place(new Sprite(trcS));
      } else if (tile === 'j'){
          place(new Sprite(blcS));
      } else if (tile === 'k'){
          place(new Sprite(brcS));
      }
      function place(brick){
        brick.x = x;
        brick.y = y;
        floor.addChild(brick);
      }
    }
  }

  floor.position.set(0, -2)
  app.stage.addChild(floor);

  //Create the mon sprite
  // mon = new Sprite(resources["images/mon.png"].texture);
  // mon.x = WIDTH/2;
  // mon.y = 100;
  // app.stage.addChild(mon);

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

  l.press = () => {

  };

  x.press = () => {

  };

  z.press = () => {
    let arrow = new Bullet(username);
    console.log('bullet');
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
var playerObjs = [];

socket.on('update', function(data){
  for (i = 0; i < data.length; i++){
    let player = data[i].player;
    if (players.indexOf(player) == -1 && player != username){
      players.push(player);
      let opponent = new Player(player);
      playerObjs.push(opponent)
      //console.log(playerObjs);
    } else if (player != username) {
      playerObjs[i].char.x = data[i].x;
      playerObjs[i].char.y = data[i].y;
    }
  }
})

socket.on('newPlayer', function(data){
  if (data == username){
    let player = new Player(username);
    playerObjs.push(player)
    user = player;
  } else {
  }
})

socket.on('playerAlreadyExist', function(data){
  alert('User already exists');
})

// Socket loads faster than pixi
// Empty player list so it can check for new additions again
socket.on('load', function(data){
  players = [];
  playerObjs = [];
})

socket.on('reset', function(data){
  for (i = 0; i < playerObjs.length; i++){
    playerObjs[i].delete();
  }
  players = [];
  playerObjs = [];
})

let id;

socket.on('id', function(data){
  id = data;
})

class Player {

  constructor(username) {
    let char;
    this.username = username;
    char = new Sprite(resources["images/knight.png"].texture);
    char.dx = 0;
    char.dy = 0;
    char.x = 7*TILE;
    char.y = 9*TILE;
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

  delete(){
    app.stage.removeChild(this.char);
    this.char.visible = false;
  }

}

class Bullet {

  constructor(user) {
    let arrow;
    this.owner = user;
    arrow = new Sprite(resources["images/arrow.png"].texture);
    arrow.dx = 0;
    arrow.dy = 0;
    arrow.x = WIDTH/2;
    arrow.y = HEIGHT/2;
    arrow.halfHeight = arrow.height/2;
    arrow.halfWidth = arrow.width/2;
    arrow.ddy = GRAVITY;
    app.stage.addChild(arrow);
    this.arrow = arrow;
  }

}
