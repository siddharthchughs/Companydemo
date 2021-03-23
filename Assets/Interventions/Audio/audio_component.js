var isPlaying = false;
const SKIP_REWIND_TIME = 15;
const MAX_BAR_WIDTH = 305;

// look for better way to do this
setInterval(setElapsedTime, 200);
setTimeout(getAudioLength, 200);

function togglePlay() {
  var audio = document.getElementById("audio-component");
  isPlaying ? audio.pause() : audio.play();
  isPlaying = !isPlaying;
}

function rewindBack() {
  var audio = document.getElementById("audio-component");
  if (audio.currentTime < SKIP_REWIND_TIME) {
    audio.currentTime = 0;
    isPlaying = true;
  } else {
    audio.currentTime -= SKIP_REWIND_TIME;
  }
}

function convertToMMSS(seconds) {
  let cleanedMinutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  let cleanedSeconds = Math.floor(seconds - (cleanedMinutes * 60)).toString().padStart(2, '0');
  return `${cleanedMinutes}:${cleanedSeconds}`;
}

function skipForward() {
  var audio = document.getElementById("audio-component");
  if (audio.currentTime + SKIP_REWIND_TIME > audio.duration) {
    audio.currentTime = audio.duration;
    isPlaying = false;
  } else {
    audio.currentTime += SKIP_REWIND_TIME;
  }
}

function setElapsedTime() {
  var audio = document.getElementById("audio-component");
  var elapsedTime = audio.currentTime;
  let formattedTime =  convertToMMSS(elapsedTime);

  document.getElementById("start-time").innerHTML = formattedTime
}

function getAudioLength() {
  var audio = document.getElementById("audio-component");
  var totalTime = audio.duration;
  let formattedTime = convertToMMSS(totalTime);

  document.getElementById("total-time").innerHTML = formattedTime == "NaN:NaN" ? "00:00" : formattedTime;
}

