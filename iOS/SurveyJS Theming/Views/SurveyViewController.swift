import os.log
import UIKit
import WebKit

enum SurveyFailure: Error {
    case loadFailed
    case responseDecodeFailed
    case userCanceled
}

protocol SurveyViewControllerDelegate: AnyObject {
    func surveyViewController(_ controller: SurveyViewController, didFinishWithResult result: Result<Void, SurveyFailure>)
    func surveyViewController(_ controller: SurveyViewController, didBeginSubmission survey: Survey)
    func surveyViewController(_ controller: SurveyViewController, didCompleteSubmission survey: Survey, withResult result: Result<Void, Error>)
}

class SurveyViewController: UIViewController {
    private static let submitMessageName = "submitSurvey"
    private static let finishMessageName = "finishSurvey"

    weak var delegate: SurveyViewControllerDelegate?

    private var webView: WKWebView!

    private let survey: Survey

    init(survey: Survey) {
        self.survey = survey
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
        config.userContentController.add(self, name: Self.submitMessageName)
        config.userContentController.add(self, name: Self.finishMessageName)

        webView = WKWebView(frame: .zero, configuration: config)
        webView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        webView.navigationDelegate = self
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

        guard let url = Bundle.main.url(forResource: "index", withExtension: "html") else {
            delegate?.surveyViewController(self, didFinishWithResult: .failure(.loadFailed))
            return
        }
        webView.loadFileURL(url, allowingReadAccessTo: url)
    }

    private func loadSurvey() {
        guard let surveyJsonString = prepareSurveyJson() else {
            os_log(.error, log: .file, "Survey data could not be parsed to a JSON string")
            delegate?.surveyViewController(self, didFinishWithResult: .failure(.loadFailed))
            return
        }

        webView.evaluateJavaScript("loadSurveyJson(`\(surveyJsonString)`);") { [self] _, error in
            if let error = error {
                os_log(.error, log: .file, "Failed to evaludate JavaScript into WKWebView: %s", error.localizedDescription)
                delegate?.surveyViewController(self, didFinishWithResult: .failure(.loadFailed))
            }
        }
    }

    private func prepareSurveyJson() -> String? {
        guard let surveyContents = survey.contents,
              let surveyData = try? JSONEncoder().encode(surveyContents),
              let surveyJsonString = String(data: surveyData, encoding: .utf8)
        else {
            return nil
        }
        return surveyJsonString // the following is required so we can successfully evaluate the injected JS
            .replacingOccurrences(of: "\\", with: "\\\\")
            .replacingOccurrences(of: "\'", with: "\\'")
    }
}

// MARK: - Web view delegate methods

extension SurveyViewController: WKNavigationDelegate {
    // swiftlint:disable:next implicitly_unwrapped_optional
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        loadSurvey()
    }
}

// MARK: - Web view method to handle call backs

extension SurveyViewController: WKScriptMessageHandler {
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        os_log(.info, log: .file, "Received %s message back from web view", message.name)
        switch message.name {
        case Self.submitMessageName:
            delegate?.surveyViewController(self, didBeginSubmission: survey)
            Timer.scheduledTimer(withTimeInterval: 1.0, repeats: false) { [weak self] _ in
                guard let self = self else { return }
                self.delegate?.surveyViewController(self, didCompleteSubmission: self.survey, withResult: .success(()))
            }
        case Self.finishMessageName:
            delegate?.surveyViewController(self, didFinishWithResult: .success(()))
        default:
            break // nothing to do
        }
    }
}

private extension OSLog {
    static let file = OSLog(subsystem: "ai.a2i2.ConductorUI", category: "SurveyViewController")
}
