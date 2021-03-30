package ai.a2i2.surveyjstheming;

import android.webkit.JavascriptInterface;

import java.util.function.Consumer;

public class InterventionWebInterface {

    public final Consumer<String> sendMessageHandler;

    public InterventionWebInterface(final Consumer<String> sendMessageHandler) {
        this.sendMessageHandler = sendMessageHandler;
    }

    @JavascriptInterface
    public void onSendMessage(String messageJson) {
        sendMessageHandler.accept(messageJson);
    }
}
