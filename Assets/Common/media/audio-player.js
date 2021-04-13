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
    ap.genderControlsOpen = false;

    // Wire up media events to handlers
    ap.media.addEventListener("loadedmetadata", ap.showTotalTime.bind(ap));
    ap.media.addEventListener("ended", ap.ended.bind(ap));
    ap.media.addEventListener("timeupdate", ap.updateProgress.bind(ap));

    // if theres no intial gender selected, default to female
    ap.gender = localStorage.getItem('voiceGender') == null 
      ? "female"
      : localStorage.getItem('voiceGender');
    ap.media.src = el.dataset[ap.gender];

    // Set up gender button event listeners
    el.querySelector(".gender-controls").addEventListener(
      "click",
      this.toggleGenderMenu.bind(ap)
    );

    el.querySelector(".female-voice-option").addEventListener(
      "click",
      this.femaleSelected.bind(ap)
    );
    el.querySelector(".male-voice-option").addEventListener(
      "click",
      this.maleSelected.bind(ap)
    );

    // Wire up controls
    ap.playBtn.addEventListener("click", ap.togglePlay.bind(ap));
    ap.backBtn.addEventListener("click", ap.back.bind(ap));
    ap.fwdBtn.addEventListener("click", ap.forward.bind(ap));

    return ap;
  },
  
  femaleSelected: function () {
    // de-select the male option
    let maleOption = document.querySelector(".vu-audio-player .male-voice-option");
    maleOption.style.setProperty("background-color", "#ffffff", "important");

    // highlight the female option
    let femaleOption = document.querySelector(".vu-audio-player .female-voice-option");
    femaleOption.style.setProperty("background-color", "#fcece6", "important");
    
    // update the 'voiceGender' property in local storage and update the currently loaded audio file
    localStorage.setItem('voiceGender', 'female');
    this.gender = localStorage.getItem('voiceGender');
    this.audio.src = this.el.dataset[this.gender];

    // reset the play button
    this.el.querySelector(".play-button").dataset.state = "play";
  },
  
  maleSelected: function () {
    // highlight the male option
    let maleOption = document.querySelector(".vu-audio-player .male-voice-option");
    maleOption.style.setProperty("background-color", "#fcece6", "important");

    // de-select the female option
    let femaleOption = document.querySelector(".vu-audio-player .female-voice-option");
    femaleOption.style.setProperty("background-color", "#ffffff", "important");

    // update the 'voiceGender' property in local storage and update the currently loaded audio file
    localStorage.setItem('voiceGender', 'male');
    this.gender = localStorage.getItem('voiceGender');
    this.audio.src = this.el.dataset[this.gender];
    
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
