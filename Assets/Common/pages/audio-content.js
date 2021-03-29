/*
 * Audio Page
 * ----------
 * Standard audio page with audio player embedded and
 * completion alert.
 */

document.addEventListener("DOMContentLoaded", function () {
  var el = document.querySelector(".vu-audio-player");
  // wire up audio player
  AudioPlayer.create(el);

  // Should this hold off until first play?
  EmbedContext.sendMessage("surveyStarted", {});

  // todo: messages for skip, pause, play

  el.addEventListener("ended", function (e) {
    EmbedContext.sendMessage("surveyCompleted", {});
  });

  document
    .querySelector(".audio-content-dismiss")
    .addEventListener("click", function (e) {
      EmbedContext.sendMessage("surveyDismiss", {});
    });
});
