// var canvas = document.getElementById("main");
// var context = canvas.getContext("2d");

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

document.querySelector("canvas").addEventListener("click", function () {
  console.log("click");

  try {
    context = new AudioContext();
    console.log("new AudioContext created successfully");
  } catch (e) {
    alert("Web Audio API is not supported in this browser");
  }
});

// // ALT: load first, then resume playback when user interacts
// var context;
// window.onload = function () {
//   context = new AudioContext();
//   // set up all nodes
//   // ...
// };
// // (then, in event listener)
// context.resume().then(() => {
//   console.log("Playback resumed successfully");
// });
