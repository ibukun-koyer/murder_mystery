const nav = document.querySelector("nav");
function createLabel(text) {
  //placeholder
  const placeholder_container = document.createElement("label");
  placeholder_container.classList.add("config-label");
  placeholder_container.innerText = text;
  let id = text.replace(/\s/, "-");
  placeholder_container.setAttribute("for", id);
  page2.append(placeholder_container);
}
function createSlider(
  placeholder,
  min,
  max,
  pos,
  fxn,
  minLabel,
  maxLabel,
  step = 1
) {
  if (!minLabel) {
    minLabel = `${min}`;
  }
  if (!maxLabel) {
    maxLabel = `${max}`;
  }

  //create placeholder
  createLabel(placeholder);
  //slider
  const slider_container = document.createElement("div");
  slider_container.classList.add("slider-container");
  page2.append(slider_container);
  const slider = document.createElement("input");
  slider.setAttribute("type", "range");
  slider.setAttribute("min", min);
  slider.setAttribute("max", max);
  slider.setAttribute("value", pos);
  slider.setAttribute("step", step);
  slider.classList.add("slider");
  slider_container.append(slider);

  $addEventListener(slider, "change", (e) => {
    fxn(parseInt(e.target.value));
  });
  //create ticks
  const tick_container = document.createElement("div");
  tick_container.classList.add("tick-container");
  page2.append(tick_container);
  tick_container.innerHTML = `<span>${minLabel}</span><hr><span>${maxLabel}</span>`;
}
function createColorChoices(placeholder, fxn, ...colors) {
  //placeholder
  createLabel(placeholder);
  const contain_colors = document.createElement("div");
  contain_colors.classList.add("contain-colors");
  page2.append(contain_colors);
  let selected = null;
  //init colors
  for (let color of colors) {
    const color_box = document.createElement("div");
    color_box.classList.add("color_box");
    color_box.style.backgroundColor = color;
    if (color === vignitte_color) {
      selected = color_box;
      use(1, "isSelected", "isNotSelected", color_box);
    } else {
      use(2, "isSelected", "isNotSelected", color_box);
    }

    contain_colors.append(color_box);
    $addEventListener(color_box, "click", () => {
      fxn(color);
      use(1, "isSelected", "isNotSelected", color_box);
      use(2, "isSelected", "isNotSelected", selected);
      selected = color_box;
    });
  }
}
createSlider("Vignitte Spread", 0, 100, parseInt(vignitte_spread), (value) => {
  vignitte_spread = value + "%";
  positionPlayer();
});
createSlider(
  "Zoom",
  1,
  5,
  parseFloat(width_ratio),
  (value) => {
    width_ratio = parseInt(value);
    players_def_size =
      (config.players_def_size * parseInt(value)) / config.width_ratio;

    drawBoard(context);
  },
  "0%",
  "100%"
);
createSlider(
  "Player Speed",
  1,
  2,
  player_speed,
  (value) => {
    console.log(player_speed);
    player_speed = parseInt(value);
  },
  "slow",
  "fast",
  1
);
createColorChoices(
  "Vignitte Color",
  (color) => {
    vignitte_color = color;

    positionPlayer();
  },
  config.vignitte_color,
  config.vignitte_color_unused
);
