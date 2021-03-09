package ai.a2i2.surveyjstheming;

import android.webkit.JavascriptInterface;

import java.util.function.Consumer;

public class SurveyWebInterface {
    private final String surveyJson;
    private final Consumer<String> completionHandler;
    private final Consumer<Void> dismissHandler;

    public SurveyWebInterface(final String surveyJson, final Consumer<String> completionHandler, final Consumer<Void> dismissHandler) {
        this.surveyJson = surveyJson;
        this.completionHandler = completionHandler;
        this.dismissHandler = dismissHandler;
    }

    @JavascriptInterface
    public void onSurveyComplete(String responseJson) {
        completionHandler.accept(responseJson);
    }

    @JavascriptInterface
    public String getSurveyJson() {
        return surveyJson;
    }

    @JavascriptInterface
    public void onDismissClicked() {
        dismissHandler.accept(null);
    }
}
