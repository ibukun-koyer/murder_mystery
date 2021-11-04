const root = document.querySelector(".root");
const min_image_width = config.min_image_width;
const width_ratio = config.width_ratio;
const height_ratio = config.height_ratio;
const players_def_size = config.players_def_size;

//where players location is x,y pair with values ranging from 0 - 100
const players_location = config.players_initial_position;
let current_width = config.initial_board_width;
let current_height = config.initial_board_height;
let current_x_offset = config.initial_x_offset;
let current_y_offset = config.initial_y_offset;

//computation of the board offset
function computeOffset(coord, pos, max_size) {
  let rootsize = getParentProp(pos, { float: true });
  let current_offset = 0;
  if (coord > rootsize) {
    let multiplier = Math.ceil(coord / max_size);
    current_offset = (multiplier - 1) * rootsize;
    if (max_size - current_offset < rootsize) {
      current_offset = max_size - current_offset;
    }
  }
  return current_offset;
}
//normalizing the image position
function normalize_image_position(x, y, isPlayerMovement) {
  x = (x / 100) * current_width;
  y = (y / 100) * current_height;
  //calling the board offset during player movement
  if (isPlayerMovement) {
    current_x_offset = computeOffset(x, "width", current_width);
    current_y_offset = computeOffset(y, "height", current_height);
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
//right allign the image in the canvas using 0 0 origin points as ref
function rightAlign(image) {
  let width_diff =
    parseFloat(image.width) - getParentProp("width", { float: true });
  return width_diff * -1;
}
//function to compute the size of the board based on screen size
function computeBoardSize(image) {
  //image size conditions
  //--->image height must be greater than min_image height
  //--->image width must be greater than min_image width
  //-->image must be ratiofied,we use width to calculate height but if height increases and inversely calculating width is greater than width, then height's width becomes new width
  console.log(image.height, image.width);
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

//draw image unto canvas
function drawBoard(context) {
  const board = createImage("./rombouts-flavien-among-us-map.jpg");
  board.onload = draw;
  //draw image once it loads
  function draw() {
    computeBoardSize(board);
    context.drawImage(this, rightAlign(this), 0, board.width, board.height);
    const player = createImage("./amongus_sprite.png");
    player.onload = drawPlayer;
    //draw the player on the board
    function drawPlayer() {
      //normalize the player position, meaning convert thhe pos from a 0-100 to a 0 - maxwidth and 0 - maxheight
      let player_pos = normalize_image_position(
        players_location[0],
        players_location[1]
      );
      console.log("drawing player at ", player_pos);
      //draw the player
      let player_size = players_def_size * (min_image_width / current_width);
      context.drawImage(
        this,
        player_pos[0],
        player_pos[1],
        player_size,
        player_size
      );
    }
  }
}

//canvas available, ready for tweaking
const canvas = createCanvas();
const context = prepareContext(canvas);

//draw board and also account for window resize
drawBoard(context);
$addEventListener(window, "resize", () => drawBoard(context));
