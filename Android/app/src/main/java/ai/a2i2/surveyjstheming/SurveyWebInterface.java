package ai.a2i2.surveyjstheming;

import android.util.Log;
import android.webkit.JavascriptInterface;

import java.util.function.Consumer;

public class SurveyWebInterface {
    private final String surveyJson;
    private final Consumer<String> sendMessageHandler;

    public SurveyWebInterface(final String surveyJson, final Consumer<String> sendMessageHandler) {
        this.surveyJson = surveyJson;
        this.sendMessageHandler = sendMessageHandler;
    }

    @JavascriptInterface
    public String getSurveyJson() {
        return surveyJson;
    }

    @JavascriptInterface
    public void onSendMessage(String messageJson) {
        sendMessageHandler.accept(messageJson);
    }
}
