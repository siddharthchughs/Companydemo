package ai.a2i2.surveyjstheming;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.widget.Toolbar;
import androidx.fragment.app.Fragment;

import com.google.android.material.appbar.AppBarLayout;

public class GetHelpFragment extends Fragment implements View.OnKeyListener {

    private static final String TAG = GetHelpFragment.class.getSimpleName();

    private AppBarLayout appBarLayout;
    private WebView webView;

    @Override
    @Nullable
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        final View view = inflater.inflate(R.layout.fragment_get_help, container, false);

        final Toolbar toolbar = view.findViewById(R.id.toolbar);
        final TextView titleView = toolbar.findViewById(R.id.title);
        titleView.setText(R.string.gethelp_label);

        appBarLayout = view.findViewById(R.id.toolbar_with_title);

        webView = view.findViewById(R.id.get_help_web_view);
        webView.setOnScrollChangeListener((v, scrollX, scrollY, oldScrollX, oldScrollY) -> {
            if (appBarLayout != null)
                appBarLayout.setElevation(scrollY > 0 ? 26.0f : 0.0f);
        });

        return view;
    }

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        webView.setOnKeyListener(this);
        webView.getSettings().setLoadsImagesAutomatically(true);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.loadUrl("file:///android_asset/GetHelp/index.html");
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                String url = request.getUrl().toString();
                if (url.startsWith("tel:")) {
                    try {
                        Intent intent = new Intent(Intent.ACTION_DIAL, Uri.parse(url));
                        if (intent.resolveActivity(requireActivity().getPackageManager()) != null) {
                            startActivity(intent);
                        }
                        return true; // Block URL loading
                    } catch (Exception e) {
                        Log.e(TAG, "Failed to load survey fallback url");
                    }
                } else if (url.startsWith("http")) {
                    // Launch external default browser
                    Intent i = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                    startActivity(i);
                    return true; // Block URL loading
                }
                return false;
            }
        });
    }

    @Override
    public void onDestroyView() {
        if (appBarLayout != null) {
            appBarLayout.setElevation(0.0f);
        }
        if (webView != null) {
            webView.destroy();
        }
        super.onDestroyView();
    }

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
