import SwiftUI

struct GetHelpView: UIViewControllerRepresentable {
    @Environment(\.presentationMode) var presentationMode

    class Coordinator: NSObject, GetHelpViewControllerDelegate {
        var parent: GetHelpView

        init(_ parent: GetHelpView) {
            self.parent = parent
        }

        func getHelpViewControllerDidFinish(_ controller: GetHelpViewController) {
            parent.presentationMode.wrappedValue.dismiss()
        }
    }

    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }

    func makeUIViewController(context: Self.Context) -> GetHelpViewController {
        let controller = GetHelpViewController()
        controller.delegate = context.coordinator
        return controller
    }

    func updateUIViewController(_ uiViewController: GetHelpViewController, context: Self.Context) {}
}

struct GetHelpView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView {
            GetHelpView()
        }
    }
}
