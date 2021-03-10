import SwiftUI

struct InterventionListView: View {
    var body: some View {
        List {
            ForEach(interventions) { section in
                Section(header: Text(section.name)) {
                    ForEach(section.modules) { module in
                        NavigationLink(destination:
                            InterventionDetail(module: module)
                                .ignoresSafeArea()
                                .navigationTitle(module.name)
                                .navigationBarTitleDisplayMode(.inline)
                        ) {
                            NamedItemRow(item: module)
                        }
                    }
                }
            }
        }
        .listStyle(GroupedListStyle())
    }
}

struct InterventionListView_Previews: PreviewProvider {
    static var previews: some View {
        InterventionListView()
    }
}
