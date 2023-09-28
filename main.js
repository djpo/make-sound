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

const minFreq = 30;
const maxFreq = 1000;

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

// listen to clicks on canvas
document.querySelector("canvas").addEventListener("click", function (e) {
  // set frequency based on horizontal click coordinate
  const canvasElem = document.getElementById("main");
  const canvasRatioX =
    (e.clientX - canvasElem.offsetLeft) / canvasElem.offsetWidth;
  const freq = minFreq + canvasRatioX * (maxFreq - minFreq);

  try {
    audioCtx.resume();

    playTone(freq);
  } catch (e) {
    console.log(e);
  }
});

function playTone(freq) {
  const osc = audioCtx.createOscillator();

  // create gain node for each tone
  const toneGainNode = audioCtx.createGain();
  osc.connect(toneGainNode);
  toneGainNode.connect(mainGainNode);

  // set tone amplitude fadeout
  toneGainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.4);

  // set tone tone shape, frequency
  osc.type = wavePicker.options[wavePicker.selectedIndex].value;
  osc.frequency.value = freq;
  osc.start();

  return osc;
}
