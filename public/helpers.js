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

let tiles = ['T', 'E', 'M', 'L', 'R', 'Z', 'Y', 'a', 'd', 'c', 'v', 'j', 'k'];
function blockTile(x){
  for (i = 0; i < tiles.length; i++){
    if (x == tiles[i]){
      return true;
    }
  }
  return false;
}

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
