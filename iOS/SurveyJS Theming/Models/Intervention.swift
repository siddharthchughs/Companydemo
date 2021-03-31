import Foundation

struct InterventionModule: Identifiable, NamedItem {
    let id = UUID()
    let name: String
    let indexFile: URL
    let interventionRootDirectory: URL
}

struct InterventionSection: Identifiable {
    let id = UUID()
    let name: String
    let modules: [InterventionModule]

    init(name: String, sectionBaseURL: URL, interventionRootURL: URL) {
        self.name = name

        do {
            modules = try FileManager.default.contentsOfDirectory(atPath: sectionBaseURL.path)
                .filter { $0.lowercased() != "common" }
                .map { URL(fileURLWithPath: $0, relativeTo: sectionBaseURL) }
                .map { InterventionModule(name: $0.lastPathComponent, indexFile: $0.appendingPathComponent("index.html"), interventionRootDirectory: interventionRootURL) }
                .sorted(by: { lhs, rhs in
                    lhs.name < rhs.name
                })
        } catch {
            print(error)
            modules = []
        }
    }
}

var interventions: [InterventionSection] = {
    guard let interventionsPath = Bundle.main.path(forResource: "Assets/Interventions", ofType: nil) else {
        return []
    }
    let interventionsURL = URL(fileURLWithPath: interventionsPath)

    do {
        return try FileManager.default.contentsOfDirectory(atPath: interventionsURL.path)
            .filter { $0.lowercased() != "common" }
            .map { InterventionSection(name: $0, sectionBaseURL: URL(fileURLWithPath: $0, relativeTo: interventionsURL), interventionRootURL: interventionsURL) }
            .sorted(by: { lhs, rhs in
                lhs.name < rhs.name
            })
    } catch {
        print(error)
        return []
    }
}()
