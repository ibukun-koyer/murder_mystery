const root = document.querySelector(".root");
const timer = document.querySelector("#timer");
const blinkers = document.querySelector(".blinkers");
const interaction = document.querySelector(".wrap-interaction");
const game = document.querySelector(".games");
const min_image_width = config.min_image_width;
let width_ratio = config.width_ratio;
const height_ratio = config.height_ratio;
let players_def_size = config.players_def_size;
let direction = config.default_direction;
let player_speed = config.player_speed;
let vignitte_color = config.vignitte_color;
let vignitte_spread = config.vignitte_spread;
//where players location is x,y pair with values ranging from 0 - 100
const players_location = config.players_initial_position;
let previous_position = config.players_initial_position;
let current_width = config.initial_board_width;
let current_height = config.initial_board_height;
let current_x_offset = config.initial_x_offset;
let current_y_offset = config.initial_y_offset;

let shouldRedrawBoard = false;
let collided_x = "";
let collided_y = "";
//confirm it is in view
function isInView(x, y) {
  let rootWidth = getParentProp("width", { float: true });
  let rootHeight = getParentProp("height", { float: true });
  x = current_width - (x / 100) * current_width;
  y = (y / 100) * current_height;
  let minX = Math.abs(current_x_offset);
  let maxX = Math.abs(current_x_offset - rootWidth);
  let minY = Math.abs(current_y_offset);
  let maxY = Math.abs(current_y_offset - rootHeight);
  if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
    return true;
  }
  return false;
}

let object = undefined;
//function for creating object blinker
function clearBlinkers() {
  blinkers.innerHTML = "";
}
function createBlinker(x, y, isGold) {
  const div = document.createElement("div");
  div.classList.add("blinker");

  div.style.top = y + "px";
  div.style.left = x + "px";
  blinkers.append(div);
  if (isGold) {
    div.classList.add("isGold");
  }
}
//computation of the board offset
function computeOffset(coord, pos, max_size) {
  let rootsize_orig = getParentProp(pos, { float: true });
  let rootsize = (rootsize_orig / max_size) * 100;
  let frame = Math.ceil(coord / rootsize);
  let current_offset;
  //-----------------------------------------------
  //-->collision detection
  //-----------------------------------------------

  if (pos === "width") {
    frame = Math.ceil(coord / rootsize);

    current_offset =
      (max_size - rootsize_orig) * -1 + rootsize_orig * (frame - 1);
  }
  if (pos === "height") {
    frame = Math.ceil(coord / rootsize);
    current_offset = rootsize_orig * (frame - 1) * -1;
  }

  return current_offset;
}
//a function that calls the recomputation of board offset, also, allows us know when to redraw the board
function triggerOffsetCal(x = players_location[0], y = players_location[1]) {
  let newxoffset = computeOffset(x, "width", current_width);
  let newyoffset = computeOffset(y, "height", current_height);
  if (newxoffset !== current_x_offset || newyoffset !== current_y_offset) {
    shouldRedrawBoard = true;
    current_x_offset = newxoffset;
    current_y_offset = newyoffset;
  }
}
//normalizing the image position
function normalize_image_position(x, y, isPlayerMovement) {
  //calling the board offset during player movement
  if (isPlayerMovement) {
    triggerOffsetCal();
  }
  if (collided_x || collided_y) {
    return previous_position;
  } else {
    let rootWidth = getParentProp("width", { float: true });
    let rootHeight = getParentProp("height", { float: true });
    x = rootWidth - (((x / 100) * current_width) % rootWidth);
    y = ((y / 100) * current_height) % rootHeight;

    previous_position = [x, y];
  }

  return [x, y];
}

