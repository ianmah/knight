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
