import SwiftUI

struct SurveyDetail: UIViewControllerRepresentable {
    @Environment(\.presentationMode) var presentationMode
    let survey: Survey

    class Coordinator: NSObject, SurveyViewControllerDelegate {
        var parent: SurveyDetail

        init(_ parent: SurveyDetail) {
            self.parent = parent
        }

        func surveyViewController(_ controller: SurveyViewController, didFinishWithResult result: Result<Void, SurveyFailure>) {
            parent.presentationMode.wrappedValue.dismiss()
        }

        func surveyViewController(_ controller: SurveyViewController, didBeginSubmission survey: Survey) {
            // no-op
        }

        func surveyViewController(_ controller: SurveyViewController, didCompleteSubmission survey: Survey, withResult result: Result<Void, Error>) {
            guard !survey.hasCompletionScreen else { return }
            parent.presentationMode.wrappedValue.dismiss()
        }
    }

    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }

    func makeUIViewController(context: Self.Context) -> SurveyViewController {
        let controller = SurveyViewController(survey: survey)
        controller.delegate = context.coordinator
        return controller
    }

    func updateUIViewController(_ uiViewController: SurveyViewController, context: Self.Context) {}
}

struct SurveyDetail_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView {
            SurveyDetail(survey: surveys[0])
        }
    }
}
