//this config should be used for fixed variables for this app.
const config = {
  //width ratio means the ratio for the board with respect to the screen size
  width_ratio: 16 / 6,
  //height ratio means the ratio for the board with respect to the screen size
  height_ratio: 2 / 3,
  //the min image width is the min width of the board
  min_image_width: 2000,
  //the initial position the player is placed at
  players_initial_position: [10, 7],
  //the initial size of the board
  initial_board_width: 0,
  initial_board_height: 0,
  //the initial offset
  initial_x_offset: 0,
  initial_y_offset: 0,
  //the default size of the players sprite character
  players_def_size: 250,
  //default direction of sprite
  default_direction: "left",
  //VIGNITTE SPREAD
  vignitte_spread: "20%",
  //current play state, played or paused
  isPaused: true,
  //the players walking speed
  player_speed: 0.5,
  //the color of vignitte
  vignitte_color: "rgba(0,0,0,0.95)",
  vignitte_color_unused: "rgba(255,255,255, 0.95)",
  //collision offset
  collision_offset: 4,
  //proximity depth
  proximity_depth: 2,
};
