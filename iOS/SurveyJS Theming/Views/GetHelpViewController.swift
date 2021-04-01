import SafariServices
import UIKit
import WebKit

protocol GetHelpViewControllerDelegate: AnyObject {
    func getHelpViewControllerDidFinish(_ controller: GetHelpViewController)
}

class GetHelpViewController: UIViewController {
    private var webView: WKWebView!

    weak var delegate: GetHelpViewControllerDelegate?

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

        title = "Get Help"
        navigationItem.largeTitleDisplayMode = .never
    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)

        guard let url = Bundle.main.url(forResource: "Assets/GetHelp/index", withExtension: "html") else {
            delegate?.getHelpViewControllerDidFinish(self)
            return
        }
        webView.loadFileURL(url, allowingReadAccessTo: url)
    }
}

// MARK: - Web view delegate methods

extension GetHelpViewController: WKNavigationDelegate {
    func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Swift.Void) {
        guard let url = navigationAction.request.url else { return decisionHandler(.allow) }

        switch url.scheme {
        case "tel":
            UIApplication.shared.open(url)
            decisionHandler(.cancel)
        case "mailto":
            let alertController = UIAlertController(title: "Email link tapped", message: "You tapped to send an email to \(url.extractMailTo(else: "user@example.com"))", preferredStyle: .alert)
            alertController.addAction(.init(title: "Dismiss", style: .default))
            present(alertController, animated: true)
            decisionHandler(.cancel)
        case "http", "https":
            let controller = SFSafariViewController(url: url)
            controller.modalPresentationStyle = .formSheet
            present(controller, animated: true)
            decisionHandler(.cancel)
        default:
            decisionHandler(.allow)
        }
    }
}

private extension URL {
    func extractMailTo(else defaultEmail: String) -> String {
        if let mailToEmail = URLComponents(url: self, resolvingAgainstBaseURL: false)?.path {
            return mailToEmail
        } else {
            return defaultEmail
        }
    }
}
