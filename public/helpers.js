let FLOOR = 'M';

function collisionY(knight, level){

  txf = Math.floor((knight.x+knight.halfWidth)/TILE);
  tyc = Math.ceil((knight.y+knight.halfHeight)/TILE);
  tyf = Math.floor((knight.y+knight.halfHeight)/TILE);

  thf = Math.floor((knight.x)/TILE);
  thc = Math.ceil((knight.x)/TILE);

  if        (blockTile(level[tyc][txf])){
    return 0;       // feet collision
  } else if (blockTile(level[tyf][txf])){
    return 1;       // head collision
  }
}

function collisionX(knight, level){
  predictX = knight.x + knight.dx;

  txf = Math.floor((predictX+knight.halfWidth)/TILE);
  tyc = Math.ceil((knight.y+knight.halfHeight)/TILE);
  tyf = Math.floor((knight.y+knight.halfHeight)/TILE);

  thf = Math.floor((predictX)/TILE);
  thc = Math.ceil((predictX)/TILE);

  if        (blockTile(level[tyc][txf])){
    return false;       // feet collision
  } else if (blockTile(level[tyf][txf])){
    return false;       // head collision
  } else if (blockTile(level[tyf][thf+1]) && knight.dx > 0){
    return true;       // right collision
  } else if (blockTile(level[tyf][thc-1]) && knight.dx < 0){
    return true;       //left collision
  }

}

// Takes an array of player objects and a keyword
// Returns index of player object with player name keyword
function find(array, key){
  for (i = 0; i < array.length; i++){
    if (array[i].username == key){
      return i;
    }
  }
  return -1;
}

let tiles = ['T', 'E', 'M', 'L', 'R', 'Z', 'Y'];
function blockTile(x){
  for (i = 0; i < tiles.length; i++){
    if (x == tiles[i]){
      return true;
    }
  }
  return false;
}
