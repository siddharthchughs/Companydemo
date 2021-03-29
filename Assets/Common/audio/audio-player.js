AudioPlayer = {
  // Default settings
  SKIP_TIME: 15,

  create: function (el) {
    if (!el) {
      console.log("No element passed to AudioPlayer constructor");
      return;
    }

    // Create object that extends this one with access from DOM
    var ap = Object.create(this);
    ap.el = el;
    el.AudioPlayer = ap;
    ap.audio = el.querySelector("audio");
    ap.currentTimeEl = el.querySelector(".time-display .time-current");
    ap.totalTimeEl = el.querySelector(".time-display .time-total");

    ap.audio.addEventListener("loadedmetadata", this.showTotalTime.bind(ap));
    ap.audio.addEventListener("ended", this.ended.bind(ap));

    // todo: replace with call to EmbedContext
    ap.gender = Math.random() < 0.5 ? "male" : "female";
    ap.audio.src = el.dataset[ap.gender];

    // Wire up controls
    el.querySelector(".ap-play").addEventListener(
      "click",
      this.togglePlay.bind(ap)
    );
    el.querySelector(".ap-back").addEventListener("click", this.back.bind(ap));
    el.querySelector(".ap-fwd").addEventListener(
      "click",
      this.forward.bind(ap)
    );

    ap.audio.addEventListener("timeupdate", this.timeupdate.bind(ap));

    return ap;
  },

  togglePlay: function () {
    if (this.audio.paused) {
      this.audio.play();
      this.el.querySelector(".play-button").dataset.state = "pause";
    } else {
      this.audio.pause();
      this.el.querySelector(".play-button").dataset.state = "play";
    }
  },

  ended: function () {
    this.el.querySelector(".play-button").dataset.state = "play";
    // emit ended event
    this.el.dispatchEvent(new Event("ended"));
    this.el.classList.add("finished");
  },

  back: function () {
    if (this.audio.currentTime < this.SKIP_TIME) {
      this.audio.currentTime = 0;
    } else {
      this.audio.currentTime -= this.SKIP_TIME;
    }
  },

  forward: function () {
    if (this.audio.currentTime + this.SKIP_TIME > this.audio.duration) {
      this.audio.currentTime = this.audio.duration;
    } else {
      this.audio.currentTime += this.SKIP_TIME;
    }
  },

  timeupdate: function (event) {
    // todo: clamp updates to 1/s
    this.currentTimeEl.innerText = convertToMMSS(this.audio.currentTime);
    this.el.style.setProperty(
      "--progress-proportion",
      this.audio.currentTime / this.audio.duration
    );
  },

  showTotalTime: function (event) {
    this.totalTimeEl.innerText = convertToMMSS(this.audio.duration);
  },
};

function convertToMMSS(seconds) {
  if (!seconds) return "00:00";

  var cleanedMinutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  var cleanedSeconds = Math.floor(seconds - cleanedMinutes * 60)
    .toString()
    .padStart(2, "0");
  var formattedString = cleanedMinutes + ":" + cleanedSeconds;
  return formattedString;
}

