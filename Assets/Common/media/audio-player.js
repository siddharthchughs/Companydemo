AudioPlayer = {
  // Default settings
  SKIP_TIME: 15,

  create: function (el) {
    if (!el) {
      console.log("No element passed to AudioPlayer constructor");
      return;
    }

    var ap = Object.create(this);

    // Get UI elements
    ap.el = el;
    el.AudioPlayer = ap;
    ap.media = el.querySelector("audio");
    ap.currentTimeEl = el.querySelector(".time-display .time-current");
    ap.totalTimeEl = el.querySelector(".time-display .time-total");
    ap.playButtonIcon = el.querySelector(".play-button");
    ap.backBtn = el.querySelector(".ap-back");
    ap.fwdBtn = el.querySelector(".ap-fwd");
    ap.playBtn = el.querySelector(".ap-play");

    // Wire up media events to handlers
    ap.media.addEventListener("loadedmetadata", ap.showTotalTime.bind(ap));
    ap.media.addEventListener("ended", ap.ended.bind(ap));
    ap.media.addEventListener("timeupdate", ap.updateProgress.bind(ap));

    // todo: replace with call to EmbedContext
    ap.gender = Math.random() < 0.5 ? "male" : "female";
    ap.media.src = el.dataset[ap.gender];

    // Wire up controls
    ap.playBtn.addEventListener("click", ap.togglePlay.bind(ap));
    ap.backBtn.addEventListener("click", ap.back.bind(ap));
    ap.fwdBtn.addEventListener("click", ap.forward.bind(ap));

    return ap;
  },
};
Object.setPrototypeOf(AudioPlayer, MediaPlayer);