function getParentProp(prop, { float, int, bool }) {
  let value = window.getComputedStyle(root)[prop];
  return float
    ? parseFloat(value)
    : int
    ? parseInt(value)
    : bool
    ? Boolean(value)
    : value;
}
//define the size of the canvas
function setCanvasSizeToParentSize(canvas) {
  canvas.width = getParentProp("width", { float: true });
  canvas.height = getParentProp("height", { float: true });
}
function createCanvas() {
  //create canvas dom element
  const canvas = document.createElement("canvas");
  canvas.classList.add("canvas");
  //append it to root
  root.append(canvas);
  //add event listener, using this method allows me to remove the event listener down the line
  $addEventListener(window, "resize", () => setCanvasSizeToParentSize(canvas));
  //give the canvas a size during creating
  setCanvasSizeToParentSize(canvas);
  return canvas;
}
//get the 2 dimensional context from the canvas
function prepareContext(canvas) {
  return canvas.getContext("2d");
}
//function for creating an image object used in the canvas
function createImage(src = "/") {
  const image = document.createElement("img");
  image.src = src;
  return image;
}

//function to compute the size of the board based on screen size
function computeBoardSize(image) {
  //image size conditions
  //--->image height must be greater than min_image height
  //--->image width must be greater than min_image width
  //-->image must be ratiofied,we use width to calculate height but if height increases and inversely calculating width is greater than width, then height's width becomes new width
  const width = getParentProp("width", { float: true }) * width_ratio;
  const height_reversed_width =
    getParentProp("height", { float: true }) * width_ratio * (1 / height_ratio);

  image.width = width > height_reversed_width ? width : height_reversed_width;
  image.width = min_image_width > image.width ? min_image_width : image.width;
  image.height = image.width * height_ratio;
  //save the current size
  current_width = image.width;
  current_height = image.height;
}
//function that points the player in the right direction
function direct_player() {
  if (direction === "right") return "amongus_sprite.png";
  else return "amongus_sprite_reverse.png";
}
function positionPlayer() {
  player_sprite_context.clearRect(
    0,
    0,
    player_sprite_canvas.width,
    player_sprite_canvas.height
  );
  const player = createImage(direct_player());
  player.onload = drawPlayer;
  //draw the player on the board
  function drawPlayer() {
    //normalize the player position, meaning convert thhe pos from a 0-100 to a 0 - maxwidth and 0 - maxheight
    let player_pos = normalize_image_position(
      players_location[0],
      players_location[1],
      true
    );
    if (!shouldRedrawBoard) {
      //compute size of sprite
      let player_size = players_def_size * (current_height / current_width);
      //draw the player
      player_sprite_context.drawImage(
        this,
        player_pos[0] - player_size,
        player_pos[1],
        player_size,
        player_size
      );

      vignette.style.backgroundImage = `radial-gradient(
        circle at ${
          (player_pos[0] / getParentProp("width", { float: true })) * 100
        }% ${(player_pos[1] / getParentProp("height", { float: true })) * 100}%,
        transparent 0%,
        ${vignitte_color} ${vignitte_spread}
      )`;
    } else {
      shouldRedrawBoard = false;
      drawBoard(context);
    }
  }
}
//draw image unto canvas, currently very inefficient (to be optimized later) - has now been moderately optimized, more optimization later
function drawBoard(context) {
  context.clearRect(0, 0, canvas.width, canvas.height);

  const board = createImage("./rombouts-flavien-among-us-map.jpg");
  board.onload = draw;

  //draw image once it loads
  function draw() {
    computeBoardSize(board);

    context.drawImage(
      this,
      current_x_offset,
      current_y_offset,
      board.width,
      board.height
    );

    positionPlayer();
    clearBlinkers();

    for (let i of allObjects) {
      if (isInView(i.x, i.y) && !i.completed) {
        const [x, y] = normalize_image_position(i.x, i.y);
        createBlinker(x, y, i.isGold);
      }
    }
  }
}

//canvas available, ready for tweaking
const canvas = createCanvas();
const player_sprite_canvas = createCanvas();
const context = prepareContext(canvas);
const player_sprite_context = prepareContext(player_sprite_canvas);

