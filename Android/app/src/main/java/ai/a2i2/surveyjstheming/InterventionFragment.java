package ai.a2i2.surveyjstheming;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

public class InterventionFragment extends Fragment implements View.OnKeyListener {

    private static final String ARG_CONTENT = "content";
    private String content;
    private WebView webView;

    public static InterventionFragment newInstance(@NonNull String content) {
        final InterventionFragment fragment = new InterventionFragment();
        Bundle args = new Bundle();
        args.putString(ARG_CONTENT, content);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            content = getArguments().getString(ARG_CONTENT);
        }
    }

    @NonNull
    @Override
    @SuppressLint("SetJavaScriptEnabled")
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {

        View view = inflater.inflate(R.layout.fragment_web_recommendation, container, false);

        webView = view.findViewById(R.id.web_container);
        webView.setOnKeyListener(this);
        // required otherwise will redirect user to Chrome (or other internet app)
        // also how errors are handled
        webView.setWebViewClient(new WebViewClient());
        webView.getSettings().setJavaScriptEnabled(true);
        webView.loadData(content, "text/html", "charset=UTF-8");

        return view;
    }

    /**
     * Allow user to use back arrow within the WebView.
     */
    @Override
    public boolean onKey(@NonNull View v, int keyCode, @NonNull KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK
                && event.getAction() == MotionEvent.ACTION_UP
                && webView.canGoBack()) {
            webView.goBack();
            return true;
        }
        return false;
    }
}
