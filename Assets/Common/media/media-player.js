MediaPlayer = {
  // UI elements
  // - implementations will override local values
  // - listed here for tooling
  el: null, //              The container element
  playButtonIcon: null, //  The transforming icon
  media: null, //           The media playing element
  currentTimeEl: null, //   Time display, updated as playing
  totalTimeEl: null, //     Time display, total media duration
  progressLastUpdated: 0, // For throttling progress updates

  // Default settings
  SKIP_TIME: 15, //      How many seconds to skip
  PROGRESS_FREQ: 100, // Progress bar update frequency in ms

  // Toggle play/pause and change button
  togglePlay: function () {
    if (this.media.paused) {
      this.media.play();
      this.playButtonIcon.dataset.state = "pause";
    } else {
      this.media.pause();
      this.playButtonIcon.dataset.state = "play";
    }
  },

  forward: function () {
    this.media.currentTime = Math.min(
      this.media.currentTime + this.SKIP_TIME,
      this.media.duration
    );
  },

  back: function () {
    this.media.currentTime = Math.max(
      this.media.currentTime - this.SKIP_TIME,
      0
    );
  },

  ended: function () {
    // Transform icon to "play" state
    this.playButtonIcon.dataset.state = "play";
    // Emit ended event
    this.el.dispatchEvent(new Event("ended"));
    // Style page elements as "finished"
    this.el.classList.add("finished");
  },

  updateProgress: function (event) {
    // Throttle updates to 0.1s
    var now = new Date();
    if (now - this.progressLastUpdated > this.PROGRESS_FREQ) {
      this.progressLastUpdated = now;
      this.currentTimeEl.innerText = this.convertToMMSS(this.media.currentTime);

      var proportion = this.media.currentTime / this.media.duration;
      var proportionValue = isNaN(proportion) ? 0 : proportion;
      this.el.style.setProperty(
        "--progress-proportion",
        proportionValue
      );
    }
  },

  showTotalTime: function (event) {
    this.totalTimeEl.innerText = this.convertToMMSS(this.media.duration);
  },

  convertToMMSS: function (seconds) {
    if (!seconds) return "00:00";

    var cleanedMinutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    var cleanedSeconds = Math.floor(seconds - cleanedMinutes * 60)
      .toString()
      .padStart(2, "0");
    var formattedString = cleanedMinutes + ":" + cleanedSeconds;
    return formattedString;
  },
};
