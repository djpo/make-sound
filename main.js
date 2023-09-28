// var canvas = document.getElementById("main");
// var context = canvas.getContext("2d");

const minFreq = 30;
const maxFreq = 1000;

let isAudioContextAllowed = false;
let audioCtx = new AudioContext();
let mainGainNode = null;

const wavePicker = document.querySelector("select[name='waveform']");
const volumeControl = document.querySelector("input[name='volume']");
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
  // set frequency based on horizontal click coordinate
  const canvasElem = document.getElementById("main");
  const canvasRatioX =
    (e.clientX - canvasElem.offsetLeft) / canvasElem.offsetWidth;
  const freq = minFreq + canvasRatioX * (maxFreq - minFreq);

  // display frequency
  freqDisplay.innerText = Math.trunc(freq);

  // play tone
  playTone(freq);
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
