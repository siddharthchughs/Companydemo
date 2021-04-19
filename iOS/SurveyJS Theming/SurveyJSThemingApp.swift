import SwiftUI

@main
struct SurveyJSThemingApp: App {
    @UIApplicationDelegateAdaptor(AppDelegate.self) var appDelegate
    @State private var selectedTab = 0

    var title: String {
        switch selectedTab {
        case 0: return "Surveys"
        case 1: return "Interventions"
        case 2: return "Overview"
        default: return "Get Help"
        }
    }

    var displayMode: NavigationBarItem.TitleDisplayMode {
        if selectedTab == 2 {
            return .inline
        }
        return .automatic
    }

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

                    OverviewView()
                        .tabItem {
                            Label("Overview", systemImage: "list.bullet.rectangle")
                                .font(.customFont(forTextStyle: .callout))
                        }
                        .tag(2)
                    
                    GetHelpView()
                        .tabItem {
                            Label("Get Help", systemImage: "lifepreserver")
                                .font(.customFont(forTextStyle: .callout))
                        }
                        .tag(3)
                }
                .navigationBarTitle(title, displayMode: displayMode)
            }
        }
    }
}
