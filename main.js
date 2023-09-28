const minFreq = 30;
const maxFreq = 1000;
const minDelay = 0.01;
const maxDelay = 2;

const canvas = document.getElementById("canvas");
// const canvasCtx = canvas.getContext("2d");

const audioCtx = new AudioContext();
let mainGainNode;

const wavePicker = document.querySelector("select[name='waveform']");
const volumeControl = document.querySelector("input[name='volume']");
const freqDisplay = document.getElementById("stats-freq");

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
canvas.addEventListener("click", function (e) {
  // calculate ratios of click coordinates to canvas
  const ratioX = (e.clientX - canvas.offsetLeft) / canvas.offsetWidth;
  const ratioY = (e.clientY - canvas.offsetTop) / canvas.offsetHeight;

  // change canvas color based on X & Y coordinates
  const color = `rgb(${255 * ratioX}, ${255 * ratioY}, ${255 * (1 - ratioX)})`;
  canvas.style.backgroundColor = color;

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
