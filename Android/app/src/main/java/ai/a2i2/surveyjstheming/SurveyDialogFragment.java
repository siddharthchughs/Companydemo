package ai.a2i2.surveyjstheming;

import android.annotation.SuppressLint;
import android.app.Dialog;
import android.content.DialogInterface;
import android.content.pm.ApplicationInfo;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.content.res.AppCompatResources;
import androidx.appcompat.widget.Toolbar;
import androidx.fragment.app.DialogFragment;

import com.afollestad.materialdialogs.MaterialDialog;

import org.json.JSONException;
import org.json.JSONObject;

public class SurveyDialogFragment extends DialogFragment {
    private static final String SURVEY_JSON = "survey_json";
    private static final String TAG = SurveyDialogFragment.class.getSimpleName();

    private Toolbar toolbar;
    private WebView webView;

    private String surveyJson;
    private DialogInterface.OnDismissListener onDismissListener;

    @Nullable
    static ai.a2i2.surveyjstheming.SurveyDialogFragment newInstance(@NonNull final String jsonEntry) {
        final SurveyDialogFragment f = new SurveyDialogFragment();
        final Bundle args = new Bundle();
        args.putString(SURVEY_JSON, jsonEntry);
        f.setArguments(args);

        return f;
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // make sure it appears fullscreen
        setStyle(DialogFragment.STYLE_NO_TITLE, R.style.AppTheme_FullscreenDialog);

        final Bundle args = getArguments();
        assert args != null;
        surveyJson = args.getString(SURVEY_JSON);
    }

    @NonNull
    @Override
    public Dialog onCreateDialog(@Nullable Bundle savedInstanceState) {
        final Dialog dialog = super.onCreateDialog(savedInstanceState);
        final Window window = dialog.getWindow();
        if (window != null) {
            // make sure it animates in and out
            window.setWindowAnimations(R.style.FullscreenDialogAnimation);
        }
        return dialog;
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull final LayoutInflater inflater, @Nullable final ViewGroup container, @Nullable final Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_survey_dialog, container, false);
    }

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        webView = view.findViewById(R.id.web_view);
        webView.setWebViewClient(new WebViewClient());
        webView.addJavascriptInterface(new SurveyWebInterface(surveyJson, this::handleMessage), "AndroidBridge");
        webView.getSettings().setJavaScriptEnabled(true);
        webView.loadUrl("file:///android_asset/SurveyJS/survey_container.html");
        if (0 != (getContext().getApplicationInfo().flags & ApplicationInfo.FLAG_DEBUGGABLE)
                && BuildConfig.BUILD_TYPE.contains("debug")) {
            WebView.setWebContentsDebuggingEnabled(true);
        }

        toolbar = view.findViewById(R.id.toolbar);
        if (toolbar != null) {
            toolbar.setNavigationIcon(AppCompatResources.getDrawable(requireContext(), R.drawable.ic_close_black_24dp));
            toolbar.setTitle("Survey title");
            toolbar.setNavigationOnClickListener(v -> exitSurvey());
        }
    }

    /**
     * Handle messages passed by the JavaScript embed context.
     * @param messageJson - { key: key, message: message } message JSON
     */
    private void handleMessage(String messageJson) {
        try {
            JSONObject obj = new JSONObject(messageJson);
            String key = obj.getString("key");
            switch (key) {
                case "surveyStarted":
                    Log.i(TAG, String.format("User has started survey"));
                    break;
                case "pageChanged":
                    Log.i(TAG, String.format("User navigated to page %s", obj.getString("message")));
                    break;
                case "surveyCompleted":
                    Log.i(TAG, String.format("User has completed survey:\n%s", obj.getString("message")));
                    surveyComplete(obj.getString("message"));
                    break;
                case "surveyDismiss":
                    Log.i(TAG, String.format("User has dismissed survey"));
                    dismiss();
                    break;
                default:
                    Log.i(TAG, String.format("Message type %s not yet implemented!", key));
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onDestroyView() {
        if (webView != null) {
            webView.destroy();
        }
        super.onDestroyView();
    }

    private void surveyComplete(final String result) {
        // Hide the navigation icon (close btn) must be done on UI thread
        new Handler(Looper.getMainLooper()).post(() -> toolbar.setNavigationIcon(null));

        // Auto dismiss the survey if there is no completion screen
        if (!surveyJson.contains("completedHtml")) {
            this.dismiss();
        }

        // Actual app would submit the survey
    }

    private void dismissSurvey(final Void result) {
        // Close this survey dialog fragment
        this.dismiss();
    }

    private void exitSurvey() {
        new MaterialDialog.Builder(requireContext())
                .content(R.string.dialog_cancel_survey_content)
                .cancelable(false)
                .positiveColorRes(R.color.colorPrimary)
                .positiveText(R.string.button_yes)
                .onPositive((d, w) -> this.dismiss())
                .negativeColorRes(R.color.colorPrimary)
                .negativeText(R.string.button_no)
                .onNegative((dialog, w) -> dialog.dismiss())
                .show();
    }

    void setOnDismissListener(@NonNull DialogInterface.OnDismissListener onDismissListener) {
        this.onDismissListener = onDismissListener;
    }

    @Override
    public void onDismiss(@NonNull DialogInterface dialog) {
        super.onDismiss(dialog);
        if (onDismissListener != null) {
            onDismissListener.onDismiss(dialog);
        }
    }
}
