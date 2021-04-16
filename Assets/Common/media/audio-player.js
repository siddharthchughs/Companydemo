AudioPlayer = {
  // Default settings
  SKIP_TIME: 15,
  MALE: "male",
  FEMALE: "female",
  GENDER_VOICE_KEY: "genderVoice",

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
    ap.genderControlsOpen = false;
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
      ap.femaleOptionButton.style.setProperty("background-color", "#fcece6", "important");
    } else {
      ap.maleOptionButton.style.setProperty("background-color", "#fcece6", "important");
    }

    // Set up gender button event listeners
    el.querySelector(".gender-controls").addEventListener(
      "click",
      this.toggleGenderMenu.bind(ap)
    );

    ap.femaleOptionButton.addEventListener(
      "click",
      this.genderChanged.bind(ap, this.FEMALE)
    );
    ap.maleOptionButton.addEventListener(
      "click",
      this.genderChanged.bind(ap, this.MALE)
    );

    // Wire up controls
    ap.playBtn.addEventListener("click", ap.togglePlay.bind(ap));
    ap.backBtn.addEventListener("click", ap.back.bind(ap));
    ap.fwdBtn.addEventListener("click", ap.forward.bind(ap));

    return ap;
  },
  
  genderChanged: function (gender) {
    if (gender == this.MALE) {
      // highlight the male option and deselect the female option
      this.maleOptionButton.style.setProperty("background-color", "#fcece6", "important");
      this.femaleOptionButton.style.setProperty("background-color", "#ffffff", "important");
    } else {
      // deselect the male option and highlight the female option
      this.maleOptionButton.style.setProperty("background-color", "#ffffff", "important");
      this.femaleOptionButton.style.setProperty("background-color", "#fcece6", "important");
    }

    // update the 'voiceGender' property in local storage and update the currently loaded audio file
    EmbedContext.setValue(this.GENDER_VOICE_KEY, gender);
    this.gender = EmbedContext.getValue(this.GENDER_VOICE_KEY)
    this.media.src = this.el.dataset[this.gender];

    // reset the play button
    this.el.querySelector(".play-button").dataset.state = "play";
  },

  toggleGenderMenu: function () {
    let menu = document.querySelector(".vu-audio-player .gender-selector-active");

    if (this.genderControlsOpen) {
      menu.style.setProperty("display", "none", "important");
      this.genderControlsOpen = !this.genderControlsOpen;
    } else {
      menu.style.setProperty("display", "flex", "important");
      this.genderControlsOpen = !this.genderControlsOpen;
    }
  }
};
Object.setPrototypeOf(AudioPlayer, MediaPlayer);
