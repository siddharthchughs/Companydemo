function interventionCompleted() {
    if ('AndroidBridge' in window) {
        AndroidBridge.onInterventionComplete();
    }
    else {
        webkit.messageHandlers.onInterventionComplete.postMessage({})
    }
}
window.interventionCompleted = interventionCompleted;