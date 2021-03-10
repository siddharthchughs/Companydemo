import SwiftUI

struct SurveyListView: View {
    var body: some View {
        List(surveys) { survey in
            NavigationLink(destination:
                SurveyDetail(survey: survey)
                    .ignoresSafeArea()
                    .navigationTitle(survey.name)
                    .navigationBarTitleDisplayMode(.inline)
            ) {
                NamedItemRow(item: survey)
            }
        }
        .listStyle(GroupedListStyle())
    }
}

struct SurveyListView_Previews: PreviewProvider {
    static var previews: some View {
        SurveyListView()
    }
}
