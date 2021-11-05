let collisionArray = [];
let collision_scripts = ["add collision from x 0 to x 100"];
function collisionMatrixCompute() {
  for (let script in collision_scripts) {
    if (script.indexOf('add collision')!==-1){
        console.log('add collisoj')
    }
  }
}
collisionMatrixCompute();
console.log(collisionArray);
