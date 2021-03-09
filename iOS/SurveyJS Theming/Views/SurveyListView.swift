import SwiftUI

struct SurveyListView: View {
    var body: some View {
        NavigationView {
            List(surveys) { survey in
                NavigationLink(destination:
                    SurveyDetail(survey: survey)
                        .navigationTitle(survey.fileName)
                        .navigationBarTitleDisplayMode(.inline)
                ) {
                    SurveyRow(survey: survey)
                }
            }
            .navigationTitle(Text("Surveys"))
        }
    }
}

struct SurveyListView_Previews: PreviewProvider {
    static var previews: some View {
        SurveyListView()
    }
}
