import SafariServices
import UIKit
import WebKit

protocol OverviewViewControllerDelegate: AnyObject {
    func getOverviewViewControllerDidFinish(_ controller: OverviewViewController)
}

class OverviewViewController: UIViewController, WKNavigationDelegate {
    private var webView: WKWebView!
    
    weak var delegate: OverviewViewControllerDelegate?
    
    override func loadView() {
        view = UIView()
        view.backgroundColor = .systemBackground
        
        webView = WKWebView(frame: .zero)
        webView.translatesAutoresizingMaskIntoConstraints = false
        webView.navigationDelegate = self
        view.addSubview(webView)

        NSLayoutConstraint.activate([
            webView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            webView.topAnchor.constraint(equalTo: view.topAnchor),
            webView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            webView.bottomAnchor.constraint(equalTo: view.bottomAnchor),
        ])

        title = "Overview"
        navigationItem.largeTitleDisplayMode = .never
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)

        guard let url = Bundle.main.url(forResource: "Assets/Overview/index", withExtension: "html") else {
            delegate?.getOverviewViewControllerDidFinish(self)
            return
        }
        webView.loadFileURL(url, allowingReadAccessTo: url)
    }
}
