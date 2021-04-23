package ai.a2i2.surveyjstheming

import ai.a2i2.surveyjstheming.databinding.FragmentOverviewBinding
import android.annotation.SuppressLint
import android.content.pm.ApplicationInfo
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.webkit.JavascriptInterface
import android.webkit.WebView
import androidx.fragment.app.Fragment

class OverviewFragment : Fragment() {

    private lateinit var binding: FragmentOverviewBinding

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        binding = FragmentOverviewBinding.inflate(inflater)
        binding.toolbarWithTitle.title.setText(R.string.overview_label)
        binding.overviewWebView.setOnScrollChangeListener { _, _, scrollY, _, _ -> binding.toolbarWithTitle.appbar.elevation = if (scrollY > 0) 26.0f else 0.0f; }
        return binding.root
    }

    @SuppressLint("SetJavaScriptEnabled")
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val webView = binding.overviewWebView
        webView.settings.loadsImagesAutomatically = true
        webView.settings.javaScriptEnabled = true
        // Active phase would normally be determined based on trial progress in the real apps
        webView.addJavascriptInterface(OverviewWebInterface("MIDWAY"), "AndroidBridge")
        // Enable Chrome inspection in debug mode
        if (0 != requireContext().applicationInfo.flags and ApplicationInfo.FLAG_DEBUGGABLE) {
            WebView.setWebContentsDebuggingEnabled(true)
        }
        webView.loadUrl("file:///android_asset/Overview/index.html")
    }

    class OverviewWebInterface(private val activePhase: String) {

        @JavascriptInterface
        fun getActivePhase(): String {
            return activePhase
        }
    }
}