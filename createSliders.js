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
  $addEventListener(scrollbar_thumb, "dragstart", () => {
    isSliding = true;
  });
  $addEventListener(window, "mousemove", () => {});
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
function createColorChoices(placeholder) {
  //placeholder
  createLabel(placeholder);
}
createSlider("Vignitte Spread", 0, 10);
createSlider("Zoom", 0, 3);
createSlider("Player Speed", 0, 3);
createColorChoices("Vignitte Color");
