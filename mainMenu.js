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
    use(2, "isNotEnabled", "isEnabled", mainMenu);
    mainManuButton.className = mainMenuButtonClass[0];
  } else {
    use(2, "isVisible", "isNotVisible", mainMenu);
    use(1, "isNotEnabled", "isEnabled", mainMenu);
    mainManuButton.className = mainMenuButtonClass[1];
  }
}
adjustMainMenuAccoringly();
$addEventListener(mainManuButton, "click", () => {
  isPaused = !isPaused;
  if (isPaused) {
    // closeFullscreen();
    audio.pause();
    use(2, "isNotEnabled", "isEnabled", page1);
    use(1, "isNotEnabled", "isEnabled", page3);
    use(1, "isNotEnabled", "isEnabled", page2);
    use(2, "isVisible", "isNotVisible", interaction);
  } else {
    openFullscreen(document.body);
    audio.play();
    if (object) {
      use(1, "isVisible", "isNotVisible", interaction);
    }
  }
  adjustMainMenuAccoringly();
});

//add event listeners for buttons on main menu
$addEventListener(document.querySelector(".play-game"), "click", () => {
  openFullscreen(document.body);
  audio.play();
  isPaused = false;
  adjustMainMenuAccoringly();
});
$addEventListener(document.querySelector(".options"), "click", () => {
  use(1, "isNotEnabled", "isEnabled", page1);
  use(2, "isNotEnabled", "isEnabled", page2);
});
$addEventListener(document.querySelector(".view-journals"), "click", () => {
  journals();
  use(1, "isNotEnabled", "isEnabled", page1);
  use(2, "isNotEnabled", "isEnabled", page3);
});
