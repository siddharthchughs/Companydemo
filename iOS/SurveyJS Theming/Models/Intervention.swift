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

    init(name: String, dir: URL) {
        self.name = name

        do {
            modules = try FileManager.default.contentsOfDirectory(atPath: dir.path)
                .map { URL(fileURLWithPath: $0, relativeTo: dir) }
                .map { InterventionModule(name: $0.lastPathComponent, indexFile: $0.appendingPathComponent("index.html"), interventionRootDirectory: dir) }
        } catch {
            print(error)
            modules = []
        }
    }
}

var interventions: [InterventionSection] = {
    guard let dir = Bundle.main.path(forResource: "Interventions", ofType: nil) else {
        return []
    }
    let rootDir = URL(fileURLWithPath: dir)

    do {
        return try FileManager.default.contentsOfDirectory(atPath: dir)
            .filter { $0.lowercased() != "common" }
            .map { InterventionSection(name: $0, dir: URL(fileURLWithPath: $0, relativeTo: rootDir)) }
            .sorted(by: { lhs, rhs in
                lhs.name < rhs.name
            })
    } catch {
        print(error)
        return []
    }
}()
