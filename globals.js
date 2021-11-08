//the page to inject games
const gamePage = document.querySelector(".games article");
//the page for journals
const journal_article = document.querySelector(".journal-view article");
const journal_page = document.querySelector(".journal-view");
//APP JS
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
//NAV
const nav = document.querySelector("nav");
//DOMlist
const DOMlist = [];
//Times
const times = document.querySelector(".games i");
const times2 = document.querySelector(".journal-view i");
//MAIN MENU
let isPaused = config.isPaused;
const audio = document.querySelector("#gameAudio");
const mainMenu = document.querySelector(".menu");
const mainManuButton = document.querySelector("li i");
let mainMenuButtonClass = ["fa fa-times", "fa fa-bars"];

const page1 = document.querySelector(".page1-mainmenu");
const page2 = document.querySelector(".page2-mainmenu");
const page3 = document.querySelector(".page3-mainmenu");
