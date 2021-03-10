import SwiftUI

@main
struct SurveyJSThemingApp: App {
    @UIApplicationDelegateAdaptor(AppDelegate.self) var appDelegate
    @State private var selectedTab = 0

    var body: some Scene {
        WindowGroup {
            NavigationView {
                TabView(selection: $selectedTab) {
                    SurveyView()
                        .tabItem {
                            Label("Surveys", systemImage: selectedTab == 0 ? "chart.bar.doc.horizontal.fill" : "chart.bar.doc.horizontal")
                                .font(.customFont(forTextStyle: .callout))
                        }
                        .tag(0)
                    InterventionView()
                        .tabItem {
                            Label("Interventions", systemImage: selectedTab == 1 ? "lightbulb.fill" : "lightbulb")
                                .font(.customFont(forTextStyle: .callout))
                        }
                        .tag(1)
                }
                .navigationTitle(selectedTab == 0 ? "Surveys" : "Interventions")
            }
        }
    }
}
