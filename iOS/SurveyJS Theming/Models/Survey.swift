import Foundation

struct Survey: Identifiable, NamedItem {
    let id = UUID()
    let path: URL
    let rootDirectory: URL

    var name: String {
        path.lastPathComponent
    }

    var contents: String? {
        try? String(contentsOf: path)
    }

    var hasCompletionScreen: Bool {
        contents?.contains("completedHtml") ?? false
    }
}

var surveys: [Survey] = {
    guard let surveysPath = Bundle.main.path(forResource: "Assets/SurveyJS", ofType: nil) else {
        return []
    }
    let surveysURL = URL(fileURLWithPath: surveysPath)
    let surveysFileURL = surveysURL.appendingPathComponent("Files")

    do {
        return try FileManager.default.contentsOfDirectory(atPath: surveysFileURL.path)
            .map { URL(fileURLWithPath: $0, relativeTo: surveysFileURL) }
            .map { Survey(path: $0, rootDirectory: surveysURL) }
            .sorted(by: { lhs, rhs in
                lhs.name < rhs.name
            })
    } catch {
        print(error)
        return []
    }
}()
