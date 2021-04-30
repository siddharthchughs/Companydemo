package ai.a2i2.surveyjstheming;

import android.annotation.SuppressLint;
import android.app.Dialog;
import android.content.pm.ApplicationInfo;
import android.os.Bundle;
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

public class NotificationDialogFragment extends DialogFragment {
    private static final String NOTIFICATION_PATH = "notification_path";
    private static final String TAG = NotificationDialogFragment.class.getSimpleName();

    private Toolbar toolbar;
    private WebView webView;

    private String path;

    @Nullable
    public static NotificationDialogFragment newInstance(@NonNull final String path) {
        final NotificationDialogFragment f = new NotificationDialogFragment();
        final Bundle args = new Bundle();
        args.putString(NOTIFICATION_PATH, path);
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
        path = args.getString(NOTIFICATION_PATH);
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
        webView.getSettings().setJavaScriptEnabled(true);
        webView.loadUrl("file:///android_asset/" + path);
        if (0 != (getContext().getApplicationInfo().flags & ApplicationInfo.FLAG_DEBUGGABLE)
                && BuildConfig.BUILD_TYPE.contains("debug")) {
            WebView.setWebContentsDebuggingEnabled(true);
        }

        toolbar = view.findViewById(R.id.toolbar);
        if (toolbar != null) {
            toolbar.setNavigationIcon(AppCompatResources.getDrawable(requireContext(), R.drawable.ic_close_black_24dp));
            toolbar.setTitle("Notification");
            toolbar.setNavigationOnClickListener(v -> exitSurvey());
        }
    }

    @Override
    public void onDestroyView() {
        if (webView != null) {
            webView.destroy();
        }
        super.onDestroyView();
    }

    private void exitSurvey() {
        this.dismiss();
    }
}
