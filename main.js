// var canvas = document.getElementById("main");
// var context = canvas.getContext("2d");

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

let audioCtx = new AudioContext();
const oscList = [];
let mainGainNode = null;

const wavePicker = document.querySelector("select[name='waveform']");
const volumeControl = document.querySelector("input[name='volume']");

mainGainNode = audioCtx.createGain();
mainGainNode.connect(audioCtx.destination);
mainGainNode.gain.value = volumeControl.value;
volumeControl.addEventListener("change", changeVolume, false);
function changeVolume() {
  mainGainNode.gain.value = volumeControl.value;
}

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

// listen to clicks on canvas
document.querySelector("canvas").addEventListener("click", function () {
  console.log("click");
  try {
    audioCtx.resume();

    playTone(440);
  } catch (e) {
    console.log(e);
  }
});

function playTone(freq) {
  const osc = audioCtx.createOscillator();
  osc.connect(mainGainNode);

  osc.type = wavePicker.options[wavePicker.selectedIndex].value;
  osc.frequency.value = freq;
  osc.start();

  return osc;
}
