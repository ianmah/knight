//Aliases
let Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    TilingSprite = PIXI.extras.TilingSprite;
    type = "WebGL";
    //Rectangle = PIXI.Rectangle;
    Container = PIXI.Container;
    TextureCache = PIXI.utils.TextureCache;
    HEIGHT = 256;
    WIDTH = 480;
    TILE = 16;
    SPEED = 1.66;
    GRAVITY = .55;
    MAXDY = 10;
    JUMP = 7;
    RESOLUTION = 2;
    OFFSET = 2*TILE;
    BG_SPEED = .25;
    AMMO = 4;

//Capture the keyboard keys
let left = keyboard("ArrowLeft"),
    up = keyboard(" "),
    right = keyboard("ArrowRight");
    z = keyboard("f");
    l = keyboard("l");
    x = keyboard("x");
    o = keyboard("o");

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

$.get("assets/platform22.txt", function(data){ loadLevel(data)})

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
}
transformLevel(level);

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
app.stage.position.x -= OFFSET;
app.stage.position.y -= OFFSET;

//load an image and run the `setup` function when it's done
loader
  .add("images/cloudsfront.png")
  .add("images/cloudsback.png")
  .add("images/bgback.png")
  .add("images/bgfront.png")
  .add("images/mon.png")
  // .add("images/knight.png")
  .add("assets/spritesheet.json")
  .add("images/arrow.png")
  .add("images/tiles.png")
  .add("images/tileset.png")
  .load(setup);

let knight, state, mon;
let jumpSound, arrowSound, pickupSound;
let sheet = PIXI.loader.resources["assets/spritesheet.json"];

let floor = new Container();

//This `setup` function will run when the image has loaded
function setup() {
  // Load sounds
  jumpSound = PIXI.sound.Sound.from({ url: 'assets/jump2.wav', volume: 0.2 });
  arrowSound = PIXI.sound.Sound.from({ url: 'assets/arrow.wav' });
  pickupSound = PIXI.sound.Sound.from({ url: 'assets/pickup.wav', volume: .5 });


  bg = new TilingSprite(resources["images/cloudsback.png"].texture, 512, 320);
  app.stage.addChild(bg);

  cloud1 = new TilingSprite(resources["images/cloudsfront.png"].texture, app.stage.width, app.stage.height);
  cloud1.x = OFFSET;
  app.stage.addChild(cloud1);

  bg_back = new Sprite(resources["images/bgback.png"].texture);
  bg_back.y -= 15;
  app.stage.addChild(bg_back);
  bg_front = new Sprite(resources["images/bgfront.png"].texture);
  bg_front.y -= 15;
  app.stage.addChild(bg_front);

  //Create the `tileset` sprite from the texture
  let base        = TextureCache["images/tileset.png"];

  function rectangle(x, y, h, w){
    let rectangle = new PIXI.Rectangle(x*TILE, y*TILE, h*TILE, w*TILE);
    return rectangle;
  }

  let grass        = new PIXI.Texture(base.baseTexture, rectangle(8, 2, 1, 1));
  let topS         = new PIXI.Texture(base.baseTexture, rectangle(1, 0, 1, 1));
  let bottomS      = new PIXI.Texture(base.baseTexture, rectangle(1, 2, 1, 1));
  let middleS      = new PIXI.Texture(base.baseTexture, rectangle(1, 1, 1, 1));
  let topleftS     = new PIXI.Texture(base.baseTexture, rectangle(0, 0, 1, 1));
  let toprightS    = new PIXI.Texture(base.baseTexture, rectangle(2, 0, 1, 1));
  let bottomleftS  = new PIXI.Texture(base.baseTexture, rectangle(0, 2, 1, 1));
  let bottomrightS = new PIXI.Texture(base.baseTexture, rectangle(2, 2, 1, 1));
  let grassL        = new PIXI.Texture(base.baseTexture, rectangle(6, 2, 1, 1));
  let grassR        = new PIXI.Texture(base.baseTexture, rectangle(9, 2, 1, 1));
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
        place(new Sprite(grass));
      } else if (tile === 'T'){
        place(new Sprite(bottomS));
      } else if (tile === 'M'){
        place(new Sprite(middleS));
      } else if (tile === 'L'){
        place(new Sprite(topleftS));
        place(new Sprite(grassL));
      } else if (tile === 'R'){
        place(new Sprite(toprightS));
        place(new Sprite(grassR));
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
        place(new Sprite(grassR));
      } else if (tile === 'v'){
        place(new Sprite(trcS));
        place(new Sprite(grassL));
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

  //Render the stage
  app.renderer.render(app.stage);
  //Start the game loop
  gameLoop();

}

