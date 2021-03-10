package ai.a2i2.surveyjstheming;

import android.webkit.JavascriptInterface;

import java.util.function.Consumer;

public class InterventionWebInterface {

    public final Consumer<Void> completionHandler;

    public InterventionWebInterface(final Consumer<Void> completionHandler) {
        this.completionHandler = completionHandler;
    }

    @JavascriptInterface
    public void onInterventionComplete() {
        completionHandler.accept(null);
    }
}
