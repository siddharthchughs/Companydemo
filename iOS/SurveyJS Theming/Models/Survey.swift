import Foundation

struct Survey: Identifiable, NamedItem {
    let id = UUID()
    let path: URL

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
    guard let surveysDirecory = Bundle.main.path(forResource: "SURVEYS", ofType: nil) else {
        return []
    }

    do {
        return try FileManager.default.contentsOfDirectory(atPath: surveysDirecory)
            .map { URL(fileURLWithPath: $0, relativeTo: URL(fileURLWithPath: surveysDirecory)) }
            .map(Survey.init(path:))
            .sorted(by: { lhs, rhs in
                lhs.name < rhs.name
            })
    } catch {
        print(error)
        return []
    }
}()
