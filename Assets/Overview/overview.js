/*
 * Page control for Overview page
 */
var progressList = {
  KICK_OFF: { stage: 1, id: "vu-kick" },
  DAILY_CHECK_INS: { stage: 2, id: "vu-check-ins" },
  MIDWAY: { stage: 3, id: "vu-midway" },
  VIBE_UP: { stage: 4, id: "vu-vibeup" },
  FINAL_QUESTIONS: { stage: 5, id: "vu-final-questions" },
  REPORT_GIFT: { stage: 6, id: "vu-report-gift" },
};

function setProgress(progress) {
  var active = progressList[progress];
  for (var key in progressList) {
    var p = progressList[key];
    var state = "locked";
    if (p.stage === active.stage) state = "active";
    if (p.stage < active.stage) state = "done";
    if (active.stage === progressList["REPORT_GIFT"].stage) state = "done";

    document.getElementById(p.id).dataset.state = state;
  }
}

if (window.webkit && window.webkit.messageHandlers) {
  platform = "ios";
}
if (window.AndroidBridge) {
  platform = "android";
}

if (platform === "android") {
  window.addEventListener("load", function () {
    if (typeof AndroidBridge.getActivePhase === "function") {
      setProgress(window.AndroidBridge.getActivePhase());
    }
  });
}
