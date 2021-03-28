var isPlaying = false;
var SKIP_REWIND_TIME = 15;
var MAX_BAR_WIDTH = 305;
var randomLoad = true;

// look for better way to do this
setTimeout(getAudioLength, 200);

// update the audio progress bar position every 200ms
setInterval(setElapsedTime, 200);
setInterval(setAudioOverlayPosition, 200);

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
  var cleanedMinutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  var cleanedSeconds = Math.floor(seconds - (cleanedMinutes * 60)).toString().padStart(2, '0');
  var formattedString = cleanedMinutes + ":" + cleanedSeconds;
  return formattedString;
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
  var formattedTime =  convertToMMSS(elapsedTime);

  document.getElementById("start-time").innerHTML = formattedTime
}

function getAudioLength() {
  var audio = document.getElementById("audio-component");
  var totalTime = audio.duration;
  var formattedTime = convertToMMSS(totalTime);

  document.getElementById("total-time").innerHTML = formattedTime == "NaN:NaN" ? "00:00" : formattedTime;
}

function setAudioOverlayPosition() {
  var audio = document.getElementById("audio-component");
  var currentPosition = Math.floor(audio.currentTime / audio.duration * MAX_BAR_WIDTH);
  var widthString = currentPosition.toString() + "px";
  var transformString = "translateX(" + currentPosition + "px)";

  document.getElementById("progress-bar-dot").style.transform = transformString;
  document.getElementById("progress-bar").style.width = widthString;
}

// included for the moment until we have the mindfulness intevention completed
function setRandomAudioFile() {
  if (randomLoad) {
    var audio = document.getElementById("audio-component");
    audio.src = getRandomAudioFile();
    randomLoad = false;
  }
}

function getRandomAudioFile() {
  var videoList = [
    "../../Common/Audio/Mindful breathing - female.mp4",
    "../../Common/Audio/Mindful breathing - male.mp4",
    "../../Common/Audio/Mindful walking - female.mp4",
    "../../Common/Audio/Mindful walking - male.mp4",
    "../../Common/Audio/Mindful eating - female.mp4",
    "../../Common/Audio/Mindful eating - male.mp4",
    "../../Common/Audio/Body Scan - female.mp4",
    "../../Common/Audio/Body Scan - male.mp4",
    "../../Common/Audio/Unhooking from thoughts - female.mp4",
    "../../Common/Audio/Unhooking from thoughts - male.mp4"
  ]

  var index = Math.floor(Math.random() * videoList.length)
  var url = videoList[index];

  return url;
}