//access points in colllision table
function access_points_in_matrix(sign, index, inc = 1, secondSign) {
  secondSign = secondSign ? secondSign : sign;
  let y =
    index === 1 || index === 2
      ? secondSign === "+"
        ? Math.floor(players_location[1] + inc)
        : Math.floor(players_location[1] - inc)
      : Math.floor(players_location[1]);
  let x =
    index === 0 || index === 2
      ? sign === "+"
        ? Math.floor(players_location[0] + inc)
        : Math.floor(players_location[0] - inc)
      : Math.floor(players_location[0]);

  let offset = config.collision_offset;

  return parseInt(mappedArray[y + offset][100 - x]);
}
//function to check siblings
function detectObject(depth = 2) {
  for (let i = 1; i <= depth; i++) {
    let check1 = access_points_in_matrix("-", 0);
    let check2 = access_points_in_matrix("+", 0);
    let check3 = access_points_in_matrix("-", 1);
    let check4 = access_points_in_matrix("+", 1);
    let check5 = access_points_in_matrix("+", 2);
    let check6 = access_points_in_matrix("-", 2);
    let check7 = access_points_in_matrix("-", 2, 1, "+");
    let check8 = access_points_in_matrix("+", 2, 1, "-");
    if (check1 > 1) {
      if (!allObjects[check1 - 2].completed) return check1;
    } else if (check2 > 1) {
      if (!allObjects[check2 - 2].completed) return check2;
    } else if (check3 > 1) {
      if (!allObjects[check3 - 2].completed) return check3;
    } else if (check4 > 1) {
      if (!allObjects[check4 - 2].completed) return check4;
    } else if (check5 > 1) {
      if (!allObjects[check5 - 2].completed) return check5;
    } else if (check6 > 1) {
      if (!allObjects[check6 - 2].completed) return check6;
    } else if (check7 > 1) {
      if (!allObjects[check7 - 2].completed) return check7;
    } else if (check8 > 1) {
      if (!allObjects[check8 - 2].completed) return check8;
    }
  }
}
function inc_dec(index, sign) {
  let variable = access_points_in_matrix(sign, index, player_speed);
  if (!variable) {
    if (sign === "+") {
      if (players_location[index] < 100) {
        players_location[index] += player_speed;
      }
    } else if (sign === "-") {
      if (players_location[index] > 0) {
        players_location[index] -= player_speed;
      }
    }
  }
  object = detectObject();
  if (object) {
    use(1, "isVisible", "isNotVisible", interaction);
  } else {
    use(2, "isVisible", "isNotVisible", interaction);
  }
}
//div creator
function divCreate(className) {
  const div = document.createElement("div");
  div.classList.add(className);
  root.append(div);
  return div;
}
//create a vignette div element
const vignette = divCreate("vignette");
//draw board and also account for window resize
triggerOffsetCal();
drawBoard(context);
$addEventListener(window, "resize", () => drawBoard(context));
//event listener buttons to be used in the application
$addEventListener(window, "keydown", (e) => {
  if (!isPaused) {
    if (e.code === "ArrowLeft") {
      direction = "left";
      inc_dec(0, "+");
      positionPlayer();
      if (collided_x === "minus") inc_dec(0, "-");
    } else if (e.code === "ArrowRight") {
      direction = "right";
      inc_dec(0, "-");
      positionPlayer();
      if (collided_x === "plus") inc_dec(0, "+");
    } else if (e.code === "ArrowUp") {
      inc_dec(1, "-");
      positionPlayer();
      if (collided_y === "plus") inc_dec(1, "+");
    } else if (e.code === "ArrowDown") {
      inc_dec(1, "+");
      positionPlayer();
      if (collided_y === "minus") inc_dec(1, "-");
    } else if (e.code === "Enter" && object) {
      use(2, "isVisible", "isNotVisible", interaction);
      use(1, "isEnabled", "isNotEnabled", game);
      allObjects[object - 2].runGame();
    }
  }
  console.log(players_location);
});

setInterval(() => {
  if (!isPaused) {
    let [hour, minute, second] = timer.innerText.split(":");

    if (parseInt(second) < 59) {
      second = String(parseInt(second) + 1).padStart(2, 0);
    } else if (parseInt(minute) < 59) {
      second = "00";
      minute = String(parseInt(minute) + 1).padStart(2, 0);
    } else {
      second = "00";
      minute = "00";
      hour = String(parseInt(hour) + 1).padStart(2, 0);
    }
    timer.innerText = `${hour}:${minute}:${second}`;
  }
}, 1000);
