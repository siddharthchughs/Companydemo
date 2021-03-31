VideoPlayer = {
  // Default settings
  SKIP_TIME: 15,

  create: function (el) {
    if (!el) {
      console.log("No element passed to VideoPlayer constructor");
      return;
    }

    // Create object that extends this one with access from DOM
    var vp = Object.create(this);
    vp.el = el;
    el.VideoPlayer = vp;

    vp.resize();

    window.addEventListener('resize', this.resize.bind(vp));

    vp.video = el.querySelector("video");
    vp.video.addEventListener("ended", this.ended.bind(vp));

    return vp;
  },

  resize: function () {
    this.el.style.setProperty("--wih", window.innerHeight + 'px');
    this.el.style.setProperty("--wiw", window.innerWidth + 'px');
  },

  show: function () {
    this.el.dataset.visibility = 'show';
    document.body.classList.add("scrolllock");
  },

  hide: function () {
    this.el.dataset.visibility = 'hide';
    document.body.classList.remove("scrolllock");
  },

  ended: function () {
    // emit ended event
    this.el.dispatchEvent(new Event("ended"));
    this.el.classList.add("finished");
  },
};

