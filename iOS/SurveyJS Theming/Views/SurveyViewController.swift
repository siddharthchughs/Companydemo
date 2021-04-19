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
    private static let startMessageName = "surveyStarted"
    private static let pageMessageName = "pageChanged"
    private static let completedMessageName = "surveyCompleted"
    private static let dismissMessageName = "surveyDismiss"

    weak var delegate: SurveyViewControllerDelegate?

    private var webView: WKWebView!

    private let assetsURL: URL
    private let surveyContainerURL: URL
    private let survey: Survey
    private let surveyJSContent: String

    init?(survey: Survey) {
        guard let assetsURL = Bundle.main.url(forResource: "Assets", withExtension: nil) else {
            os_log(.error, "Unable to locate 'Assets' folder in main bundle")
            return nil
        }
        guard let surveyContainerURL = Bundle.main.url(forResource: "Assets/SurveyJS/survey_container", withExtension: "html") else {
            os_log(.error, "Unable to locate 'Assets/SurveyJS/survey_container.html' in main bundle")
            return nil
        }
        guard let surveyJSContent = Self.prepareJSON(survey) else {
            return nil
        }
        self.assetsURL = assetsURL
        self.surveyContainerURL = surveyContainerURL
        self.survey = survey
        self.surveyJSContent = surveyJSContent
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
        let surveyLoadScript = WKUserScript(source: "loadSurvey(`\(surveyJSContent)`);", injectionTime: .atDocumentEnd, forMainFrameOnly: false)
        config.userContentController.addUserScript(surveyLoadScript)

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

        webView.loadFileURL(surveyContainerURL, allowingReadAccessTo: assetsURL)
    }

    private static func prepareJSON(_ survey: Survey) -> String? {
        do {
            guard let surveyContents = survey.contents else {
                return nil
            }
            let surveyData = try JSONEncoder().encode(surveyContents)
            guard let surveyJsonString = String(data: surveyData, encoding: .utf8) else {
                os_log(.error, "Failed to parse SurveyJS json to be injected into web view")
                return nil
            }
            return surveyJsonString
                .replacingOccurrences(of: "\\", with: "\\\\")
                .replacingOccurrences(of: "\'", with: "\\'")
        } catch {
            os_log(.error, "Failed to encode SurveyJS json to be injected into web view: %s", error.localizedDescription)
            return nil
        }
    }
}

// MARK: - Web view method to handle call backs

extension SurveyViewController: WKScriptMessageHandler {
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        os_log(.info, log: .file, "Received %s message back from web view", message.name)
        switch message.name {
        case Self.completedMessageName:
            delegate?.surveyViewController(self, didBeginSubmission: survey)
            Timer.scheduledTimer(withTimeInterval: 1.0, repeats: false) { [weak self] _ in
                guard let self = self else { return }
                self.delegate?.surveyViewController(self, didCompleteSubmission: self.survey, withResult: .success(()))
            }
        case Self.dismissMessageName:
            delegate?.surveyViewController(self, didFinishWithResult: .success(()))
        // TODO: handle pageChanged and surveyStarted messages
        default:
            break // TODO: send unknown message to support?
        }
    }
}

private extension OSLog {
    static let file = OSLog(subsystem: "ai.a2i2.ConductorUI", category: "SurveyViewController")
}
