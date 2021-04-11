VideoPlayer = {
  // When last interraction and controls last shown
  lastClick: 0,

  // Settings
  CONTROL_FADE_DELAY: 3000,

  create: function (el) {
    if (!el) {
      console.error("No element passed to VuVideoPlayer constructor");
      return;
    }

    var vp = Object.create(this);

    // Get UI elements
    vp.el = el;
    el.VideoPlayer = vp;
    vp.media = el.querySelector("video");
    vp.currentTimeEl = el.querySelector(".time-display .time-current");
    vp.totalTimeEl = el.querySelector(".time-display .time-total");
    vp.controlsEl = el.querySelector(".vu-media-panel");
    vp.playButtonIcon = el.querySelector(".play-button");
    vp.backBtn = el.querySelector(".vp-back");
    vp.fwdBtn = el.querySelector(".vp-fwd");
    vp.playBtn = el.querySelector(".vp-play");

    // Wire up media events to handlers
    vp.media.addEventListener("loadedmetadata", vp.showTotalTime.bind(vp));
    vp.media.addEventListener("ended", vp.ended.bind(vp));
    vp.media.addEventListener("timeupdate", vp.updateProgress.bind(vp));
    vp.media.addEventListener("timeupdate", vp.hideControls.bind(vp));

    // todo: If player is shown at page load then scroll lock body

    // Ensure player is the same size as display
    vp.resize();
    window.addEventListener("resize", this.resize.bind(vp));

    // Wire up controls
    vp.playBtn.addEventListener("click", vp.togglePlay.bind(vp));
    vp.backBtn.addEventListener("click", vp.back.bind(vp));
    vp.fwdBtn.addEventListener("click", vp.forward.bind(vp));

    // Update last interraction time when anything clicked/tapped
    var showControls = vp.showControls.bind(vp);
    vp.media.addEventListener("click", showControls);
    vp.playBtn.addEventListener("click", showControls);
    vp.backBtn.addEventListener("click", showControls);
    vp.fwdBtn.addEventListener("click", showControls);

    return vp;
  },

  resize: function () {
    this.el.style.setProperty("--wih", window.innerHeight + "px");
    this.el.style.setProperty("--wiw", window.innerWidth + "px");
  },

  // Could move to containing page but component activating scroll
  // lock seems like good encapsulation.
  show: function () {
    this.el.dataset.visibility = "show";
    document.body.classList.add("scrolllock");
  },

  hide: function () {
    this.el.dataset.visibility = "hide";
    document.body.classList.remove("scrolllock");
  },

  showControls: function () {
    // Show the play controls when paused
    this.lastClick = new Date();
    if (this.controlsEl.dataset.visibility !== "show") {
      this.controlsEl.dataset.visibility = "show";
    }
  },

  hideControls: function () {
    // Hide the controls while playing
    var now = new Date();
    if (now - this.lastClick > this.CONTROL_FADE_DELAY) {
      if (this.controlsEl.dataset.visibility !== "hide") {
        this.controlsEl.dataset.visibility = "hide";
      }
    }
  },
};
Object.setPrototypeOf(VideoPlayer, MediaPlayer);