function gameLoop(delta){
  requestAnimationFrame(gameLoop);

  // update current game state
  play(delta);
}

function play(delta) {

  if (cloud1.tilePosition.x >= cloud1.width){
    cloud1.tilePosition.x = 0;
  } else {
    cloud1.tilePosition.x +=BG_SPEED;
  }
  if (bg.tilePosition.x >= bg.width){
    bg.tilePosition.x = 0;
  } else {
    bg.tilePosition.x +=BG_SPEED*0.36;
  }

  l.press = () => {
    let coin = new Coin(20, 16);
    coins.push(coin);
    user.ammo++;
  };

  x.press = () => {
    let mon = new Monster(12, 10);
    mons.push(mon);
  };

  z.press = () => {
    if (user.ammo > 0){
      let arrow = new Bullet(username);
      arrowSound.play({speed: 1.2});
      user.ammo--;
      console.log('bullet');
      bullets.push(arrow);
    } else {
      pickupSound.play({volume: .2, speed: 2});
    }
  };

  for (i = 0; i < bullets.length; i++){
    let arrow = bullets[i].sprite;
    if (!collisionArrow(arrow, level)){
      arrow.x += arrow.dx;
    } else {
      arrow.visible = false;
      let deadArrow = new BulletDead(arrow.x, arrow.y, arrow.dx)
      bulletsD.push(deadArrow);
      bullets.splice(i, 1);
    }
  }

  for (i = 0; i < coins.length; i++){
    let coin = coins[i].char;
    if (hitTest(user.char, coin)){
      coins[i].delete();
      coins.splice(i, 1);
      pickupSound.play();
    }
  }

  if (user != null){

   for (i = 0; i < bulletsD.length; i++){
     let arrow = bulletsD[i].sprite;
     if(hitTest(user.char, arrow)){
       bulletsD[i].delete();
       bulletsD.splice(i, 1);
       user.ammo++;
       pickupSound.play();
     }
   }

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
 }

 for (i = 0; i < mons.length; i++){
     let char = mons[i].char;
     if (!collisionX(char, level)){
       char.x = char.x + char.dx;
     } else if (collisionX(char, level)){
       if (char.type == 'mon'){
         char.dx *= -1;
         mons[i].flip();
       }
     }
     char.y = char.y + char.dy;
     char.dy = Math.min(char.dy + char.ddy, MAXDY);
     char.ddy = GRAVITY;

     switch(collisionY(char, level)){
       case 0: // feet collision
         if (char.dy != 0){                              // if knight is "falling"
           char.dy = 0;                                  // stop vertical motion
           char.y = tyc*TILE;                          // clamp to position
           if (char.jumping > 0){
             if (char.dx != 0){
               char.textures = sheet.spritesheet.animations["knight_m_run_anim_f"];
               char.play();
             } else {
               char.textures = sheet.spritesheet.animations["knight_m_idle_anim_f"];
               char.play();
             }
           }
           char.jumping = 0;
         }
         break;
       case 1: // head collision
       console.log('ouch');
         if (char.dy != 0){                              // if knight is "falling"
           char.dy = 0;                                  // stop vertical motion
           char.y = (tyc+1)*TILE;                        // clamp to position
         }
         break;
     }

     if (char.type == 'mon'){
       if (!mobFall(char, level)){
         char.dx *= -1;
         mons[i].flip();
       }
     }

 } // for mons

}

var mons = [];
var coins = [];
var bullets = [];
var bulletsD = [];

function newPlayer(data) {
  let player = new Player(username);
  mons.push(player)
  user = player;
}

function deleteAll(){
   for (i = 0; i < mons.length; i++){
     let mon = mons[i];
     mons.splice(i, 1);
     mon.delete();
   }
}

socket.on('playerAlreadyExist', function(data){
  alert('User already exists');
})

let id;

