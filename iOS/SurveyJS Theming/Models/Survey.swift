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
    guard let surveysDirectory = Bundle.main.path(forResource: "SurveyJS/Files", ofType: nil) else {
        return []
    }
    let rootDirectory = Bundle.main.bundlePath

    do {
        return try FileManager.default.contentsOfDirectory(atPath: surveysDirectory)
            .map { URL(fileURLWithPath: $0, relativeTo: URL(fileURLWithPath: surveysDirectory)) }
            .map { Survey(path: $0, rootDirectory: URL(fileURLWithPath: rootDirectory)) }
            .sorted(by: { lhs, rhs in
                lhs.name < rhs.name
            })
    } catch {
        print(error)
        return []
    }
}()
