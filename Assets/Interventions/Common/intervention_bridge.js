function interventionCompleted() {
    if (window.AndroidBridge) {
        AndroidBridge.onInterventionComplete();
    } else if (window.webkit) {
        webkit.messageHandlers.onInterventionComplete.postMessage({})
    } else {
        console.log('Intervention completed');
    }
}
window.interventionCompleted = interventionCompleted;