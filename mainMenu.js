let isPaused = config.isPaused;
const mainMenu = document.querySelector("section");
const mainManuButton = document.querySelector("li i");
let mainMenuButtonClass = ["fa fa-times", "fa fa-bars"];

const page1 = document.querySelector(".page1-mainmenu");
const page2 = document.querySelector(".page2-mainmenu");
const page3 = document.querySelector(".page3-mainmenu");

function use(useParam, param1, param2, DOM) {
  if (useParam === 1) {
    DOM.classList.remove(param2);
    DOM.classList.add(param1);
  }
  if (useParam === 2) {
    DOM.classList.remove(param1);
    DOM.classList.add(param2);
  }
}
function adjustMainMenuAccoringly() {
  if (isPaused) {
    use(1, "isVisible", "isNotVisible", mainMenu);
    mainManuButton.className = mainMenuButtonClass[0];
  } else {
    use(2, "isVisible", "isNotVisible", mainMenu);
    mainManuButton.className = mainMenuButtonClass[1];
  }
}
adjustMainMenuAccoringly();
$addEventListener(mainManuButton, "click", () => {
  isPaused = !isPaused;
  adjustMainMenuAccoringly();
});

//add event listeners for buttons on main menu
$addEventListener(document.querySelector(".play-game"), "click", () => {
  isPaused = false;
  adjustMainMenuAccoringly();
});
$addEventListener(document.querySelector(".options"), "click", () => {
  use(1, "isNotEnabled", "isEnabled", page1);
  use(2, "isNotEnabled", "isEnabled", page2);
});
