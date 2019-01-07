let FLOOR = 'M';

function collisionY(knight, level){

  // Find two tiles underneath character
  txf = Math.floor((knight.x+1)/TILE);
  txc = Math.ceil((knight.x-1)/TILE);

  // Find x distance from the two tiles
  dxc = Math.abs(txc-(knight.x+knight.halfWidth)/TILE);
  dxf = Math.abs(txf-(knight.x+knight.halfWidth)/TILE);

  tx = null;
  // Find closer tile
  if (dxf < dxc){
    tx = txc;
  } else {
    tx = txf;
  }

  tyc = Math.ceil((knight.y+knight.halfHeight)/TILE);
  tyf = Math.floor((knight.y+knight.halfHeight)/TILE);

  if        (isBlock(level[tyc][tx])){
    return 0;       // feet collision
  } else if (isBlock(level[tyf][tx])){
    return 1;       // head collision
  }
}

function collisionX(knight, level){
  predictX = knight.x-knight.halfWidth + knight.dx;

  tyf = Math.floor((knight.y+knight.halfHeight+5)/TILE);

  thf = Math.floor((predictX-knight.halfWidth+3)/TILE);
  thc = Math.ceil( (predictX+knight.halfWidth-3)/TILE);

  if (isBlock(level[tyf][thf+1]) && knight.dx > 0){
    return true;       // right collision
  } else if (isBlock(level[tyf][thc-1]) && knight.dx < 0){
    return true;       //left collision
  } else {
    return false;
  }

}

function collisionArrow(arrow, level){
  predictX = arrow.x-arrow.halfWidth + arrow.dx;

  tyf = Math.floor((arrow.y+arrow.halfHeight+1)/TILE);

  thf = Math.floor((predictX-arrow.halfWidth)/TILE);
  thc = Math.ceil( (predictX+arrow.halfWidth)/TILE);

  if        (isBlock(level[tyf][thf+1]) && arrow.dx > 0){
    return true;       // right collision
  } else if (isBlock(level[tyf][thc-1]) && arrow.dx < 0){
    return true;       //left collision
  } else {
    return false;
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

let tiles = ['T', 'E', 'M', 'L', 'R', 'Z', 'Y', 'a', 'd', 'c', 'v', 'j', 'k'];
function isBlock(x){
  return tiles.indexOf(x) >=0;
}

function transformLevel(level){
  let AIR = 'O';
  let FLR = 'T';
  for (i = 0; i < level.length; i++){
    for (j = 0; j < level[i].length; j++){
      let t11, t12, t13, t21, tile, t23, t31, t32, t33;
      if (level[i-1]){
        t11  = level[i-1][j-1];
        t12  = level[i-1][j];
        t13  = level[i-1][j+1];
      }

      t21  = level[i][j-1];
      tile = level[i][j];
      t23  = level[i][j+1];

      if (level[i+1]){
        t31  = level[i+1][j-1];
        t32  = level[i+1][j];
        t33  = level[i+1][j+1];
      }
      if (isBlock(tile)){
        if        (t12 == AIR && t21 == AIR && isBlock(t23)){
          level[i][j] = 'L'; // top left
        } else if (isBlock(t12) && isBlock(t21) && t11 == AIR){
          level[i][j] = 'c'; //
        } else if (isBlock(t12) && isBlock(t23) && t13 == AIR){
          level[i][j] = 'v'; //
        } else if (isBlock(t32) && isBlock(t21) && t31 == AIR){
          level[i][j] = 'j'; //
        } else if (isBlock(t32) && isBlock(t23) && t33 == AIR){
          level[i][j] = 'k'; //
        } else if (isBlock(t21) && isBlock(t23) && isBlock(t12) && isBlock(t32)){
          level[i][j] = 'M'; // middle
        } else if (t12 == AIR && t23 == AIR && isBlock(t21)){
          level[i][j] = 'R'; // top right
        } else if (t12 == AIR && isBlock(t21) && isBlock(t23)){
          level[i][j] = 'E'; // top
        } else if (t32 == AIR && isBlock(t21) && isBlock(t23)){
          level[i][j] = 'T'; // bottom
        } else if (t32 == AIR && isBlock(t23)){
          level[i][j] = 'Z'; // bottom left
        } else if (t32 == AIR && isBlock(t21)){
          level[i][j] = 'Y'; // bottom right
        } else if (isBlock(t23)){
          level[i][j] = 'a'; // left
        } else if (isBlock(t21)){
          level[i][j] = 'd'; // right
        }
      }
    }
  }
}
