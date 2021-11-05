let isPaused = config.isPaused;
const mainMenu = document.querySelector("section");
const mainManuButton = document.querySelector("li i");
let mainMenuButtonClass = ["fa fa-times", "fa fa-bars"];
function adjustMainMenuAccoringly() {
  if (isPaused) {
    mainMenu.classList.remove("isNotVisible");
    mainMenu.classList.add("isVisible");
    mainManuButton.className = mainMenuButtonClass[0];
  } else {
    mainMenu.classList.add("isNotVisible");
    mainMenu.classList.remove("isVisible");
    mainManuButton.className = mainMenuButtonClass[1];
  }
}
adjustMainMenuAccoringly();
$addEventListener(mainManuButton, "click", () => {
  isPaused = !isPaused;
  adjustMainMenuAccoringly();
});
