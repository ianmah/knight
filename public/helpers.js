function collisionY(knight, level){

  txf = Math.floor((knight.x+knight.halfWidth)/TILE);
  tyc = Math.ceil((knight.y+knight.halfHeight)/TILE);
  tyf = Math.floor((knight.y+knight.halfHeight)/TILE);

  thf = Math.floor((knight.x)/TILE);
  thc = Math.ceil((knight.x)/TILE);

  if        (level[tyc][txf] === 'B'){
    return 0;       // feet collision
  } else if (level[tyf][txf] === 'B'){
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

  if        (level[tyc][txf] === 'B'){
    return false;       // feet collision
  } else if (level[tyf][txf] === 'B'){
    return false;       // head collision
  } else if (level[tyf][thf+1] === 'B' && knight.dx > 0){
    return true;       // right collision
  } else if (level[tyf][thc-1] === 'B' && knight.dx < 0){
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
