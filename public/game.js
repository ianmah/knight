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
  ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B',],]


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

  //Create the knight sprite
  knight = new Sprite(resources["images/knight.png"].texture);
  knight.dx = 0;
  knight.dy = 0;
  knight.x = WIDTH/2;
  knight.y = HEIGHT/2;
  knight.halfHeight = knight.height/2;
  knight.halfWidth = knight.width/2;
  knight.ddy = GRAVITY;
  app.stage.addChild(knight);

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

function touchHandlerStart(e) {
    if(e.touches) {
        initX = e.touches[0].pageX;
        initY = e.touches[0].pageY;
        console.log(initX + ', ' + initY)
        //output.innerHTML = "Touch: "+ " x: " + initX + ", y: " + initY;
        e.preventDefault();
    }
}
function touchHandlerEnd(e) {
    if(e.touches) {
      playerX = null;
      playerY = null;
      console.log('end');
      initX = null;
      initY = null;
    }
}
function touchHandler(e) {
    if(e.touches) {
      console.log()
        if (initX - e.touches[0].pageX > 0){
          playerX = true;
        } else {
          playerX = false;
        }
        if (initY - e.touches[0].pageY > 0){
          playerY = true;
        } else {
          playerY = false;
        }
        output.innerHTML = "Touch: "+ " x: " + playerX + ", y: " + playerY;
        e.preventDefault();
    }
}

document.addEventListener("touchstart", touchHandlerStart);
document.addEventListener("touchend", touchHandlerEnd);
document.addEventListener("touchmove", touchHandler);

function play(delta) {

  //Left arrow key `press` method
  left.press = () => {
    moveLeft();
  };
  //Left arrow key `release` method
  left.release = () => {
    stopLeft();
  };

  //Up
  up.press = () => {
    moveJump();
  };


  //Right
  right.press = () => {
    moveRight();
  };
  right.release = () => {
    stopRight();
  };

  //l
  l.press = () => {
    knight.x = WIDTH/2;
    knight.y = HEIGHT/2;
  };

  //X
  x.press = () => {
    console.log(knight.x + ', '+ knight.y);
  };

  if (!collisionX(knight, level)){
    knight.x = knight.x + knight.dx;
  } else {
    knight.jumping = false;
  }
  knight.y = knight.y + knight.dy;
  knight.dy = Math.min(knight.dy + knight.ddy, MAXDY);
  knight.ddy = GRAVITY;
  // console.log(knight.dy);

  switch(collisionY(knight, level)){
    case 0: // feet collision
      if (knight.dy != 0){                              // if knight is "falling"
        knight.dy = 0;                                  // stop vertical motion
        knight.y = (tyc-1)*TILE-knight.halfHeight;        // clamp to position
        knight.jumping = false;
      }
      break;
    case 1: // head collision
      if (knight.dy != 0){                              // if knight is "falling"
        knight.dy = 0;                                  // stop vertical motion
        knight.y = (tyc)*TILE-knight.halfHeight;        // clamp to position
      }
      break;
  }


  socket.emit('playerUpdate', {
    id: id,
    x: knight.x,
    y: knight.y
  })

}

function moveLeft(){
    knight.dx = -SPEED;
}

function stopLeft(){
  if (right.isDown){
    moveRight();
  } else {
    knight.dx = 0;
  }
}

function moveRight(){
    knight.dx = SPEED;
}

function stopRight(){
  if (left.isDown){
    moveLeft();
  } else {
    knight.dx = 0;
  }
}

function moveJump(){
  if (!knight.jumping) {
    knight.jumping = true;
    knight.dy = - JUMP;
  }

}

socket.on('update', function(data){
  output.innerHTML = '<p>' + data.x + '</p>';
  knight.x = data.x;
  knight.y = data.y;
})

let id;

socket.on('id', function(data){
  console.log(data);
  id = data;
})
