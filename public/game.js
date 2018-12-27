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
    JUMP = 9;
    RESOLUTION = 3;

//Capture the keyboard arrow keys
let left = keyboard("ArrowLeft"),
    up = keyboard("ArrowUp"),
    right = keyboard("ArrowRight");
    l = keyboard("l");
    x = keyboard("x");

let level = [

  //1    2    3    4    5    6    7    8    9   10   11   12   13   14   15   16   17   18   19   20
  ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O',],
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

  floor.position.set(0, 0)
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

function play(delta) {
  //Tile position of knight
  // console.log(tx + ', ' + ty);


  //Left arrow key `press` method
  left.press = () => {
    //Change the knight's velocity when the key is pressed
    knight.dx = -SPEED;
  };
  //Left arrow key `release` method
  left.release = () => {
    if (right.isDown){
      knight.dx = SPEED;
    } else {
      knight.dx = 0;
    }

  };

  //Up
  up.press = () => {
    // console.log(knight.dy)
    if (!knight.jumping) {
      knight.jumping = true;
      knight.dy = - JUMP;
    }
  };


  //Right
  right.press = () => {
    knight.dx = SPEED;
  };
  right.release = () => {
    if (left.isDown){
      knight.dx = -SPEED;
    } else {
      knight.dx = 0;
    }
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

  knight.x = knight.x + knight.dx;
  knight.y = knight.y + knight.dy;
  knight.dy = Math.min(knight.dy + knight.ddy, MAXDY);
  knight.ddy = GRAVITY;
  // console.log(knight.dy);

  switch(collision(knight, level)){
    case 0:
      if (knight.dy != 0){                              // if knight is "falling"
        knight.dy = 0;                                  // stop vertical motion
        knight.y = (tyc-1)*TILE-knight.halfHeight;        // clamp to position
        knight.jumping = false;
      }
      break;
    case 1:
      if (knight.dy != 0){                              // if knight is "falling"
        knight.dy = 0;                                  // stop vertical motion
        knight.y = (tyc)*TILE-knight.halfHeight;        // clamp to position
        knight.jumping = false;
      }
      break;
  }

}
