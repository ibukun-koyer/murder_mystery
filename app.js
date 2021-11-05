const root = document.querySelector(".root");
const timer = document.querySelector("#timer");
const min_image_width = config.min_image_width;
const width_ratio = config.width_ratio;
const height_ratio = config.height_ratio;
const players_def_size = config.players_def_size;
let direction = config.default_direction;

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

//computation of the board offset
function computeOffset(coord, pos, max_size) {
  let rootsize_orig = getParentProp(pos, { float: true });
  let rootsize = (rootsize_orig / max_size) * 100;
  let frame = Math.ceil(coord / rootsize);
  let current_offset = max_size - rootsize_orig * frame;

  if (pos === "height") {
    frame =
      Math.ceil(max_size / rootsize_orig) - Math.ceil(coord / rootsize) + 1;
    current_offset = max_size - rootsize_orig * frame;
  }
  //-----------------------------------------------
  //-->collision detection
  //-----------------------------------------------

  if (current_offset >= max_size) {
    current_offset = max_size - rootsize_orig;
  }
  current_offset *= -1;

  if (current_offset > 0) current_offset = 0;

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
    console.log(previous_position);
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
      console.log(player_pos);
      vignette.style.backgroundImage = `radial-gradient(
        circle at ${
          (player_pos[0] / getParentProp("width", { float: true })) * 100
        }% ${(player_pos[1] / getParentProp("height", { float: true })) * 100}%,
        transparent 0%,
        var(--vignette-color) ${config.vignitte_spread}
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
  }
}

//canvas available, ready for tweaking
const canvas = createCanvas();
const player_sprite_canvas = createCanvas();
const context = prepareContext(canvas);
const player_sprite_context = prepareContext(player_sprite_canvas);

function inc_dec(index, sign) {
  if (sign === "+") {
    if (players_location[index] < 100) {
      players_location[index]++;
    }
  } else if (sign === "-") {
    if (players_location[index] > 0) {
      players_location[index]--;
    }
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
  }
  console.log(players_location);
});

setInterval(() => {
  let [hour, minute, second] = timer.innerText.split(":");
  console.log(hour, minute, second);
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
}, 1000);
