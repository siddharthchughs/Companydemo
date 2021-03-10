import SwiftUI

struct InterventionDetail: UIViewControllerRepresentable {
    @Environment(\.presentationMode) var presentationMode
    let module: InterventionModule

    class Coordinator: NSObject, InterventionViewControllerDelegate {
        var parent: InterventionDetail

        init(_ parent: InterventionDetail) {
            self.parent = parent
        }

        func interventionViewControllerDidFinish(_ controller: InterventionViewController) {
            parent.presentationMode.wrappedValue.dismiss()
        }
    }

    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }

    func makeUIViewController(context: Self.Context) -> InterventionViewController {
        let controller = InterventionViewController(module: module)
        controller.delegate = context.coordinator
        return controller
    }

    func updateUIViewController(_ uiViewController: InterventionViewController, context: Self.Context) {}
}

struct InterventionDetail_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView {
            InterventionDetail(module: interventions[0].modules[0])
        }
    }
}
