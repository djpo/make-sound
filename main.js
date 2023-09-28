// var canvas = document.getElementById("main");
// var context = canvas.getContext("2d");

const minFreq = 30;
const maxFreq = 1000;
const minDelay = 0.01;
const maxDelay = 2;

let isAudioContextAllowed = false;
let audioCtx = new AudioContext();
let mainGainNode = null;

const wavePicker = document.querySelector("select[name='waveform']");
const volumeControl = document.querySelector("input[name='volume']");
const canvasElem = document.getElementById("main");
const freqDisplay = document.querySelector("#stats-freq");

// allow AudioContext
document.addEventListener("click", () => audioCtx.resume(), { once: true });

// set up main gain node
mainGainNode = audioCtx.createGain();
mainGainNode.connect(audioCtx.destination);
mainGainNode.gain.value = volumeControl.value;
volumeControl.addEventListener("change", changeVolume, false);
function changeVolume() {
  mainGainNode.gain.value = volumeControl.value;
}

// listen to clicks on canvas
document.querySelector("canvas").addEventListener("click", function (e) {
  // calculate ratios of click coordinates to canvas
  const ratioX = (e.clientX - canvasElem.offsetLeft) / canvasElem.offsetWidth;
  const ratioY = (e.clientY - canvasElem.offsetTop) / canvasElem.offsetHeight;

  // change canvas color based on X & Y coordinates
  const color = `rgb(${255 * ratioX}, ${255 * ratioY}, ${255 * (1 - ratioX)})`;
  canvasElem.style.backgroundColor = color;

  // set frequency based on X coordinate
  const freq = minFreq + ratioX * (maxFreq - minFreq);

  // set audio delay time based on Y coordinate
  const delay = minDelay + ratioY * (maxDelay - minDelay);

  // display frequency
  freqDisplay.innerText = Math.trunc(freq);

  // play tone
  playTone(freq, delay);
});

function playTone(freq, delay) {
  const osc = audioCtx.createOscillator();

  // create gain node for each tone
  const toneGainNode = audioCtx.createGain();
  osc.connect(toneGainNode);
  toneGainNode.connect(mainGainNode);

  // set tone amplitude fadeout
  toneGainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + delay);

  // set tone tone shape, frequency
  osc.type = wavePicker.options[wavePicker.selectedIndex].value;
  osc.frequency.value = freq;
  osc.start();

  return osc;
}
