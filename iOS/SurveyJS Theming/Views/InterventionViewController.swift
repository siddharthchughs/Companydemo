import os.log
import UIKit
import WebKit

protocol InterventionViewControllerDelegate: AnyObject {
    func interventionViewControllerDidFinish(_ controller: InterventionViewController)
}

class InterventionViewController: UIViewController {
    private static let startMessageName = "interventionStarted"
    private static let pageMessageName = "pageChanged"
    private static let completedMessageName = "interventionCompleted"
    private static let dismissMessageName = "interventionDismiss"

    weak var delegate: InterventionViewControllerDelegate?

    private var webView: WKWebView!

    private let module: InterventionModule

    init(module: InterventionModule) {
        self.module = module
        super.init(nibName: nil, bundle: nil)
    }

    @available(*, unavailable)
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func loadView() {
        view = UIView()
        view.backgroundColor = .systemBackground

        let config = WKWebViewConfiguration()
        config.userContentController = WKUserContentController()
        config.userContentController.add(self, name: Self.startMessageName)
        config.userContentController.add(self, name: Self.pageMessageName)
        config.userContentController.add(self, name: Self.completedMessageName)
        config.userContentController.add(self, name: Self.dismissMessageName)

        webView = WKWebView(frame: .zero, configuration: config)
        webView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(webView)

        NSLayoutConstraint.activate([
            webView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            webView.topAnchor.constraint(equalTo: view.topAnchor),
            webView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            webView.bottomAnchor.constraint(equalTo: view.bottomAnchor),
        ])
    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)

        os_log(.info, "Loading %s", module.indexFile.path)
        webView.loadFileURL(module.indexFile, allowingReadAccessTo: module.interventionRootDirectory)
    }
}

// MARK: - Web view method to handle call backs

extension InterventionViewController: WKScriptMessageHandler {
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        os_log(.info, "Received %s message back from web view", message.name)
        switch message.name {
        case Self.dismissMessageName:
            delegate?.interventionViewControllerDidFinish(self)
        // todo: handle pageChanged, interventionStarted, interventionCompleted messages
        default:
            break // todo: send unknown message to support?
        }
    }
}
