import SwiftUI
import UIKit

class AppDelegate: NSObject, UIApplicationDelegate {
    func application(_ application: UIApplication, willFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil) -> Bool {
        let bodyFont = UIFont.customFont(forTextStyle: .body)
        UILabel.appearance().font = bodyFont
        UIButton.appearance().titleLabelFont = bodyFont
        UIBarButtonItem.appearance().setTitleTextAttributes([.font: UIFont.customFont(forTextStyle: .body, weight: .bold)], for: .normal)
        UITableViewCell.appearance().textLabelFont = bodyFont
        UITableViewCell.appearance().detailTextLabelFont = bodyFont

        let standardAppearance = UINavigationBarAppearance()
        standardAppearance.configureWithDefaultBackground()
        standardAppearance.titleTextAttributes = [.font: UIFont.customFont(forTextStyle: .headline, weight: .bold)]
        UINavigationBar.appearance().scrollEdgeAppearance = standardAppearance

        let scrollEdgeAppearance = UINavigationBarAppearance()
        scrollEdgeAppearance.configureWithTransparentBackground()
        scrollEdgeAppearance.titleTextAttributes = [.font: UIFont.customFont(forTextStyle: .largeTitle)]
        UINavigationBar.appearance().scrollEdgeAppearance = scrollEdgeAppearance

        return true
    }
}

// MARK: - UIKit appearance proxies really suck sometimes

private extension UIButton {
    @objc dynamic var titleLabelFont: UIFont? {
        get { titleLabel?.font }
        set { titleLabel?.font = newValue }
    }
}

private extension UITableViewCell {
    @objc dynamic var textLabelFont: UIFont? {
        get { textLabel?.font }
        set { textLabel?.font = newValue }
    }

    @objc dynamic var detailTextLabelFont: UIFont? {
        get { detailTextLabel?.font }
        set { detailTextLabel?.font = newValue }
    }
}

// MARK: - UIFont extension for custom font

extension UIFont {
    class func customFont(forTextStyle style: UIFont.TextStyle, weight: UIFont.Weight? = nil) -> UIFont {
        var weight = weight ?? style.weight
        if weight == .semibold { // Update fonts, though DMSans doesn't have semibold, so anything that normally uses that will use bold instead
            weight = .bold
        }
        let font = customFont(named: "DMSans", forTextStyle: style, weight: weight)
        return UIFontMetrics(forTextStyle: style).scaledFont(for: font)
    }

    private class func customFont(named: String, forTextStyle textStyle: UIFont.TextStyle, weight: UIFont.Weight) -> UIFont {
        guard let font = UIFont(name: "\(named)-\(weight.fontName)", size: textStyle.pointSize) else {
            fatalError("""
                Failed to load the "\(named)-\(weight.fontName)" font.
                Make sure the font file is included in the project and the font name is spelled correctly.
                """
            )
        }
        return font
    }
}

public extension Font {
    static func customFont(forTextStyle style: UIFont.TextStyle, weight: UIFont.Weight? = nil) -> Font {
        let weight = weight ?? style.weight
        return .custom("DMSans-\(weight.fontName)", size: style.pointSize)
    }
}

private extension UIFont.Weight {
    var fontName: String {
        switch self {
        case .ultraLight: return "UltraLight"
        case .thin: return "Thin"
        case .light: return "Light"
        case .regular: return "Regular"
        case .medium: return "Medium"
        case .semibold: return "Semibold"
        case .bold: return "Bold"
        case .heavy: return "Heavy"
        case .black: return "Black"
        default: fatalError("""
            Unhandled font weight \(rawValue)
            """)
        }
    }
}

private extension UIFont.TextStyle {
    var pointSize: CGFloat {
        switch self {
        case .largeTitle: return 34
        case .title1: return 28
        case .title2: return 22
        case .title3: return 20
        case .headline: return 17
        case .body: return 17
        case .callout: return 16
        case .subheadline: return 15
        case .footnote: return 13
        case .caption1: return 12
        case .caption2: return 11
        default: fatalError("""
            Unhandled text style \(rawValue)
            """)
        }
    }

    var weight: UIFont.Weight {
        switch self {
        case .headline:
            return .bold // normally .semibold but DM Sans doesn't have semibold
        default:
            return .regular
        }
    }
}
