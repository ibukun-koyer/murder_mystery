const DOMlist = [];
function $addEventListener(DOM, event, fxn) {
  DOMlist.push([DOM, event, fxn]);
  DOM.addEventListener(event, fxn);
}
function template(DOM, fxn) {
  for (let i = 0; i < DOMlist.length; i++) {
    if (DOM === DOMlist[i[0]]) {
      if (typeof fxn === "function") {
        fxn(DOMlist[i]);
        DOMlist.splice(i);
      }
    }
  }
}
function $removeEventListener(DOM) {
  template(DOM, (i) => {
    i[0].removeEventListener(i[1], i[2]);
  });
}
function $removeAllEventListeners(list = DOMlist) {
  if (list.length > 0) {
    let obj = list.pop();
    obj[0].removeEventListener(obj[1], obj[2]);
    removeAllEventListeners(list);
  }
}
function $delete(DOM) {
  template(DOM, (i) => {
    i[0].removeEventListener(i[1], i[2]);
    i[0].remove();
  });
}
