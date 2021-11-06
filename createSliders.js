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
function createSlider(placeholder, min, max, pos, fxn, minLabel, maxLabel) {
  if (!minLabel) {
    minLabel = `${min}`;
  }
  if (!maxLabel) {
    maxLabel = `${max}`;
  }

  //create placeholder
  createLabel(placeholder);
  //scrollbar
  const scrollbar = document.createElement("div");
  scrollbar.classList.add("scrollbar");
  //scrollbar thumb - relative to scrollbar
  const scrollbar_thumb = document.createElement("div");
  scrollbar_thumb.classList.add("scroll-thumb");
  scrollbar.append(scrollbar_thumb);
  let isSliding = false;
  //event listeners
  $addEventListener(scrollbar_thumb, "dragstart", (e) => {
  
    isSliding = e.clientX;
  });
  $addEventListener(window, "mousemove", () => {
    if (isSliding) {
      console.log(isSliding);
    }
  });
  $addEventListener(scrollbar_thumb, "", () => {
    isSliding = false;
  });
  //create ticks
  const tick_container = document.createElement("div");
  tick_container.classList.add("tick-container");

  //append all div to page2

  page2.append(scrollbar);
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
createSlider("Vignitte Spread", 0, 10);
createSlider("Zoom", 0, 3);
createSlider("Player Speed", 0, 3);
createColorChoices(
  "Vignitte Color",
  (color) => {
    vignitte_color = color;
    if (color === config.vignitte_color_unused) {
      nav.style.color = "black";
      document.body.style.background = "white";
    } else {
      nav.style.color = "white";
      document.body.style.background = "black";
    }
    positionPlayer();
  },
  config.vignitte_color,
  config.vignitte_color_unused
);
