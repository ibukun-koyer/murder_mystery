function horizontal_add(from, to, at) {
  let array = mappedArray[at];
  for (let i = from; i < to; i++) {
    array[i] = 1;
  }
}
function vertical_add(from, to, at) {
  for (let i = from; i < to; i++) {
    mappedArray[i][at] = 1;
  }
}