socket.on('id', function(data){
  id = data;
})

class Entity {

  constructor(img, x, y){
    let char;
    // create an animated sprite
    char = new PIXI.extras.AnimatedSprite(sheet.spritesheet.animations[img]);
    // set speed, start playback and add it to the stage
    char.animationSpeed = 0.167;
    char.play();

    char.dx = 0;
    char.dy = 0;

    if (x === undefined || y === undefined){
      char.x = 14*TILE;
      char.y = 14*TILE;

    } else {
      char.x = x*TILE;
      char.y = y*TILE;
    }

    char.anchor.x = 0.5;     /* 0 = top, 0.5 = center, 1 = bottom */
    char.anchor.y = 1;     /* 0 = top, 0.5 = center, 1 = bottom */
    char.halfHeight = char.height/2;
    char.halfWidth = char.width/2;
    app.stage.addChild(char);
    this.char = char;

  }

  delete(){
    app.stage.removeChild(this.char);
    this.char.visible = false;
  }

}

class SpriteEntity {

  constructor(img, x, y) {
    let sprite
    sprite = new Sprite(resources["images/"+img+".png"].texture);
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;

    if (x === undefined || y === undefined){
      sprite.x = 14*TILE;
      sprite.y = 14*TILE;

    } else {
      sprite.x = x*TILE;
      sprite.y = y*TILE;
    }
    app.stage.addChild(sprite);
    this.sprite = sprite;
  }

  delete(){
    app.stage.removeChild(this.sprite);
    this.sprite.visible = false;
  }

}

class Monster extends Entity {

  constructor(x, y) {
    super("chort_run_anim_f", x, y);
    this.char.type = 'mon';
    this.char.dx = SPEED/2;
    this.char.ddy = GRAVITY;
  }

  flip(){
    console.log('flip');
    this.char.scale.x *= -1;
  }

}

class Player extends Entity {

  constructor(username) {
    super('knight_m_idle_anim_f')
    this.ammo = AMMO;
    this.username = username;
    this.char.type = 'player';

    this.char.x = 7*TILE;
    this.char.y = 9*TILE;
    this.char.ddy = GRAVITY;
    this.char.animationSpeed = 0.15;
  }

  texture(anim){
    if (this.char.jumping == 0){
      this.char.textures = sheet.spritesheet.animations["knight_m_"+anim+"_anim_f"];
    } else {
      this.char.textures = sheet.spritesheet.animations["knight_m_hit_anim_f"];
    }
    this.char.play();
  }

  moveLeft(){
      this.char.dx = -SPEED;
      this.char.scale.x = -1;
      this.texture('run');
  }

  stopLeft(){
    if (right.isDown){
      this.moveRight();
    } else {
      this.char.dx = 0;
      this.texture('idle');
    }
  }

  moveRight(){
      this.char.dx = SPEED;
      this.char.scale.x = 1;
      this.texture('run');
  }

  stopRight(){
    if (left.isDown){
      this.moveLeft();
    } else {
      this.char.dx = 0;
      this.texture('idle');
    }
  }

  moveJump(){
    if (this.char.jumping < 2) {
      this.char.jumping++;
      this.char.dy = -JUMP;
      // PIXI.sound.play('jump');
      jumpSound.play();
      this.texture('hit');
    }
  }

}

class Bullet extends SpriteEntity {

  constructor(username) {
    super('arrow');
    let arrow = this.sprite;
    this.owner = username;
    arrow.dx = SPEED*6;
    if (user.char.scale.x < 0){
      //character is facing left
      arrow.scale.x = -1;
      arrow.dx *= -1;
    }
    arrow.x = user.char.x;
    arrow.y = user.char.y - user.char.halfHeight;
    arrow.halfHeight = arrow.height/2;
    arrow.halfWidth = arrow.width/2;
    arrow.ddx = GRAVITY;
  }

}

class BulletDead extends SpriteEntity {

  constructor(x, y, dx) {
    super('arrow', x/TILE, y/TILE);
    if (dx < 0){
      //arrow is facing left
      this.sprite.x = x-5;
      this.sprite.scale.x = -1;
    } else {
      this.sprite.x = x+5;
    }
  }

}

class Coin extends Entity {

  constructor(x, y) {
    super("coin", x, y);
  }

}
