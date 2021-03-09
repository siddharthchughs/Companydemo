import SwiftUI

@main
struct SurveyJSThemingApp: App {
    @UIApplicationDelegateAdaptor(AppDelegate.self) var appDelegate

    var body: some Scene {
        WindowGroup {
            SurveyView()
        }
    }
}
