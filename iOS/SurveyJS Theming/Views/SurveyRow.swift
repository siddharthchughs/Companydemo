import SwiftUI

struct SurveyRow: View {
    let survey: Survey

    var body: some View {
        HStack {
            Text(survey.fileName)
            Spacer()
        }
    }
}

struct SurveyRow_Previews: PreviewProvider {
    static var previews: some View {
        Group {
            SurveyRow(survey: surveys[0])
            SurveyRow(survey: surveys[1])
        }
        .previewLayout(.fixed(width: 300, height: 45))
    }
}
