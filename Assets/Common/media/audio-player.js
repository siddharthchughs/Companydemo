AudioPlayer = {
  // Default settings
  SKIP_TIME: 15,
  MALE: "male",
  FEMALE: "female",
  GENDER_VOICE_KEY: "genderVoice",
  CLOSED: "closed",
  OPEN: "open",

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
    ap.maleOptionButton = el.querySelector(".male-voice-option");
    ap.femaleOptionButton = el.querySelector(".female-voice-option");

    // Wire up media events to handlers
    ap.media.addEventListener("loadedmetadata", ap.showTotalTime.bind(ap));
    ap.media.addEventListener("ended", ap.ended.bind(ap));
    ap.media.addEventListener("timeupdate", ap.updateProgress.bind(ap));

    // if theres no intial gender selected, default to female
    ap.gender = EmbedContext.getValue(this.GENDER_VOICE_KEY) == null 
      ? "female"
      : EmbedContext.getValue(this.GENDER_VOICE_KEY)
    ap.media.src = el.dataset[ap.gender];
    EmbedContext.setValue(this.GENDER_VOICE_KEY, ap.gender);

    // set the currently selected gender to be highlighted
    if (EmbedContext.getValue(this.GENDER_VOICE_KEY) == this.FEMALE) {
      el.querySelector(".gender-selector-active").dataset.gender = this.FEMALE
    } else {
      el.querySelector(".gender-selector-active").dataset.gender = this.MALE
    }

    // Set up gender button event listeners
    el.querySelector(".gender-controls").addEventListener(
      "click",
      this.toggleGenderMenu.bind(ap)
    );

    ap.femaleOptionButton.addEventListener(
      "click",
      this.genderChanged.bind(ap)
    );
    ap.maleOptionButton.addEventListener(
      "click",
      this.genderChanged.bind(ap)
    );

    // there are 2 situations where we want to keep the gender selection menu open despite
    // the element losing focus, when they press on the container of the gender buttons and
    // when they press on the tile containing the 'narrator' text
    document.addEventListener("click", (event) => {
      var controlsButton = el.querySelector(".gender-controls")
      var container = el.querySelector(".vu-media-panel");

      if (event.target == el.querySelector(".narrator-title")
        || event.target == el.querySelector(".gender-selector-active")
      ) {
        this.updateGenderMenuOpenStatus(this.OPEN, controlsButton, container);
      } else if (event.target == controlsButton) {
        // when the controls button is pressed, the menu is opened in its respective handler
      } else {
        this.updateGenderMenuOpenStatus(this.CLOSED, controlsButton, container);
      }
    });

    // Wire up controls
    ap.playBtn.addEventListener("click", ap.togglePlay.bind(ap));
    ap.backBtn.addEventListener("click", ap.back.bind(ap));
    ap.fwdBtn.addEventListener("click", ap.forward.bind(ap));

    return ap;
  },

  genderChanged: function (event) {
    var genderButtonResponse = event.target.dataset.gender;
    var genderControlsButton = this.el.querySelector(".gender-controls");
    var container = this.el.querySelector(".vu-media-panel");

    // change the gender
    this.el.querySelector(".gender-selector-active").dataset.gender = genderButtonResponse
    EmbedContext.setValue(this.GENDER_VOICE_KEY, genderButtonResponse);    
    this.media.src = this.el.dataset[genderButtonResponse];

    // hide the menu
    this.updateGenderMenuOpenStatus(this.CLOSED, genderControlsButton, container);
  },

  toggleGenderMenu: function (event) {
    var buttonEventResponse = event.target.dataset.menu;
    var genderControlsButton = this.el.querySelector(".gender-controls");
    var container = this.el.querySelector(".vu-media-panel");
    container.dataset.menu = buttonEventResponse;
    
    if (container.dataset.menu == this.CLOSED) {
      // display the menu
      this.updateGenderMenuOpenStatus(this.OPEN, genderControlsButton, container);
    } else {
      // hide the menu
      this.updateGenderMenuOpenStatus(this.CLOSED, genderControlsButton, container);
    }
  },

  updateGenderMenuOpenStatus: function (state, button, container) {
    container.dataset.menu = state;
    button.dataset.menu = state;
  }
};
Object.setPrototypeOf(AudioPlayer, MediaPlayer);
