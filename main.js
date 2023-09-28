var canvas = document.getElementById("main");
var context = canvas.getContext("2d");

// listen to keyboard events
document.addEventListener("keydown", function (e) {
  // left arrow key
  if (e.which === 37) {
    console.log("LEFT");
  }
  // up arrow key
  else if (e.which === 38) {
    console.log("UP");
  }
  // right arrow key
  else if (e.which === 39) {
    console.log("RIGHT");
  }
  // down arrow key
  else if (e.which === 40) {
    console.log("DOWN");
  }
});
